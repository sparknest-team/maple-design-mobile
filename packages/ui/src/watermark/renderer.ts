import type { WatermarkFont } from './types'

export interface WatermarkRenderOptions {
  content?: string | string[]
  image?: string
  width?: number
  height?: number
  gap: [number, number]
  rotate: number
  font?: WatermarkFont
  alpha: number
  grayscale: boolean
  staggered: boolean
  color: string
  pixelRatio?: number
}

export interface WatermarkRenderResult {
  dataUrl: string
  size: [number, number]
}

export class WatermarkRenderError extends Error {
  constructor(
    readonly source: 'image' | 'canvas',
    readonly cause: unknown,
  ) {
    super(source === 'image' ? 'Failed to load watermark image' : 'Failed to render watermark canvas')
  }
}

function createCanvas(width: number, height: number, ratio: number) {
  const canvas = document.createElement('canvas')
  canvas.width = Math.max(1, Math.ceil(width * ratio))
  canvas.height = Math.max(1, Math.ceil(height * ratio))
  const context = canvas.getContext('2d')
  if (!context) {
    throw new WatermarkRenderError('canvas', new Error('Canvas 2D context is unavailable'))
  }
  context.scale(ratio, ratio)
  return { canvas, context }
}

function loadImage(source: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image()
    image.crossOrigin = 'anonymous'
    image.referrerPolicy = 'no-referrer'
    image.onload = () => resolve(image)
    image.onerror = (error) => reject(new WatermarkRenderError('image', error))
    image.src = source
  })
}

function applyGrayscale(canvas: HTMLCanvasElement) {
  try {
    const context = canvas.getContext('2d')
    if (!context) {
      return
    }
    const image = context.getImageData(0, 0, canvas.width, canvas.height)
    for (let index = 0; index < image.data.length; index += 4) {
      const brightness = (image.data[index] + image.data[index + 1] + image.data[index + 2]) / 3
      image.data[index] = brightness
      image.data[index + 1] = brightness
      image.data[index + 2] = brightness
    }
    context.putImageData(image, 0, 0)
  } catch (error) {
    throw new WatermarkRenderError('canvas', error)
  }
}

function toDataUrl(canvas: HTMLCanvasElement) {
  try {
    return canvas.toDataURL()
  } catch (error) {
    throw new WatermarkRenderError('canvas', error)
  }
}

function normalizeContent(content?: string | string[]) {
  return (Array.isArray(content) ? content : [content]).filter((line): line is string => Boolean(line))
}

export async function renderWatermark(options: WatermarkRenderOptions): Promise<WatermarkRenderResult | null> {
  const lines = normalizeContent(options.content)
  if (!options.image && lines.length === 0) {
    return null
  }

  const ratio = Math.max(1, options.pixelRatio ?? window.devicePixelRatio ?? 1)
  const fontSize = options.font?.fontSize ?? 16
  const lineHeight = options.font?.lineHeight ?? Math.round(fontSize * 1.4)
  const fontFamily = options.font?.fontFamily ?? 'sans-serif'
  const fontStyle = options.font?.fontStyle ?? 'normal'
  const fontWeight = options.font?.fontWeight ?? 'normal'
  const font = `${fontStyle} ${fontWeight} ${fontSize}px ${fontFamily}`

  let image: HTMLImageElement | undefined
  if (options.image) {
    image = await loadImage(options.image)
  }

  const measurement = createCanvas(1, 1, ratio).context
  measurement.font = font
  const measuredWidth = lines.length ? Math.max(...lines.map((line) => measurement.measureText(line).width)) : 0
  const naturalWidth = image?.naturalWidth || image?.width || 120
  const naturalHeight = image?.naturalHeight || image?.height || 28
  const markWidth = Math.max(1, options.width ?? (image ? naturalWidth : Math.ceil(measuredWidth)))
  const proportionalHeight =
    image && options.width && !options.height ? naturalHeight * (options.width / naturalWidth) : naturalHeight
  const markHeight = Math.max(1, options.height ?? (image ? proportionalHeight : lineHeight * lines.length))

  const mark = createCanvas(markWidth, markHeight, ratio)
  mark.context.globalAlpha = Math.min(1, Math.max(0, options.alpha))
  if (image) {
    mark.context.drawImage(image, 0, 0, markWidth, markHeight)
  } else {
    mark.context.font = font
    mark.context.fillStyle = options.font?.color ?? options.color
    mark.context.textAlign = options.font?.textAlign ?? 'center'
    mark.context.textBaseline = 'middle'
    const x =
      mark.context.textAlign === 'left' || mark.context.textAlign === 'start'
        ? 0
        : mark.context.textAlign === 'right' || mark.context.textAlign === 'end'
          ? markWidth
          : markWidth / 2
    lines.forEach((line, index) => mark.context.fillText(line, x, lineHeight * index + lineHeight / 2))
  }

  const radians = (Math.PI / 180) * options.rotate
  const rotatedWidth = Math.ceil(Math.abs(markWidth * Math.cos(radians)) + Math.abs(markHeight * Math.sin(radians)))
  const rotatedHeight = Math.ceil(Math.abs(markWidth * Math.sin(radians)) + Math.abs(markHeight * Math.cos(radians)))
  const rotated = createCanvas(rotatedWidth, rotatedHeight, ratio)
  rotated.context.translate(rotatedWidth / 2, rotatedHeight / 2)
  rotated.context.rotate(radians)
  rotated.context.drawImage(mark.canvas, -markWidth / 2, -markHeight / 2, markWidth, markHeight)

  const tileWidth = rotatedWidth + Math.max(0, options.gap[0])
  const tileHeight = rotatedHeight + Math.max(0, options.gap[1])
  const columns = options.staggered ? 2 : 1
  const rows = options.staggered ? 2 : 1
  const tile = createCanvas(tileWidth * columns, tileHeight * rows, ratio)
  const drawMark = (x: number, y: number) => {
    tile.context.drawImage(rotated.canvas, x, y, rotatedWidth, rotatedHeight)
  }
  drawMark(options.gap[0] / 2, options.gap[1] / 2)
  if (options.staggered) {
    drawMark(tileWidth + options.gap[0] / 2, options.gap[1] / 2)
    for (const column of [-0.5, 0.5, 1.5]) {
      drawMark(column * tileWidth + options.gap[0] / 2, tileHeight + options.gap[1] / 2)
    }
  }
  if (options.grayscale) {
    applyGrayscale(tile.canvas)
  }

  return {
    dataUrl: toDataUrl(tile.canvas),
    size: [tileWidth * columns, tileHeight * rows],
  }
}
