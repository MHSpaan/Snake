import React, { FC, useEffect } from 'react';
import './Stage.css';

interface CellProps {
    cell: (number | string);
}

export const Cell: FC<CellProps> = ({cell}) => {
    useEffect(() => {
    }, [cell])
    return (
        <div className={`Cell Cell-${cell === "S" ? "Snake" : cell === "B" ? "Body" : cell==="C" ? "Candy" : "Empty"}`}></div>
    )
}