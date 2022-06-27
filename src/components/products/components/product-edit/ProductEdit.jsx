import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export const ProductEdit = () => {
  const navigate = useNavigate();
  const [product, setProduct] = useState({ name: "", description: "", price: "", quantity: "", category: "" });
  const { id: productId } = useParams();

  // const removeItem=(productId)=> {

  // };


  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    axios
      .get(`http://localhost:4001/auth/products/${productId}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.data.success) {
          setProduct(response.data.data.Product);
        }
      })
      .catch((error) => console.error(error));
  }, [productId]);

  const handleProductEdit = (e) => {
    e.preventDefault();
    if (product.name.trim().length === 0) {
      console.error("Empty product is not allowed");
      return;
    }
    const token = localStorage.getItem("accessToken");
    axios
      .put(`http://localhost:4001/auth/products/${product._id}`, product, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.data.success) {
          navigate("/products");
        }
      })
      .catch((error) => console.error(error));
  };

  const handleOnChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  return (
    <form className="product-form spaced-form" onSubmit={handleProductEdit}>
      <div className="input-group">
        <label htmlFor="product">Enter the name of the product</label>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="product name"
          className="input-control"
          value={product.name}
          onChange={handleOnChange}
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
          value={product.description}
          onChange={handleOnChange}
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
          value={product.price}
          onChange={handleOnChange}
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
          value={product.quantity}
          onChange={handleOnChange}
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
          value={product.category}
          onChange={handleOnChange}
        />
      </div>




      <div className="input-group">
        <button type="submit" className="btn btn-primary">
          Update
        </button>


      </div>
    </form>
  );
};
