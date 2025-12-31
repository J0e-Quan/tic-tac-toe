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
            console.log(gameArray)   
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
            return compareMarkers(player1Markers, player1WinConditions)                                                          
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
            return compareMarkers(player2Markers, player2WinConditions)                                                          
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

        function compareMarkers(markers, winConditions) {
            for (array of winConditions) {
                let markersString = markers.map(row => row.join(',')).join(';')
                let arrayString = array.map(row => row.join(',')).join(';')
                if (markersString === arrayString) {
                    return true
                }
            }
        }

        function checkTie() {
            for (let i = 0; i < 3; i++) {
                let isEmpty = (gameArray[i]).some(item => item === '')
                console.log(isEmpty)
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
            } else if (didPlayer2Win === true) {
                gameState = 'player2Win'
            } else {
                let isTie = checkTie()
                if (isTie === true) {
                    gameState = 'tie'
                }
            }
            console.log("gameState should be: "+gameState)
        }   

        function getGameState() {
            return gameState
        }
        return {placeMarker, checkGameState, getGameState, getArrayElement}
    })();



    const playerManager = (function() {
        //true: player1's turn ; false: player2's turn
        let isPlayer1Turn = true

         function getPlayerTurn() {
            return isPlayer1Turn
        }        

        function createPlayer(number, marker) {
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
                            console.log('game ended already stop playing...')
                            return false
                        }
                    } else {
                        console.log("It's the other player's turn!")
                        return false
                    }
                } else {
                    console.log("That space is already occupied!")
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

            return {getPlayerNumber, getPlayerMarker, selectPlacement}
        }

        let player1 = createPlayer(1, "O")
        let player2 = createPlayer(2, "X")

        return {player1, player2, getPlayerTurn}
    })();



    const displayManager = (function() {
        let grid = document.querySelector('.board')
        let targetRow;
        let targetCol;
        highlightPlayer()
        updateInstruction(true, true)

        grid.addEventListener('click', (btn) => {
            targetRow = btn.target.classList[1]
            targetCol = btn.target.classList[2]
            updateGrid(btn.target)
        })

        function highlightPlayer() {
            let isPlayer1Turn = playerManager.getPlayerTurn()
            if (isPlayer1Turn === true) {
                let player1 = document.querySelectorAll('.one')
                player1.forEach((item) => item.classList.add('highlight'))
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
            if (gameState === '' ) {
                if (isPlayer1Turn === true) {
                    instructionText.textContent = "It's Player 1's turn! Select an empty box on the grid!"
                } else if (isPlayer1Turn === false) {
                    instructionText.textContent = "It's Player 2's turn! Select an empty box on the grid!"
                }
                if (canPlace === false) {
                    instructionText.textContent = "This box is already occupied! Please select a different one."
                }
            } else if (gameState !== '') {
                if (gameState === 'player1Win') {
                    instructionText.textContent = "Player 1 wins! Refresh the page to play again..."
                } else if (gameState === 'player2Win') {
                    instructionText.textContent = "Player 2 wins! Refresh the page to play again..."
                } else if (gameState === 'tie') {
                    instructionText.textContent = "It's a tie! Refresh the page to play again..."
                }
            }
        }
    
        return {updateInstruction}
    })();
    return {gameManager, playerManager, displayManager}
})();