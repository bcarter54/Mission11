import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import WelcomeBand from "../components/WelcomeBand";
import { CartItem } from "../types/CartItem";
import { useCart } from "../context/CartContext";

function BuyPage() {
    const navigate = useNavigate();
    const {title, bookId, price} = useParams();
    const {addToCart} = useCart();
    const [quantity, setQuantity] = useState<number>(1);

    const handleAddToCart = () => {
        const newItem: CartItem = {
            bookId: Number(bookId),
            title: title || "No Book Found",
            price: Number(price),
            quantity,
        };
        addToCart(newItem);
        navigate('/cart');
    }

    return(
        <>
        <WelcomeBand />
        <h2>Purchase {title}</h2>

        <div>
            Price: ${price}
            <br />
            <br />
            <button className="btn btn-success" onClick={handleAddToCart}>
            Add to Cart
            </button>
        </div>
        <button className="btn btn-danger" onClick={() => navigate(-1)}>Go Back</button>
        </>
    );
}

export default BuyPage