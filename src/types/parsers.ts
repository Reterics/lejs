
export interface ParserOptions {
    cache?: boolean
}

export interface ParserConstant {
    start: string,
    end: string,
    close_start?: string,
    regexp: RegExp,
    start_regexp?: RegExp
    end_regexp?: RegExp
}

export interface ParserConstants {
     [key: string]: ParserConstant
}

export interface ParserRenderOptions {
    defaultValue: 'keep'|'empty'|'default',
    config?: ParserConstant
}

export interface ParserFunc {
    (string: string, data?: (object | null), options?: ParserRenderOptions): string
}