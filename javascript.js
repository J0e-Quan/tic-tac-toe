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
            gameArray[row][col] = player.marker
            console.log(gameArray)   
            checkGameState(player.marker)
        }

        function checkPlayer1Markers(marker) {
            let player1Markers = getPlayerMarkers(marker)
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
            let player2Markers = getPlayerMarkers(marker)
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

        function getPlayerMarkers(playerMarker) {
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
            console.log(filteredArray)
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
            //go row by row with for i loop
            //use every to find ''
            //if its true anytime, return
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
            console.log("gameState: "+gameState)
        }         

        return {gameArray, placeMarker, checkGameState}
    })();

    const playerManager = (function() {
        //true: player1's turn ; false: player2's turn
        let isPlayer1Turn;

        function createPlayer(number, marker) {
            let row;
            let col;
            function selectPlacement(selectedRow, selectedCol) {
                this.row = Number(selectedRow)
                this.col = Number(selectedCol)
                gameManager.placeMarker(this)
            }
            return {number, marker, row, col, selectPlacement}
        }

        let player1 = createPlayer(1, "O")
        let player2 = createPlayer(2, "X")

        return {isPlayer1Turn, player1, player2}
    })();
    return {gameManager, playerManager}
})();




//iife for gameManager
//gameManager toggles a boolean to determine turns
//gamemanager creates players
//gamemanager checks for wins (arrays of coords) and draws (no win but all spaces are filled)