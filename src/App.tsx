import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router'
import TodoList from './pages/TodoList'
import ChessBoard from './pages/ChessBoard'

const App :React.FC= () => {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/todolist" element={<TodoList />} />
          <Route path="/" element={<ChessBoard />} />
        </Routes>
    </BrowserRouter>
  )
}

export default App