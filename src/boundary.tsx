'use client'
import React from 'react'
import { config1, config2, config3 } from './puzzle'
import { ResetController, SwapController, UndoController } from './controllers'
import { Model, Swap, Position } from './model'
import gameOverImage from './app/assets/images/game-over.png'
import youWinImage from './app/assets/images/you-win.png'

// redraw is a function
export function PuzzleApp({topmodel, setModel, redraw}) {

    function handleClick(r:number, c:number) {
        console.log("clicked on: ", r, c)
        if(!topmodel.selected){
          topmodel.selected = new Position(r, c)
        }
        else{
          let swapController = new SwapController(topmodel)
          let originalPos = topmodel.selected
          let finalPos = new Position(r, c)
          
          swapController.swap(new Swap(originalPos, finalPos))
          topmodel = swapController.model
          setModel(swapController.model)
        }
        console.log(topmodel.selected);
        console.log(gameOverImage)
        updateCellColors();
        // document.getElementById("p2").style.color="blue";
        // let board = topmodel.board
        // board.syllables[r][c] = 'x' + board.syllables[r][c] 
        redraw();
      }

    function updateCellColors(){
      if (topmodel.selected){
        const cell = document.getElementsByClassName("c" + topmodel.selected.row + topmodel.selected.column)[0]
        if (cell){
          cell.style.borderColor = "#ffde59";
          // cell.style.borderInlineWidth = "3px";
        }
      }
      else{
        for (let i = 0; i < 4; i++) {
          for (let j = 0; j < 4; j++) {
            const cell = document.getElementsByClassName("c" + i + j)[0];
            if (cell) {
                cell.style.borderColor = "#000000";
            }
          }
        }
      }
      for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
          if (topmodel.solvedSpaces[i][j]){
            const cell = document.getElementsByClassName("c" + i + j)[0];
            if (cell) {
                cell.style.backgroundColor = "#7ed957";
            }
          }else{
            const cell = document.getElementsByClassName("c" + i + j)[0];
            if (cell) {
                cell.style.backgroundColor = "#ffffff";
            }
        }
      }
      }
      if (topmodel.victory){
        document.getElementById("overlay").style.display = "block";
        document.getElementById("gameOverImage").style.display = "block";
        document.getElementsByClassName("undoButton")[0].style.display = "none";
        document.getElementsByClassName("resetButton")[0].textContent = "Play Again";
      }
      else{
        document.getElementById("overlay").style.display = "none";
        document.getElementById("gameOverImage").style.display = "none";
        document.getElementsByClassName("undoButton")[0].style.display = "block";
        document.getElementsByClassName("resetButton")[0].textContent = "Reset";
      }
    }

    function handleReset() {
      let resetController = new ResetController(topmodel);
      resetController.resetPuzzle(topmodel.config);
      setModel(resetController.model);
      topmodel = resetController.model;
      updateCellColors();
      redraw();
    }

    function handleUndo() {
      let undoController = new UndoController(topmodel);
      undoController.undo();
      setModel(undoController.model);
      topmodel = undoController.model
      updateCellColors();
      redraw();
    }

    function handleChangeConfiguration(e){
      let resetController = new ResetController(topmodel);
      if (e.target.value === "1"){
        resetController.resetPuzzle(config1);
      }
      else if (e.target.value === "2"){
        resetController.resetPuzzle(config2);
      }
      else if (e.target.value === "3"){
        resetController.resetPuzzle(config3);
      }
      setModel(resetController.model);
      topmodel = resetController.model
      updateCellColors();
      redraw();

    }


      return (
        <>
        
      <label className="label selectConfiguration">Select Configuration:</label>
      <select className="select configuration" onChange={(e) => { handleChangeConfiguration(e) }}>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
      </select>
      <div id="overlay"></div>
      <div id="image gameOverImage">
        <img id="gameOverImage" src={youWinImage.src} alt="Game Over"  />
      </div>
      <div className="div scoreRow">
        <label className="label numSwaps">Moves: {topmodel.numSwaps}</label>
        <div className='padBetween'></div>
        <label className="label score">Score: {topmodel.score}</label>
      </div>
      <div className="div puzzleGrid">
        <div className="div puzzleRow">
          <button className="button gridCell c00" onClick={() => handleClick(0, 0)}>{topmodel.puzzle.cells[0][0].syllable}</button>
          <button className="button gridCell c01" onClick={() => handleClick(0, 1)}>{topmodel.puzzle.cells[0][1].syllable}</button>
          <button className="button gridCell c02" onClick={() => handleClick(0, 2)}>{topmodel.puzzle.cells[0][2].syllable}</button>
          <button className="button gridCell c03" onClick={() => handleClick(0, 3)}>{topmodel.puzzle.cells[0][3].syllable}</button>
        </div>
        <div className="div puzzleRow">
          <button className="button gridCell c10" onClick={() => handleClick(1, 0)}>{topmodel.puzzle.cells[1][0].syllable}</button>
          <button className="button gridCell c11" onClick={() => handleClick(1, 1)}>{topmodel.puzzle.cells[1][1].syllable}</button>
          <button className="button gridCell c12" onClick={() => handleClick(1, 2)}>{topmodel.puzzle.cells[1][2].syllable}</button>
          <button className="button gridCell c13" onClick={() => handleClick(1, 3)}>{topmodel.puzzle.cells[1][3].syllable}</button>
        </div>
        <div className="div puzzleRow">
          <button className="button gridCell c20" onClick={() => handleClick(2, 0)}>{topmodel.puzzle.cells[2][0].syllable}</button>
          <button className="button gridCell c21" onClick={() => handleClick(2, 1)}>{topmodel.puzzle.cells[2][1].syllable}</button>
          <button className="button gridCell c22" onClick={() => handleClick(2, 2)}>{topmodel.puzzle.cells[2][2].syllable}</button>
          <button className="button gridCell c23" onClick={() => handleClick(2, 3)}>{topmodel.puzzle.cells[2][3].syllable}</button>
        </div>
        <div className="div puzzleRow">
          <button className="button gridCell c30" onClick={() => handleClick(3, 0)}>{topmodel.puzzle.cells[3][0].syllable}</button>
          <button className="button gridCell c31" onClick={() => handleClick(3, 1)}>{topmodel.puzzle.cells[3][1].syllable}</button>
          <button className="button gridCell c32" onClick={() => handleClick(3, 2)}>{topmodel.puzzle.cells[3][2].syllable}</button>
          <button className="button gridCell c33" onClick={() => handleClick(3, 3)}>{topmodel.puzzle.cells[3][3].syllable}</button>
        </div>
      </div>
      <div className="div undoResetRow">
        <button className="button undoButton" onClick={() => handleUndo()}>Undo</button>
        <button className="button resetButton" onClick={() => handleReset()}>Reset</button>
      </div>
      <div id="gameOver">
        <label className="label gameOver">Game Over!</label> 
      </div>
      </>
      )
    }


{/* export function boardGUI(model: Model, canvas: HTMLCanvasElement | null) {

    

    if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            let nr = model.puzzle.numRows;
            let nc = model.puzzle.numColumns;

            ctx.fillStyle = 'Blue';
            ctx?.fillRect(0, 0, 10*nc, 10*nr);
        }
    }
} */}