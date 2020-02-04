import { useState, useCallback } from "react";
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
        //Places the head in the middle
    });
    
    const [snakeBody, setSnakeBody] = useState({
        pos: [{ x: snakeHead.x, y: snakeHead.y },
        { x: snakeHead.x, y: snakeHead.y }]
        // places 2 body elements in the same position as the head
    });

    const updateSnakePos = ({ x, y }: SnakeHead) => {
        let newSnakeBody: SnakeBody = JSON.parse(JSON.stringify(snakeBody))
        newSnakeBody.pos.unshift({x: snakeHead.x, y: snakeHead.y});
        newSnakeBody.pos.pop();
        setSnakeBody(newSnakeBody);
        // Updates the position of the snake body by adding x,y object to start of body array and removing the last one
        setSnakeHead((prev: SnakeHead) => ({
            ...prev,
            x: prev.x + x, y: prev.y + y
        }))
        //updates the position of the snake head
    }

    const resetSnake = useCallback(() => {
        setSnakeHead({
            x: Math.round(STAGE_WIDTH / 2),
            y: Math.round(STAGE_HEIGHT / 2)
        });
        setSnakeBody({
            pos: [{ x: snakeHead.x, y: snakeHead.y },
            { x: snakeHead.x, y: snakeHead.y }]
        })
        // Reset to be used when restarting the stage
    }, [])

    return { snakeHead, updateSnakePos, snakeBody, resetSnake };
}