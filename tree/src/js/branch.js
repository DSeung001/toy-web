export class Branch {
    constructor(startX, startY, endX, endY, cntDepth, depth, baseColor) {
        this.startX = startX;
        this.startY = startY;
        this.endX = endX;
        this.endY = endY;
        this.baseColor = baseColor;
        this.frame =  10 - cntDepth < 1 ? 1 : 10 - cntDepth;
        this.lineWidth = depth - cntDepth;
        this.cntFrame = 0; // 현재 프레임
        this.cntDepth = cntDepth; // 현재 깊이
        this.depth = depth; // 최대 깊이

        // 가지의 길이를 frame으로 나누어 구간별 gap을 구함
        this.gapX = (this.endX - this.startX) / this.frame;
        this.gapY = (this.endY - this.startY) / this.frame;

        // 그리기 애니메이션 시작 지점
        this.currentX = this.startX;
        this.currentY = this.startY;

        let opacity = [255,200,160,120,80,40,0];
        let colorDepth = 0;

        if (cntDepth == 0) {
            colorDepth = 0
        } else if (cntDepth < 3) {
            colorDepth = 1;
        } else if (cntDepth < 5) {
            colorDepth = 2;
        } else if (cntDepth < 7) {
            colorDepth = 3;
        } else if (cntDepth < 7) {
            colorDepth = 4;
        } else if (cntDepth < 10) {
            colorDepth = 5;
        } else {
            colorDepth = 6;
        }

        this.color = 'rgb('+this.baseColor.replace(/0/g, opacity[colorDepth])+')';
    }

    draw(ctx) {
        // cntFrame 과 frame 이 같다면 애니메이션 중지
        if (this.cntFrame === this.frame) return true;

        ctx.beginPath();

        // 구간별 길이를 더해서
        this.currentX += this.gapX;
        this.currentY += this.gapY;

        if (this.lineWidth < 3) {
            ctx.lineWidth = this.lineWidth * 0.3;
        } else if (this.lineWidth < 5){
            ctx.lineWidth = this.lineWidth * 0.5;
        } else if (this.lineWidth < 7){
            ctx.lineWidth = this.lineWidth * 0.7;
        } else if (this.lineWidth < 10){
            ctx.lineWidth = this.lineWidth * 0.9;
        } else if (this.lineWidth < 12){
            ctx.lineWidth = this.lineWidth * 1.1;
        } else {
            ctx.lineWidth = this.lineWidth * 1.3;
        }

        ctx.moveTo(this.startX, this.startY); // 선 시작 지점
        ctx.lineTo(this.currentX, this.currentY); // 선 끝 지점

        if (this.cntDepth != this.depth -1){
            ctx.fillStyle = this.color;
            ctx.strokeStyle = this.color;
            ctx.stroke();
        }else {
            ctx.ellipse(this.currentX, this.currentY, this.random(2,3), this.random(4,6), this.random(0,180), 0, Math.PI*2);
            ctx.fill();
        }

        ctx.closePath();

        this.cntFrame++;
        // 다 안그렸으면 false
        return false;
    }

    random(min, max){
        return min + Math.floor(Math.random() * (max - min + 1));
    }
}