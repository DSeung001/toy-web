const express = require('express')
const app = express();
const http = require('http');
const server = http.createServer(app);
// socket io 인스턴스 초기화
const {Server} = require('socket.io');
const io = new Server(server);

/* 라우팅 */
app.get('/', (req,res)=>{
    // res.send('<h1>Hello world</h1>');
    res.sendFile(__dirname+'/index.html');
});

// io에 connection 이벤트
io.on('connection', (socket)=>{
    // io 접속시
    // console.log('a user connected')

    // emit(chat message) 이벤트 선언
    socket.on('chat message', (msg) =>{
        // console.log('message : '+ msg);

        // 서버에서 emit(chat message) 이벤트 호출
        io.emit('chat message', msg);
    });
});



// http 서버 300포트로 수신
server.listen(3000, ()=>{
    console.log('listening on *:3000');
});