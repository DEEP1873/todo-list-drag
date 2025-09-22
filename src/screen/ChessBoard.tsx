import React from 'react'
import Chess from '../components/Chess'

import chessimg from "../assets/chessbackground5.avif"


const ChessBoard :React.FC= () => {
  return (
    <div className=' h-screen relative  '>
      <img src={chessimg} alt="" className='w-full h-full object-cover' />
      <Chess/>
    </div>
  )
}

export default ChessBoard