const FRACTAL_TREE_CODE = {
system:
`axiom("0")
.map("0").to("1[0]0")
.map("1").to("11")`,
draw:
`let("len").eq(0.05)
.on("0")
    .draw_line.len("len")
.on("1")
    .draw_line.len("len")
.on("[")
    .push_all
    .set("pitch").add(45)
.on("]")
    .pop_all
    .set("pitch").add(-45)`
};

const KOCH_CURVE_CODE = {
system:
`axiom("F")
.map("F").to("F+F-F-F+F")`,
draw:
`let("len").eq(0.05)
.on("F")
    .draw_line.len("len")
.on("-")
    .set("pitch").add(90)
.on("+")
    .set("pitch").add(-90)`
};

const SIERPINSKI_TRI_CODE = {
system:
`axiom("F-G-G")
.map("F").to("F-G+F+G-F")
.map("G").to("GG")`,
draw:
`let("len").eq(0.05)
.on("F")
    .draw_line.len("len")
.on("G")
    .draw_line.len("len")
.on("-")
    .set("pitch").add(-120)
.on("+")
    .set("pitch").add(120)`
};

const FRACTAL_PLANT_CODE = {
system:
`axiom("X")
.map("X").to("F+[[X]-X]-F[-FX]+X")
.map("F").to("FF")`,
draw:
`let("len").eq(0.05)
.let("theta").eq(0.0)
.let("phi").eq(0.0)
.on("F")
    .draw_line.len("len")
.on("[")
    .push_all
.on("]")
    .pop_all
.on("-")
    .set("pitch").add(-25)
    .set("roll").add(10)
.on("+")
    .set("pitch").add(25)
    .set("roll").add(10)`
};

const PLANT_3D_CODE = {
system:
`axiom("F")
.map("F").to("F [ & + F] F [ - > F][- > F][& F]")`,
draw:
`let("len").eq(0.05)
.let("a").eq(28)
.let("na").eq(-28)
.on("F").draw_line.len("len")
.on("[").push_all
.on("]").pop_all
.on("+").set("yaw").add(28)
.on("-").set("yaw").add(-28)
.on("&").set("pitch").add(28)
.on("^").set("pitch").add(-28)
.on("<").set("roll").add(28)
.on(">").set("roll").add(-28)`
};

export const DEFAULT_LIST = [
    {
        label: "2D Tree",
        code: FRACTAL_TREE_CODE
    },
    {
        label: "Koch Curve",
        code: KOCH_CURVE_CODE
    },
    {
        label: "Sierpinski Triangle",
        code: SIERPINSKI_TRI_CODE
    },
    {
        label: "2D Plant",
        code: FRACTAL_PLANT_CODE
    },
    {
        label: "3D Plant",
        code: PLANT_3D_CODE
    }
];