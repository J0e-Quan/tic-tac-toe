const game =  (function() {


    const gameBoard = (function() {
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
        }
        return {gameArray, placeMarker}
    })();

    const gameManager = (function() {
        //true: player1's turn ; false: player2's turn
        let isPlayer1Turn;

        function createPlayer(number, marker) {
            let row;
            let col;
            function selectPlacement(selectedRow, selectedCol) {
                this.row = Number(selectedRow)
                this.col = Number(selectedCol)
                gameBoard.placeMarker(this)
            }
            return {number, marker, row, col, selectPlacement}
        }

        function determineWinner() {

        }

        let player1 = createPlayer(1, "O")
        let player2 = createPlayer(2, "X")

        function checkGameState() {
            let result = determineWinner()
        }
        return {isPlayer1Turn, player1, player2, checkGameState}
    })();
    return {gameManager, gameBoard}
})();




//iife for gameManager
//gameManager toggles a boolean to determine turns
//gamemanager creates players
//gamemanager checks for wins (arrays of coords) and draws (no win but all spaces are filled)