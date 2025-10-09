import { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import ItemCount from './ItemCount';
import Loader from './Loader';
import { CartContext } from '../context/CartContext';
import { db } from '../services/firebase/firebaseConfig';
import { getDoc, doc } from 'firebase/firestore';
import toast from 'react-hot-toast';
import '../styles/components.css';

const ItemDetailContainer = () => {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quantityAdded, setQuantityAdded] = useState(0);

    const { id } = useParams();
    const { addItem } = useContext(CartContext);

    useEffect(() => {
        setLoading(true);
        const productRef = doc(db, 'products', id);
        getDoc(productRef)
            .then((docSnapshot) => {
                if (docSnapshot.exists()) {
                    const data = docSnapshot.data();
                    const productAdapted = { id: docSnapshot.id, ...data };
                    setProduct(productAdapted);
                } else {
                    console.log("El producto no existe");
                }
            })
            .catch(error => {
                console.error("Error al obtener el producto:", error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [id]);

    const onAdd = (quantity) => {
        setQuantityAdded(quantity);
        if (product) {
            addItem(product, quantity);
            toast.success(`${product.name} agregado al carrito!`);
        }
    };

    if (loading) {
        return <Loader />;
    }

    if (!product) {
        return <h2 style={{color: 'white'}}>Producto no encontrado</h2>;
    }

    return (
        <div className="detail-container">
            <div className="detail-image">
                <img src={product.image} alt={product.name} />
            </div>
            <div className="detail-info">
                <h2>{product.name}</h2>
                <p className="price">${product.price}</p>
                <p className="description">{product.description}</p>
                <p className="stock">Stock disponible: {product.stock}</p>
                
                {
                    quantityAdded > 0 ? (
                        <Link to="/cart" className="btn btn-success">Terminar Compra</Link>
                    ) : (
                        <ItemCount stock={product.stock} initial={1} onAdd={onAdd} />
                    )
                }
            </div>
        </div>
    );
};

export default ItemDetailContainer;