class SystemBuilder {
    constructor() {
        this._system = new System();
    }

    axiom(str) {
        this._system.axiom = str;
        return this;
    }

    map(key) {
        return new RuleBuilder(this, key);
    }

    get end() {
        return this;
    }
}

class RuleBuilder {
    /** @param {SystemBuilder} parent */
    constructor(parent, key) {
        this._parent = parent;
        this._key = key;
    }

    to(val) {
        this._parent._system.rules[this._key] = val;
        return this._parent;
    }
}

class DrawBuilder {
    /** @param {SystemBuilder} system */
    constructor(system) {
        this._system = system;
        this._draw = new Draw();
    }

    let(key) {
        return new VarBuilder(this, key);
    }

    on(key) {
        this._draw.instrs[key] = [];
        return new InstrsBuilder(this, key);
    }

    get end() {
        return this;
    }
}

class VarBuilder {
    /** @param {DrawBuilder} parent */
    constructor(parent, key) {
        this._parent = parent;
        this._key = key;
    }

    eq(val) {
        this._parent._draw.vars[this._key] = val;
        return this._parent;
    }
}

class InstrsBuilder {
    /** @param {DrawBuilder} parent */
    constructor(parent, key) {
        this._parent = parent;
        this._key = key;
    }

    get draw_line() {
        return new DrawLineBuilder(this._parent, this._key);
    }

    set(key) {
        return new SetBuilder(this._parent, this._key, key);
    }

    push(key) {
        return new PushBuilder(this._parent, this._key, key);
    }

    get push_all() {
        return new PushBuilder(this._parent, this._key, null);
    }

    pop(key) {
        return new PopBuilder(this._parent, this._key, key);
    }

    get pop_all() {
        return new PopBuilder(this._parent, this._key, null);
    }

    on(key) {
        return this._parent.on(key);
    }

    get end() {
        return this._parent.end;
    }
}

class DrawLineBuilder extends InstrsBuilder {
    constructor(parent, key) {
        super(parent, key);
        this._instr = new DrawLineInstr();
        this._parent._draw.instrs[key].push(this._instr);
    }

    len(val) {
        this._instr.len = val;
        return this;
    }

    color(val) {
        this._instr.color = val;
        return this;
    }
}

class SetBuilder extends InstrsBuilder {
    constructor(parent, key, instr_key) {
        super(parent, key);
        this._instr = new SetInstr(instr_key);
        this._parent._draw.instrs[key].push(this._instr);
    }

    with(new_key) {
        this._instr.add_key(new_key);
        return this;
    }

    via(val) {
        this._instr.transform = val;
        return this;
    }

    to(val) {
        const idx = this._instr.add_key(val);
        this._instr.transform = (...args) => args[idx];
        return this;
    }

    add(val) {
        const idx = this._instr.add_key(val);
        this._instr.transform = (...args) => args[0] + args[idx];
        return this;
    }

    sub(val) {
        const idx = this._instr.add_key(val);
        this._instr.transform = (...args) => args[0] - args[idx];
        return this;
    }
}

class PushBuilder extends InstrsBuilder {
    constructor(parent, key, instr_key) {
        super(parent, key);
        this._instr = new PushInstr(instr_key);
        this._parent._draw.instrs[key]?.push(this._instr);
    }
}

class PopBuilder extends InstrsBuilder {
    constructor(parent, key, instr_key) {
        super(parent, key);
        this._instr = new PopInstr(instr_key);
        this._parent._draw.instrs[key]?.push(this._instr);
    }
}

////

export class System {
    constructor() {
        this.axiom = "";
        this.rules = {};
    }
}

export class Draw {
    constructor() {
        /** @type {Object<string, any>} */
        this.vars = {};
        /** @type {Object<string, Instr[]>} */
        this.instrs = {};
    }
}

export class Instr {}

export class DrawLineInstr extends Instr {
    constructor() {
        super();
        this.len = 0.1;
        this.color = 0x00ff00;
    }
}

export class SetInstr extends Instr {
    constructor(key) {
        super();
        this.arg_keys = [ key ];
        this.set_key = key; 
        this.transform = x => x;
    }

    add_key(key) {
        this.arg_keys.push(key);
        return this.arg_keys.length - 1;
    }

    run(vars) {
        const args = this.arg_keys.map(x =>
            typeof x === 'string' ? vars[x] : x
        );
        return this.transform(...args);
    }
}

export class PopInstr extends Instr {
    constructor(key) {
        super();
        this.key = key;
    }
}

export class PushInstr extends Instr {
    constructor(key) {
        super();
        this.key = key;
    }
}

////

/** @returns {([System, Draw] | null)} */
export const evalCode = (system_code, draw_code) => {
    try {
        const make_system = () => new SystemBuilder();
        const draw = (system) => new DrawBuilder(system);
        console.log({ make_system, draw });

        const code = `() => {
            const system_builder = make_system().${system_code}.end;
            const drawing_builder = draw(system_builder._system).${draw_code}.end;
            return [ system_builder._system, drawing_builder._draw ];
        }`;

        return eval(code)();
    } catch (err) {
        alert(err);
        return null;
    }
};