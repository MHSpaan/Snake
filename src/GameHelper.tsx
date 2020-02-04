import { SnakeHead } from "./hooks/useSnake";

export const STAGE_WIDTH: number = 30;
export const STAGE_HEIGHT: number = 20;

export const createStage = () => {
    return Array(STAGE_WIDTH).fill(0).map((a) => Array(STAGE_HEIGHT).fill(0));
    // Creates the stage with the width and height
}

export const checkCollission = (snakeHead: SnakeHead, stage: (string|number)[][], { x: moveX, y: moveY }: { x: number, y: number }) => {
    if (snakeHead.x + moveX > stage.length-1 ||
        snakeHead.y + moveY > stage[0].length-1 ||
        snakeHead.x + moveX < 0 || 
        snakeHead.y + moveY < 0 ||
        stage[snakeHead.x + moveX][snakeHead.y + moveY] === "B")
        return true;
        // Checks if the snake head touches either of the walls or it's own body
}

export const getRandomCandy = (stage: any[][]) => {
    let candy: boolean = false;
    while (!candy) {
        let posX = Math.floor(Math.random() * STAGE_WIDTH);
        let posY = Math.floor(Math.random() * STAGE_HEIGHT);
        if (stage[posX][posY] === 0) {
            candy = true;
            stage[posX][posY] = 'C';
        }
    }
    // spawn random candy in empty cell. Might make it slow as it can fail to find correct spot multiple times
    return stage;
}