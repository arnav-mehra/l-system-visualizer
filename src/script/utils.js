export const zip = (a, b) => (
    a.map((k, i) => [k, b[i]])
);

export const eval_safe = (str) => {
    try {
        const res = eval(str);
        return {
            ok: true,
            res
        }
    } catch (err) {
        return {
            ok: false,
            res: "Unable to evaluate string: " + str
        }
    }
};