import { Link } from 'react-router-dom';

const Item = ({ product }) => {
    return (
        <div className="item-card">
            <Link to={`/item/${product.id}`}>
                <img src={product.image} alt={product.name} />
                <div className="item-details">
                    <h3>{product.name}</h3>
                    <p>${product.price}</p>
                </div>
            </Link>
        </div>
    );
};

export default Item;