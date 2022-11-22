import { Branch } from "./branch.js";

export class Tree {
    // context, x 좌표, y 좌표
    constructor(ctx, posX, posY){
        this.ctx = ctx;
        this.posX = posX
        this.posY = posY;
        this.branches = [];
        this.depth = this.random(9,11); // 나무가지 갯수
        this.cntDepth = 0; // 현재 depth
        this.animation = null; // 현재 애니메이션
        this.init();
    }

    init() {
        // depth 만큼 나무가지 배열 초기화
        for (let i = 0; i < this.depth; i++){
            this.branches.push([]);
        }

        // 나무 색 랜덤
        let color = ['255,0,0', '0,255,0', '0,0,255', '255,255,0', '255,0,255', '0,255,255'];
        this.baseColor = color[this.random(0, color.length)];

        // 시작 각도는 -90도로 해서 나무 기둥이 자라도록함, 시작 depth = 0
        this.createBranch(this.posX, this.posY, -90,0);
        // 나무 생성 애니메이션화
        this.draw(this.ctx);
    }

    createBranch(startX, startY, angle, depth){
        if (depth  == this.depth) return;

        // 가지의 길이를 랜덤으로
        const len = depth === 0 ? this.random(11, 14) : this.random(0, 12);

        // depth 를 역으로 곱해줘 점차 짧게
        const endX = startX + this.cos(angle) * len * (this.depth - depth);
        const endY = startY + this.sin(angle) * len * (this.depth - depth);

        // depth 에 해당하는 위치에 배열 추가
        // this.depth - depth = 선 두께를 점차 가늘게
        this.branches[depth].push(new Branch(startX, startY, endX, endY, depth, this.depth, this.baseColor));

        // 다음 나무가지 생성
        this.createBranch(endX, endY, angle - this.random(15, 22), depth+1);
        this.createBranch(endX, endY, angle + this.random(15, 25), depth+1);
    }

    draw() {
        // 다 그렸을 경우 requestAnimationFrame 중단해 메모리 누수 줄임
        if (this.cntDepth === this.depth){
            cancelAnimationFrame(this.animate);
        }

        // 나무 그리기 루프
        for (let i = this.cntDepth; i < this.branches.length; i++){
            let pass = true;
            for (let j = 0; j < this.branches[i].length; j++){
                // 생성해둔 branch 에서 그리기 작업 실행
                pass = this.branches[i][j].draw(this.ctx);
            }
            if(!pass) break
            this.cntDepth++;
        }

        // requestAnimationFrame
        // draw 를 프레임화하여 애니메이션으로 만들어 줌
        this.animation = requestAnimationFrame(this.draw.bind(this));
    }

    // 각도 함수
    cos(angle){
        return Math.cos(this.degToRad(angle));
    }
    sin(angle){
        return Math.sin(this.degToRad(angle));
    }
    degToRad(angle){
        return (angle / 180.0) * Math.PI;
    }
    random(min, max){
        return min + Math.floor(Math.random() * (max - min + 1));
    }
}