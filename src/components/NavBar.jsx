import CartWidget from "./CartWidget";
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className="nav-bar">
      <h1>Mi E-commerce</h1>
      <ul>
        <li><Link to="/category/suave">Suave</Link></li>
        <li><Link to="/category/intenso">Intenso</Link></li>
        <li><Link to="/category/clasico">Clásico</Link></li>
        <li><Link to="/category/versatil">Versátil</Link></li>
      </ul>
      <Link to="/item/1">Ver Detalle de Arábiga</Link>
      <CartWidget />
    </nav>
  );
};

export default NavBar;