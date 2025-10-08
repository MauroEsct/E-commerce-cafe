import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import getProducts from '../data/getProducts';
import ItemCount from './ItemCount';
import { CartContext } from '../context/CartContext';

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
            console.log(`Se agregaron ${quantity} unidades de ${product.name} al carrito.`);
        }
    };

    return (
        <div className="item-detail-container">
            {product ? (
                <div>
                    <h2>{product.name}</h2>
                    <img src={product.image} alt={product.name} style={{ width: '200px' }} />
                    <p>{product.description}</p>
                    <p>Precio: ${product.price}</p>
                    <p>Stock disponible: {product.stock}</p>
                    <ItemCount stock={product.stock} initial={1} onAdd={onAdd} />
                </div>
            ) : (
                <p>Cargando producto...</p>
            )}
        </div>
    );
};

export default ItemDetailContainer;