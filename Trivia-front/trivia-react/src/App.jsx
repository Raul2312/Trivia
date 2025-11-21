import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import IndexScreen from "./IndexScreen";
import TriviaScreen from "./TriviaScreen";
import Login from "./Login";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<IndexScreen />} />
        <Route path="/trivia" element={<TriviaScreen />} />
        <Route path ="/login" element ={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
