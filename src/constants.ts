
export const REGEXPS = {
    variable: {
        start: "{{",
        end: "}}",
        regexp: /{{\w*}}/g
    },
    if: {
        start: "{#",
        end: "}}",
        regexp: /{#\w*}}[\s\S]*?{\/#\w*}}/g
    }
}
