const game =  (function() {
    const gameManager = (function() {
        let gameState = ''
        let gameArray = [
            ['', '', ''],
            ['', '', ''],
            ['', '', '']
        ]

        function placeMarker(player) {
            let row = --player.row
            let col = --player.col
            let marker = player.getPlayerMarker()
            gameArray[row][col] = marker
            checkGameState(marker)
        }

        function getArrayElement(row, col) {
            targetRow = --row
            targetCol = --col
            return gameArray[targetRow][targetCol]
        }

        function checkPlayer1Markers(marker) {
            let player1Markers = filterArray(marker)
            let player1WinConditions = [[
                ['O', 'O', 'O'],
                ['', '', ''],
                ['', '', '']                
            ], [
                ['', '', ''],
                ['O', 'O', 'O'],
                ['', '', '']                  
            ], [
                ['', '', ''],
                ['', '', ''],
                ['O', 'O', 'O']                  
            ], [
                ['O', '', ''],
                ['O', '', ''],
                ['O', '', '']                  
            ], [
                ['', 'O', ''],
                ['', 'O', ''],
                ['', 'O', '']                  
            ], [
                ['', '', 'O'],
                ['', '', 'O'],
                ['', '', 'O']                  
            ], [
                ['O', '', ''],
                ['', 'O', ''],
                ['', '', 'O']                  
            ], [
                ['', '', 'O'],
                ['', 'O', ''],
                ['O', '', '']                  
            ]]           
            return compareMarkers(player1Markers, player1WinConditions, marker)                                                          
        }

        function checkPlayer2Markers(marker) {
            let player2Markers = filterArray(marker)
            let player2WinConditions = [[
                ['X', 'X', 'X'],
                ['', '', ''],
                ['', '', '']                
            ], [
                ['', '', ''],
                ['X', 'X', 'X'],
                ['', '', '']                  
            ], [
                ['', '', ''],
                ['', '', ''],
                ['X', 'X', 'X']                  
            ], [
                ['X', '', ''],
                ['X', '', ''],
                ['X', '', '']                  
            ], [
                ['', 'X', ''],
                ['', 'X', ''],
                ['', 'X', '']                  
            ], [
                ['', '', 'X'],
                ['', '', 'X'],
                ['', '', 'X']                  
            ], [
                ['X', '', ''],
                ['', 'X', ''],
                ['', '', 'X']                  
            ], [
                ['', '', 'X'],
                ['', 'X', ''],
                ['X', '', '']                  
            ]]           
            return compareMarkers(player2Markers, player2WinConditions, marker)                                                          
        }

        function filterArray(playerMarker) {
            let filteredArray = []
            let filterMarker = playerMarker
            for (let i = 0; i < 3; i++) {
                let filteredRow = gameArray[i].map((item) => {
                    if (item === filterMarker || item === '') {
                        item = item
                    } else {
                        item = ''
                    }
                    return item
                })
                filteredArray.push(filteredRow)
            }
            return filteredArray
        }

        function compareMarkers(inputMarkers, winConditions, marker) {
            for (c = 0; c < winConditions.length; c++) {
                let matchedRows = 0;
                let markers = inputMarkers
                let condition = winConditions[c]
                for (r = 0; r < 3; r++) {
                    let markersRow = markers[r]
                    let conditionRow = condition[r]
                    let isRowMatch
                    let requiredMatches = (conditionRow.filter(item => item === marker)).length
                    for (i = 0; i < 3; i++) {
                        if (requiredMatches === 0) {
                            isRowMatch = true
                            break
                        } else {
                            let markersItem = markersRow[i]
                            let conditionItem = conditionRow[i]
                            let isMatch
                            if (conditionItem === marker) {
                                isMatch = (markersItem === conditionItem)
                                if (isMatch === true) {
                                    requiredMatches--
                                    if (requiredMatches === 0) {
                                        isRowMatch = true
                                        break
                                    } else {
                                        continue
                                    }
                                } else if (isMatch === false) {
                                    isRowMatch = false
                                    break
                                }
                            } else if (conditionItem !== marker) {
                                continue
                            }
                        }
                    }
                    if (isRowMatch === true) {
                        matchedRows++
                    } else if (isRowMatch === false) {
                        continue
                    }
                }
                if (matchedRows === 3) {
                    return true
                } else {
                    continue
                }
            }
        }

        function checkTie() {
            for (let i = 0; i < 3; i++) {
                let isEmpty = (gameArray[i]).some(item => item === '')
                if (isEmpty === true) {
                    return false
                }
            }
            return true
        }

        function checkGameState(marker) {
            let didPlayer1Win;
            let didPlayer2Win;
            if (marker === 'O') {
                didPlayer1Win = checkPlayer1Markers(marker)
            } else if (marker === 'X') {
                didPlayer2Win = checkPlayer2Markers(marker)
            }
            if (didPlayer1Win === true) {
                gameState = 'player1Win'
                playerManager.player1.increasePlayerScore()
                displayManager.updateScore()
            } else if (didPlayer2Win === true) {
                gameState = 'player2Win'
                playerManager.player2.increasePlayerScore()
                displayManager.updateScore()
            } else {
                let isTie = checkTie()
                if (isTie === true) {
                    gameState = 'tie'
                    displayManager.updateScore()
                }
            }
        }   

        function getGameState() {
            return gameState
        }

        function newGame() {
            gameState = ''
            gameArray = [
                ['', '', ''],
                ['', '', ''],
                ['', '', '']
            ]            
            playerManager.resetPlayerTurn()
            displayManager.clearGrid()
        }

        return {placeMarker, checkGameState, getGameState, getArrayElement, newGame}
    })();



    const playerManager = (function() {
        //true: player1's turn ; false: player2's turn
        let isPlayer1Turn = true

         function getPlayerTurn() {
            return isPlayer1Turn
        }        

        function resetPlayerTurn() {
            isPlayer1Turn = true
        }

        function createPlayer(number, marker) {
            let playerName
            let score = 0
            createPlayerName()

            function selectPlacement(selectedRow, selectedCol) {
                let gameState = gameManager.getGameState()
                let canSelect = checkArrayElement(selectedRow, selectedCol)
                if (canSelect === true) {
                    let playerNumber = this.getPlayerNumber()
                    if ((playerNumber === 1 && isPlayer1Turn === true) || (playerNumber ===2 && isPlayer1Turn === false)) {
                        if (gameState === '') {
                            this.row = Number(selectedRow)
                            this.col = Number(selectedCol)
                            gameManager.placeMarker(this)     
                            isPlayer1Turn = !isPlayer1Turn     
                            game.displayManager.updateInstruction(isPlayer1Turn, true)
                            return true         
                        } else {
                            return false
                        }
                    } else {
                        return false
                    }
                } else {
                    game.displayManager.updateInstruction(isPlayer1Turn, false)
                    return false
                }

            }

            function checkArrayElement(row, col) {
                let arrayElement = gameManager.getArrayElement(row, col)
                if (arrayElement !== '') {
                    return false
                } else {
                    return true
                }
            }

            function getPlayerNumber() {
                return number
            }

            function getPlayerMarker() {
                return marker
            }

            function createPlayerName() {
                playerName = prompt("Enter Player " + getPlayerNumber() + "'s name")
                if (playerName === '' || playerName === null) {
                    playerName = "Player "+getPlayerNumber()
                }
            }

            function getPlayerName() {
                return playerName
            }

            function getPlayerScore() {
                return score
            }

            function increasePlayerScore() {
                score++
            }

            return {getPlayerNumber, getPlayerMarker, getPlayerName, getPlayerScore, increasePlayerScore, selectPlacement}
        }

        let player1 = createPlayer(1, "O")
        let player2 = createPlayer(2, "X")

        return {player1, player2, getPlayerTurn, resetPlayerTurn}
    })();



    const displayManager = (function() {
        let grid = document.querySelector('.board')
        let replayButton = document.createElement('button')
        let targetRow;
        let targetCol;
        showPlayerName()
        highlightPlayer()
        updateInstruction(true, true)

        grid.addEventListener('click', (btn) => {
            if (!(btn.target.classList.contains('replay'))) {
                targetRow = btn.target.classList[1]
                targetCol = btn.target.classList[2]
                updateGrid(btn.target)
            }
        })

        function showPlayerName() {
            let player1NameDisplay = document.querySelector('.player.one.name')
            let player2NameDisplay = document.querySelector('.player.two.name')
            player1NameDisplay.textContent = playerManager.player1.getPlayerName()
            player2NameDisplay.textContent = playerManager.player2.getPlayerName()
        }

        function highlightPlayer() {
            let isPlayer1Turn = playerManager.getPlayerTurn()
            let gameState = gameManager.getGameState()
            let player1 = document.querySelectorAll('.one')
            let player2 = document.querySelectorAll('.two')
            if (isPlayer1Turn === true) {
                player1.forEach((item) => item.classList.add('highlight'))
                player2.forEach((item) => item.classList.remove('highlight'))
            } else if (isPlayer1Turn === false) {
                player2.forEach((item) => item.classList.add('highlight'))
                player1.forEach((item) => item.classList.remove('highlight'))                
            }
            if (gameState !== '') {
                if (gameState === 'player1Win') {
                    player1.forEach((item) => item.classList.add('winner'))         
                    player2.forEach((item) => item.classList.remove('highlight'))                               
                } else if (gameState === 'player2Win') {
                    player2.forEach((item) => item.classList.add('winner'))        
                    player1.forEach((item) => item.classList.remove('highlight'))                                        
                } else if (gameState === 'tie') {
                    player1.forEach((item) => item.classList.add('winner'))         
                    player2.forEach((item) => item.classList.add('winner'))         
                }
            }
        }

        function updateGrid(btn) {
            let isPlayer1Turn = playerManager.getPlayerTurn()
            let marker;
            let canPlace;
            let row = targetRow.slice(-1)
            let col = targetCol.slice(-1)
            if (isPlayer1Turn === true) {
                marker = playerManager.player1.getPlayerMarker()
                canPlace = playerManager.player1.selectPlacement(row, col)
            } else if (isPlayer1Turn === false) {
                marker = playerManager.player2.getPlayerMarker()
                canPlace = playerManager.player2.selectPlacement(row,col)
            }
            if (canPlace === true) {
                btn.textContent = marker
                if (isPlayer1Turn === true) {
                    btn.style.color = 'rgb(0, 100, 255)'
                } else if (isPlayer1Turn === false) {
                    btn.style.color = 'rgb(255, 50, 50)'
                }
                highlightPlayer()
            } else if (canPlace === false) {
            } 
        }

        function updateInstruction(isPlayer1Turn, canPlace) {
            let instructionText = document.querySelector('.instruction')
            let gameState = gameManager.getGameState()
            let player1Name = playerManager.player1.getPlayerName()
            let player2Name = playerManager.player2.getPlayerName()
            if (gameState === '' ) {
                if (isPlayer1Turn === true) {
                    instructionText.textContent = "It's " + player1Name + "'s turn! Select an empty box on the grid!"
                } else if (isPlayer1Turn === false) {
                    instructionText.textContent = "It's " + player2Name + "'s turn! Select an empty box on the grid!"
                }
                if (canPlace === false) {
                    instructionText.textContent = "This box is already occupied! Please select a different one."
                }
            } else if (gameState !== '') {
                if (gameState === 'player1Win') {
                    instructionText.textContent = player1Name + " wins! Click the button below the grid to play again..."
                } else if (gameState === 'player2Win') {
                    instructionText.textContent = player2Name + " wins! Click the button below the grid to play again..."
                } else if (gameState === 'tie') {
                    instructionText.textContent = "It's a tie! Click the button below the grid to play again..."
                }
            }
        }

        function updateScore() {
            let gameState = gameManager.getGameState()
            if (gameState === 'player1Win') {
                let winningPlayerScoreDisplay = document.querySelector('.player.one.score')
                winningPlayerScoreDisplay.textContent = 'Score: '+playerManager.player1.getPlayerScore()
            } else if (gameState === 'player2Win') {
                let winningPlayerScoreDisplay = document.querySelector('.player.two.score')
                winningPlayerScoreDisplay.textContent = 'Score: '+playerManager.player2.getPlayerScore()
            }
            showReplayButton()
        }

        function showReplayButton() {
            replayButton.type = 'button'
            replayButton.textContent = 'Play again'
            replayButton.classList.add('replay')
            let board = document.querySelector('.board')
            board.appendChild(replayButton)
        }

        replayButton.addEventListener('click', () => {
            gameManager.newGame()
            replayButton.remove()
        })

        function clearGrid() {
            let boxes = document.querySelectorAll('.box')
            boxes.forEach((box) => {
                box.textContent = ''
                box.style.color = ''
            })
            resetHighlight()
            updateInstruction(true, true)
        }
        
        function resetHighlight() {
            let players = document.querySelectorAll('.player')
            players.forEach((item) => item.classList.remove('winner'))
            highlightPlayer()
        }
    
        return {updateInstruction, updateScore, clearGrid}
    })();
    return {gameManager, playerManager, displayManager}
})();