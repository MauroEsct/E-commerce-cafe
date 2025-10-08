import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { Link } from 'react-router-dom';

const CartWidget = () => {
  const { getTotalItems } = useContext(CartContext);
  const totalItems = getTotalItems();

  return (
    <Link to="/cart" className="cart-widget" style={{ display: totalItems > 0 ? 'block' : 'none' }}>
      🛒
      {totalItems > 0 && <span className="item-total">{totalItems}</span>}
    </Link>
  );
};

export default CartWidget;