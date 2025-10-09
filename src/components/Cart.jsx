import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { Link } from 'react-router-dom';
import '../styles/Cart.css';

const Cart = () => {
    const { cart, clearCart, removeItem, getTotalPrice } = useContext(CartContext);
    const totalPrice = getTotalPrice();

    if (cart.length === 0) {
        return (
            <div className="cart-empty">
                <h2>Tu carrito está vacío</h2>
                <p>Agrega productos para poder verlos aquí.</p>
                <Link to="/" className="btn btn-primary">Ir a la tienda</Link>
            </div>
        );
    }

    return (
        <div className="cart-container">
            <h2>Resumen de tu compra</h2>
            {cart.map(prod => (
                <div key={prod.id} className="cart-item">
                    <img src={prod.image} alt={prod.name} />
                    <div className="cart-item-details">
                        <h4>{prod.name}</h4>
                        <p>Cantidad: {prod.quantity}</p>
                        <p>Precio unitario: ${prod.price}</p>
                    </div>
                    <p className="cart-item-subtotal">Subtotal: ${prod.price * prod.quantity}</p>
                    <button className="btn btn-danger" onClick={() => removeItem(prod.id)}>Eliminar</button>
                </div>
            ))}
            
            <h3 className="cart-total">Total de la compra: ${totalPrice}</h3>

            <div className="cart-actions">
                <button className="btn btn-warning" onClick={clearCart}>Vaciar Carrito</button>
                <Link to="/checkout" className="btn btn-success">Finalizar Compra</Link>
            </div>
        </div>
    );
};

export default Cart;