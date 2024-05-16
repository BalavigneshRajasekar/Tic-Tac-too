import React, { useReducer } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import "./App.css";
const initialState = {
  board: Array(9).fill(null),
  XisNext: true,
  winner: null,
  openDialogue: false,
};

//This reducer handle the state changes based on the dispatch
function reducer(state, Action) {
  switch (Action.type) {
    case "Make-move":
      if (state.board[Action.payload] || state.winner) {
        // This will handle  not able to click on the added value and after win
        return state;
      }
      const boardCopy = [...state.board];
      boardCopy[Action.payload] = state.XisNext ? "X" : "O";
      const winner = findWinner(boardCopy);
      const isBoardFull = boardCopy.every((cell) => cell !== null);

      return {
        ...state,
        board: boardCopy,
        XisNext: !state.XisNext,
        winner: winner,
        openDialogue: !!winner || isBoardFull,
      };

    case "restart":
      return {
        ...initialState,
      };
  }
}

//This function calulates the winner
function findWinner(board) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], //Rows
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], //Columns
    [0, 4, 8],
    [2, 4, 6], //Crossings
  ];

  for (let line of lines) {
    const [a, b, c] = line;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      console.log(board[a]);
      return board[a];
    }
  }
  return null;
}
function TicTacToo() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div className="game">
      <Typography variant="h4" color="primary">
        X is player 1
      </Typography>
      <Typography variant="h4" color="secondary">
        O is player 2
      </Typography>
      <Grid
        container
        spacing={2}
        justifyContent="center"
        style={{ maxWidth: 400, marginTop: 10 }}
      >
        {state.board.map((cell, index) => (
          <Grid item xs={4} key={index}>
            <Paper
              className="cell"
              elevation={2}
              onClick={() => dispatch({ type: "Make-move", payload: index })}
            >
              {cell}
            </Paper>
          </Grid>
        ))}
      </Grid>
      <Button
        variant="contained"
        sx={{ marginTop: 5 }}
        onClick={() => dispatch({ type: "restart" })}
      >
        Reset
      </Button>

      <Dialog open={state.openDialogue}>
        <DialogTitle>
          {state.winner ? `${state.winner} is the Winner` : "Draw"}
        </DialogTitle>
        <DialogActions>
          <Button
            variant="contained"
            sx={{ marginLeft: 20, padding: 1 }}
            onClick={() => dispatch({ type: "restart" })}
          >
            Re start
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default TicTacToo;
