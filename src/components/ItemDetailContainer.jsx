import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import getProducts from '../data/getProducts';
import ItemCount from './ItemCount';
import { CartContext } from '../context/CartContext';
import '../styles/components.css';

const ItemDetailContainer = () => {
    const [product, setProduct] = useState(null);
    const { id } = useParams();
    const { addItem } = useContext(CartContext);

    useEffect(() => {
        getProducts(id)
            .then(data => {
                setProduct(data);
            })
            .catch(error => {
                console.error("Error al obtener el producto:", error);
                setProduct(null);
            });
    }, [id]);

    const onAdd = (quantity) => {
        if (product) {
            addItem(product, quantity);
        }
    };

    if (!product) {
        return <p>Cargando producto...</p>;
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
                <ItemCount stock={product.stock} initial={1} onAdd={onAdd} />
            </div>
        </div>
    );
};

export default ItemDetailContainer;