"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Shape_1 = require("./Shape");
class circle extends Shape_1.default {
    constructor(position, radius) {
        super(position);
        this.radius = radius;
    }
    update(delta) {
    }
    render(context) {
        context.beginPath();
        context.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
        context.fill();
    }
}
exports.default = circle;
