import * as THREE from 'three';
import { Draw, DrawLineInstr, PopInstr, PushInstr, SetInstr } from './dsl';

export const getNext = (str, rules) => {
    let res = "";
    for (const ch of str) {
        res += rules[ch] ? rules[ch] : ch;
    }
    return res;
};

/**
 * @param {String} str
 * @param {Draw} draw_info
*/
export const getTurtleLines = (str, draw_info) => {
    let lines = [];

    let curr_ctx = {
        pos: [ 0.0, 0.0, 0.0 ],
        ...draw_info.vars
    };
    let stack = [];

    for (const ch of str) {
        if (!draw_info.instrs[ch]) continue;

        for (const instr of draw_info.instrs[ch]) {
            if (instr instanceof SetInstr) {
                curr_ctx[instr.key] = instr.transform(curr_ctx[instr.key]);
            }
            else if (instr instanceof DrawLineInstr) {
                const len   = typeof instr.len   === 'string' ? curr_ctx[instr.len]   : instr.len;
                const phi   = typeof instr.phi   === 'string' ? curr_ctx[instr.phi]   : instr.phi;
                const theta = typeof instr.theta === 'string' ? curr_ctx[instr.theta] : instr.theta;
                const color = typeof instr.color === 'string' ? curr_ctx[instr.color] : instr.color;

                const sin_theta = Math.sin(theta * Math.PI / 180);
                const cos_theta = Math.cos(theta * Math.PI / 180);
                const cos_phi   = Math.cos(phi * Math.PI / 180);
                const sin_phi   = Math.sin(phi * Math.PI / 180);

                const from_pos = curr_ctx.pos;
                const to_pos = [
                    len * sin_theta * cos_phi + curr_ctx.pos[0],
                    len * sin_theta * sin_phi + curr_ctx.pos[1],
                    len * cos_theta           + curr_ctx.pos[2]
                ];

                lines.push({ from_pos, to_pos, color });
                curr_ctx.pos = to_pos;
            }
            else if (instr instanceof PushInstr) {
                if (instr.key) {
                    stack.push(curr_ctx[instr.key]);
                } else {
                    stack.push({ ...curr_ctx });
                }
            }
            else if (instr instanceof PopInstr) {
                if (instr.key) {
                    curr_ctx[instr.key] = stack.pop();
                } else {
                    curr_ctx = stack.pop();
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

    lines.forEach(({ from_pos, to_pos, color }) => {
        const points = [
            new THREE.Vector3(from_pos[0], from_pos[1], from_pos[2]),
            new THREE.Vector3(to_pos[0], to_pos[1], to_pos[2])
        ];
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const material = new THREE.LineBasicMaterial({ color });
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