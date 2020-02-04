import React, { FC } from 'react';

interface StartButtonProps {
    startGame: () => void;
}

export const StartButton: FC<StartButtonProps> = ({startGame}) => {
    return (
        <button className="StartButton" onClick={startGame}>Start Game</button>
    )
}