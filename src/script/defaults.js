import { Instr, InstrTypes } from "./logic";

export const FRACTAL_TREE = {
    axiom: "0",
    rules: {
        "0": "1[0]0",
        "1": "11"
    },
    draw_init_ctx: {
        len: 0.05,
        theta: 0.0,
        phi: 0.0,
        pos: [ 0.0, 0.0, 0.0 ]
    },
    draw_instrs: {
        "0": [
            new Instr(
                InstrTypes.DRAW_LINE,
                "(ctx) => ([ ctx.len, ctx.phi, ctx.theta ])"
            )
        ],
        "1": [
            new Instr(
                InstrTypes.DRAW_LINE,
                "(ctx) => ([ ctx.len, ctx.phi, ctx.theta ])"
            )
        ],
        "[": [
            new Instr(InstrTypes.PUSH_CTX, "null"),
            new Instr(
                InstrTypes.TRANSFORM_CTX,
                "(ctx) => ({ ...ctx, theta: ctx.theta + 45 })"
            )
        ],
        "]": [
            new Instr(InstrTypes.POP_CTX, "null"),
            new Instr(
                InstrTypes.TRANSFORM_CTX,
                "(ctx) => ({ ...ctx, theta: ctx.theta - 45 })"
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
        theta: 270.0,
        phi: 0.0,
        pos: [ 0.0, 0.0, 0.0 ]
    },
    draw_instrs: {
        "F": [
            new Instr(
                InstrTypes.DRAW_LINE,
                "(ctx) => ([ ctx.len, ctx.phi, ctx.theta ])"
            )
        ],
        "-": [
            new Instr(
                InstrTypes.TRANSFORM_CTX,
                "(ctx) => ({ ...ctx, theta: ctx.theta - 90 })"
            )
        ],
        "+": [
            new Instr(
                InstrTypes.TRANSFORM_CTX,
                "(ctx) => ({ ...ctx, theta: ctx.theta + 90 })"
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
        theta: 0.0,
        phi: 0.0,
        pos: [ 0.0, 0.0, 0.0 ]
    },
    draw_instrs: {
        "F": [
            new Instr(
                InstrTypes.DRAW_LINE,
                "(ctx) => ([ ctx.len, ctx.phi, ctx.theta ])"
            )
        ],
        "G": [
            new Instr(
                InstrTypes.DRAW_LINE,
                "(ctx) => ([ ctx.len, ctx.phi, ctx.theta ])"
            )
        ],
        "-": [
            new Instr(
                InstrTypes.TRANSFORM_CTX,
                "(ctx) => ({ ...ctx, theta: ctx.theta - 120 })"
            )
        ],
        "+": [
            new Instr(
                InstrTypes.TRANSFORM_CTX,
                "(ctx) => ({ ...ctx, theta: ctx.theta + 120 })"
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
        len: 0.1,
        theta: 0.0,
        phi: 0.0,
        pos: [ 0, 0, 0 ]
    },
    draw_instrs: {
        "F": [
            new Instr(
                InstrTypes.DRAW_LINE,
                "(ctx) => ([ ctx.len, ctx.phi, ctx.theta ])"
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
                "(ctx) => ({ ...ctx, phi: ctx.phi + 10, theta: ctx.theta - 25 })"
            )
        ],
        "+": [
            new Instr(
                InstrTypes.TRANSFORM_CTX,
                "(ctx) => ({ ...ctx, phi: ctx.phi + 10, theta: ctx.theta + 25 })"
            )
        ],
    }
};