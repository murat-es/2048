import React, { useEffect, useState } from 'react'

const Tile = (tileNumber) => {
    const [number, setNumber] = useState(null);

    useEffect(() => {
       setNumber(tileNumber)

      }, []);

    const colorClass = ''

    return (
    <div className='tile'>{number}</div>
  )
}

export default Tile