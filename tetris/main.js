/*
    게임은 초기화와 종료 로직
    canvas element 및 canvas element 의 2d context 를 얻고
    constants 에서 정의한 상수로 크기 설정
*/
const canvas = document.getElementById("board");
const ctx = canvas.getContext('2d')

let board = new Board();
let level = 1000;
let animateId = null;

// context 의 블록 배율을 지정
ctx.canvas.width = COLS * BLOCK_SIZE;
ctx.canvas.height = ROWS * BLOCK_SIZE;
ctx.scale(BLOCK_SIZE, BLOCK_SIZE)

const canvasNext = document.getElementById("next")
const ctxNext = canvasNext.getContext('2d')

ctxNext.canvas.width = 4 * BLOCK_SIZE;
ctxNext.canvas.height = 4 * BLOCK_SIZE;
ctxNext.scale(BLOCK_SIZE, BLOCK_SIZE);


let MOVES = {
    [KEY.UP] : p => (board.rotate(p)),
    [KEY.LEFT]: p => ({...p, x: p.x - 1}),
    [KEY.RIGHT]: p => ({...p, x: p.x + 1}),
    [KEY.DOWN]: p => ({...p, y: p.y + 1}),
    [KEY.SPACE]: p => ({...p, y: p.y + 1})
}

let accountValues = {
    score : 0,
    lines : 0,
    level : 0
}

// accountValues proxy 객체 선언, accountValues 변경시 자동으로 Dom 업데이트
let account = new Proxy(accountValues, {
    set : (target, key, value) => {
        target[key] = value;
        updateAccount(key, value);
        return true;
    }
})

function play() {
    let piece = new Piece(ctx)
    board.piece = piece

    resetGame()

    piece.draw()
    addEventListener()

    clearInterval(animateId)
    animateId = setInterval(animate, level)
}

function resetGame(){
    account.score = 0;
    account.lines = 0 ;
    account.level = 0;
    board.reset()
}

function updateAccount(key ,value){
    let element = document.getElementById(key);
    if(element){
        element.textContent = value
    }
}

function addEventListener(){
    document.removeEventListener('keydown', handleKeyPress);
    document.addEventListener('keydown',handleKeyPress);
}


function handleKeyPress(event){
    let keyCode = event.keyCode
    if (MOVES[keyCode]) {
        // 이벤트 버블링을 막음
        event.preventDefault();
        let p = MOVES[keyCode](board.piece);

        if(keyCode === KEY.SPACE){
            while (board.valid(p)) {
                account.score += POINTS.HARD_DROP;
                board.piece.move(p)
                p = MOVES[keyCode](board.piece);
            }
        } else {
            if(keyCode === KEY.DOWN){
                account.score += POINTS.SOFT_DROP;
            }
            checkMove(p)
        }
    }
}

function animate(){
    let p = board.piece;
    checkMove({...p, y: p.y+1});
}

// 왜 딜레이 생기냐
function checkMove(p){
    if (board.valid(p)) {
        // 이동이 가능하면 조각을 이동
        board.piece.move(p)
        // 이전 ctx 변경사항 지우고 그리기
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        board.draw()
    }else{
        if(board.piece.y === 0){
            gameOver();
            return;
        }

        board.freeze();
        board.drawBoard();

        // 다음 꺼 실행하기 전에
        let piece = new Piece(ctx)

        board.piece = piece
        board.draw()
    }
}

function gameOver(){
    cancelAnimationFrame(animateId);
    ctx.fillStyle = 'black';
    ctx.fillRect(1, 3, 8, 1.2);
    ctx.font = '1px Arial';
    ctx.fillStyle = 'red';
    ctx.fillText('GAME OVER', 1.8, 4);
}