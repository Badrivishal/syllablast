'use client'
import React from "react";
import { Model } from "../model";
import { config1, config2, config3 } from "../puzzle";
import { PuzzleApp } from "../boundary";
import { ResetController } from "../controllers";

var puzzle = config1;

export default function Home() {
  const [model, setModel] = React.useState(new Model(config1))
  const [redraw, setRedraw] = React.useState(0)
  
  function refresh() {
    setRedraw(redraw+1)
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="div title"> </div>
      <label className="label title">Syllablast App</label>
      <PuzzleApp topmodel={model} setModel={setModel} redraw={refresh}/>

      
    </main>
  );
}
