import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";

export const ProductItem = ({ product, onProductDelete }) => {
  const handleProductDelete = () => {
    onProductDelete(product._id);
  };
  return (
    <li
      key={product._id}
      className={`product-item ${product.isCompleted ? "product-item--completed" : ""}`}
    >
      <div className="product-content">
        {product.product}
      </div>
      <div className="product-action">
        <Link to={"/products/" + product._id}>
          <FontAwesomeIcon icon={faPen} />
        </Link>
        <button onClick={handleProductDelete} className="btn-delete">
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
    </li>
  );
};
