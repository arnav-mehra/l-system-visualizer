import * as THREE from 'three';

export const InstrTypes = {
    DRAW_LINE: "draw_line",
    TRANSFORM_CTX: "transform_ctx",
    PUSH_CTX: "push_ctx",
    POP_CTX: "pop_ctx"
};

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

export const getTurtleLines = (str, init_ctx, draw_instr) => {
    let lines = [];

    let curr_ctx = { ...init_ctx };
    let stack = [];

    for (const ch of str) {
        if (!draw_instr[ch]) continue;

        for (const instr of draw_instr[ch]) {
            switch (instr.type) {
                case InstrTypes.TRANSFORM_CTX: {
                    curr_ctx = instr.fn(curr_ctx);
                    break;
                }
                case InstrTypes.DRAW_LINE: {
                    const [ len, phi, theta ] = instr.fn(curr_ctx);

                    const sin_theta = Math.sin(theta * Math.PI / 180);
                    const cos_theta = Math.cos(theta * Math.PI / 180);
                    const cos_phi = Math.cos(phi * Math.PI / 180);

                    const new_pos = [
                        len * sin_theta * cos_phi + curr_ctx.pos[0],
                        len * sin_theta * cos_phi + curr_ctx.pos[1],
                        len * cos_theta + curr_ctx.pos[2]
                    ];
                    lines.push([ curr_ctx.pos, new_pos ]);
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

    return lines;
};

export const drawLinesWebGL = (canvas, lines) => {
    const gl = canvas.getContext("webgl");

    const vertices = new Float32Array(lines.flat());
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
};

export const drawLinesThreeJs = (renderer, lines) => {
    const size = new THREE.Vector2();
    renderer.getSize(size);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight /*size[0] / size[1]*/, 0.1, 1000);

    lines.forEach(([ from_pos, to_pos ]) => {
        const pos = [ 
            (from_pos[0] + to_pos[0]) / 2,
            (from_pos[1] + to_pos[1]) / 2,
            (from_pos[2] + to_pos[2]) / 2
        ];
        const dir = [ 
            to_pos[0] - from_pos[0],
            to_pos[1] - from_pos[1],
            to_pos[2] - from_pos[2]
        ];
        const len = Math.sqrt(
              dir[0] * dir[0]
            + dir[1] * dir[1]
            + dir[2] * dir[2]
        );
        const rad = 0.1;
        
        const geometry = new THREE.CylinderGeometry(rad, rad, len);
        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 }); 
        const cylinder = new THREE.Mesh(geometry, material);
        cylinder.position.set(pos[0], pos[2], pos[1]);
        // cylinder.lookAt(dir);

        scene.add(cylinder);
    });

    camera.position.z = 5;

    renderer.render(scene, camera);

    console.log({renderer})
};