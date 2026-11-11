export interface WatermarkFont {
  color?: string
  fontSize?: number
  fontFamily?: string
  fontStyle?: 'normal' | 'italic' | 'oblique'
  fontWeight?: string | number
  textAlign?: CanvasTextAlign
  lineHeight?: number
}

export interface WatermarkError {
  source: 'image' | 'canvas'
  error: unknown
}

export interface WatermarkExposed {
  redraw: () => Promise<void>
}
