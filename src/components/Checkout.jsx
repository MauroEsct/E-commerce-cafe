import { useState, useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { db } from '../services/firebase/firebaseConfig';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import Loader from './Loader';
import '../styles/Checkout.css';

const Checkout = () => {
    const [loading, setLoading] = useState(false);
    const [orderId, setOrderId] = useState('');
    const [buyer, setBuyer] = useState({
        name: '',
        phone: '',
        email: ''
    });

    const { cart, getTotalPrice, clearCart } = useContext(CartContext);
    const totalPrice = getTotalPrice();

    const handleInputChange = (e) => {
        setBuyer({
            ...buyer,
            [e.target.name]: e.target.value
        });
    };

    const createOrder = (e) => {
        e.preventDefault();
        setLoading(true);

        const order = {
            buyer,
            items: cart,
            total: totalPrice,
            date: Timestamp.fromDate(new Date())
        };

        const ordersCollection = collection(db, 'orders');

        addDoc(ordersCollection, order)
            .then(({ id }) => {
                setOrderId(id);
                clearCart();
            })
            .catch(error => {
                console.error("Error al crear la orden:", error);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    if (loading) {
        return <Loader />;
    }

    if (orderId) {
        return (
            <div className="checkout-container">
                <h1>¡Gracias por tu compra!</h1>
                <p>Tu orden ha sido creada exitosamente.</p>
                <p className="order-id">Tu ID de orden es: <strong>{orderId}</strong></p>
            </div>
        );
    }

    return (
        <div className="checkout-container">
            <h1>Finalizar Compra</h1>
            <p>Por favor, completa tus datos para generar la orden.</p>
            <form onSubmit={createOrder} className="checkout-form">
                <input type="text" name="name" placeholder="Nombre completo" value={buyer.name} onChange={handleInputChange} required />
                <input type="tel" name="phone" placeholder="Teléfono" value={buyer.phone} onChange={handleInputChange} required />
                <input type="email" name="email" placeholder="Email" value={buyer.email} onChange={handleInputChange} required />
                <button type="submit" className="btn btn-primary">Crear Orden</button>
            </form>
        </div>
    );
};

export default Checkout;