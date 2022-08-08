/*
    보드 로직 파일
*/

class Board {
    grid;
    piece;
    next;

    reset() {
        this.grid = this.getEmptyBoard();
    }

    // 0 으로 채워진 행렬
    getEmptyBoard() {
        return Array.from(
            {length: ROWS}, () => Array(COLS).fill(0)
        );
    }

    // 해당 조각의 유효성 검사
    valid(p) {
        // every 모든 조건이 true
        return p.shape.every((row, dy) => {
            // p.x , p.y 는 moves 로 움직인 값 (+1, -1 이 적용됨, spawn 값을 이용)
            return row.every((value, dx) => {
                let x = p.x + dx; // p.x + 2차 배열 인덱스
                let y = p.y + dy; // p.y + 1차 배열 인덱스
                return (
                    value == 0 ||
                    (this.insideWalls(x,y) && this.notOccupied(x, y))
                );
            });
        });
    }

    // 벽 안일 경우
    // 0 <= x < COLS y <= ROWS
    insideWalls (x, y) {
        return x >= 0 && x < COLS && y <= ROWS
    }

    // 겹치지 않을 경우
    // 다음 라인이 있으며 이동되는 값이 다 0일 경우
    notOccupied (x, y) {
        return this.grid[y] && this.grid[y][x] === 0;
    }

    // 테트로미노 회전
    rotate (p){
        // 불변성을 위해 JSON 으로 복사
        let clone = JSON.parse(JSON.stringify(p));

        for (let y = 0; y < clone.shape.length; ++y) {
            for (let x = 0; x < y; ++x) {
                [clone.shape[x][y], clone.shape[y][x]] =
                    [clone.shape[y][x], clone.shape[x][y]];
            }
        }

        // 행을 반대로
        clone.shape.forEach(row => row.reverse());
        return clone;
    }

    // valid 조건이 성립하지 않은 경우에 실행인데
    // 바닥일 떄만 실행되게 해야함
    freeze(){
        this.piece.shape.forEach((row, y)=>{
            row.forEach((value,x)=>{
                if(value > 0){
                    this.grid[y+this.piece.y][x+this.piece.x] = value;
                }
            })
        })
        this.clearLines()
    }

    drawBoard(){
        this.grid.forEach((row,y)=>{
            row.forEach((value, x)=>{
                if (value > 0 ){
                    ctx.fillStyle = COLORS[value-1];
                    ctx.fillRect(x, y, 1, 1)
                }
            })
        })
    }

    // 다 보이게
    draw() {
        this.piece.draw();
        this.drawBoard();
    }

    // 한 라인이 찬 경우
    clearLines(){
        let lines = 0;
        this.grid.forEach((row,y)=>{
            // 모든 값이 1보다 큰 경우
            if(row.every(value =>  value > 0)){
                // 해당 행을 삭제 후 맨 위에 추가
                lines++;
                this.grid.splice(y,1);
                this.grid.unshift(Array(COLS).fill(0))
            }
        })
        if (lines > 0){
            account.score += (account.level +1 ) * this.getLineClearPoints(lines);
            account.lines += lines;

            // 다음 레벨 도달
            if (account.lines >= LINESP_PER_LEVEL){
                account.level++;
                account.lines -= LINESP_PER_LEVEL;
                level = LEVEL[account.level];

            }
        }

    }

    // 라인 지운 만큼 점수
    getLineClearPoints(lines){
        return lines === 1 ? POINTS.SINGLE :
        lines === 2 ? POINTS.DOUBLE :
        lines === 3 ? POINTS.TRIPLE :
        lines === 4 ? POINTS.TETRIS : 0
    }
}
