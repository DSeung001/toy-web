export class Branch {
    constructor(startX, startY, endX, endY, depth, cntDepth) {
        this.startX = startX;
        this.startY = startY;
        this.endX = endX;
        this.endY = endY;
        this.color = '#000'
        this.frame =  10 - depth < 1 ? 1 : 10 - depth;
        this.lineWidth = cntDepth - depth;

        this.cntFrame = 0; // 현재 프레임

        // 가지의 길이를 frame으로 나누어 구간별 gap을 구함
        this.gapX = (this.endX - this.startX) / this.frame;
        this.gapY = (this.endY - this.startY) / this.frame;

        // 그리기 애니메이션 시작 지점
        this.currentX = this.startX;
        this.currentY = this.startY;
    }

    draw(ctx) {
        // cntFrame 과 frame 이 같다면 애니메이션 중지
        if (this.cntFrame === this.frame) return true;

        ctx.beginPath();

        // 구간별 길이를 더해서
        this.currentX += this.gapX;
        this.currentY += this.gapY;

        ctx.moveTo(this.startX, this.startY); // 선 시작 지점
        ctx.lineTo(this.currentX, this.currentY); // 선 끝 지점

        if (this.lineWidth < 3){
            ctx.lineWidth = 0.5
        } else if (this.lineWidth < 7){
            ctx.lineWidth = this.lineWidth * 0.7;
        } else if (this.lineWidth < 10){
            ctx.lineWidth = this.lineWidth * 0.9;
        } else {
            ctx.lineWidth = this.lineWidth;
        }

        ctx.fillStyle = this.color;
        ctx.strokeStyle = this.color;

        ctx.stroke();
        ctx.closePath();

        this.cntFrame++;

        // 다 안그렸으면 false
        return false;
    }
}