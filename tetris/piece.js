/*
    테트리스 조각 로직
*/


class Piece {
    x;
    y;
    color;
    shape;
    ctx;

    constructor(ctx) {
        this.ctx = ctx;
        this.spawn();
    }

    spawn() {
        // 스폰 값 수정
        this.typeId = this.randomizeTetrominoType(COLORS.length -1)
        this.color = COLORS[this.typeId]
        this.shape = SHAPES[this.typeId]
        // Stating position => 최소 x 값
        this.x = 3
        this.y = 0;
    }

    // 셀 값이 0 보다 크면 칠한다
    draw() {
        this.ctx.fillStyle = this.color;
        this.shape.forEach((row, y) =>{
            row.forEach((value, x)=>{
                // this.x , this.y 는 shape 의 왼쪽부터의 좌표
                // shape 안에 있는 블록 좌표에 x, y를 더한다
                if (value > 0){
                    this.ctx.fillRect(this.x + x, this.y + y, 1,1)
                }
            })
        })
    }

    // x, y, shape 리셋
    move(p){
        this.x = p.x;
        this.y = p.y;
        this.shape = p.shape;
    }

    // 랜덤 조각 선택
    randomizeTetrominoType(noOfTypes){
        return Math.floor(Math.random() * noOfTypes)
    }
}