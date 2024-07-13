import './SavedforLater.css'


const SavedforLater = ({ item, moveItemToCart, removeItemFromSaved }) => {
    return (
      <section className="cart"> 
        <div className="cart-item">
          <img src={item.imagen} alt="" />
          <div className="item-details">
            <p>{item.Marca} {item.Modelo} {item.Procesador} {item.RAM} {item.Almacenamiento}</p>
            <div className="actions">
              <button className="button-as-text" onClick={() => removeItemFromSaved(item)}>
                Eliminar    |
              </button>
              <button className="button-as-text" onClick={() => moveItemToCart(item)}>
                Mover al carrito
              </button>
            </div>
          </div>
          <div className="item-quantity">
            <label for="quantity-1">Cantidad: 1</label>
          </div>
          <div className="item-price">
            <p>Precio: ${item.Precio}</p>
          </div>
        </div>
      </section>
    );
  };

export default SavedforLater