import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// import IndexScreen from "./IndexScreen";
// import TriviaScreen from "./TriviaScreen";
// import Login from "./views/Login";
import Dashboard from "./views/dashboard";
function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<IndexScreen />} />
        <Route path="/trivia" element={<TriviaScreen />} />
        <Route path ="/login" element ={<Login />} /> */}
        <Route path ="/admin" element ={<Dashboard />} />
      
      </Routes>
    </Router>
  );
}

export default App;
