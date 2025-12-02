import './App.css'
import{Route,Routes, BrowserRouter} from 'react-router-dom'
import Home from './views/Home'
import Login from './views/Login'
import Dashboard from './views/dashboard'
import Users from './views/users_dashboard'
import IndexScreen from './views/IndexScreen'
import TriviaScreen from './views/TriviaScreen'
import Preguntas_dashboard from './views/preguntas_dashboard'
import Trivias_dashboard from './views/trivias_dashboard'
import Categorias_dashboard from './views/categorias_dashboard'
import Respuestas_dashboard from './views/respuestas_dashboard'
import ResultsScreen from './views/ResultsScreen';
export default function App(){

  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login /> } />
      
        <Route path='/login' element={<Login />} />
  
          <Route path='/indexscreen' element={<IndexScreen />} />  
          <Route path="/categorias/:id" element={<TriviaScreen />} />
          <Route path="/trivia" element={<TriviaScreen /> } />
          <Route path="/resultados" element={<ResultsScreen />} />
          <Route path='/admin' element={<Dashboard/>} >
              <Route index element={<Home/>}/>
              <Route path='users' element={<Users/>}/>
              <Route path='preguntas' element={<Preguntas_dashboard/>}/>
              <Route path='trivias' element={<Trivias_dashboard/>}/>
              <Route path='categorias' element={<Categorias_dashboard/>}/>
              <Route path='respuestas' element={<Respuestas_dashboard/>}/>
       


        </Route>
      </Routes>
    </BrowserRouter>
  )
}