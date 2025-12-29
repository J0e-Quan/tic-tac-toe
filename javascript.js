const game =  (function() {


    const gameManager = (function() {
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
            checkGameState()
        }

        function checkPlayer1Markers() {
            let player1Markers = gameArray.filter((item) => item === "O")
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
            compareMarkers(player1Markers, player1WinConditions)                                                          
        }

        function compareMarkers(markers, winConditions) {
            //Compare number of rows
            //Compare number of columns in each row
            //Compare values of each index
        }

        function checkGameState() {
            let didPlayer1Win = checkPlayer1Markers()
        }         

        return {gameArray, placeMarker, determineWinner, checkGameState}
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
    return {gameManager, gameBoard}
})();




//iife for gameManager
//gameManager toggles a boolean to determine turns
//gamemanager creates players
//gamemanager checks for wins (arrays of coords) and draws (no win but all spaces are filled)