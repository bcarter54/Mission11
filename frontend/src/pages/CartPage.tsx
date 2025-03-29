import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { CartItem } from "../types/CartItem";

function CartPage() {
    const navigate = useNavigate();
    const { cart, removeFromCart, removeOne } = useCart();
    const totalAmount = cart.reduce((sum, item) => sum + item.price, 0)
    return (
        <div>
            <h2>Your Cart</h2>
            <div>
                {cart.length === 0 ? (
                    <p>Your cart is empty...</p>
                ) : (
                    <ul>
                        {cart.map((item: CartItem) => (
                            <li key={item.bookId}>
                                {item.title}: ${item.price.toFixed(2)}
                                <br />
                                Quantity: {item.quantity}
                                <br />
                                <button onClick={() => removeOne(item.bookId)}>Remove One</button>
                                <button onClick={() => removeFromCart(item.bookId)}>Remove</button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <h3>Total: ${totalAmount.toFixed(2)}</h3>
            <button>Checkout</button>
            <button onClick={() => navigate('/books')}>Continue</button>
        </div>
    );
}
export default CartPage;