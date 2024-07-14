import { useNavigate } from "react-router-dom";
import { useItemId } from "../../context/itemIdContext";
import { useState, useEffect } from "react";
import productApi from '../../api/producto'; // Importar la API de productos
import cartApi from '../../api/carrito'; // Importar la API de carrito

const ItemDetail = () => {
    const { itemId } = useItemId();
    const [count, setCount] = useState(1); // Inicializar con 1 en vez de 0
    const [item, setItem] = useState(null);
    const idCliente = 1; // Asumiendo un cliente con id 1, puedes ajustar esto según tu contexto
    const navigate = useNavigate(); // Para navegación

    // Obtener detalles del producto
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const productData = await productApi.findOne(itemId);
                setItem(productData);
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };

        fetchProduct();
    }, [itemId]);

    const handleIncrement = () => {
        setCount(count + 1);
    }

    const handleDecrement = () => {
        setCount(count > 1 ? count - 1 : 1); // Evitar valores negativos
    }

    const handleAddToCart = async () => {
        try {
            if (item) {
                const cartItem = {
                    idCliente: idCliente,
                    idProducto: item.id,
                    paraDespues: false,
                    cantidad: count,
                };
                await cartApi.create(cartItem);
                alert('Producto agregado al carrito');
                navigate('/carrito'); // Navegar al carrito después de agregar el producto
            }
        } catch (error) {
            console.error('Error adding product to cart:', error);
        }
    };

    if (!item) {
        return <h1>ITEM NO ENCONTRADO</h1>
    }

    const spanStyle = {
        display: 'flex',
        justifyContent: 'flex-start',
        marginLeft: '100px'
    }

    const nombreStyle = {
        paddingRight: '1200px',
        fontSize: '15px',
        marginLeft: '20px'
    }

    const sectionStyle = {
        marginTop: '50px',
        marginLeft: '100px'
    }

    const dispStyle = {
        backgroundColor: '#f0f0f0',
        border: '2px solid black',
        width: '100px',
        paddingTop: '10px',
        paddingBottom: '20px',
        paddingLeft: '100px',
        paddingRight: '100px',
        fontSize: '15px',
        fontWeight: 'bolder',
        marginLeft: '200px'
    }

    const demasStyle = {
        border: '2px solid black',
        width: '50px',
        height: '100',
        paddingTop: '20px',
        paddingBottom: '50px',
        paddingLeft: '250px',
        marginRight: '30px',
        marginLeft: '200px'
    }

    const precioStyle = {
        fontSize: '15px',
        marginLeft: '-240px',
        paddingBottom: '20px'
    }

    const buttonStyle = {
        padding: '10px',
        backgroundColor: 'black',
        color: 'white',
        fontWeight: 'bold',
        fontSize: '10px',
        marginLeft: '-240px',
        marginBottom: '10px'
    }

    const cantidadStyle = {
        fontSize: '15px',
        marginLeft: '-250px'
    }

    const spanStyle2 = {
        display: 'flex',
        justifyContent: 'space-evenly',
        marginLeft: '-250px'
    }

    const buttonStyle2 = {
        paddingLeft: '10px',
        paddingRight: '10px',
        fontSize: '15px',
    }

    const sectionStyle2 = {
        border: '2px solid black',
        width: '500px',
        height: '150px',
        paddingTop: '30px',
        paddingBottom: '150px',
        marginLeft: '400px',
        marginTop: '50px',
        fontSize: '15px',
        backgroundColor: '#f0f0f0'
    }

    const listyle = {
        fontSize: '15px',
        marginBottom: '30px'
    }

    const h2style = {
        fontSize: '20px'
    }

    const hrStyle = {
        marginLeft: '30px',
        width: '1300px',
        marginBottom: '40px'
    }

    const imgStyle = {
        height: '400px',
        width: '400px',
        marginTop: '30px'
    }

    return (
        <>
            <h2 style={nombreStyle}>{item.nombre}</h2>
            <br />
            <hr style={hrStyle} />
            <section style={sectionStyle}>
                <span style={spanStyle}>
                    <img style={imgStyle} src={item.imagen} alt={item.nombre} />
                    <div>
                        <h2 style={dispStyle}>DISPONIBLE</h2>
                        <div style={demasStyle}>
                            <h2 style={precioStyle}>PRECIO: S/.{item.precio}</h2>
                            <button style={buttonStyle} onClick={handleAddToCart}>AGREGAR AL CARRITO</button>
                            <h5 style={cantidadStyle}>CANTIDAD:</h5>
                            <span style={spanStyle2}>
                                <button onClick={handleDecrement} style={buttonStyle2}>-</button>
                                <h2>{count}</h2>
                                <button onClick={handleIncrement} style={buttonStyle2}>+</button>
                            </span>
                        </div>
                    </div>
                </span>
            </section>
            <section style={sectionStyle2}>
                <ul>
                    <h2 style={h2style}>CARACTERISTICAS DEL PRODUCTO</h2>
                    <li style={listyle}>ESPACIO RAM : {item.RAM}</li>
                    <li style={listyle}>TIPO DE GRAFICA : {item.grafica}</li>
                    <li style={listyle}>PROCESADOR : {item.procesador}</li>
                    <li style={listyle}>CANTIDAD EN STOCK : {item.stock}</li>
                </ul>
            </section>
            <br />
            <br />
        </>
    );
};

export default ItemDetail;
