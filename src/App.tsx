import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router'
import TodoList from './screen/TodoList'
import ChessBoard from './screen/ChessBoard'
import StairsBetFurry from './screen/stairsbetfurry/StairsBetFurry'

const App :React.FC= () => {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/todolist" element={<TodoList />} />
          <Route path="/" element={<ChessBoard />} />
          <Route path='/stairsbetfurry' element={<StairsBetFurry/>}/>

        </Routes>
    </BrowserRouter>
  )
} 

export default App