const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const PORT = process.env.PORT || 4000;

const app = express();

app.use(cors());

const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: '*', 
        methods: ['GET', 'POST']
    }
});

io.on('connection', (socket) => {
    console.log('Novo cliente conectado');

    const intervalId = setInterval(() => {
        const data = {
            potentiometerPosition: Math.floor(Math.random() * 11),
            temperature: Math.floor(Math.random() * 50) + 20,
            voltage: (Math.random() * 5 + 10).toFixed(2)
        };
        socket.emit('sensorData', data);
    }, 1000);

    socket.on('disconnect', () => {
        console.log('Cliente desconectado');
        clearInterval(intervalId);
    });
});

server.listen(PORT, () => {
    console.log(`Servidor Socket.IO rodando na porta ${PORT}`);
});
