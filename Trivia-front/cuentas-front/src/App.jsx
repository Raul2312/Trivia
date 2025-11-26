import './App.css'
import{Route,Routes, BrowserRouter} from 'react-router-dom'
import Home from './views/Home'
import Login from './views/Login'
import Dashboard from './views/dashboard'
import Users from './views/users'
import IndexScreen from './views/IndexScreen'
import TriviaScreen from './views/TriviaScreen'
export default function App(){

  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<IndexScreen /> } />
        <Route path="/trivia" element={<TriviaScreen /> } />
        <Route path='/login' element={<Login />} />
        <Route path='/admin' element={<Dashboard/>} >
              <Route index element={<Home/>}/>
              <Route path='users' element={<Users/>}/>

        </Route>
      </Routes>
    </BrowserRouter>
  )
}