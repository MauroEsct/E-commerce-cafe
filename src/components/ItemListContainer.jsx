import { useState, useEffect } from 'react';
import getProducts from '../data/getProducts';
import { useParams } from 'react-router-dom';

const ItemListContainer = ({ greeting }) => {
    const [products, setProducts] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        getProducts()
            .then((data) => {
                if (id) {
                    const filteredProducts = data.filter(product => product.category === id);
                    setProducts(filteredProducts);
                } else {
                    setProducts(data);
                }
            })
            .catch((error) => {
                console.error("Error al obtener productos:", error);
            });
    }, [id]);

    return (
        <div>
            <h2>{greeting}</h2>
            <ul>
                {products.length > 0 ? (
                    products.map((product) => (
                        <li key={product.id}>
                            <h3>{product.name}</h3>
                            <p>${product.price}</p>
                        </li>
                    ))
                ) : (
                    <p>Cargando productos...</p>
                )}
            </ul>
        </div>
    );
};

export default ItemListContainer;