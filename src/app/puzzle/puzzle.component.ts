import { Component, OnInit } from '@angular/core';
import { timer } from "rxjs";

export class Piece {
  id: number;
  row: number;
  pos: number;
}

@Component({
  selector: 'app-puzzle',
  templateUrl: './puzzle.component.html',
  styleUrls: ['./puzzle.component.css']
})
export class PuzzleComponent implements OnInit {

  constructor() { }

  moves: number = 0;
  time: number = 0;
  score: number = 500;
  isRunning: boolean = false;
  hasEnded: boolean = false;

  puzzlePieces: Piece[][] = [
    [
      { "id": 1, "row": 1, "pos": 1 },
      { "id": 2, "row": 1, "pos": 2 },
      { "id": 3, "row": 1, "pos": 3 },
      { "id": 4, "row": 1, "pos": 4 }
    ],
    [
      { "id": 5, "row": 2, "pos": 1 },
      { "id": 6, "row": 2, "pos": 2 },
      { "id": 7, "row": 2, "pos": 3 },
      { "id": 8, "row": 2, "pos": 4 }
    ],
    [
      { "id": 9, "row": 3, "pos": 1 },
      { "id": 10, "row": 3, "pos": 2 },
      { "id": 11, "row": 3, "pos": 3 },
      { "id": 12, "row": 3, "pos": 4 }
    ],
    [
      { "id": 13, "row": 4, "pos": 1 },
      { "id": 14, "row": 4, "pos": 2 },
      { "id": 15, "row": 4, "pos": 3 },
      { "id": 16, "row": 4, "pos": 4 }
    ]
  ]

  // get List of all pieces
  getIdList(): number[] {
    var pieceList: number[] = [];
    for (let row of this.puzzlePieces) {
      for (let pieces of row) {
        pieceList.push(pieces.id);
      }
    }
    return pieceList;
  }

  shuffleArray(pieceList: number[]): number[] {
    // return [1,2,3,4,5,6,7,8,9,10,11,12,13,14,16,15];
    return pieceList.sort(() => .5 - Math.random());
  }

  getInversions(array: number[]): number {
    var count: number = array.length;
    var inv_count: number = 0;
    for (let i = 0; i < count - 1; i++) {
      for (let j = i + 1; j < count; j++) {
        if (array[i] > array[j]) {
          inv_count++;
        }
      }
    }
    return inv_count;
  }

  isEven(value: number): boolean {
    return (value % 2 == 0);
  }

  checkSolvability(pieceList: number[]): boolean {
    var inversions: number = this.getInversions(pieceList);
    var blankPiece: Piece = this.getPieceInfo(16);
    return (this.isEven(blankPiece.pos) && !this.isEven(inversions) || !this.isEven(blankPiece.pos) && this.isEven(inversions));
  }



  buildGame(): void {
    var pieces: number[] = this.getIdList();
    var randomizedPieces: number[] = this.shuffleArray(pieces);
    if (this.checkSolvability(randomizedPieces)) {
      var i: number = 0;
      for (let row of this.puzzlePieces) {
        for (let pieces of row) {
          pieces.id = randomizedPieces[i];
          i++;
        }
      }
    } else {
      // Rebuild game if not solveable
      this.buildGame();
    }

  }

  gameOver(): void {
    this.endGame();
  }

  endGame(): void {
    this.hasEnded = true
    this.isRunning = false
    if (this.score < 0) {
      // alert(`You ran out of points!`);
    } else {
      // alert(`You finished the puzzle!\nScore: ${this.score}`);
    }
  }

  checkGameStatus(): void {
    var i: number = 0;
    var correctPieces: number = 0;
    for (let row of this.puzzlePieces) {
      for (let pieces of row) {
        i++;
        if (pieces.id == i) {
          correctPieces++;
        } else {
          return;
        }
        console.log(i);
      }
    }
    if (correctPieces == i) {
      this.endGame();
    }
  }



  ngOnInit(): void {
    this.buildGame();

    timer(0, 100).subscribe(ellapsedCycles => {
      if (this.isRunning) {
        this.score -= 1;
        if (this.score < 0) {
          this.endGame();
        }
      }
    });

    timer(0, 1000).subscribe(ellapsedCycles => {
      if (this.isRunning) {
        this.time++;
      }
    });
  }

  startTimer(): void {
    this.isRunning = true;
  }

  getPieces(): Piece[][] {
    return this.puzzlePieces;
  }


  findIdInArray(pieceList: Piece[][], query: number) {
    for (let i = 0; i < pieceList.length; i++) {
      for (let j = 0; j < pieceList[i].length; j++)
        if (pieceList[i][j].id == query) {
          return { "id": pieceList[i][j].id, "row": pieceList[i][j].row, "pos": pieceList[i][j].pos };
        }
    }
  }

  getPieceInfo(pieceId: number): Piece {
    return this.findIdInArray(this.getPieces(), pieceId);
  }

  swapPieces(clickedPiece: any, blankPiece: any): void {
    this.moves++;
    this.score -= 100;
    var tempPiece: Piece = clickedPiece;
    var tempBlank: Piece = blankPiece;
    for (let row of this.puzzlePieces) {
      for (let piece of row) {
        if (piece.id == clickedPiece.id) {
          piece.id = tempBlank.id;
        } else if (piece.id == blankPiece.id) {
          piece.id = tempPiece.id;
        }
      }
    }
  }

  checkPieceProximity(clickedPiece: any): void {
    let blankPiece: Piece = this.getPieceInfo(16);
    if (clickedPiece.row == blankPiece.row) {
      if (clickedPiece.pos + 1 == blankPiece.pos || clickedPiece.pos - 1 == blankPiece.pos) {
        this.swapPieces(clickedPiece, blankPiece);
      }
    } else if (clickedPiece.row + 1 == blankPiece.row || clickedPiece.row - 1 == blankPiece.row) {
      if (clickedPiece.pos == blankPiece.pos) {
        this.swapPieces(clickedPiece, blankPiece);
      }
    }
  }

  pieceEvent(pieceId: any): void {
    if (!this.hasEnded) {
      this.startTimer();
      let clickedPieceInfo: Piece = this.getPieceInfo(pieceId);
      this.checkPieceProximity(clickedPieceInfo);
      this.checkGameStatus();
    };
  }


}