const ActionTypes = {
    DRAW_LINE: "draw_line",
    TRANSFORM_CTX: "transform_ctx",
    PUSH_CTX: "push_ctx",
    POP_CTX: "pop_ctx"
}

export class Action {
    constructor(type, fn) {
        this.type = type;
        this.fn = fn;
    }
}

const DEF_AXIOM = "0";

export const DEF_STRS = {
    ptr: 0,
    cache: [ DEF_AXIOM ]
};

export const DEF_RULES = {
    "0": "1[0]0",
    "1": "11"
};

export const DEF_DRAW_INIT_CTX = {
    len: 10,
    angle: 270,
    pos: [ 1200, 2400 ]
};

export const DEF_DRAW_INSTRS = {
    "0": [
        new Action(
            ActionTypes.DRAW_LINE,
            (ctx) => ([ ctx.angle, ctx.len ])
        )
    ],
    "1": [
        new Action(
            ActionTypes.DRAW_LINE,
            (ctx) => ([ ctx.angle, ctx.len ])
        )
    ],
    "[": [
        new Action(ActionTypes.PUSH_CTX),
        new Action(
            ActionTypes.TRANSFORM_CTX,
            (ctx) => ({ ...ctx, angle: ctx.angle + 45 })
        )
    ],
    "]": [
        new Action(ActionTypes.POP_CTX),
        new Action(
            ActionTypes.TRANSFORM_CTX,
            (ctx) => ({ ...ctx, angle: ctx.angle - 45 })
        )
    ]
}

export const getNext = (str, rules) => {
    let res = "";
    for (const ch of str) {
        res += rules[ch] ? rules[ch] : ch;
    }
    return res;
};

export const drawTurtleInstrs = (canvas_ctx, str, init_ctx, draw_instr) => {
    let curr_ctx = { ...init_ctx };
    let stack = [];

    for (const ch of str) {
        for (const action of draw_instr[ch]) {
            switch (action.type) {
                case ActionTypes.TRANSFORM_CTX: {
                    curr_ctx = action.fn(curr_ctx);
                    break;
                }
                case ActionTypes.DRAW_LINE: {
                    const [ angle, len ] = action.fn(curr_ctx);
                    const new_pos = [
                        Math.cos(angle * Math.PI / 180) * len + curr_ctx.pos[0],
                        Math.sin(angle * Math.PI / 180) * len + curr_ctx.pos[1]
                    ];
                    
                    canvas_ctx.beginPath();
                    canvas_ctx.moveTo(curr_ctx.pos[0], curr_ctx.pos[1]);
                    canvas_ctx.lineTo(new_pos[0], new_pos[1]);
                    canvas_ctx.closePath();
                    canvas_ctx.stroke();
    
                    curr_ctx = { ...curr_ctx, pos: new_pos }
                    break;
                }
                case ActionTypes.PUSH_CTX: {
                    stack.push(curr_ctx);
                    break;
                }
                case ActionTypes.POP_CTX: {
                    curr_ctx = stack.pop();
                    break;
                }
            }
        }
    }
}