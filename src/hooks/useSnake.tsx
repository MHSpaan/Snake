import { useState } from "react";
import { STAGE_WIDTH, STAGE_HEIGHT } from "../GameHelper";

export interface SnakeHead {
    x: number;
    y: number;
}

export interface SnakeBody {
    pos: { x: number, y: number }[]
    
}

export const useSnake = () => {

    const [snakeHead, setSnakeHead] = useState({
        x: Math.round(STAGE_WIDTH / 2),
        y: Math.round(STAGE_HEIGHT / 2)
    });
    
    const [snakeBody, setSnakeBody] = useState({
        pos: [{ x: snakeHead.x, y: snakeHead.y },
        { x: snakeHead.x, y: snakeHead.y }]
    });

    const updateSnakePos = ({ x, y }: SnakeHead) => {
        let newSnakeBody: SnakeBody = JSON.parse(JSON.stringify(snakeBody))
        newSnakeBody.pos.unshift({x: snakeHead.x, y: snakeHead.y});
        newSnakeBody.pos.pop();
        setSnakeBody(newSnakeBody);

        setSnakeHead((prev: SnakeHead) => ({
            ...prev,
            x: prev.x + x, y: prev.y + y
        }))
    }

    return { snakeHead, updateSnakePos, snakeBody, setSnakeHead, setSnakeBody };
}