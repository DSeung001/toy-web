/*
    constant : 끊임없는, 거듭되는 => 거듭 사용되는 값
    게임 설정과 규칙을 정의
*/

// 상수 정의
const COLS = 10;
const ROWS = 20;
const BLOCK_SIZE = 30;

// object 는 불변이 아니므로 freeze 가 필수
// const object 가 작동하게 하려면 Strict mode 가 필수
const KEY = {
    LEFT: 37,
    RIGHT: 39,
    UP: 38,
    DOWN: 40,
    SPACE: 32,
}

Object.freeze(KEY)

// 조각 색
const COLORS = [
    'cyan',
    'blue',
    'orange',
    'yellow',
    'green',
    'purple',
    'red'
]

// 테트로미노 모향
const SHAPES = [
    [
        [1, 1, 1, 1],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ],
    [
        [2, 0, 0],
        [2, 2, 2],
        [0, 0, 0]
    ],
    [
        [3, 3, 3],
        [3, 0, 0],
        [0, 0, 0],

    ],
    [
        [4, 4],
        [4, 4],
    ],
    [
        [5, 5, 0],
        [0, 5, 5],
        [0, 0, 0]
    ],
    [
        [0, 6, 6],
        [6, 6, 0],
        [0, 0, 0]
    ],
    [
        [7, 7, 7],
        [0, 7, 0],
        [0, 0, 0]
    ],
]

const POINTS = {
    SINGLE: 100,
    DOUBLE: 300,
    TRIPLE: 500,
    TETRIS: 800,
    SOFT_DROP: 1,
    HARD_DROP: 2,
}
Object.freeze(POINTS);

const LINESP_PER_LEVEL = 1

const LEVEL = {
    0 : 800,
    1 : 720,
    2 : 640,
    3 : 570,
    4 : 490,
    5 : 410,
    6 : 350,
    7 : 290,
    8 : 240,
    9 : 190,
}

