import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
//import { Navigate } from "react-router-dom";


export const Showproducts = () => {

  const [product, setProduct] = useState([]);

  const handleonSubmit = (e) => {
    e.preventDefault();
  }

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    axios
      .get("http://localhost:4001/auth/products", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const products = response.data.data.products;
        setProduct(products);

      })
      .catch((error) => {
        console.error(error);
      });
  }, []);


const onDelete=(id) => {
  const token = localStorage.getItem("accessToken");
  //console.log(id);
    axios.delete(`http://localhost:4001/auth/products/${id}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if(response.data.success){
          const filter=product.filter(({_id})=> _id !==id)
          setProduct(filter)
        }

})
}

  return (
    <div className='product'>
      <div className="products_header">
        <h1 className='page-title'>You will Get All Productslist Here..!</h1>
      </div>
      <div className="products_footer">
        <form className='product-form spaced-form'
          onSubmit={(e) => handleonSubmit(e)}

        >

          <div className='map' >
            {product.map((product) => (

              <li key={product._id}>
                <h3>{product.name}</h3>
                <div>
                  <h5>Category:{product.category}</h5>
                  <p>Description :{product.description}</p>
                  <p>Quantity:{product.quantity}</p>
                </div>
                <span>
                  <button className='btn-btn-delete' 
                  onClick={()=> onDelete(product._id)}
                  >Delete</button>
                  </span>

                
                
              </li>
            ))}
          </div>

          <div className="input-group">
            <button type='submit' className='btn btn-primary'
              onClick={handleonSubmit} >
              All products
            </button>
          </div>
        </form>
      </div>
    </div >
  )

            
          }