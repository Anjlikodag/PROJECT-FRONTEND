import { ProductItem } from "../product-item/ProductItem";

export const ProductList = ({ products, handleProductDelete }) => {
  const onProductDelete = (productId) => {
    handleProductDelete(productId);
  };
  return (
    <ul className="product-list">
      {products.map((product) => (
        <ProductItem product={product} key={product._id} onProductDelete={onProductDelete} />
      ))}
    </ul>
  );
};
