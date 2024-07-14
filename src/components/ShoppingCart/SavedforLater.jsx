import './SavedforLater.css';

const SavedforLater = ({ item, moveItemToCart, removeItemFromSaved }) => {
    return (
      <section className="cart"> 
        <div className="cart-item">
          <img src={item.producto ? item.producto.imagen : ''} alt="" />
          <div className="item-details">
            <p>{item.producto ? `${item.producto.marca} ${item.producto.nombre} ${item.producto.procesador} ${item.producto.RAM}` : ''}</p>
            <div className="actions">
              <button className="button-as-text" onClick={() => removeItemFromSaved(item)}>
                Eliminar |
              </button>
              <button className="button-as-text" onClick={() => moveItemToCart(item)}>
                Mover al carrito
              </button>
            </div>
          </div>
          <div className="item-quantity">
            <label htmlFor="quantity-1">Cantidad: {item.cantidad}</label>
          </div>
          <div className="item-price">
            <p>Precio: ${item.producto ? item.producto.precio : ''}</p>
          </div>
        </div>
      </section>
    );
};

export default SavedforLater;
