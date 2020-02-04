import { SnakeHead, SnakeBody } from './useSnake';
import { useState, useEffect } from 'react';
import { createStage, getRandomCandy } from '../GameHelper';

export const useStage = (head: SnakeHead, body: SnakeBody) => {
    const [stage, setStage] = useState(createStage());
    const [candy, setCandy] = useState(false);
    const [score, setScore] = useState(0);

    const updateStage = (prevStage: any[][]) => {
        if (!candy) {
            setCandy(true);
            setStage(getRandomCandy(stage));
        }
        const newStage = prevStage.map<any[]>((row: any[]) => (
            row.map<any>((cell: any) => cell==='C' ? cell : 0)
        ))
        if (newStage[head.x][head.y] === 'C') {
            body.pos.push({x: head.x, y: head.y});
            setScore((prev) => prev + 1);
            setCandy(false)
        }
        newStage[head.x][head.y] = 'S';
        body.pos.forEach((body) => {
            newStage[body.x][body.y] = 'B'
        });
        return newStage;
    }

    useEffect(() => {
        setStage((prev) => updateStage(prev));
    }, [head, body])

    return {stage, setStage, setCandy, score, setScore};
}