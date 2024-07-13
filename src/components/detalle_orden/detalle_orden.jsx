import './Detalle_orden.css';
import { useEffect } from 'react';
import { useState } from 'react';
import PagoQR from './Pago_QR';
import PagoTarjeta from './Pago_tarjeta';

export default function DetalleOrden() {

    const [order, setOrder] = useState(null);
    const [envio,setEnvio ] = useState(10)
    const [displayPagoQR,setdisplayPAGOQR] =useState("none")
    const [displayPagoTarjeta,setdisplayPagoTarjeta] =useState("none")
    const [precioEnvio,setPrecioEnvio ] = useState(0.0) 
    const [impuestos,setImpuestos ] = useState(0.0) 
    const [precioTotalOrden,setPrecioTotalOrden ] = useState(0.0) 
    const nuevaorder={
        id: 1,
        items: 'x3 Items (Juego de cartas, juego de cartas...)',
        date: '12 de febrero de 2022',
        date2: new Date('2022-02-12'),
        total: 'S/ 122.00',
        precioTotal: 122,
        address: 'Jiron Huascar 123, Jesus Maria, Lima, Peru',
        orderNumber: '12345232'
      }

    const handleChangeOption = (event) =>{
        setEnvio(event.target.value)
        calcularPrecios()
    }

    function calcularPrecios(){
        setPrecioEnvio(parseInt(envio))
        setImpuestos(parseFloat(order.precioTotal)*0.18)
        setPrecioTotalOrden(parseFloat(order.precioTotal)+precioEnvio+impuestos)
    }

      
    useEffect(() => {
        console.log(localStorage.getItem('order'));
        const storedOrder = localStorage.getItem('order');
       let parsedOrder;
        try {
        parsedOrder = JSON.parse(storedOrder);
        } catch (error) {
        console.error('Error parsing storedOrder:', error);
        }
        setOrder(parsedOrder);


    }, []);

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
                    <span>{order.address}</span>
            </article>

            <article>
                <div>
                    <b>Pago</b><br></br>
                    <input type="radio" id="PAGOQR" name="metpago" value="QR"  onClick={TIPODEPAGO} /> <span>Pago con código QR</span><br></br>
                    <PagoQR display={displayPagoQR}/>
                    <input type="radio" id="PAGOTARJETA" name="metpago" value="Tarjeta" onClick={TIPODEPAGO2}/> <span>Pago con tarjeta de crédito</span><br></br> <br></br>
                    <PagoTarjeta display={displayPagoTarjeta}/>
                </div>
            </article>

        </section >
        <h2 className="subtitulos">Método de envío</h2>
        
        <section className="radios">
            <article className="radiostodo">
            <input type="radio" id="radio1Economic" name="envio" value="10" onChange={handleChangeOption} /> <span>Económico Aéreo - S/10.00</span>
            <input type="radio" id="radio2Prioritario" name="envio" value="17" onChange={handleChangeOption}/> <span>Envío Prioritario (5 a 10 días)-S/17.00</span>
        </article>
        </section>
            
        <section className="cajas">
        <article>
                <div>
                   <b> Items de pedido</b>
                    
                </div>

                <span>{order.items} S/{order.precioTotal}.00</span>
            </article>

            <article>
                <div>
                    <b>Resumen de Orden </b>
                </div>
                
                <span>Subtotal: S/{order.precioTotal}.00<br></br></span>
                <span>Envío: S/{precioEnvio} <br></br></span>
                <span>Impuestos: S/{impuestos} <br></br></span>
                <span>Total: S/{precioTotalOrden}<br></br> </span>
                <button id="BotonCancelar">Cancelar Pedido</button>
            </article>
        </section>
        </section>
        <br></br>
        

        
        </>
):(<p>No hay detalles de orden disponibles</p>)}
           
    </>
    
    
        );
}