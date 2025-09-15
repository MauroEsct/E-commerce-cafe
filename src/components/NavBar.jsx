import CartWidget from "./CartWidget";

const NavBar = () => {
  return (
    <nav className="nav-bar">
      <h1>Mi E-commerce</h1>
      <ul>
        <li><a href="#">Categoría 1</a></li>
        <li><a href="#">Categoría 2</a></li>
        <li><a href="#">Categoría 3</a></li>
      </ul>
      <CartWidget />
    </nav>
  );
};

export default NavBar;