import { useState, useRef,  } from "react";
import axios from "axios";

import { ProductList } from "./components/product-list/ProductList"
import "./Products.css";
import { useNavigate } from "react-router-dom";

export const Products = () => {
 const navigate=useNavigate();
  const productRef = useRef();
  const [productItem, setProductItem] = useState({
    name:"", description: "", price:"" ,quantity:"" ,category: ""
  });
  const [products, setProducts] = useState([]);

  const handleProductSubmit = (e) => {
    e.preventDefault();
    if (productItem.name.trim().length === 0 || productItem.description.trim().length === 0 || productItem.price.trim().length===0 ||productItem.quantity.trim().length===0 || productItem.category.trim().length===0) {
      console.error("Empty product is not allowed");
      return;
    }
    const token = localStorage.getItem("accessToken");
    axios
      .post(
        "http://localhost:4001/auth/products",
         productItem ,
        {
          headers: {
            "content-type": "application/json",
            authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        if (response.data.success) {

          const product = response.data.data.products;
          setProducts([...products, product]);
          setProductItem({ name:"", description: "", price:"" ,quantity:"" ,category: ""});
          navigate(`/products/${product._id}`)
        }
       
      })
      .catch((error) => console.error(error));
    
  };

  const updateProductItemData = (e) => {
    setProductItem({
      ...productItem,[e.target.name]:e.target.value
    });
  };

  const handleProductDelete = (productId) => {
    const token = localStorage.getItem("accessToken");
    axios
      .delete(`http://localhost:4001/auth/products/${productId}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.data.success) {
          const filteredProducts = products.filter(({ _id }) => _id !== productId);
          setProducts(filteredProducts);
        }
      })
      .then((error) => console.error(error));
  };

  // useEffect(() => {
  //   const token = localStorage.getItem("accessToken");
  //   axios
  //     .get("http://localhost:4001/auth/products", {
  //       headers: {
  //         authorization: `Bearer ${token}`,
  //       },
  //     })
  //     .then((response) => {
  //       const products = response.data.data.products;
  //       setProducts(products);
   
  //      // console.log(products)
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // }, []);

  return (
    <div className="products">
      <div className="products__header">
        <h1 className="page-title">Products</h1>
      </div>
      <div className="products__body">
        <ProductList products={products} handleProductDelete={handleProductDelete} />
      </div>
      <div className="products__footer">
        <form
          className="product-form spaced-form"
          onSubmit={handleProductSubmit}
          ref={productRef}
        >
          <div className="input-group">
            <label htmlFor="product">Enter Product Name</label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Product Name"
              className="input-control"
              value={productItem.name}
              onChange={updateProductItemData}
            />
          </div>

          <div className="input-group">
            <label htmlFor="product">Enter Product Description</label>
            <input
              type="text"
              name="description"
              id="description"
              placeholder="Product Description"
              className="input-control"
              value={productItem.description}
              onChange={updateProductItemData}
            />
          </div>

          <div className="input-group">
            <label htmlFor="product">Enter Product Price</label>
            <input
              type="text"
              name="price"
              id="price"
              placeholder="Product Price"
              className="input-control"
              value={productItem.price}
              onChange={updateProductItemData}
            />
          </div>

          <div className="input-group">
            <label htmlFor="product">Enter Product Quantity</label>
            <input
              type="text"
              name="quantity"
              id="quantity"
              placeholder="Product quantity"
              className="input-control"
              value={productItem.quantity}
              onChange={updateProductItemData}
            />
          </div>

          <div className="input-group">
            <label htmlFor="product">Enter Product Category</label>
            <input
              type="text"
              name="category"
              id="category"
              placeholder="Product category"
              className="input-control"
              value={productItem.category}
              onChange={updateProductItemData}
            />
          </div>


          <div className="input-group">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
