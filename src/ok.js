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
    len: 0.1,
    angle: 90.0,
    pos: [ 0.0, -1.0 ]
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

export const drawTurtleInstrs = (canvas, str, init_ctx, draw_instr) => {
    let curr_ctx = { ...init_ctx };
    let stack = [];

    let lines = [];

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
                    lines.push(...curr_ctx.pos, 0.0, ...new_pos, 0.0);
                    curr_ctx = { ...curr_ctx, pos: new_pos };
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

    console.log({lines})

    const gl = canvas.getContext("webgl");

    gl.lineWidth = 4.0;

    const vertices = new Float32Array(lines);
    const vertex_buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);

    var vertCode = `
        attribute vec3 coordinates;
        void main(void) {
            gl_Position = vec4(coordinates, 1.0);
        }
    `;
    var vertShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertShader, vertCode);
    gl.compileShader(vertShader);

    var fragCode = `
        void main(void) {
            gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
        }
    `;
    var fragShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragShader, fragCode);
    gl.compileShader(fragShader);

    var shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertShader);
    gl.attachShader(shaderProgram, fragShader);
    gl.linkProgram(shaderProgram);
    gl.useProgram(shaderProgram);

    gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
    var coord = gl.getAttribLocation(shaderProgram, "coordinates");
    gl.vertexAttribPointer(coord, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(coord);

    gl.clearColor(1.0, 1.0, 1.0, 1.0);
    gl.enable(gl.DEPTH_TEST);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.viewport(0, 0, canvas.width, canvas.height);

    gl.drawArrays(gl.LINES, 0, lines.length / 3);
}