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

        function createPlayer(number, marker) {
            function selectPlacement(selectedRow, selectedCol) {
                let gameState = gameManager.getGameState()
                let canSelect = checkArrayElement(selectedRow, selectedCol)
                if (canSelect === true) {
                    let playerNumber = this.getPlayerNumber()
                    console.log(playerNumber)
                    if ((playerNumber === 1 && isPlayer1Turn === true) || (playerNumber ===2 && isPlayer1Turn === false)) {
                        if (gameState === '') {
                            this.row = Number(selectedRow)
                            this.col = Number(selectedCol)
                            gameManager.placeMarker(this)     
                            isPlayer1Turn = !isPlayer1Turn              
                        } else {
                            console.log('game ended already stop playing...')
                        }
                    } else {
                        console.log("It's the other player's turn!")
                    }
                } else {
                    console.log("That space is already occupied!")
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

        return {player1, player2}
    })();
    return {gameManager, playerManager}
})();