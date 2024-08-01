document.addEventListener('DOMContentLoaded', function() {
    // Check which page is currently loaded
    if (window.location.pathname.endsWith('index.html')) {
        // Sender page logic
        document.getElementById('gameButton').addEventListener('click', function() {
            var value1 = document.getElementById('player1').value;
            var value2 = document.getElementById('player2').value;
            var encodedValue1 = encodeURIComponent(value1); // Encode the values
            var encodedValue2 = encodeURIComponent(value2);
            window.location.href = 'page2.html?data1=' + encodedValue1 + '&data2=' + encodedValue2;
        });
    } else if (window.location.pathname.endsWith('page2.html')) {


        const cellElements = document.querySelectorAll('[data-cell]');
        var board = document.getElementById('board');
        var square = document.getElementsByClassName('square');
        const winningMessageElement = document.getElementById('winningMessage')
        const restartButton = document.getElementById('restartButton')
        const winningMessageTextElement = document.querySelector('[data-winning-message-text]')
        let circleTurn
        const X_CLASS = 'x'
        const CIRCLE_CLASS = 'circle'
        const WINNING_COMBINATIONS = [
          [0, 1, 2],
          [3, 4, 5],
          [6, 7, 8],
          [0, 3, 6],
          [1, 4, 7],
          [2, 5, 8],
          [0, 4, 8],
          [2, 4, 6]
        ]

        // Receiver page logic
        
        function getQueryParam(name) {
            const urlParams = new URLSearchParams(window.location.search);
            return urlParams.get(name);
        }

        var data1 = getQueryParam('data1');
        var data2 = getQueryParam('data2');
        if (data1) {
            document.getElementById('display1').textContent = decodeURIComponent(data1);
        }
        if (data2) {
            document.getElementById('display2').textContent = decodeURIComponent(data2);
        }

        
startGame()

restartButton.addEventListener('click', startGame)

function startGame() {
  circleTurn = false
  cellElements.forEach(cell => {
    cell.classList.remove(X_CLASS)
    cell.classList.remove(CIRCLE_CLASS)
    cell.removeEventListener('click', handleClick)
    cell.addEventListener('click', handleClick, { once: true })
  })
  setBoardHoverClass()
  winningMessageElement.classList.remove('show')
}

function handleClick(e) {
  const cell = e.target
  const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS
  placeMark(cell, currentClass)
  if (checkWin(currentClass)) {
    endGame(false)
  } else if (isDraw()) {
    endGame(true)
  } else {
    swapTurns()
    setBoardHoverClass()
  }
}

function endGame(draw) {
  if (draw) {
    winningMessageTextElement.innerText = 'Draw!'
  } else {
    winningMessageTextElement.innerText = `${circleTurn ? data1 : data2} Wins!`
  }
  winningMessageElement.classList.add('show')
}

function isDraw() {
  return [...cellElements].every(cell => {
    return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
  })
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass)
}

function swapTurns() {
  circleTurn = !circleTurn
}

function setBoardHoverClass() {
  board.classList.remove(X_CLASS)
  board.classList.remove(CIRCLE_CLASS)
  if (circleTurn) {
    board.classList.add(CIRCLE_CLASS)
  } else {
    board.classList.add(X_CLASS)
  }
}

function checkWin(currentClass) {
  return WINNING_COMBINATIONS.some(combination => {
    return combination.every(index => {
      return cellElements[index].classList.contains(currentClass)
    })
  })
}
    }
});
