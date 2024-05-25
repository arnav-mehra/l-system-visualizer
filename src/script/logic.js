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
            // else if (instr instanceof TurnInstr) {
            //     const _yaw   = typeof instr.yaw   === 'string' ? vars[instr.yaw]   : instr.yaw;
            //     const _pitch = typeof instr.pitch === 'string' ? vars[instr.pitch] : instr.pitch;
            //     const _roll  = typeof instr.roll  === 'string' ? vars[instr.roll]  : instr.roll;
            //     const key = instr.key || "ori";

            //     vars[key] = [
            //         vars[key][0] + _yaw   * Math.PI / 180,
            //         vars[key][1] + _pitch * Math.PI / 180,
            //         vars[key][2] + _roll  * Math.PI / 180
            //     ];
            // }
            else if (instr instanceof DrawLineInstr) {
                const len   = typeof instr.len   === 'string' ? vars[instr.len]   : instr.len;
                const color = typeof instr.color === 'string' ? vars[instr.color] : instr.color;

                const x_rot = new THREE.Matrix4().makeRotationX(vars.yaw   * Math.PI / 180);
                const y_rot = new THREE.Matrix4().makeRotationY(vars.pitch * Math.PI / 180);
                const z_rot = new THREE.Matrix4().makeRotationZ(vars.roll  * Math.PI / 180);
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

let scene = null;
let anim_ref = null;
let time = 0;

export const initScene = (lines, mag) => {
    const group = new THREE.Group();

    lines.forEach(({ from_pos, to_pos, color }) => {
        const geometry = new THREE.BufferGeometry().setFromPoints([ from_pos, to_pos ]);
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

    scene = new THREE.Scene().add(group);
};

const createCamera = (renderer) => {
    const size = new THREE.Vector2();
    renderer.getSize(size);

    const camera = new THREE.PerspectiveCamera(
        75, size.width / size.height, 0.1, 1000
    );
    setCameraAngle(camera);

    return camera;
};

export const startStationary = (renderer) => {
    if (!scene) return;

    const camera = createCamera(renderer);
    setCameraAngle(camera);
    renderer.render(scene, camera);
};

const setCameraAngle = (camera) => {
    const angle = time / 150;
    camera.position.set(Math.sin(angle) * 10, Math.cos(angle) * 10, 0);
    camera.lookAt(new THREE.Vector3(0, 0, 0));
    camera.up = Z_AXIS;
}

export const startAnimation = (renderer) => {
    if (!scene || anim_ref) return;

    const camera = createCamera(renderer);

    const animate = () => {
        anim_ref = requestAnimationFrame(animate);
        setCameraAngle(camera);
        time++;
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