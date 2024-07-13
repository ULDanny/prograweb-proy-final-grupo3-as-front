import {useNavigate} from 'react-router-dom';
export default function OrdenFila(order){
    const navigate = useNavigate();
    function verDetalle () {
        localStorage.setItem('order', JSON.stringify(order));
        console.log(localStorage.getItem('order'));
        navigate('/detalle_orden');
    };
    const firstDetalle = order.detalleordens && order.detalleordens[0];
    let firstNombre = firstDetalle ? firstDetalle.producto.nombre.split('|')[0].trim() : '';
    if(firstNombre.length > 20){
        firstNombre = firstNombre.substring(0, 40) + '...';
    }
    const firstCantidad = firstDetalle ? firstDetalle.cantidad : '';
    const direccion = order.direccion + ', ' + order.distrito + ', ' + order.departamento + ', ' + order.pais;
    const masProductos = order.detalleordens.length > 1 ? `+${order.detalleordens.length - 1} productos` : '';

    return(
        <div key={order.id} className="order-item">
            <div className="order-info">
                <p>Orden x{firstCantidad}  {firstNombre} {masProductos}</p>
                <p>Fecha: {new Date(order.fechaOrden).toLocaleDateString()} - Total: {order.total}</p>
                <p>Enviado a: {direccion}</p>
            </div>
            
            
            <div className="order-nro">Orden Nro. {order.id}</div>
            <button onClick={verDetalle}>Ver Detalle</button>
            <hr />
          </div>
    )
}