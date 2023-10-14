
export interface ParserOptions {
    cache?: boolean
}

export interface ParserRenderOptions {
    defaultValue: 'keep'|'empty'|'default'
}

export interface ParserFunc {
    (string: string, data: (object | null), options: ParserRenderOptions): string
}