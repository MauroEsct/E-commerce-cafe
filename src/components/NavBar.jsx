import { Link } from 'react-router-dom';
import CartWidget from './CartWidget';

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Mi E-commerce</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/">Inicio</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/category/suave">Suave</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/category/intenso">Intenso</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/category/clasico">Clásico</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/category/versatil">Versátil</Link>
            </li>
          </ul>
        </div>
        <Link className="btn btn-outline-success" to="/item/1">Ver Detalle de Arábiga</Link>
        <CartWidget />
      </div>
    </nav>
  );
};

export default NavBar;