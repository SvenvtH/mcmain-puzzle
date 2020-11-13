// var pieceEvent = (element) => {
//     // Get blank piece dataset
//     var blankPiece = document.getElementsByClassName("piece-16")[0].dataset;

//     // Get clicked piece dataset
//     var clickedPieceRow = parseInt(element.dataset.row);
//     var clickedPiecePos = parseInt(element.dataset.pos);

//     // Check if clicked piece is blank piece
//     if(element.id == "piece-16") return;

//     // Check if blank piece is next to clicked piece
//     if (clickedPieceRow == blankPiece.row) {
//         if(clickedPiecePos + 1 == blankPiece.pos || clickedPiecePos - 1 == blankPiece.pos) {
//             swapPieces(element.className,"piece-16");
//         }
//     } else if (clickedPieceRow + 1 == blankPiece.row || clickedPieceRow - 1 == blankPiece.row) {
//         if(clickedPiecePos == blankPiece.pos) {
//             swapPieces(element.className,"piece-16");
//         }
//     }
// }

// var swapPieces = (piece1,piece2) => {
//     console.log(`${piece1} swapped with ${piece2}`)
//     document.getElementsByClassName("piece-12")[0].className = "piece-16";
//     document.getElementsByClassName("piece-16")[0].className = "piece-12";
// }

// // var cutImage = (imageUrl) => {
// //     var yPos = 0;
// //     var xPos = 0;
// //     for (var i = 1; i <= 16; i++) {
// //         document.getElementById(`piece-${i}`).style.backgroundPosition = `-${xPos}px -${yPos}px;`;
// //         xPos += 100;
// //         if (i % 4 == 0) {
// //             xPos = 0;
// //             yPos += 100;
// //         }
// //     }
// // }

// // var init = () => {
// //     cutImage("/assets/img/juice-and-leafs.png");
// // }