import React, { FC, useEffect, useState } from 'react';
import './Stage.css';

interface CellProps {
    cell: (number | string);
}

export const Cell: FC<CellProps> = ({cell}) => {
    const [content, setContent]= useState(cell);
    useEffect(() => {
        setContent(cell);
    }, [cell])
    return (
        <div className={`Cell Cell-${content === "S" ? "Snake" : content === "B" ? "Body" : content==="C" ? "Candy" : "Empty"}`}></div>
    )
}