import { useState } from 'react';
import products from '../menu';
import FilterButtonGroup from '../components/FilterButtonGroup';
import ProductOverlay from '../components/ProductOverlay';

const HomePage = () => {
    const [foodTypeFilter, setFoodTypeFilter] = useState("All");
    const [priceFilter, setPriceFilter] = useState("All");
    const [categoryFilter, setCategoryFilter] = useState("All");
    const [onSaleFilter, setOnSaleFilter] = useState("All");
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedProduct, setSelectedProduct] = useState(null);
  
    const filterProducts = () => {
      return products.filter(product => {
        // Apply filters
        if (foodTypeFilter !== "All" && product.foodType !== foodTypeFilter) {
          return false;
        }
        if (priceFilter !== "All") {
          if (priceFilter === "over 20") {
            return parseFloat(product.price) > 20;
          } else {
            const priceRange = priceFilter.split("-");
            const minPrice = parseFloat(priceRange[0]);
            const maxPrice = parseFloat(priceRange[1]);
            const productPrice = parseFloat(product.price);
            return productPrice >= minPrice && productPrice <= maxPrice;
          }
        }
        if (categoryFilter !== "All" && product.category !== categoryFilter) {
          return false;
        }
        if (onSaleFilter !== "All" && (product.onSale === "" && onSaleFilter === "Sale")) {
          return false;
        }
        if (searchTerm.trim() !== "" && !product.title.toLowerCase().includes(searchTerm.toLowerCase())) {
          return false;
        }
        return true;
      });
    };
    const openOverlay = (product) => {
      setSelectedProduct(product);
    };
  
    const closeOverlay = () => {
      setSelectedProduct(null);
    };
  
    return (
      <div className="app">
        <div className="header">
          <h1>Demo Menu</h1>
          <div className="search-category-container">
            <div className="search-container">
              <input
                type="text"
                placeholder="Search Food..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>
            <FilterButtonGroup
              values={['All', 'Appetizer', 'Salad', 'Sashimi', 'Rolls', 'Soup']}
              onClick={setCategoryFilter}
              active={categoryFilter}
              // label="Category"
              isHorizontal={true}
            />
          </div>
        </div>
        <div className="sidebar">
          <FilterButtonGroup
            values={['All', 'Vegetable', 'Fish', 'Chicken', 'Beef']}
            onClick={setFoodTypeFilter}
            active={foodTypeFilter}
            label="Food Type"
          />
          <FilterButtonGroup
          values={['All', '0-5', '5-10', '10-20', 'over 20']} 
          onClick={setPriceFilter}
          active={priceFilter}
          label="Price"
        />
          <FilterButtonGroup
            values={['All', 'Sale']}
            onClick={setOnSaleFilter}
            active={onSaleFilter}
            label="On Sale"
          />
        </div>
        <div className="products">
          {filterProducts().map((product, index) => (
            <div key={index} className="product" onClick={() => openOverlay(product)}>
              {/* <img src={product.img} alt={product.title} /> */}
              <img src={product.img} alt={product.title}/>
              <h2>{product.title}</h2>
              {/* <p>{product.description}</p> */}
              {/* <p>Price: ${product.price}</p> */}
              {product.onSale ? <>Price: <del>${product.price}</del></>: <span>Price: ${product.price}</span>}

              {product.onSale && <p>Sale Price: ${product.onSale}</p>}
            </div>
          ))}
        </div>
        {selectedProduct && <ProductOverlay product={selectedProduct} onClose={closeOverlay} />}
      </div>
    );
}

export default HomePage