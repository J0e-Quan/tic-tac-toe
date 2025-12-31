const game =  (function() {
    const gameManager = (function() {
        let gameState = ''
        let markersPlaced = 0
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
            markersPlaced++
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
            //OLD METHOD (does not detect correctly unless it's an EXACT match)
            // for (condition of winConditions) {
            //     let markersString = markers.map(row => row.join(' ')).join(';')
            //     let conditionString = condition.map(row => row.join(' ')).join(';')
            //     let markersArray = markersString.split('')
            //     let conditionArray = conditionString.split('')
            //     console.log("filtered  array: ")
            //     console.log(markers)
            //     console.log("win condition: ")
            //     console.log(condition)
            //     if (markersString === conditionString) {
            //         return true
            //     }

            //NEW METHOD
            //pseudocode:
        /*  if more than 5 markers placed (win is possible),
            get 1st win condition and filteredArray
            let matchedRows = 0
            get first row of both
            check if marker in win condition is also present in filteredArray
            if no, return false (END)
            if yes, matchedRows++, go to next row and check again
            if matchedRows = 3 (all rows match), go back to first line
            check if number of markers in filteredArray >= number of markers in win condition
            if no, return false (END)
            if yes, go to next row and check again
            if everything matches, return true (END)
            if not, get next win condition and repeat
        */
            if (markersPlaced >=5) {
                for (condition of winConditions) {
                    let matchedRows = 0
                    for (let i = 0; i < 3; i++) {
                        let markerRow = markers[i]
                        let conditionRow = condition[i]
                        console.log('markerRow: ')
                        console.log(markerRow)
                        console.log('conditionRow: ')
                        console.log(conditionRow)
                        let isMatch = conditionRow.every(item => markerRow.includes(item))
                        console.log(isMatch)
                        if (isMatch === true) {
                            matchedRows = matchedRows++
                        } 
                    }
                    if (matchedRows === 3) {
                        return true
                    } else {
                        return false
                    }
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
            } else if (didPlayer2Win === true) {
                gameState = 'player2Win'
            } else {
                let isTie = checkTie()
                if (isTie === true) {
                    gameState = 'tie'
                }
            }
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