import './ShoppingCart.css';
import { useState, useEffect } from 'react';
import api from '../../api/carrito'; // Importar la API

const ShoppingCart = ({ item, removeItemFromCart, increaseQuantity, decreaseQuantity, moveItemToSaved }) => {
  const [subTotal, setSubTotal] = useState(0);

  const calculateSubTotal = () => {
    return item.producto ? item.producto.precio * item.cantidad : 0;
  };

  useEffect(() => {
    setSubTotal(calculateSubTotal());
  }, [item.cantidad]);

  const handleRemoveItem = async (item) => {
    try {
      // Llamada a la API para eliminar el elemento
      await api.remove(item.id);
      // Llamar a la función de eliminación pasada como prop para actualizar el estado en el componente padre
      removeItemFromCart(item);
    } catch (error) {
      console.error("Error al eliminar el elemento del carrito:", error);
    }
  };

  return (
    <>
      <section className="cart">
        <div className="cart-item">
          <img src={item.producto ? item.producto.imagen : ''} alt="" />
          <div className="item-details">
            <p>{item.producto ? `${item.producto.marca} ${item.producto.nombre} ${item.producto.procesador} ${item.producto.RAM}` : ''}</p>
            <div className="actions">
              <button className='button-as-text' onClick={() => handleRemoveItem(item)}>Eliminar |</button>
              <button className='button-as-text' onClick={() => moveItemToSaved(item)}>Guardar para despues</button>
            </div>
          </div>
          <div className="item-quantity">
            <label htmlFor="quantity-1">Cantidad</label>
            <div className="quantity-controls">
              <button onClick={() => decreaseQuantity(item)}>-</button>
              <span>{item.cantidad}</span>
              <button onClick={() => increaseQuantity(item)}>+</button>
            </div>
          </div>
          <div className="item-price">
            <p>Precio: ${item.producto ? item.producto.precio : ''}</p>
            <p>SubTotal: <span className="subTotal">${subTotal}</span></p>
          </div>
        </div>
      </section>
    </>
  );
}

export default ShoppingCart;
