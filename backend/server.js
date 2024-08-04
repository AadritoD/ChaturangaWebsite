// Website/backend/server.js

const express = require('express');
const Chess = require('chess.js').Chess;
const cors = require('cors'); // Add this line

const app = express();
const port = 3001; // You can choose any available port

app.use(cors()); // Add this line

app.get('/random-move', (req, res) => {
  const chess = new Chess(req.query.fen); // Get the current game state from the query parameter
  const moves = chess.moves({ verbose: true });
  const move = moves[Math.floor(Math.random() * moves.length)];
  if (moves.length > 0) {
    chess.move(move.san);
    res.json({ fen: chess.fen(), move: { from: move.from, to: move.to } });
  } else {
    res.status(400).json({ error: 'No moves available' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
