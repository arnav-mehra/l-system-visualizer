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
                    const sin_phi = Math.sin(phi * Math.PI / 180);

                    const new_pos = [
                        len * sin_theta * cos_phi + curr_ctx.pos[0],
                        len * sin_theta * sin_phi + curr_ctx.pos[1],
                        len * cos_theta           + curr_ctx.pos[2]
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

const Z_AXIS = new THREE.Vector3(0, 0, 1);

let scene = null;
let anim_ref = null;
let time = 0;

export const initScene = (lines) => {
    const group = new THREE.Group();

    lines.forEach(([ from_pos, to_pos ]) => {
        const points = [
            new THREE.Vector3(from_pos[0], from_pos[1], from_pos[2]),
            new THREE.Vector3(to_pos[0], to_pos[1], to_pos[2])
        ];
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const material = new THREE.LineBasicMaterial({ color: 0x0000ff }); 
        const line = new THREE.Line(geometry, material);
        group.add(line);
    });

    const bbox = new THREE.Box3().setFromObject(group);
    const center = new THREE.Vector3();
    bbox.getCenter(center);
    group.position.set(-center.x, -center.y, -center.z);

    scene = new THREE.Scene().add(group);
};

const createCamera = (renderer) => {
    const size = new THREE.Vector2();
    renderer.getSize(size);

    const camera = new THREE.PerspectiveCamera(
        75, size.width / size.height, 0.1, 1000
    );
    camera.position.set(0, 10, 0);
    camera.rotation.set(-Math.PI / 2, 0, Math.PI);
    time = 0;

    return camera;
};

export const startStationary = (renderer) => {
    if (!scene) return;

    const camera = createCamera(renderer);
    renderer.render(scene, camera);
};

export const startAnimation = (renderer) => {
    if (!scene || anim_ref) return;

    const camera = createCamera(renderer);

    const animate = () => {
        anim_ref = requestAnimationFrame(animate);
        
        const angle = time++ / 75;
        camera.position.set(Math.sin(angle) * 10, Math.cos(angle) * 10, 0);
        camera.lookAt(new THREE.Vector3(0, 0, 0));
        camera.up = Z_AXIS;

        renderer.render(scene, camera);
    };

    animate();
};

export const stopAnimation = () => {
    if (anim_ref) {
        cancelAnimationFrame(anim_ref);
        anim_ref = null;
    }
};

// const pos = [ 
//     (from_pos[0] + to_pos[0]) / 2,
//     (from_pos[1] + to_pos[1]) / 2,
//     (from_pos[2] + to_pos[2]) / 2
// ];
// const dir = [ 
//     to_pos[0] - from_pos[0],
//     to_pos[1] - from_pos[1],
//     to_pos[2] - from_pos[2]
// ];
// const len = Math.sqrt(
//       dir[0] * dir[0]
//     + dir[1] * dir[1]
//     + dir[2] * dir[2]
// );
// const look_at = new THREE.Vector3(
//     dir[1] + pos[0],
//     -dir[0] + pos[1],
//     dir[2] + pos[2]
// );
// const rad = 0.01;

// const geometry = new THREE.CylinderGeometry(rad, rad, len);
// const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 }); 
// const cylinder = new THREE.Mesh(geometry, material);
// cylinder.position.set(pos[0], pos[1], pos[2]);
// cylinder.lookAt(look_at);

// scene.add(cylinder);