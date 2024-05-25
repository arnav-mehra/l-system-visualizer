import * as THREE from 'three';
import { Draw, DrawLineInstr, PopInstr, PushInstr, SetInstr } from './dsl';

const X_AXIS = new THREE.Vector3(1, 0, 0);
const Y_AXIS = new THREE.Vector3(0, 1, 0);
const Z_AXIS = new THREE.Vector3(0, 0, 1);

export const getNext = (str, rules) => {
    let res = "";
    for (const ch of str) {
        res += rules[ch] ? rules[ch] : ch;
    }
    return res;
};

/**
 * @param {string} str
 * @param {Draw} draw_info
*/
export const getTurtleLines = (str, draw_info) => {
    let lines = [];

    let vars = {
        x: 0, y: 0, z: 0,
        yaw: 0, pitch: 0, roll: 0,
        ...draw_info.vars
    };
    let stack = [];

    for (const ch of str) {
        if (!draw_info.instrs[ch]) continue;

        for (const instr of draw_info.instrs[ch]) {
            if (instr instanceof SetInstr) {
                vars[instr.set_key] = instr.run(vars);
            }
            else if (instr instanceof DrawLineInstr) {
                const len = typeof instr.len === 'string' ? vars[instr.len] : instr.len;
                const color = typeof instr.color === 'string' ? vars[instr.color] : instr.color;

                const x_rot = new THREE.Matrix4().makeRotationX(vars.yaw * Math.PI / 180);
                const y_rot = new THREE.Matrix4().makeRotationY(vars.pitch * Math.PI / 180);
                const z_rot = new THREE.Matrix4().makeRotationZ(vars.roll * Math.PI / 180);
                const t = x_rot.multiply(y_rot).multiply(z_rot);
                const new_dir = new THREE.Vector4(0, 0, 1, 0).applyMatrix4(t);

                const from_pos = new THREE.Vector3(
                    vars.x, vars.y, vars.z
                );
                const to_pos = new THREE.Vector3(
                    len * new_dir.x + vars.x,
                    len * new_dir.y + vars.y,
                    len * new_dir.z + vars.z
                );

                lines.push({ from_pos, to_pos, color });

                vars.x = to_pos.x;
                vars.y = to_pos.y;
                vars.z = to_pos.z;
            }
            else if (instr instanceof PushInstr) {
                if (instr.key) {
                    stack.push(vars[instr.key]);
                } else {
                    stack.push({ ...vars });
                }
            }
            else if (instr instanceof PopInstr) {
                if (instr.key) {
                    vars[instr.key] = stack.pop();
                } else {
                    vars = stack.pop();
                }
            }
        }
    }

    return lines;
};

export const initScene = (lines, mag) => {
    const group = new THREE.Group();

    lines.forEach(({ from_pos, to_pos, color }) => {
        const geometry = new THREE.BufferGeometry().setFromPoints([from_pos, to_pos]);
        const material = new THREE.LineBasicMaterial({ color });
        const line = new THREE.Line(geometry, material);
        group.add(line);
    });

    const bbox = new THREE.Box3().setFromObject(group);
    const size = new THREE.Vector3();
    bbox.getSize(size);
    const max_dim = Math.max(size.x, size.y, size.z);
    group.scale.setScalar(mag / max_dim);

    const bbox_ = new THREE.Box3().setFromObject(group);
    const center = new THREE.Vector3();
    bbox_.getCenter(center);
    group.position.set(-center.x, -center.y, -center.z);

    return new THREE.Scene().add(group);
};

export const setCameraAngle = (camera, angle) => {
    const angle_rad = angle * Math.PI / 180;
    camera.position.set(Math.sin(angle_rad) * 10, Math.cos(angle_rad) * 10, 0);
    camera.lookAt(new THREE.Vector3(0, 0, 0));
    camera.up = new THREE.Vector3(0, 0, 1);
};

export const createCamera = (renderer, angle) => {
    const size = new THREE.Vector2();
    renderer.getSize(size);

    const camera = new THREE.PerspectiveCamera(
        75, size.width / size.height, 0.1, 1000
    );
    setCameraAngle(camera, angle);
    return camera;
};