import Shape from "./Shape";
import Vector from "./Vector";

export default class circle extends Shape {
    radius : number;

    constructor (position : Vector, radius : number){
        super(position);
        this.radius = radius;
    }

    update(delta: number){

    }

    render(context: CanvasRenderingContext2D){
        context.beginPath();
        context.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
        context.fill();
    }
}