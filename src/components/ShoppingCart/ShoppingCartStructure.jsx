import ShoppingCart from "./ShoppingCart"
import SavedforLater from "./SavedforLater"
import { useState, useContext } from "react"
import { CartContext } from "./CartContext"


const StructureItem = () => {

    const Total = () => {
        return cartItems.reduce((total, item) => {
            return total + item.Precio * item.quantity;
        }, 0);
    };

    // const [cartItems, setCartItems] = useState(items.map((item) => ({ ...item, quantity: 1 })));

    const { cartItems, setCartItems, savedItems, setSavedItems } = useContext(CartContext);

    const removeItemFromCart = (itemToRemove) => {
        setCartItems(cartItems.filter((item) => item.Modelo !== itemToRemove.Modelo));
    };

    const increaseQuantity = (itemToUpdate) => {
        setCartItems(cartItems.map((item) => 
            item.Modelo === itemToUpdate.Modelo ? { ...item, quantity: item.quantity + 1 } : item
        ));
    };

    const decreaseQuantity = (itemToUpdate) => {
        setCartItems(cartItems.map((item) => 
            item.Modelo === itemToUpdate.Modelo && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
        ));
    };

    const moveItemToSaved = (itemToMove) => {
        setCartItems(cartItems.filter((item) => item.Modelo!== itemToMove.Modelo));
        setSavedItems([...savedItems, {...itemToMove, quantity: 1 }]);
    };

    const moveItemToCart = (itemToMove) => {
        setSavedItems(savedItems.filter((item) => item.Modelo!== itemToMove.Modelo));
        setCartItems([...cartItems, {...itemToMove, quantity: 1 }]);
      };
      
      const removeItemFromSaved = (itemToRemove) => {
        setSavedItems(savedItems.filter((item) => item.Modelo!== itemToRemove.Modelo));
      };

    

    return (
        <>
        <div className="container-Shoppingcart">
            <h2>Carrito de compras</h2>
            <p className="dispo-envio">Items disponibles para envio</p>
            {cartItems.length === 0 ? (
                <p>The cart is empty</p>
            ) : (
                cartItems.map((item) => (
                    <ShoppingCart
                        item={item}
                        key={item.Modelo}
                        removeItemFromCart={removeItemFromCart}
                        increaseQuantity={increaseQuantity}
                        decreaseQuantity={decreaseQuantity}
                        moveItemToSaved={moveItemToSaved}
                    />
                ))
            )}
            <div className="cart-summary">
                <p className="total-amount">Total: ${Total()}</p>
                <button className="checkout-button"><a href="/checkout">Checkout</a></button>
            </div>
            <p className="dispo-envio">Guardado para despues</p>
            {savedItems.length === 0? (
            <p>No hay items guardados</p>
            ) : (
            savedItems.map((save) => (
                <SavedforLater
                key={save.Modelo}
                item={save}
                moveItemToCart={moveItemToCart}
                removeItemFromSaved={removeItemFromSaved}
                />
            ))
            )}
        </div>
        </>
    );
}

export default StructureItem;
