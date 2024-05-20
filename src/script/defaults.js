export const FRACTAL_TREE_CODE = {
system:
`axiom("0")
.map("0").to("1[0]0")
.map("1").to("11")`,
draw:
`let("len").eq(0.05)
.let("theta").eq(0.0)
.let("phi").eq(0.0)
.on("0")
    .draw_line.len("len").theta("theta").phi("phi")
.on("1")
    .draw_line.len("len").theta("theta").phi("phi")
.on("[")
    .push_all
    .set("theta").with(x => x + 45)
.on("]")
    .pop_all
    .set("theta").with(x => x - 45)`
};

export const KOCH_CURVE_CODE = {
system:
`axiom("F")
.map("F").to("F+F-F-F+F")`,
draw:
`let("len").eq(0.05)
.let("theta").eq(270.0)
.let("phi").eq(0.0)
.on("F")
    .draw_line.len("len").theta("theta").phi("phi")
.on("-")
    .set("theta").with(x => x - 90)
.on("+")
    .set("theta").with(x => x + 90)`
};

export const SIERPINSKI_TRI_CODE = {
system:
`axiom("F-G-G")
.map("F").to("F-G+F+G-F")
.map("G").to("GG")`,
draw:
`let("len").eq(0.05)
.let("theta").eq(0.0)
.let("phi").eq(0.0)
.on("F")
    .draw_line.len("len").theta("theta").phi("phi")
.on("G")
    .draw_line.len("len").theta("theta").phi("phi")
.on("-")
    .set("theta").with(x => x - 120)
.on("+")
    .set("theta").with(x => x + 120)`
};

export const FRACTAL_PLANT_CODE = {
system:
`axiom("X")
.map("X").to("F+[[X]-X]-F[-FX]+X")
.map("F").to("FF")`,
draw:
`let("len").eq(0.05)
.let("theta").eq(0.0)
.let("phi").eq(0.0)
.on("F")
    .draw_line.len("len").theta("theta").phi("phi")
.on("[")
    .push_all
.on("]")
    .pop_all
.on("-")
    .set("theta").with(x => x - 25)
    .set("phi").with(x => x + 10)
.on("+")
    .set("theta").with(x => x + 25)
    .set("phi").with(x => x + 10)`
};