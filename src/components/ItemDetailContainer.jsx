import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import getProducts from '../data/getProducts';

const ItemDetailContainer = () => {
    const [product, setProduct] = useState(null);
    const { id } = useParams();

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

    return (
        <div className="item-detail-container">
            {product ? (
                <div>
                    <h2>{product.name}</h2>
                    <img src={product.image} alt={product.name} style={{ width: '200px' }} />
                    <p>{product.description}</p>
                    <p>Precio: ${product.price}</p>
                    <p>Stock disponible: {product.stock}</p>
                </div>
            ) : (
                <p>Cargando producto...</p>
            )}
        </div>
    );
};

export default ItemDetailContainer;