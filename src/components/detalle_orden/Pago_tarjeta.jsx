import './Detalle_orden.css';

export default function PagoTarjeta(props){
    const tarjetadisplay ={
        display:props.display,
        
    }

   
    return <>
         <article className="DatosTarjeta" style={tarjetadisplay}>
            <article>
                        <div ><b>Pago con tarjeta</b></div><br></br>
                        <span>Número de la tarjeta</span><br></br>
                        <input type='text' placeholder='XXXX-XXXX-XXXX-XXXX'></input><br></br>
                        <span>Fecha de caducidad</span><br></br>
                        <input type='text' placeholder='MM/AA'></input><br></br>
                        <span>Titular de la tarjeta</span><br></br>
                        <input type='text' placeholder='NOMBRE APELLIDO'></input><br></br>
                        <span>CVV</span><br></br>
                        <input type='text' placeholder='XXX'></input><br></br>
                    </article>
            </article>
    </>
}