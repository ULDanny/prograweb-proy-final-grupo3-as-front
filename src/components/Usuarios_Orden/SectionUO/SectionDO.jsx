import React, { useEffect, useState } from 'react';
import MetodoEnvio from '../MetodoEnvio/ME';
import ordenApi from '../../../api/orden';
import detalleOrdenApi from '../../../api/detalleOrden';
import productoApi from '../../../api/producto';
import { useItemId } from '../../../context/itemIdContext';

const SectionDO = () => {
    const sectionStyleDO1 = {
        marginBottom: '20px',
        marginLeft: '20px',
        background: 'white',
        width: '50%',
        paddingLeft: '20px',
        border: 'solid',
        fontSize: '20px',  
    };
    const liStyleDO1 = {
        display: 'flex',
        flexDirection: 'column',
        marginLeft: '20px',   
    };
    const h4Style = {
        marginLeft: '20px',
        marginBottom: '0px',
        fontSize: '20px'
    };
    const h3Style = {
        background: '#9FA5A3',
        marginLeft: '20px',
        marginRight: '20px',
        height: '40px',
        fontSize: '20px'
    };
    const asideStyle = {
        marginBottom: '20px',
        marginLeft: '50px',
        backgroundColor: 'white',
        width: '50%',
        height: '350px',
        marginRight: '20px',
        border: 'solid',
        fontSize: '20px'
    };
    const liStyle = {
        display: 'flex',
        flexDirection: 'column',
        marginLeft: '20px',
    };
    const sectionStyle = {
        marginBottom: '20px',
        background: 'white',
        width: '50%',
        marginLeft: '20px', 
        height: '350px',
        paddingLeft: '20px',
        border: 'solid',
        fontSize: '20px'
    };
    const asideStyle2 = {
        marginBottom: '20px',
        backgroundColor: 'white',
        marginLeft: '50px',
        width: '50%',
        paddingLeft: '20px',
        border: 'solid',
        fontSize: '20px'
    };
    const buttonStyle = {
        padding: '10px 20px',
        backgroundColor: '#ff4c4c',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        marginLeft: '250px',
        marginTop: '0',
        height: '50px',
        fontSize: '20px'
    };
    const ROStyle = {
        marginLeft: '20px',
    };
    const contentStyleDO = {
        display: 'flex',
    };
    const minDO = {
        display: 'flex',
    };
    

    const [orden, setOrden] = useState(null);
    const [detallesOrden, setDetallesOrden] = useState([]);
    const [productos, setProductos] = useState([]);
    const { itemId } = useItemId();  

    useEffect(() => {
        const fetchData = async () => {
            const fetchedOrden = await ordenApi.findOne(itemId);
            setOrden(fetchedOrden);

            const fetchedDetalles = await detalleOrdenApi.findAll();
            setDetallesOrden(fetchedDetalles.filter(detalle => detalle.idOrden === parseInt(itemId)));

            const fetchedProductos = await productoApi.findAll();
            setProductos(fetchedProductos);
        };

        fetchData();
    }, [itemId]);

    if (!orden) {
        return <p>Cargando datos...</p>;
    }

    const handleCancelOrder = () => {
        alert('Pedido cancelado');
    };

    return (
        <>
            <p style={h4Style}>Detalle de Orden N°: {orden.id}</p>
            <h3 style={h3Style}>Detalles de Compra</h3>
            <div style={minDO}>
                <section style={sectionStyleDO1}>
                    <div style={liStyleDO1}>
                        <h3>Dirección de Envío</h3>
                        <p>{orden.direccion}</p>
                        <p>{orden.distrito}</p>
                        <p>{orden.departamento}</p>
                        <p>{orden.pais}</p>
                    </div>
                </section>
                <aside style={asideStyle}>
                    <div style={liStyle}>
                        <h3>Pago</h3>
                        <label>
                            <input type="radio" name="payment" disabled /> Pago con código QR
                        </label>
                        <label>
                            <input type="radio" name="payment" checked disabled /> {orden.tipoPago}
                        </label>
                        <p>Tipo de Pago: {orden.tipoPago}</p>
                    </div>
                </aside>
            </div>
            <MetodoEnvio selectedEnvioMethod={orden.tipoEnvio} />
            <div style={contentStyleDO}>
                <section style={sectionStyle}>
                    <h3>Items de pedido</h3>
                    <ul>
                        {detallesOrden.map(detalle => {
                            const producto = productos.find(prod => prod.id === detalle.idProducto);
                            return producto ? (
                                <li key={detalle.id}>
                                    {producto.nombre} - S/ {producto.precio} x {detalle.cantidad}
                                </li>
                            ) : (
                                <li key={detalle.id}>Producto no encontrado</li>
                            );
                        })}
                    </ul>
                </section>
                <aside style={asideStyle2}>
                    <h3 style={ROStyle}>Resumen de Orden</h3>
                    <p style={ROStyle}>Subtotal: S/ {orden.subTotal}</p>
                    <p style={ROStyle}>Envío: {orden.tipoEnvio}</p>
                    <p style={ROStyle}>Impuestos: S/ {orden.impuestos}</p>
                    <p style={ROStyle}>Total: S/ {orden.total}</p>
                    <button style={buttonStyle} onClick={handleCancelOrder}>
                        Cancelar Pedido
                    </button>
                </aside>
            </div>
        </>
    );
};

export default SectionDO;