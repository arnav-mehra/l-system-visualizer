export const InstrTypes = {
    DRAW_LINE: "draw_line",
    TRANSFORM_CTX: "transform_ctx",
    PUSH_CTX: "push_ctx",
    POP_CTX: "pop_ctx"
}

export class Instr {
    constructor(type, fn_str) {
        this.type = type;
        this.fn_str = fn_str;
        try {
            this.fn = eval(fn_str);
        } catch (err) {
            alert("Bad Instruction Function: ", err);
        }
    }
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
        if (!draw_instr[ch]) continue;

        for (const instr of draw_instr[ch]) {
            switch (instr.type) {
                case InstrTypes.TRANSFORM_CTX: {
                    curr_ctx = instr.fn(curr_ctx);
                    break;
                }
                case InstrTypes.DRAW_LINE: {
                    const [ angle, len ] = instr.fn(curr_ctx);
                    const new_pos = [
                        Math.cos(angle * Math.PI / 180) * len + curr_ctx.pos[0],
                        Math.sin(angle * Math.PI / 180) * len + curr_ctx.pos[1]
                    ];
                    lines.push(...curr_ctx.pos, 0.0, ...new_pos, 0.0);
                    curr_ctx = { ...curr_ctx, pos: new_pos };
                    break;
                }
                case InstrTypes.PUSH_CTX: {
                    stack.push(curr_ctx);
                    break;
                }
                case InstrTypes.POP_CTX: {
                    curr_ctx = stack.pop();
                    break;
                }
            }
        }
    }

    const gl = canvas.getContext("webgl");

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