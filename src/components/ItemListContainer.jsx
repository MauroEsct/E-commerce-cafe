import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Item from './item';
import Loader from './Loader';
import { db } from '../services/firebase/firebaseConfig.js';
import { collection, getDocs, query, where } from 'firebase/firestore';
import '../styles/components.css';

const ItemListContainer = ({ greeting }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();

    useEffect(() => {
        setLoading(true);
        const productsCollection = collection(db, 'products');
        const q = id
            ? query(productsCollection, where('category', '==', id))
            : productsCollection;

        getDocs(q)
            .then((querySnapshot) => {
                const productsAdapted = querySnapshot.docs.map(doc => {
                    const data = doc.data();
                    return { id: doc.id, ...data };
                });
                setProducts(productsAdapted);
            })
            .catch((error) => {
                console.error("Error al obtener productos:", error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return <Loader />;
    }

    return (
        <div>
            <h2 style={{ color: 'white' }}>{greeting}</h2>
            <div className="item-list-container">
                {products.length > 0 ? (
                    products.map((product) => (
                        <Item key={product.id} product={product} />
                    ))
                ) : (
                    <p>No se encontraron productos en esta categoría.</p>
                )}
            </div>
        </div>
    );
};

export default ItemListContainer;