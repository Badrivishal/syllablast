import { expect, test } from "vitest";
import { Cell, Model, Position, Puzzle, Swap } from "./model";
import { ResetController, SwapController } from "./controllers";
import {config1, config2, config3} from "./puzzle";

test("ResetController", () => {
    let m1 = new Model(config1);
    let rc = new ResetController(m1);
    rc.resetPuzzle(config1);
    expect(rc.model.puzzle.cells[0][0].syllable).toBe("ter");
    expect(rc.model.puzzle.cells[1][1].syllable).toBe("in");
    rc.resetPuzzle(config2);
    expect(rc.model.puzzle.cells[0][0].syllable).toBe("force");
    expect(rc.model.puzzle.cells[1][1].syllable).toBe("ma");
    });

test("SwapController", () => {
    let m1 = new Model(config1);
    let sc = new SwapController(m1);
    let s1 = new Swap(new Position(1, 1), new Position(3, 0));
    sc.swap(s1);
    expect(sc.model.numSwaps).toBe(1);
    expect(sc.model.score).toBe(2);
    expect(sc.model.puzzle.cells[1][1].syllable).toBe("u");
    expect(sc.model.puzzle.cells[3][0].syllable).toBe("in");
    let s2 = new Swap(new Position(2, 0), new Position(3, 2));
    sc.swap(s2);
    expect(sc.model.numSwaps).toBe(2);
    expect(sc.model.score).toBe(4);
    expect(sc.model.puzzle.cells[2][0].syllable).toBe("af");
    expect(sc.model.puzzle.cells[3][2].syllable).toBe("i");
    });
