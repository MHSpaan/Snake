import { SnakeHead } from "./hooks/useSnake";

export const STAGE_WIDTH: number = 30;
export const STAGE_HEIGHT: number = 20;

export const createStage = () => {
    return Array(STAGE_WIDTH).fill(0).map((a) => Array(STAGE_HEIGHT).fill(0))
}

export const checkCollission = (snakeHead: SnakeHead, stage: (string|number)[][], { x: moveX, y: moveY }: { x: number, y: number }) => {
    if (snakeHead.x + moveX > stage.length-1 || snakeHead.y + moveY > stage[0].length-1 ||
        snakeHead.x + moveX < 0 || snakeHead.y + moveY < 0)
        return true;

}

export const getRandomCandy = (stage: any[][]) => {
    let noCandy: boolean = true;
    while (noCandy) {
        let posX = Math.floor(Math.random() * STAGE_WIDTH);
        let posY = Math.floor(Math.random() * STAGE_HEIGHT);
        if (stage[posX][posY] === 0) {
            noCandy = false;
            stage[posX][posY] = 'C';
        }
    }
    return stage;
}