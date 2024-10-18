import { Route, Routes } from "react-router-dom";
import Layout from "./layout/Layout";
import Home from "./pages/Home/Home";
import "./App.css";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import Cabinet from "./pages/Cabinet/Cabinet";
import Sharing from "./components/CabinetPage/Sharing/Sharing";
import Parameters from "./components/CabinetPage/Parameters/Parameters";
import Activity from "./components/CabinetPage/Activity/Activity";
import AddProduct from "./pages/AddProduct/AddProduct";
import AllProducts from "./pages/AllProducts/AllProducts";
import PrivateRoute from "./components/Auth/PrivateRoute/PrivateRoute";
import AboutUs from "./pages/AboutUs/AboutUs";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="product/:id" element={<ProductDetails />} />
        <Route path="haqqimizda" element={<AboutUs />} />
        <Route path="cabinet" element={<PrivateRoute element={<Cabinet />} />}>
          <Route path="elanlar" element={<Sharing />} />
          <Route path="parametrler" element={<Parameters />} />
          <Route path="aktivlik" element={<Activity />} />
        </Route>
        <Route path="cabinet/elan-yerlesdir" element={<AddProduct />} />
        <Route path="allproducts" element={<AllProducts />} />
      </Route>
    </Routes>
  );
}

export default App;
