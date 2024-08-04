const express = require('express');
const cors = require('cors');
const { spawn } = require('child_process');

const app = express();
app.use(cors());
const port = 3001;

let engine;

app.post('/start', (req, res) => {
    engine = spawn('engine.exe');
    // Handle engine output
    engine.stdout.on('data', (data) => {
        console.log(`Engine output: ${data}`);
    });
    res.send('Engine started');
});

app.post('/send_uci', (req, res) => {
    const uciCommand = req.body.uciCommand;
    engine.stdin.write(uciCommand + '\n');
    res.send('UCI command sent');
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});