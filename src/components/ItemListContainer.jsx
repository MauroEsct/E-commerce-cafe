import { useState, useEffect } from 'react';
import getProducts from '../data/getProducts';
import { useParams } from 'react-router-dom';
import Item from './Item';
import '../styles/components.css';

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
            <div className="item-list-container">
                {products.length > 0 ? (
                    products.map((product) => (
                        <Item key={product.id} product={product} />
                    ))
                ) : (
                    <p>Cargando productos...</p>
                )}
            </div>
        </div>
    );
};

export default ItemListContainer;