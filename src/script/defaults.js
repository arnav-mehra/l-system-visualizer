import { Instr, InstrTypes } from "./logic";

export const FRACTAL_TREE = {
    axiom: "0",
    rules: {
        "0": "1[0]0",
        "1": "11"
    },
    draw_init_ctx: {
        len: 0.05,
        angle: 90.0,
        pos: [ 0.0, -1.0 ]
    },
    draw_instrs: {
        "0": [
            new Instr(
                InstrTypes.DRAW_LINE,
                "(ctx) => ([ ctx.angle, ctx.len ])"
            )
        ],
        "1": [
            new Instr(
                InstrTypes.DRAW_LINE,
                "(ctx) => ([ ctx.angle, ctx.len ])"
            )
        ],
        "[": [
            new Instr(InstrTypes.PUSH_CTX, "null"),
            new Instr(
                InstrTypes.TRANSFORM_CTX,
                "(ctx) => ({ ...ctx, angle: ctx.angle + 45 })"
            )
        ],
        "]": [
            new Instr(InstrTypes.POP_CTX, "null"),
            new Instr(
                InstrTypes.TRANSFORM_CTX,
                "(ctx) => ({ ...ctx, angle: ctx.angle - 45 })"
            )
        ]
    }
};

export const KOCH_CURVE = {
    axiom: "F",
    rules: {
        "F": "F+F-F-F+F"
    },
    draw_init_ctx: {
        len: 0.05,
        angle: 0.0,
        pos: [ -1.0, 0.0 ]
    },
    draw_instrs: {
        "F": [
            new Instr(
                InstrTypes.DRAW_LINE,
                "(ctx) => ([ ctx.angle, ctx.len ])"
            )
        ],
        "-": [
            new Instr(
                InstrTypes.TRANSFORM_CTX,
                "(ctx) => ({ ...ctx, angle: ctx.angle - 90 })"
            )
        ],
        "+": [
            new Instr(
                InstrTypes.TRANSFORM_CTX,
                "(ctx) => ({ ...ctx, angle: ctx.angle + 90 })"
            )
        ],
    }
};

export const SIERPINSKI_TRI = {
    axiom: "F-G-G",
    rules: {
        "F": "F-G+F+G-F",
        "G": "GG"
    },
    draw_init_ctx: {
        len: 0.05,
        angle: 180.0,
        pos: [ 0.75, -0.75 ]
    },
    draw_instrs: {
        "F": [
            new Instr(
                InstrTypes.DRAW_LINE,
                "(ctx) => ([ ctx.angle, ctx.len ])"
            )
        ],
        "G": [
            new Instr(
                InstrTypes.DRAW_LINE,
                "(ctx) => ([ ctx.angle, ctx.len ])"
            )
        ],
        "-": [
            new Instr(
                InstrTypes.TRANSFORM_CTX,
                "(ctx) => ({ ...ctx, angle: ctx.angle - 120 })"
            )
        ],
        "+": [
            new Instr(
                InstrTypes.TRANSFORM_CTX,
                "(ctx) => ({ ...ctx, angle: ctx.angle + 120 })"
            )
        ],
    }
};

export const FRACTAL_PLANT = {
    axiom: "X",
    rules: {
        "X": "F+[[X]-X]-F[-FX]+X",
        "F": "FF"
    },
    draw_init_ctx: {
        len: 0.01,
        angle: 45.0,
        pos: [ -0.75, -0.75 ]
    },
    draw_instrs: {
        "F": [
            new Instr(
                InstrTypes.DRAW_LINE,
                "(ctx) => ([ ctx.angle, ctx.len ])"
            )
        ],
        "[": [
            new Instr(InstrTypes.PUSH_CTX, "null")
        ],
        "]": [
            new Instr(InstrTypes.POP_CTX, "null")
        ],
        "-": [
            new Instr(
                InstrTypes.TRANSFORM_CTX,
                "(ctx) => ({ ...ctx, angle: ctx.angle - 25 })"
            )
        ],
        "+": [
            new Instr(
                InstrTypes.TRANSFORM_CTX,
                "(ctx) => ({ ...ctx, angle: ctx.angle + 25 })"
            )
        ],
    }
};