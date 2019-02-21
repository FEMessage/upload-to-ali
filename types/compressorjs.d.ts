/**
 * Modified from
 * https://github.com/fengyuanchen/compressorjs/blob/master/types/index.d.ts
 */
export default interface Options {
  strict?: boolean
  checkOrientation?: boolean
  maxWidth?: number
  maxHeight?: number
  minWidth?: number
  minHeight?: number
  width?: number
  height?: number
  quality?: number
  mimeType?: string
  convertSize?: number
  beforeDraw?(
    context: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement
  ): void
  drew?(context: CanvasRenderingContext2D, canvas: HTMLCanvasElement): void
  success?(file: Blob): void
  error?(error: Error): void
}
