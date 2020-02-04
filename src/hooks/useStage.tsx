import { SnakeHead, SnakeBody } from './useSnake';
import { useState, useEffect } from 'react';
import { createStage, getRandomCandy } from '../GameHelper';

export const useStage = (head: SnakeHead, body: SnakeBody) => {
    const [stage, setStage] = useState(createStage());
    const [candy, setCandy] = useState(false);
    const [score, setScore] = useState(0);

    const updateStage = (prevStage: any[][]) => {
        if (!candy) {
            setStage(getRandomCandy(stage));
            setCandy(true);
            // if no candy, spawn a candy
        }
        const newStage = prevStage.map<any[]>((row: any[]) => (
            row.map<any>((cell: any) => cell === 'C' ? cell : 0)
        ))
        // clone the current Stage

        if (newStage[head.x][head.y] === 'C') {
            body.pos.push({ x: head.x, y: head.y });
            // add body fragment to the end of the body array
            setScore((prev) => prev + 1);
            setCandy(false)
            // setCandy to false so the next time the stage gets updated a new candy will spawn
        }
        newStage[head.x][head.y] = 'S';
        // set the new position for the Head
        body.pos.forEach((body) => {
            newStage[body.x][body.y] = 'B'
        });
        // set the position of the body parts

        return newStage;
        // return the updated stage
    }

    useEffect(() => {
        setStage((prev) => updateStage(prev));
    }, [head])

    return { stage, setStage, score, setScore };
}