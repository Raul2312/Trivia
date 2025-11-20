import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import IndexScreen from "./IndexScreen";
import TriviaScreen from "./TriviaScreen";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<IndexScreen />} />
        <Route path="/trivia" element={<TriviaScreen />} />
      </Routes>
    </Router>
  );
}

export default App;
