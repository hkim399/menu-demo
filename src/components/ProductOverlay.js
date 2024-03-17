const ProductOverlay = ({ product, onClose }) => {
  return (
<div className="overlay" onClick={onClose}>
    <div className="overlay-content" onClick={e => e.stopPropagation()}>
      <span className="close" onClick={onClose}>&times;</span>
      <img src={product.img} alt={product.title} />
      <h2>{product.title}</h2>
      <p>{product.description}</p>
      <p><b>Category:</b> {product.category}</p>
      <p><b>Food Type:</b> {product.foodType}</p>
    </div>
  </div>  )
}

export default ProductOverlay