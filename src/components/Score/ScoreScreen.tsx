import React, { FC } from 'react';
import { StartButton } from './StartButton';
import { Score } from './Score';
import './Score.css';

interface ScoreScreenProps {
    scoreText: string;
    startGame: () => void;
    gameOver: boolean
}

export const ScoreScreen: FC<ScoreScreenProps> = ({scoreText, startGame, gameOver}) => {
    return (
        <div className='ScoreScreenContainer'>
        {gameOver ? <StartButton startGame={startGame}/> : null}
        <Score scoreText={scoreText}/>
        </div>
    )
}