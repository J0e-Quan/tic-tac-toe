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


function createPlayer(number, marker) {
    let row;
    let col;
    function selectPlacement(selectedRow, selectedCol) {
        this.row = Number(selectedRow)
        this.col = Number(selectedCol)
    }
    return {number, marker, row, col, selectPlacement}
}


//GLOBAL CODE BELOW
let player1 = createPlayer(1, "O")
let player2 = createPlayer(2, "X")











//iife for gameManager
//gameManager toggles boolean of players to determine turns
//gamemanager checks for wins (arrays of coords) and draws (no win but all spaces are filled)