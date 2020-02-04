import React, { FC } from "react";

interface ScoreProps {
    scoreText: string;
}

export const Score: FC<ScoreProps> = ({scoreText}) => {
    return (
        <div className="ScoreContainer">
            <p className="Score">{scoreText}</p>
        </div>
    )
}