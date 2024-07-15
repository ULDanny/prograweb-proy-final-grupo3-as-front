import "./checkout.css";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import imagen from "./qrPago.png";
import cartApi from '../../api/carrito'; // Importar la API del carrito
import ordenApi from '../../api/orden'; // Importar la API de orden
import detalleOrdenApi from '../../api/detalleOrden'; // Importar la API de detalle de orden

const Checkout = () => {
    const [cartItems, setCartItems] = useState([]);
    const [shippingMethod, setShippingMethod] = useState("economico");
    const [shippingCost, setShippingCost] = useState(10.0);
    const navigate = useNavigate();
    const [metodoPago, setMetodoPago] = useState('qr');
    const [user, setUser] = useState({});
    const [idCliente, setIdCliente] =  useState(JSON.parse(localStorage.getItem('user')).idCliente);

    useEffect(() => {
        const userRaw = localStorage.getItem('user');
        if (userRaw) {
            setUser(JSON.parse(userRaw));
        }else
        {
            return;
        }

        

        fetchCartItems();
    }, []);


    const fetchCartItems = async () => {
        try {
            const items = await cartApi.findAllComplete();
            const itemsInPedido = items.filter(item => !item.paraDespues && item.idCliente == idCliente);
            setCartItems(itemsInPedido);
        } catch (error) {
            console.error('Error fetching cart items:', error);
        }
    };

    const subtotal = cartItems.reduce((acc, item) => acc + item.producto.precio * item.cantidad, 0);
    const impuesto = subtotal * 0.18;
    const total = subtotal + shippingCost + impuesto;

    const validateForm = () => {
        const form = document.querySelector('form');
        const inputs = form.querySelectorAll('input');
        let isValid = true;

        inputs.forEach((input) => {
            if (input.required && !input.value) {
                isValid = false;
            }
        });

        return isValid;
    };

    const handleButtonClick = async (event) => {
        event.preventDefault();
        if (!validateForm()) {
            alert('Por favor, completa todos los campos requeridos antes de enviar el formulario.');
        } else {
            const form = document.querySelector('form');
            const direccion1 = form.querySelector('#direccion1').value;
            const direccion2 = form.querySelector('#direccion2').value;
            const distrito = form.querySelector('#distrito').value;
            const ciudad = form.querySelector('#ciudad').value;
            const pais = form.querySelector('#pais').value;
            const tipoPago = metodoPago === 'qr' ? 'Pago con código QR' : 'Tarjeta de Crédito';
            const tipoEnvio = shippingMethod === 'economico' ? 'Económico Aéreo' : 'Envío prioritario';

            const orderData = {
                idCliente: user.id,
                fechaOrden: new Date().toISOString().split('T')[0],
                envios: "Pendiente",
                direccion: `${direccion1} ${direccion2}`,
                distrito: distrito,
                departamento: ciudad, 
                pais: pais,
                tipoPago: tipoPago,
                tipoEnvio: tipoEnvio,
                subTotal: subtotal,
                impuestos: impuesto,
                total: total
            };

            try {
                const createdOrder = await ordenApi.create(orderData);

                for (const item of cartItems) {
                    const detalleOrdenData = {
                        idOrden: createdOrder.id, 
                        idProducto: item.producto.id,
                        cantidad: item.cantidad,
                        subTotal: (item.producto.precio * item.cantidad).toFixed(2)
                    };
                    await detalleOrdenApi.create(detalleOrdenData);
                    await cartApi.remove(item.id);
                }

                navigate('/OrderComplete');
            } catch (error) {
                console.error('Error sending order:', error);
                alert(`Hubo un problema al enviar tu orden: ${error.message}. Por favor, intenta de nuevo.`);
            }
        }
    };

    const handleChange = (event) => {
        setMetodoPago(event.target.value);
    };

    return ((user?.id) ?
        <>
            <h2 className="main-title">¡Casi Listo! Tu orden no estará completa hasta que revises y presiones el botón “completar orden” al final de la página.</h2>
            <form>
                <h2 className="title1">Datos de la compra</h2>
                <div className="section-compra">
                    <div className="section-checkout">
                        <h2 className="titulo2">Dirección de Envío</h2>
                        <div className="form-group">
                            <input type="text" id="direccion1" placeholder="Línea 1" required />
                            <input type="text" id="direccion2" placeholder="Línea 2" required />
                            <input type="text" id="distrito" placeholder="Distrito" required />
                            <input type="text" id="ciudad" placeholder="Ciudad" required />
                            <input type="text" id="pais" placeholder="País" required />
                        </div>
                    </div>

                    <div className="section-checkout">
                        <h2>Pago</h2>
                        <div>
                            <input
                                type="radio"
                                id="pagoQR"
                                name="metodoPago"
                                value="qr"
                                checked={metodoPago === 'qr'}
                                onChange={handleChange}
                            />
                            <label htmlFor="pagoQR">Pago con código QR</label>
                        </div>
                        <div>
                            <input
                                type="radio"
                                id="pagoTarjeta"
                                name="metodoPago"
                                value="tarjeta"
                                checked={metodoPago === 'tarjeta'}
                                onChange={handleChange}
                            />
                            <label htmlFor="pagoTarjeta">Pago con tarjeta de crédito</label>
                        </div>
                        {metodoPago === 'qr' && (
                            <div>
                                <h3>Escanea este código QR para pagar</h3>
                                <img src={imagen} alt="Código QR" className="qrIMG" />
                            </div>
                        )}
                        {metodoPago === 'tarjeta' && (
                            <div>
                                <h3>Introduce los datos de tu tarjeta</h3>
                                <div className="form-container-checkout">
                                    <input type="text" name="numero-tarjeta" placeholder="Número de Tarjeta" required />
                                    <input type="text" name="nombre-tarjeta" placeholder="Nombre en tarjeta" required /><br />
                                    <input className="smallInput" type="text" name="fecha-vencimiento" placeholder="Fecha de vencimiento" required />
                                    <input className="smallInput" type="text" name="cvv" placeholder="cvv" required />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <h2 className="title1">Método de envío</h2>
                <div className="section-checkout2">
                    <div className="form-group2">
                        <label>
                            <input
                                type="radio"
                                name="envio"
                                value="economico"
                                checked={shippingMethod === "economico"}
                                onChange={(e) => {
                                    setShippingMethod(e.target.value);
                                    setShippingCost(10.0);
                                }}
                            />
                            Económico Aéreo - S/10.00
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="envio"
                                value="prioritario"
                                checked={shippingMethod === "prioritario"}
                                onChange={(e) => {
                                    setShippingMethod(e.target.value);
                                    setShippingCost(17.0);
                                }}
                            />
                            Envío prioritario (5 a 10 días) - S/17.00
                        </label>
                    </div>
                </div>
                <div className="section-compra">
                    <div className="section-checkout">
                        <h2 className="titulo2">Items en Pedido</h2>
                        <ul>
                            {cartItems.map(item => (
                                <li key={item.id}>
                                    {item.cantidad}x {item.producto.marca} {item.producto.nombre} - S/{(item.producto.precio * item.cantidad).toFixed(2)}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="section-checkout">
                        <h2 className="titulo2">Resumen de Orden</h2>
                        <ul>
                            <li>Subtotal: S/{subtotal.toFixed(2)}</li>
                            <li>Envío: S/{shippingCost.toFixed(2)}</li>
                            <li>Impuestos: S/{impuesto.toFixed(2)}</li>
                            <li>Total: S/{total.toFixed(2)}</li>
                        </ul>
                        <button className="order" type="submit" onClick={handleButtonClick}>Completar Orden</button>
                    </div>
                </div>

            </form>
        </> : <h2 className="main-title">Por favor, inicia sesión para completar tu orden.</h2>
    );
}

export default Checkout;
