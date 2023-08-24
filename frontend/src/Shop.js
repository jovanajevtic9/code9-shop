import HeaderComponent from "./HeaderComponent";
import {useEffect, useState} from "react";
import axios from "axios";
import ProductCard from "./ProductCard";

const Shop = () => {
    const [products, setProducts] = useState({});
    const fetchProducts = async () => {
        const res = await axios.get("http://localhost:3000/product");
        console.log(res.data)
        setProducts(res.data);
    };

    useEffect(() => {
        // console.log("Post list", typeof orders[0].orderedProducts)
        fetchProducts();
    }, []);

    const renderedProducts = Object.values(products).map((product) => {
        return (
            <div className="col-sm-3 mb-4 mb-sm-0 p-3">
                <ProductCard product={product}/>
            </div>
        );
    });

     return (
         <div>
              <div>
                   <HeaderComponent title="Shop" description="add products to cart"></HeaderComponent>
              </div>
              <div className="container">
                  <div className="row">
                      {renderedProducts}
                  </div>
              </div>
         </div>
     )
}

export default Shop;