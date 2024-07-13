import './Detalle_orden.css';
export default function PagoQR(props){

    const imagenqr ={
        display:props.display,
    }

    return <>
        <img  id="QRimagen" src="src/assets/QR.jpg" style={imagenqr}></img><br></br>
    </>
}