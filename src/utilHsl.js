function hsla(...color) {
    let c = JSON.parse(JSON.stringify(color)).flat();
    c = c.length == 1 ? c[0] : c
    let clr = parseHsl(c);
    return `hsla(${clr[0]}deg,${clr[1]}%,${clr[2]}%,${clr[3]})`;
}
function rgba(...color) {
    let c = JSON.parse(JSON.stringify(color)).flat();
    if (typeof c[0] == "object") {
        c = c[0];
    }
    let clr = parseRgb(c);
    return `rgba(${clr[0]},${clr[1]},${clr[2]},${clr[3]})`;
}
function type(...color) {
    let clr = [...color].flat();
    clr = clr.length == 1 ? clr[0] : clr;
    if (
        clr.hasOwnProperty("r") ||
        (typeof clr == "string" && (clr.indexOf("rgb") != -1 || clr.length < 10))
    ) {
        return "rgb";
    } else return "hsl";
}
function parseColor(...color) {
    let clr = [...color].flat();
    clr = clr.length == 1 ? clr[0] : clr;
    if (
        clr.hasOwnProperty("r") ||
        (typeof clr == "string" && (clr.indexOf("rgb") != -1 || clr.length < 10))
    ) {
        return parseRgb(clr);
    } else {
        return parseHsl(clr);
    }
}
function parseRgb(...color) {
    let c = JSON.parse(JSON.stringify(color)).flat();
    c = c.length == 1 ? c[0] : c
    color = c
    let r, g, b, a;
    if (typeof color == "object") {
        if (color.length) {
            color[3] = color[3] ? color[3] : 1
            return [...color];
        } else {
            r = Number(color.r) || 75;
            g = Number(color.g) || 75;
            b = Number(color.b) || 75;
            a = Number(color.a) || 1;
            return [r, g, b, a];
        }
    } else if (typeof color == "string") {
        if (color.indexOf("hsl") != -1) {
            clr = hslToRgb(color)
            return clr;
        }
        if (color.indexOf("rgb") != -1) {
            let clr = color.match(/\d+(\.\d+)?/g);
            return clr;
        } else if (color.length < 10) {
            let clr = color.match(/[a-f0-9]{1,2}/gi).map((e) => parseInt(e, 16));
            return clr;
        }
    }
}
function parseHsl(...color) {
    let c = JSON.parse(JSON.stringify(color)).flat();
    c = c.length == 1 ? c[0] : c
    color = c
    let h, s, l, a;
    if (typeof color == "object") {
        if (color.length) {
            return new Array(4).fill(1).map((e, i) => (color[i] ? Number(color[i]) : Number(e)));
        } else if (color.hasOwnProperty("r")) {
            return rgbToHsl(color)
        } else {
            h = Number(color.h) || 0;
            s = Number(color.s) || 50;
            l = Number(color.l) || 50;
            a = Number(color.a) || 1;
            return [h, s, l, a];
        }
    } else if (typeof color == "string") {
        let clr
        if (color.indexOf("rgb") != -1 || color.length < 10) {
            clr = rgbToHsl(color)
            return clr;
        }
        if (color.indexOf("hsl") != -1) {
            clr = color.match(/\d+(\.\d+)?/g).map(e => Number(e));
            return clr;
        }
    }
}
function changeHsl(color, { h, s, l, a }) {
    let clr = parseHsl(color);
    clr[0] = h || h == 0 ? h : clr[0];
    clr[1] = s || s == 0 ? s : clr[1];
    clr[2] = l || l == 0 ? l : clr[2];
    clr[3] = a || a == 0 ? a : clr[3];
    return clr;
}
function adjustHsl(color, { h = 0, s = 0, l = 0, a = 0 }) {
    let clr
    if (typeof color == "object" && color.length) {
        let c = JSON.parse(JSON.stringify(color)).flat();
        color = c.length == 1 ? c[0] : c
    }

    color = parseHsl(color)
    clr = [...color];

    clr[0] = (clr[0] + h) % 360;
    clr[1] = Math.min(Math.max(clr[1] + s, 0), 100);
    clr[2] = Math.min(Math.max(clr[2] + l, 0), 100);
    clr[3] = Math.min(Math.max(clr[3] + a, 0), 1);
    return clr;
}
function rgbToHsl(...color) {


    let clr = [...color].flat();
    if (clr.length == 1) {
        clr = parseRgb(clr[0]);
    }
    // Make r, g, and b fractions of 1
    let r = clr[0] / 255;
    let g = clr[1] / 255;
    let b = clr[2] / 255;
    let a = clr[3] || 0

    // Find greatest and smallest channel values
    let cmin = Math.min(r, g, b)
    let cmax = Math.max(r, g, b)
    let delta = cmax - cmin
    let h = 0
    let s = 0
    let l = 0


    // Calculate hue
    // No difference
    if (delta == 0)
        h = 0;
    // Red is max
    else if (cmax == r)
        h = ((g - b) / delta) % 6;
    // Green is max
    else if (cmax == g)
        h = (b - r) / delta + 2;
    // Blue is max
    else
        h = (r - g) / delta + 4;

    h = Math.round(h * 60);

    // Make negative hues positive behind 360°
    if (h < 0)
        h += 360;
    // Calculate lightness
    l = (cmax + cmin) / 2;

    // Calculate saturation
    s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

    // Multiply l and s by 100
    s = +(s * 100).toFixed(1);
    l = +(l * 100).toFixed(1);
    return [Number(h), Number(s), Number(l), Number(a)]

}
function hslToRgb(...color) {
    let clr =
        color.flat().length == 1
            ? parseHsl([...color].flat()[0])
            : [...color].flat();
    let h = clr[0];
    let s = clr[1];
    let l = clr[2];
    let a = clr[3];

    s /= 100;
    l /= 100;
    const k = (n) => (n + h / 30) % 12;
    const x = s * Math.min(l, 1 - l);
    const f = (n) =>
        l - x * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
    return [255 * f(0), 255 * f(8), 255 * f(4), a];
}
function tes() { }
export { hsla, rgba, adjustHsl, changeHsl, rgbToHsl, hslToRgb }
