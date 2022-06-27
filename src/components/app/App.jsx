import { Routes, Route } from "react-router-dom";
import { Products } from "../products/Products";
import { ProductEdit } from "../products/components/product-edit/ProductEdit";
import { Showproducts } from "../showproducts/Showproducts";
import { Navbar } from "../common/navbar/Navbar";
import { SignIn } from "../sign-in/SignIn";
import { SignUp } from "../sign-up/SignUp";
import "./App.css";

const App = () => {
  return (
    <div className="app">
      <header className="header">
        <Navbar />
      </header>
      <main className="main">
        <Routes>
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductEdit />} />
          <Route path="/showproducts" element={<Showproducts />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/" element={<h1>WELL-COME</h1>} />
          
        </Routes>
      </main>
    </div>
  );
};

export default App;
