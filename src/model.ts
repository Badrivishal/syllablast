import { stringify } from "querystring";
import { P } from "vitest/dist/chunks/environment.0M5R1SX_.js";


export class Puzzle {
  readonly numRows: number;
  readonly numColumns: number;
  readonly cells: Cell[][];

  constructor(numRows: number, numColumns: number, initialConfig: string[][]) {
    this.numRows = numRows;
    this.numColumns = numColumns;

    this.cells = new Array <Array<Cell>>(numRows);
    for (let r = 0; r < numRows; r++) {
      this.cells[r] = new Array<Cell>(numColumns);
      for (let c = 0; c < numColumns; c++) {
        this.cells[r][c] = new Cell(r, c, initialConfig[r][c]);
      }
    }
  }
}

export class Position {
  readonly row: number;
  readonly column: number;

  constructor(row: number, column: number) {
    this.row = row;
    this.column = column;
  }

  equals(other: Position): boolean {
    return this.row === other.row && this.column === other.column;
  }
}

export class Swap {
  readonly originalPos: Position;
  readonly finalPos: Position;

  constructor(originalPos: Position, finalPos: Position) {
    this.originalPos = originalPos;
    this.finalPos = finalPos;
  }

}

export class Cell {
  readonly position: Position;
  readonly syllable: string;

  constructor(row: number, column: number, syllable: string) {
    this.position = new Position(row, column);
    this.syllable = syllable;
  }
}

export class Model {
  config: PuzzleConfig;
  puzzle: Puzzle;
  numSwaps: number;
  swaps: Swap[];
  selected: Position | null;
  solution: string[][];
  score: number;
  victory: boolean;
  solvedSpaces: boolean[][];
  // info is going to be JSON-encoded puzzle

  constructor(config: PuzzleConfig) {
    this.initialize(config);
  }

  initialize(config) {
    this.config = config;
    let numRows = parseInt(config.rows);
    let numColumns = parseInt(config.columns);
    this.puzzle = new Puzzle(numRows, numColumns, config.initialConfig);
    this.solution = config.solution;
    this.swaps = [];
    this.selected = null;
    this.numSwaps = 0;
    this.score = 0;
    this.victory = false;
    this.solvedSpaces = [[false, false, false, false], [false, false, false, false], [false, false, false, false], [false, false, false, false]];
  }

  incrementSwaps() {
    this.numSwaps++;
  }

  decrementSwaps() {
    this.numSwaps--;
  }

  updateScore() {
    let matchedRows = new Set<number>();
    let score = 0;
    this.solvedSpaces = [[false, false, false, false], [false, false, false, false], [false, false, false, false], [false, false, false, false]];
    for (let r = 0; r < this.puzzle.numRows; r++) {
      for (let i = 0; i < this.solution.length; i++) {
        // console.log("matchedRows: " + matchedRows.has(i) + " " + i);
        // console.log("syllable: " + this.puzzle.cells[r][0].syllable + " " + this.solution[i][0] + " " + i + " " + String(this.puzzle.cells[r][0].syllable == this.solution[i][0]));
        if (this.puzzle.cells[r][0].syllable === this.solution[i][0] && !matchedRows.has(i)) {
          matchedRows.add(i);
          // console.log("matchedRows: " + matchedRows);
          for (let c = 0; c < this.puzzle.numColumns; c++) {
            if (this.puzzle.cells[r][c].syllable === this.solution[i][c]) {
              this.solvedSpaces[r][c] = true;
              score++;
            }
            else {
              this.solvedSpaces[r][c] = false;
              break;
            }
          }
        }
      }
    }
    console.log("Solved spaces" + this.solvedSpaces)
    this.score = score;
  }

  checkVictory(){
    if (this.score === 16){
      this.victory = true;
    }
  }

}
