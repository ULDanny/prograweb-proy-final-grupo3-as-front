import ShoppingCart from "./ShoppingCart";
import SavedforLater from "./SavedforLater";
import { useState, useEffect, useContext } from "react";
import { CartContext } from "./CartContext";
import cartApi from '../../api/carrito'; // Importar la API del carrito

const StructureItem = () => {
    const { cartItems, setCartItems, savedItems, setSavedItems } = useContext(CartContext);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
    const [clienteId, setClienteId] = useState(JSON.parse(localStorage.getItem('user')).idCliente);

    useEffect(() => {
        console.log(user);
        if (user) {
            console.log('ok');
            fetchCartItems();
        }
        
    }, []);

    const fetchCartItems = async () => {
        try {
            console.log(clienteId);
            await cartApi.findAllComplete()
                .then((items) => {
                    console.log(items);
                    console.log(user.clienteId);
            const cart = items.filter(item => !item.paraDespues && item.idCliente == clienteId);
            console.log(cart);
            const saved = items.filter(item => item.paraDespues && item.idCliente == clienteId);
            console.log(saved);
            setCartItems(items.filter(item => !item.paraDespues && item.idCliente ==clienteId));
            setSavedItems(items.filter(item => item.paraDespues && item.idCliente == clienteId));
             })
        } catch (error) {
            console.error('Error fetching cart items:', error);
        }
    };

    const Total = () => {
        return cartItems.reduce((total, item) => {
            return total + (item.producto ? item.producto.precio * item.cantidad : 0);
        }, 0);
    };

    const removeItemFromCart = async (itemToRemove) => {
        try {
            await cartApi.remove(itemToRemove.id);
            setCartItems(cartItems.filter((item) => item.id !== itemToRemove.id));
        } catch (error) {
            console.error('Error removing item from cart:', error);
        }
    };

    const removeItemFromSaved = async (itemToRemove) => {
        try {
            await cartApi.remove(itemToRemove.id);
            setSavedItems(savedItems.filter((item) => item.id !== itemToRemove.id));
        } catch (error) {
            console.error('Error removing item from saved:', error);
        }
    };

    const updateQuantity = async (item) => {
        try {
            await cartApi.update({
                id: item.id,
                idCliente: item.idCliente,
                idProducto: item.idProducto,
                paraDespues: item.paraDespues,
                cantidad: item.cantidad
            });
        } catch (error) {
            console.error('Error updating item quantity:', error);
        }
    };

    const increaseQuantity = async (itemToUpdate) => {
        const updatedItem = { ...itemToUpdate, cantidad: itemToUpdate.cantidad + 1 };
        try {
            await updateQuantity(updatedItem);
            setCartItems(cartItems.map((item) =>
                item.id === itemToUpdate.id ? updatedItem : item
            ));
        } catch (error) {
            console.error('Error updating item quantity:', error);
        }
    };

    const decreaseQuantity = async (itemToUpdate) => {
        if (itemToUpdate.cantidad > 1) {
            const updatedItem = { ...itemToUpdate, cantidad: itemToUpdate.cantidad - 1 };
            try {
                await updateQuantity(updatedItem);
                setCartItems(cartItems.map((item) =>
                    item.id === itemToUpdate.id ? updatedItem : item
                ));
            } catch (error) {
                console.error('Error updating item quantity:', error);
            }
        }
    };

    const moveItemToSaved = async (itemToMove) => {
        const updatedItem = { ...itemToMove, paraDespues: true };
        setCartItems(cartItems.filter((item) => item.id !== itemToMove.id));
        setSavedItems([...savedItems, updatedItem]);
        try {
            await updateQuantity(updatedItem);
        } catch (error) {
            console.error('Error moving item to saved:', error);
        }
    };

    const moveItemToCart = async (itemToMove) => {
        const updatedItem = { ...itemToMove, paraDespues: false };
        setSavedItems(savedItems.filter((item) => item.id !== itemToMove.id));
        setCartItems([...cartItems, updatedItem]);
        try {
            await updateQuantity(updatedItem);
        } catch (error) {
            console.error('Error moving item to cart:', error);
        }
    };

    const hasItemsInCart = cartItems.length > 0;

    return (
        (user?.id) ? 
        <div className="container-Shoppingcart">
            <h2>Carrito de compras</h2>
            <p className="dispo-envio">Items disponibles para envio</p>
            {cartItems.length === 0 ? (
                <p>El carrito está vacío</p>
            ) : (
                cartItems.map((item) => (
                    <ShoppingCart
                        item={item}
                        key={item.id}
                        removeItemFromCart={removeItemFromCart}
                        increaseQuantity={increaseQuantity}
                        decreaseQuantity={decreaseQuantity}
                        moveItemToSaved={moveItemToSaved}
                    />
                ))
            )}
            <div className="cart-summary">
                <p className="total-amount">Total: ${Total()}</p>
                {hasItemsInCart && (
                    <button className="checkout-button">
                        <a href="/checkout">Checkout</a>
                    </button>
                )}
            </div>
            <p className="dispo-envio">Guardado para después</p>
            {savedItems.length === 0 ? (
                <p>No hay items guardados</p>
            ) : (
                savedItems.map((save) => (
                    <SavedforLater
                        key={save.id}
                        item={save}
                        moveItemToCart={moveItemToCart}
                        removeItemFromSaved={removeItemFromSaved}
                    />
                ))
            )}
        </div> : <h2>Inicie sesión para ver su carrito</h2> 
    );
}

export default StructureItem;
