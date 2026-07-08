import { parse, resolve } from 'path';
import { buildIcons, getIo } from '@varlet/icon-builder';
import chokidar from 'chokidar';
import fse from 'fs-extra';
import sharp from 'sharp';
import { getMapleConfig } from '../config/maple.config.js';
import { ICONS_PNG_DIR_NAME } from '../shared/constant.js';
import logger from '../shared/logger.js';
const { removeSync, ensureDirSync, readdirSync } = fse;
function clearPngOutputs(pngDir) {
    removeSync(pngDir);
    ensureDirSync(pngDir);
}
async function buildPNG(io) {
    const svgFiles = readdirSync(io.entry).filter((svgFile) => svgFile.endsWith('.svg'));
    const pngDir = resolve(io.output, ICONS_PNG_DIR_NAME);
    clearPngOutputs(pngDir);
    await Promise.all(svgFiles.map((svg) => new Promise((done) => {
        const { name } = parse(svg);
        sharp(resolve(io.entry, svg))
            .resize({ height: 100 })
            .toBuffer()
            .then((buffer) => {
            sharp({
                create: {
                    width: 100,
                    height: 100,
                    channels: 4,
                    background: '#4a7afe',
                },
            })
                .composite([
                {
                    input: buffer,
                    blend: 'dest-in',
                },
            ])
                .png()
                .toFile(resolve(pngDir, `${name}.png`))
                .then(() => {
                done();
            });
        });
    })));
    logger.success('build png success!');
}
export async function build(mapleConfig, io) {
    await Promise.all([buildPNG(io), buildIcons(mapleConfig?.icons)]);
}
export async function icons({ watch = false } = {}) {
    const mapleConfig = await getMapleConfig();
    const io = getIo(mapleConfig?.icons);
    const task = () => build(mapleConfig, io);
    if (watch) {
        await build(mapleConfig, io);
        chokidar.watch(io.entry, { ignoreInitial: true }).on('all', task);
        logger.info(`watching for ${io.entry} changes...`);
        return;
    }
    await task();
}
