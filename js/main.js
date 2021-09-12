let clientX = 100;
let clientY = 100;
const innerCursor = document.querySelector(".cursor--small");

var rellax = new Rellax('.rellax');

const initCursor = () => {
    document.addEventListener("mousemove", e => {
        clientX = e.clientX;
        clientY = e.clientY;
    });
    const render = () => {
        innerCursor.style.transform = `translate(${clientX}px, ${clientY}px)`;
        requestAnimationFrame(render);
    };
    requestAnimationFrame(render);
};

initCursor();

let lastX = 0;
let lastY = 0;
let isStuck = false;
let showCursor = false;
let group, stuckX, stuckY, fillOuterCursor;
let radius = 20;

const initCanvas = () => {
    const canvas = document.querySelector(".cursor--canvas");
    const shapeBounds = {
        width: 75,
        height: 75
    };
    paper.setup(canvas);
    const strokeColor = "rgba(0, 0, 0, 0.5)";
    const strokeWidth = 1;
    const segments = 8;

    const noiseScale = 150;
    const noiseRange = 4;
    let isNoisy = true;

    const polygon = new paper.Path.RegularPolygon(
        new paper.Point(0, 0),
        segments,
        radius
    );
    polygon.strokeColor = strokeColor;
    polygon.strokeWidth = strokeWidth;
    polygon.smooth();
    group = new paper.Group([polygon]);
    group.applyMatrix = false;

    const noiseObjects = polygon.segments.map(() => new SimplexNoise());
    let bigCoordinates = [];

    const lerp = (a, b, n) => {
        return (1 - n) * a + n * b;
    };

    const map = (value, in_min, in_max, out_min, out_max) => {
        return (
            ((value - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min
        );
    };
    paper.view.onFrame = event => {
        lastX = lerp(lastX, clientX, 0.2);
        lastY = lerp(lastY, clientY, 0.2);
        group.position = new paper.Point(lastX, lastY);
    }
}

initCanvas();
const magneticBtns = document.querySelectorAll('.magnetic-btn')
const magneticEffect = function (e) {
    const {
        offsetX: x,
        offsetY: y
    } = e
    const {
        offsetWidth: width,
        offsetHeight: height
    } = this

    const moveArea = 50
    const xMove = (x / width) * (moveArea * 2) - moveArea
    const yMove = (y / height) * (moveArea * 2) - moveArea

    this.style.transform = `translate(${xMove}px, ${yMove}px)`

    if (e.type === 'mouseleave') this.style.transform = ''
}

magneticBtns.forEach((magneticBtn) =>
    magneticBtn.addEventListener('mousemove', magneticEffect)
)

magneticBtns.forEach((magneticBtn) =>
    magneticBtn.addEventListener('mouseleave', magneticEffect)
)