import React, { FC, KeyboardEvent, useState, useEffect } from "react";
import { ScoreScreen } from "../Score/ScoreScreen";
import './Snake.css';
import { useSnake } from "../../hooks/useSnake";
import { useInterval } from "../../hooks/useInterval";
import { useStage } from "../../hooks/useStage";
import { Stage } from "../Stage/Stage";
import { checkCollission, createStage, STAGE_WIDTH, STAGE_HEIGHT } from "../../GameHelper";

interface SnakeProps {

}

export const Snake: FC<SnakeProps> = () => {
    const [direction, setDirection] = useState({ x: 0, y: 0 });
    const { snakeHead, updateSnakePos, snakeBody, setSnakeBody, setSnakeHead } = useSnake();
    const { stage, setStage, setCandy, score, setScore } = useStage(snakeHead, snakeBody);
    const [gameOver, setGameOver] = useState(false);
    const [timeOut, setTimeOut] = useState<any>(null);
    const [inputMove, setInputMove] = useState(true);

    const moveSnake = () => {
        if (!checkCollission(snakeHead, stage, direction)) {
            updateSnakePos({ ...direction })
            setInputMove(true);
        } else {
            setTimeOut(null);
            setGameOver(true);
        }
    }

    const startGame = () => {
        setScore(0);
        setTimeOut(null);
        setDirection({x:0, y:0});
        setStage(createStage());
        setSnakeHead({
            x: Math.round(STAGE_WIDTH / 2),
            y: Math.round(STAGE_HEIGHT / 2)
        });
        setSnakeBody({
            pos: [{ x: snakeHead.x, y: snakeHead.y },
            { x: snakeHead.x, y: snakeHead.y }]
        })
        
    }

    useInterval(() => moveSnake(), timeOut);

    const changeDirection = (a: KeyboardEvent<HTMLDivElement>) => {
        if (timeOut === null && !gameOver) {
            setTimeOut(200);
        }
        switch (a.keyCode) {
            case (37): 
                if (direction.x === 0 && inputMove) (setDirection({ x: -1, y: 0 }))
                break;
            case (38): 
                if (direction.y === 0 && inputMove) (setDirection({ x: 0, y: -1 }))
                break;
            case (39): 
                if (direction.x === 0 && inputMove) (setDirection({ x: 1, y: 0 }))
                break;
            case (40): 
                if (direction.y === 0 && inputMove) (setDirection({ x: 0, y: 1 }))
                break;
        }
        setInputMove(false);
    }

    return (
        <div className="SnakeContainer" tabIndex={0} onKeyDown={(a) => changeDirection(a)}>
            <ScoreScreen startGame={startGame} scoreText={`${gameOver ? "GameOver": `Score: ${score}`}`}/>
            <Stage board={stage} />
        </div>
    )
}