import './Detalle_orden.css';
import { useEffect } from 'react';
import { useState } from 'react';
import PagoQR from './Pago_QR';
import PagoTarjeta from './Pago_tarjeta';
import ordenapi from '../../api/orden';

export default function DetalleOrden() {

    const [order, setOrder] = useState(null);
    const [envio,setEnvio ] = useState(10)
    const [displayPagoQR,setdisplayPAGOQR] =useState("none")
    const [displayPagoTarjeta,setdisplayPagoTarjeta] =useState("none")
    const [precioEnvio,setPrecioEnvio ] = useState(0.0) 
    const [impuestos,setImpuestos ] = useState(0.0) 
    const [precioTotalOrden,setPrecioTotalOrden ] = useState(0.0) 



     

    useEffect(() => {
        cargar()
        
    }, []);

    const cargar = async () => {
        console.log(localStorage.getItem('order'));
        const idOrder = localStorage.getItem('order');
       let parsedOrder;
        try {
        parsedOrder = await ordenapi.findOneComplete(idOrder);
        } catch (error) {
            
        console.error('Error al obtener orden:', error);
        }
        console.log(parsedOrder);
        setOrder(parsedOrder);
        
    }


    useEffect(() => {
        if (order){
            if (order.tipoPago == "Tarjeta de Crédito"){
                TIPODEPAGO2();      
            }
            else {
                TIPODEPAGO();
            }

            if (order.tipoEnvio == "Economico"){
                setPrecioEnvio(10.0)
            }else {
                setPrecioEnvio(17.0)
            }
        }
    }, [order]);

    

    function TIPODEPAGO(){
        const qr = document.querySelector("#PAGOQR").value 
        const tarjeta = document.querySelector("#PAGOTARJETA").value 
        let nada; 

        if (qr =="QR"){
            
            setdisplayPAGOQR("flex")
            setdisplayPagoTarjeta("none")
        }

        else if (tarjeta !=="Tarjeta"){
            
            setdisplayPagoTarjeta("none")
        }

        else {
            nada =<p>Data loaded successfully.</p>
            
        }}

        function TIPODEPAGO2(){
            const qr = document.querySelector("#PAGOQR").value 
            const tarjeta = document.querySelector("#PAGOTARJETA").value
            let nada; 
    
            if (tarjeta =="Tarjeta"){
                
                setdisplayPagoTarjeta("Flex")
                setdisplayPAGOQR("none")
            }

            else if (qr !==""){
            
                setdisplayPAGOQR("none")
            }
    
            else {
                nada =<p>Data loaded successfully.</p>
                
            }
    

       
    }

    const cancelarOrden = async () => {
        try {


            const payloadOrden = {
                id: order.id,
                envios: "Cancelado"
            }
            await ordenapi.update(payloadOrden);
            alert("Orden cancelada correctamente");
        } catch (error) {
            console.error('Error al cancelar orden:', error);
            alert("Error al cancelar orden");
        }
    }

    return (
        <>{order?(
            <>
        <section className="detalle_orden">
        <h1 id="Numero_orden">Detalles de Orden Nro {order.orderNumber}</h1>
        <h2 className="subtitulos">Datos de compra</h2>
        <section className="cajas">
            <article>
                <div>
                    <b>Dirección de envío </b>
                    
                </div>
                    <span>{order.direccion}</span><br />
                    <span>{order.distrito}</span><br />
                    <span>{order.departamento}</span><br />
                    <span>{order.pais}</span>
            </article>

            <article>
                <div>
                    <b>Pago</b><br></br>
                    <input type="radio" id="PAGOQR" name="metpago" value="QR"  checked={order?.tipoPago == "Yape"} /> <span>Pago con código QR</span><br></br>
                    <PagoQR display={displayPagoQR}/>
                    <input type="radio" id="PAGOTARJETA" name="metpago" value="Tarjeta"  checked={order?.tipoPago== "Tarjeta de Crédito"}/> <span>Pago con tarjeta de crédito</span><br></br> <br></br>
                    <PagoTarjeta display={displayPagoTarjeta}/>
                </div>
            </article>

        </section >
        <h2 className="subtitulos">Método de envío</h2>
        
        <section className="radios">
            <article className="radiostodo">
            <input type="radio" id="radio1Economic" name="envio" value="10" checked={order?.tipoEnvio == "Economico"}/> <span>Económico Aéreo - S/10.00</span>
            <input type="radio" id="radio2Prioritario" name="envio" value="17" checked={order?.tipoEnvio == "Prioritario"} /> <span>Envío Prioritario (5 a 10 días)-S/17.00</span>
        </article>
        </section>

        <section className="cajas">
        <article>
                <div>
                   <b> Items de pedido</b>
                    
                </div>
                {order.detalleordens?.map((item) => (
                    <span >{item.producto.nombre.split(" ").slice(0, 3).join(" ")} x{item.cantidad} S/{item.subTotal}.00<br></br></span>
                ))}
            </article>

            <article>
                <div>
                    <b>Resumen de Orden </b>
                </div>
                
                <span>Subtotal: S/{order.subTotal}<br></br></span>
                <span>Envío: S/{precioEnvio} <br></br></span>
                <span>Impuestos: S/{order.impuestos} <br></br></span>
                <span>Total: S/{order.total}<br></br> </span>
                <button id="BotonCancelar" onClick={ 
                    () => {
                        cancelarOrden();
                    }
                 } >Cancelar Pedido</button>
            </article>
        </section>
        </section>
        <br></br>
        

        
        </>
):(<p>No hay detalles de orden disponibles</p>)}
           
    </>
    
    
        );
}