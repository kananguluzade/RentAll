import { Route, Routes } from "react-router-dom";
import Layout from "./layout/Layout";
import Home from "./pages/Home/Home";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
      </Route>
    </Routes>
  );
}

export default App;
