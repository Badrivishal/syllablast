import { expect, test } from "vitest";
import { Cell, Model, Position, Puzzle, Swap } from "./model";
import {config1, config2, config3} from "./puzzle";
import exp from "constants";

test("Position", () => {
  let p1 = new Position(2, 3);
  expect(p1.row).toBe(2);
  expect(p1.column).toBe(3);
  let p2 = new Position(2, 3);
  expect(p1.equals(p2)).toBe(true);
  let p3 = new Position(3, 2);
  expect(p1.equals(p3)).toBe(false);
});

test("Cell", () => {
  let c1 = new Cell(2, 3, "A");
  expect(c1.position).toStrictEqual(new Position(2, 3));
  expect(c1.syllable).toBe("A");
});

test("Swap", () => {
  let s1 = new Swap(new Position(2, 3), new Position(3, 2));
  expect(s1.originalPos).toStrictEqual(new Position(2, 3));
  expect(s1.finalPos).toStrictEqual(new Position(3, 2));
});

test("Puzzle", () => {
  let p1 = new Puzzle(4, 4, [["A", "B", "C", "D"], ["F", "G", "H", "I"], ["J", "K", "L", "M"], ["N", "O", "P", "Q"]]);
  expect(p1.numRows).toBe(4);
  expect(p1.numColumns).toBe(4);
  expect(p1.cells[0][0].syllable).toBe("A");
  expect(p1.cells[3][3].syllable).toBe("Q");
});

test("Model", () => {
  let m1 = new Model(config1);
  expect(m1.numSwaps).toBe(0);
  expect(m1.puzzle.numRows).toBe(4);
  expect(m1.puzzle.numColumns).toBe(4);
  expect(m1.swaps.length).toBe(0);
  expect(m1.victory).toBe(false);
  expect(m1.solution).toStrictEqual([["in", "vis", "i", "ble"], ["im", "mac", "u", "late"], ["af", "fil", "i", "ate"], ["un", "der", "wa", "ter"]]);
  expect(m1.selected).toBe(null);
  expect(m1.score).toBe(0);
  m1.incrementSwaps();
  expect(m1.numSwaps).toBe(1);
  expect(m1.puzzle.cells[0][0].syllable).toBe("ter");

  let temp_cell = m1.puzzle.cells[0][0]
  m1.puzzle.cells[0][0] = m1.puzzle.cells[1][1]
  m1.puzzle.cells[1][1] = temp_cell

  m1.updateScore()
  expect(m1.score).toBe(1)
  expect(m1.solvedSpaces[0][0]).toBe(true)

});

// test("MoveType", () => {
//   expect(MoveType.parse("down")).toBe(Down);
//   expect(MoveType.parse("up")).toBe(Up);
//   expect(MoveType.parse("left")).toBe(Left);
//   expect(MoveType.parse("right")).toBe(Right);
//   expect(MoveType.parse("--BAD--")).toBe(NoMove);
// });
// test("Coordinate", () => {
//   let c1 = new Coordinate(2, 3);
//   expect(c1.row).toBe(2);
//   expect(c1.column).toBe(3);
// });
// test("Piece", () => {
//   let p1 = new Piece(2, 1, false);
//   expect(p1.width).toBe(2);
//   expect(p1.height).toBe(1);
//   expect(p1.isWinner).toBe(false);
// });
// test("Puzzle", () => {
//   let pz = new Puzzle(4, 5, new Coordinate(2, 3), Down);
//   expect(pz.numRows).toBe(4);
//   expect(pz.numColumns).toBe(5);
//   // use 'toStrictEqual' when object structure is to be compared, and not just ==
//   expect(pz.destination).toStrictEqual(new Coordinate(2, 3));
//   expect(pz.finalMove).toBe(Down);
// });
// test("Model", () => {
//   let m = new Model(puzzleInformation);
//   expect(m.numMoves).toBe(0);
//   expect(m.victory).toBe(false);
//   // use 'toStrictEqual' when object structure is to be compared, and not just ==
//   expect(m.puzzle.numRows).toBe(5);
//   expect(m.puzzle.numColumns).toBe(4);
// });
