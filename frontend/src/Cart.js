import axios from "axios";
import HeaderComponent from "./HeaderComponent";
import {useEffect, useState} from "react";

const CartList = ({product}) => {
    const [products, setProducts] = useState([]);
    const [productPrices, setProductPrices] = useState({});

    const getProductPriceAndName = async (id) => {
        const res = await axios.get(`http://localhost:3000/product/${id}`);
        if (res) {
            const product = res.data;
            return {price: product.price, name: product.name};
        }
        return 0; // Default value if price retrieval fails
    };

    useEffect(() => {
        fetchCart();
    }, []);

    useEffect(() => {
        if (products.length !== 0) {
            fetchProductPrices();
        }
    }, [products]); // Listen for changes to the products state

    const fetchProductPrices = async () => {
        const newProductPricesAndNames = {};
        if (products.length !== 0 ) {
            for (const product of products) {
                newProductPricesAndNames[product.productId] = await getProductPriceAndName(product.productId);
            }
            setProductPrices(newProductPricesAndNames);
        }
    };
    const fetchCart = async ()=> {
        const res = await axios.get(`http://localhost:3001/cart/`);
        if (res) {
            setProducts(res.data);
        }
    };

    const totalPrice =  () => {
        let totalPrice = 0;
        for (const product of products) {
            const {price} = productPrices[product.productId] || 0;
            totalPrice += price * product.quantity;
        }
        return totalPrice;
    };

    const removeProductFromCart = async (id) => {
        await axios.delete(`http://localhost:3001/cart/remove-product/${id}`);
        fetchCart();
    }

    const order = async () => {
        await axios.post(`http://localhost:3002/order`, {
            orderedProducts: products,
        });
    }

    const renderedProducts = Object.values(products).map((product) => {
        const productPrice = productPrices[product.productId]?.price || 0;
        return (
            <div className="col-sm-3 mb-4 p-3" key={product.productId}>
                <div className="card">
                    <img src={`/images/img-product-id-${product.productId}.jpg`} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{product.productName}</h5>
                        <p className="card-text">price: <b>{productPrice}din.</b></p>
                        <p className="card-text">quantity: <b>{product.quantity}</b></p>
                        <button className="btn btn-danger" onClick={() => removeProductFromCart(product.productId)}>remove</button>
                    </div>
                </div>
            </div>
        );
    });

    return (
        <div>
            <HeaderComponent title="Cart" description="list of products in the cart" />
            <div className="container">
                <div className="row">
                    {renderedProducts}
                </div>
                {products.length === 0 && <div className="text-center mt-5"><h2>Cart is empty...</h2></div>}
                {products.length !== 0 &&
                    <div>
                    <div className="shadow-sm p-3 mb-5 bg-body-tertiary rounded">
                    <span>Total price: </span>
                    <span className="float-end"><b>{totalPrice()}</b> din.</span>
                     </div>
                    <button className="btn btn-success" onClick={order}>Order</button>
                </div>}

            </div>
        </div>
    )}

export default CartList;