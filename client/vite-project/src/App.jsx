import { BrowserRouter as Routers, Routes, Route } from "react-router-dom";
import Login from "./components/login";
import Signup from "./components/signUp";
import LLMChat from "./components/llmChat";


function App() {
  return (
    <Routers>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/llm-chat" element={<LLMChat />} />
      </Routes>
    </Routers>
  );
}

export default App;