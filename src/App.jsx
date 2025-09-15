import NavBar from './components/NavBar';
import ItemListContainer from './components/ItemListContainer';
import './App.css';

function App() {
  const greeting = "¡Bienvenido a mi E-commerce!";
  
  return (
    <>
      <NavBar />
      <ItemListContainer greeting={greeting} />
    </>
  );
}

export default App;