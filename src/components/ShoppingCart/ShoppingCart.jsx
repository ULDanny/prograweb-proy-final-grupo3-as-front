import './ShoppingCart.css'
import { useState, useEffect } from 'react'

const ShoppingCart = ({ item, removeItemFromCart,increaseQuantity, decreaseQuantity, moveItemToSaved}) => {


  const [subTotal, setSubTotal] = useState(0);
  const calculateSubTotal = () => {
      return item.Precio * item.quantity;
  };

  useEffect(() => {
    setSubTotal(calculateSubTotal());
  }, [item.quantity]);

    return (
        <>
            <section className="cart">
                <div className="cart-item">
                    <img src={item.imagen} alt="" />
                    <div className="item-details">
                        <p>{item.Marca} {item.Modelo} {item.Procesador} {item.RAM} {item.Almacenamiento}</p>
                        <div className="actions">
                            <button className='button-as-text' onClick={() => removeItemFromCart(item)}>Eliminar    |</button>
                            <button className='button-as-text' onClick={() => moveItemToSaved(item)}>Guardar para despues</button>
                        </div>
                    </div>
                    <div className="item-quantity">
                        <label htmlFor="quantity-1">Cantidad</label>
                        <div className="quantity-controls">
                            <button onClick={() => decreaseQuantity(item)}>-</button>
                            <span>{item.quantity}</span>
                            <button onClick={() => increaseQuantity(item)}>+</button>
                        </div>
                    </div>
                    <div className="item-price">
                        <p>Precio: ${item.Precio}</p>
                        <p>SubTotal: <span className="subTotal">${subTotal}</span></p>
                    </div>
                </div>
            </section>
        </>
    );
}

export default ShoppingCart;
