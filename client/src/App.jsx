import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Navbar from './components/Navbar'
import TaskList from './pages/TaskList';
import CreateTask from './pages/CreateTask';
import EditTask from './pages/EditTask';


function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <div className="container mt-4">
          <Routes>
            <Route path='/' element={<TaskList />} />
            <Route path='/create' element={<CreateTask />} />
            <Route path='/edit/:id' element={<EditTask />} />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App
