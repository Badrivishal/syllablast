import { Model, Swap } from './model';


export class ResetController {
    model: Model;
    constructor(model: Model) {
        this.model = model;
    }
    resetPuzzle(config) {
        this.model = new Model(config);
        this.model.updateScore()
    }
}

export class UndoController {
    model: Model;
    constructor(model: Model) {
        this.model = model;
    }
    undo() {
        if(this.model.swaps.length > 0){
            let swap = this.model.swaps.pop();
            let tempCell = this.model.puzzle.cells[swap.originalPos.row][swap.originalPos.column];
            this.model.puzzle.cells[swap.originalPos.row][swap.originalPos.column] = this.model.puzzle.cells[swap.finalPos.row][swap.finalPos.column];
            this.model.puzzle.cells[swap.finalPos.row][swap.finalPos.column] = tempCell;
            this.model.selected = null
            this.model.decrementSwaps();
            this.model.updateScore()
        }
    }
}


export class SwapController {
    model: Model;
    constructor(model: Model) {
        this.model = model;
    }
    swap(swap: Swap) {
        // swap is a Swap object
        if(!swap.originalPos.equals(swap.finalPos)){
            let tempCell = this.model.puzzle.cells[swap.originalPos.row][swap.originalPos.column];
            this.model.puzzle.cells[swap.originalPos.row][swap.originalPos.column] = this.model.puzzle.cells[swap.finalPos.row][swap.finalPos.column];
            this.model.puzzle.cells[swap.finalPos.row][swap.finalPos.column] = tempCell;
            this.model.swaps.push(swap)
            console.log("swapped: ", swap.originalPos, swap.finalPos)
            this.model.selected = null
            this.model.incrementSwaps();
            this.model.updateScore()
            this.model.checkVictory()
            if (this.model.victory) {
                console.log("victory")
            }
        } else {
            this.model.selected = null
        }
    }
}