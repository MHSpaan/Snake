import React, { FC, KeyboardEvent, useState } from "react";
import { ScoreScreen } from "../Score/ScoreScreen";
import './Snake.css';
import { useSnake } from "../../hooks/useSnake";
import { useInterval } from "../../hooks/useInterval";
import { useStage } from "../../hooks/useStage";
import { Stage } from "../Stage/Stage";
import { checkCollission, createStage } from "../../GameHelper";

interface SnakeProps {

}

export const Snake: FC<SnakeProps> = () => {
    const [direction, setDirection] = useState({ x: 0, y: 0 });
    const { snakeHead, updateSnakePos, snakeBody, resetSnake } = useSnake();
    const { stage, setStage, score, setScore } = useStage(snakeHead, snakeBody);
    const [gameOver, setGameOver] = useState(false);
    const [disableInput, setDisableInput] = useState(true);
    const [level, setLevel] = useState(1);
    const [timeOut, setTimeOut] = useState<any>((100 / level) + 100);

    const moveSnake = () => {
        if (score === 5) {
            setLevel((prev) => prev + 1);
            setScore(0);
            setTimeOut(200 - (10 * level));
            // Increase speed after every 5 blocks eaten
        }
        if (direction.x !== 0 || direction.y !== 0) {

            if (!checkCollission(snakeHead, stage, direction)) {
                updateSnakePos({ ...direction })
                setDisableInput(true);
            } else {
                setTimeOut(null);
                setGameOver(true);
            }
        }
    }

    const startGame = () => {
        setScore(0);
        setTimeOut(null);
        setDirection({ x: 0, y: 0 });
        setLevel(1);
        resetSnake();
        setStage(createStage());
        setGameOver(false);
        // Not Working yet.
    }

    useInterval(() => moveSnake(), timeOut);

    const changeDirection = (a: KeyboardEvent<HTMLDivElement>) => {
        if (!gameOver) {
            switch (a.keyCode) {
                // Arrow keys determine direction to move, setDisableInput disables input until snake moved atleast one square
                case (37):
                    if (direction.x === 0 && disableInput) (setDirection({ x: -1, y: 0 }))
                    setDisableInput(false);
                    break;
                case (38):
                    if (direction.y === 0 && disableInput) (setDirection({ x: 0, y: -1 }))
                    setDisableInput(false);
                    break;
                case (39):
                    if (direction.x === 0 && disableInput) (setDirection({ x: 1, y: 0 }))
                    setDisableInput(false);
                    break;
                case (40):
                    if (direction.y === 0 && disableInput) (setDirection({ x: 0, y: 1 }))
                    setDisableInput(false);
                    break;
            }
        }
    }

    return (
        <div className="SnakeContainer" tabIndex={0} onKeyDown={(a) => changeDirection(a)}>
            <ScoreScreen startGame={startGame} gameOver={gameOver} scoreText={`${gameOver ? "GameOver" : `Level: ${level}`}`} />
            <Stage board={stage} />
        </div>
    )
}