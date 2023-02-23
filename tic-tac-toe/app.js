const x = "X";
const o = "O";

const cells = document.querySelectorAll("td"); //select all 9 boxes
const win_pos = [
  //all 8 winning positions
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
let win_line; //winning line (1 of 8 positions)

//reset button (replay for now)
document.querySelector("button").onclick = () => {
  cells.forEach(function (square) {
    square.textContent = "";
    square.style.background = "";
    square.addEventListener("click", turnX);
  });
};

//assign turnX function to every square
cells.forEach(function (square) {
  square.addEventListener("click", turnX);
});

function turnX() {
  //set box to X
  if (this.textContent == "") {
    this.textContent = x;
    //check for win and allow (or not ai-next move)
    if (!checkWin(x) && [...cells].some((square) => square.textContent == ""))
      turnAI();
    else {
      ifWin(x);
    }
  }
}

//check for win and assign winning line
function checkWin(xo) {
  return win_pos.some(function (three) {
    if (
      three.every(function (checked) {
        return cells[checked].textContent == xo;
      })
    ) {
      win_line = three;
      return true;
    }
  });
}

//(if true)stops game and highlight winning line
function ifWin(xo) {
  if (checkWin(xo)) {
    win_line.forEach(function (box) {
      cells[box].style.background = "greenyellow";
    });
    cells.forEach(function (square) {
      square.removeEventListener("click", turnX);
    });
  }
}

function turnAI() {
  //look for empty squares
  const empty = [...cells].filter(function (square) {
    return square.textContent == "";
  });
  //look for best move
  const best = bestMove(empty);
  if (best.length > 0) cells[best[0][0]].textContent = o; //AI win or block Xs
  //set random ai move
  else {
    const turnO = Math.floor(Math.random() * empty.length);
    empty[turnO].textContent = o;
  }
  //check if ai won
  ifWin(o);
}

function bestMove(empty) {
  let bestAI = [];
  let bestO = [];
  let bestX = [];
  //go through every empty square
  empty.forEach(function (square) {
    //go through every line
    win_pos.forEach(function (line) {
      //check for lines with empty squares
      const i = line[line.indexOf(+square.id)];
      if (i > -1) {
        //look for lines that have 2 Os or 2Xs
        const potentialO = line.filter(function (other) {
          return cells[other].textContent == o;
        });
        const potentialX = line.filter(function (other) {
          return cells[other].textContent == x;
        });
        if (potentialO.length > 1) {
          bestO.push([i, ...potentialO]);
        }
        if (potentialX.length > 1) {
          bestX.push([i, ...potentialX]);
        }
      }
    });
  });
  //this order because index 00 will be win for AI
  bestAI.push(...bestO);
  bestAI.push(...bestX);
  return bestAI;
}
