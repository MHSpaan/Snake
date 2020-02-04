import React, { FC } from "react";
import { Cell } from "./Cell";
import './Stage.css';

interface StageProps { 
    board: any[][]
}

export const Stage: FC<StageProps> = ({board}) => {
    return (
        <div className="BoardContainer">
            {board.map((row, index) => (
                <div key={index} className="RowContainer">
                {row.map((cell, x) =>( <Cell key={x} cell={cell}/>)
                )}
                </div>
            ))}
        </div>
    )
}