import "./checkout.css"
import { items } from "../../data/items"
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import imagen from "./qrPago.png"
import { CartContext } from "../ShoppingCart/CartContext";



const Checkout = () =>{

    const [shippingMethod, setShippingMethod] = useState("economico");
    const [shippingCost, setShippingCost] = useState(10.0);
    const validItems = items.filter(item => typeof item.Precio === 'number');
    const subtotal = validItems.reduce((acc, item) => acc + item.Precio, 0);
    const impuesto = subtotal * 0.18;
    const total = subtotal + shippingCost;
    const navigate = useNavigate();
    const validateForm = () => {
        const form = document.querySelector('form');
        const inputs = form.querySelectorAll('input');
        let isValid = true;
      
        inputs.forEach((input) => {
          if (input.required &&!input.value) {
            isValid = false;
          }
        });
      
        return isValid;
      };

    const handleButtonClick = (event) => {
        if (!validateForm()) {
            event.preventDefault();
            alert('Por favor, completa todos los campos requeridos antes de enviar el formulario.');
        } else {
            navigate('/OrderComplete');
        }
        };
    

    const [metodoPago, setMetodoPago] = useState('qr'); // 'qr' es el valor inicial

    const handleChange = (event) => {
        setMetodoPago(event.target.value);
    };

    return(
        <>
            <h2 className="main-title">¡Casi Listo! Tu orden no estará completa hasta que revises y presiones el botón “completar orden” al final de la página.</h2>
            <form>
                <h2 className="title1">Datos de la compra</h2>
                <div className="section-compra">
                    <div class="section-checkout">
                        <h2 className="titulo2" >Direccion de Envio</h2>
                        <div class="form-group">
                            <input type="text" id="direccion1" placeholder="Línea 1" required/>
                            <input type="text" id="direccion2" placeholder="Línea 2" required/>
                            <input type="text" id="distrito" placeholder="Distrito" required/>
                            <input type="text" id="ciudad" placeholder="Ciudad" required/>
                            <input type="text" id="pais" placeholder="País" required/>
                        </div>
                    </div>
                    
                    <div class="section-checkout">
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
                            <img src={imagen} alt="Código QR" className="qrIMG"/>
                            </div>
                        )}
                        {metodoPago === 'tarjeta' && (
                            <div>
                            <h3>Introduce los datos de tu tarjeta</h3>
                            <div className="form-container-checkout">
                                <form action="#">
                                    <input type="text" name="numero-tarjeta" placeholder="Número de Tarjeta" required />
                                    <input type="text" name="nombre-tarjeta" placeholder="Nombre en tarjeta" required/><br />
                                    <input className="smallInput" type="text" name="fecha-vencimiento" placeholder="Fecha de vencimiento" required/>
                                    <input className="smallInput" type="text" name="cvv" placeholder="cvv" required/>
                                </form>
                            </div>
                            </div>
                        )}
                    </div>
                </div>
                <h2 className="title1">Método de envio</h2>
                <div class="section-checkout2">
                    <div class="form-group2">
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
                    <div class="section-checkout">
                        <h2 className="titulo2" >Items en Pedido</h2>
                        <ul>
                            {
                                items.map((item) => <li>1x{item.Marca} {item.Modelo} {item.Precio}</li>)
                            }
                        </ul>
                    </div>
                    
                    <div class="section-checkout">
                        <h2 className="titulo2" >Resumen de Orden</h2>
                        <ul>
                            <li>Subtotal: S/{subtotal - impuesto}</li>
                            <li>Envío: S/{shippingCost}</li>
                            <li>Impuestos: S/{impuesto}</li>
                            <li>Total: S/{total}</li>
                        </ul>
                        <button className="order" type="submit" onClick={handleButtonClick} >Completar Orden</button>
                    </div>
                </div>
                
            </form>
        </>
    )
}

export default Checkout