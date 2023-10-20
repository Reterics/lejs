import {ParserConstants} from "./types/parsers";

export const REGEXPS: ParserConstants = {
    variable: {
        start: "{{",
        end: "}}",
        regexp: /{{\w*}}/g
    },
    if: {
        start: "{#",
        end: "}}",
        close_start: "{\/#",
        regexp: /{#\w*}}[\s\S]*?{\/#\w*}}/g,
        start_regexp: /{#!?\w*}}/g
    },
    map: {
        start: "{>",
        end: "}}",
        close_start: "{\/>",
        regexp: /{>\w*}}[\s\S]*?{\/>\w*}}/g,
        start_regexp: /{>\w*}}/g
    },
    map_variable: {
        start: "{{+",
        end: "}}",
        regexp: /{{\+\w*}}/g
    }
}
