"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Vector_1 = require("./Vector");
const Circle_1 = require("./Circle");
class App {
    constructor() {
        this.delta = 0;
        this.shapes = [];
        this.frameRequest = () => {
            this.frameRequestHandle = window.requestAnimationFrame(this.frameRequest);
            const currentTime = Date.now();
            this.delta = (currentTime - this.startTime) * 0.001;
            this.startTime = currentTime;
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
            for (let i = 0; i < this.shapes.length; i++) {
                this.shapes[i].update(this.delta);
                this.shapes[i].render(this.context);
            }
        };
        this.canvas = document.createElement('canvas');
        this.context = this.canvas.getContext('2d');
        this.startTime = Date.now();
        this.frameRequestHandle = window.requestAnimationFrame(this.frameRequest);
        document.body.appendChild(this.canvas);
        this.shapes.push(new Circle_1.default(new Vector_1.default(100, 100), 10));
    }
}
if (typeof window !== 'undefined') {
    window.addEventListener('load', () => {
        new App();
    });
}
