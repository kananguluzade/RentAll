import { Route, Routes } from "react-router-dom";
import Layout from "./layout/Layout";
import Home from "./pages/Home/Home";
import "./App.css";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Cabinet from "./pages/Cabinet/Cabinet";
import Sharing from "./components/CabinetPage/Sharing/Sharing";
import Parameters from "./components/CabinetPage/Parameters/Parameters";
import Activity from "./components/CabinetPage/Activity/Activity";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="product/:id" element={<ProductDetails />} />
        <Route path="cabinet" element={<PrivateRoute element={<Cabinet />} />}>
          <Route path="elanlar" element={<Sharing />} />
          <Route path="parametrler" element={<Parameters />} />
          <Route path="aktivlik" element={<Activity />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
