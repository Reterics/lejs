
export interface ParserOptions {
    cache?: boolean
}

export interface ParserFunc {
    (string: string, data: (object | null)): string
}