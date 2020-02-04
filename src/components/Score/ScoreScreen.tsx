import React, { FC } from 'react';
import { StartButton } from './StartButton';
import { Score } from './Score';
import './Score.css';

interface ScoreScreenProps {
    scoreText: string;
    startGame: () => void;
}

export const ScoreScreen: FC<ScoreScreenProps> = ({scoreText, startGame}) => {
    return (
        <div className='ScoreScreenContainer'>
        <StartButton startGame={startGame}/>
        <Score scoreText={scoreText}/>
        </div>
    )
}