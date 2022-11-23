import {Tree} from './tree.js';

class App{
    constructor (){
        // 캔버스 랜더링
        this.canvas = document.createElement('canvas');
        document.body.appendChild(this.canvas);

        // context 생성
        this.ctx = this.canvas.getContext('2d');
        // Retina 디스플레이(애플이 정의한 고화질 디스플레이어)를 위한 컨버스의 사이즈 비율 세팅, 맥북에서 작동 안함
        // this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;
        this.pixelRatio = 1;

        // 이벤트 등록
        window.addEventListener('resize', this.resize.bind(this), false);
        window.addEventListener('click', this.click.bind(this), false);

        // 현재 사이즈 적용
        this.resize();

        // 처음 화면 접속시 화면 가운데에 트리 생성
        new Tree(this.ctx, this.stageWidth/2, this.stageHeight);
    }

    // window 창 변경에 따른 이벤트
    resize() {
        // body 의 너비, 높이
        this.stageWidth = document.documentElement.clientWidth;
        this.stageHeight = document.documentElement.clientHeight

        // 디스플레이 비율에 맞춰 캔버스 사이즈 비율 조정
        this.canvas.width = this.stageWidth * this.pixelRatio;
        this.canvas.height = this.stageHeight * this.pixelRatio;

        this.ctx.scale(this.pixelRatio, this.pixelRatio);

        // 리사이즈시 캔버스 리셋
        this.ctx.clearRect(0,0, this.stageWidth, this.stageHeight);

    }

    click(event) {
        // 마우스가 클릭한 x 좌표로 트리 생성
        const {clientX} = event;
        new Tree(this.ctx, clientX, this.stageHeight);
    }
}

window.onload = () =>{
    new App();
}
