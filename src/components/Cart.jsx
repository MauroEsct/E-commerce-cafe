
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { Link } from 'react-router-dom';

const Cart = () => {
    const { cart, clearCart, removeItem, getTotalPrice } = useContext(CartContext);
    const totalPrice = getTotalPrice();

    if (cart.length === 0) {
        return (
            <div style={{ textAlign: 'center', marginTop: '50px' }}>
                <h2>Tu carrito está vacío</h2>
                <p>Agrega productos para poder verlos aquí.</p>
                <Link to="/" className="btn btn-primary">Ir a la tienda</Link>
            </div>
        );
    }

    return (
        <div className="container" style={{ marginTop: '20px' }}>
            <h2>Resumen de tu compra</h2>
            <hr />
            {cart.map(prod => (
                <div key={prod.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <img src={prod.image} alt={prod.name} style={{ width: '50px' }} />
                    <h4>{prod.name}</h4>
                    <p>Cantidad: {prod.quantity}</p>
                    <p>Precio unitario: ${prod.price}</p>
                    <p>Subtotal: ${prod.price * prod.quantity}</p>
                    <button className="btn btn-danger" onClick={() => removeItem(prod.id)}>Eliminar</button>
                </div>
            ))}
            <hr />
            <h3>Total de la compra: ${totalPrice}</h3>
            <div>
                <button className="btn btn-warning" onClick={clearCart}>Vaciar Carrito</button>
                <Link to="/checkout" className="btn btn-success" style={{ marginLeft: '10px' }}>Finalizar Compra</Link>
            </div>
        </div>
    );
};

export default Cart;