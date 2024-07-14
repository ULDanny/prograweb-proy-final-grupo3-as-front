import React, { useState, useEffect } from 'react';
import usuarioAPI from '../../../api/usuario';
import clienteAPI from '../../../api/cliente';
import ordenAPI from '../../../api/orden';
import detalleOrdenAPI from '../../../api/detalleOrden'; 
import { useItemId } from '../../../context/itemIdContext';

const SectionDU = () => {
    const [usuario, setUsuario] = useState(null);
    const [cliente, setCliente] = useState(null);
    const [ordenes, setOrdenes] = useState([]);
    const { itemId } = useItemId();

    useEffect(() => {
        const fetchUsuario = async () => {
            try {
                const user = await usuarioAPI.findOne(itemId);
                console.log('Usuario:', user);
                setUsuario(user);

                const client = await clienteAPI.findOne(user.id);
                console.log('Cliente:', client);
                setCliente(client);

                const userOrders = await ordenAPI.findAll();
                console.log('Órdenes:', userOrders);

                const userSpecificOrders = userOrders.filter(order => order.idCliente === client.id);

                if (Array.isArray(userSpecificOrders)) {
                    // Fetch detalleOrdenes
                    const allDetalleOrdenes = await detalleOrdenAPI.findAll();
                    console.log('Detalle Ordenes:', allDetalleOrdenes);

                    const ordersWithDetails = userSpecificOrders.map(order => {
                        const detalles = allDetalleOrdenes.filter(detail => detail.idOrden === order.id);
                        const totalProductos = detalles.reduce((acc, curr) => acc + curr.cantidad, 0);
                        return { ...order, totalProductos };
                    });

                    setOrdenes(ordersWithDetails);
                } else {
                    console.error('La respuesta de las órdenes no es un array:', userSpecificOrders);
                }
            } catch (error) {
                console.error('Error fetching user or orders:', error);
            }
        };

        fetchUsuario();
    }, [itemId]);

    if (!usuario || !cliente) {
        return <p>Cargando...</p>;
    }

    const hStyle = {
        fontSize: '14px',
        background: 'white',
        marginRight: '20px',
        marginBottom: '15px',
        height: '500px',
        marginLeft: '10px'
    };
    const tStyle = {
        width: '100%',
        borderCollapse: 'collapse',
    };
    const h2Style = {
        background: 'grey',
        height: '40px',
        paddingLeft: '10px',
    };
    const theadStyle = {
        border: '1px solid #ddd',
    };
    const ulStyle = {
        display: 'flex',
        listStyle: 'none',
        fontSize: '15px',
    };
    const ilStyle = {
        marginLeft: '4rem',
    };
    const tdStyle = {
        padding: '10px 70px 30px',
        textAlign: 'center',
    };
    const butSty = {
        marginLeft: '5px',
        padding: '4px',
        backgroundColor: 'black',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    };
    

    return (
        <section style={hStyle}>
            <h2 style={h2Style}>Detalle de Usuario Registrado</h2>
            <ul style={ulStyle}>
                <li style={ilStyle}>ID: {usuario.id}</li>
                <li style={ilStyle}>Nombre: {cliente.nombre} {cliente.apellido}</li>
                <li style={ilStyle}>Correo: {usuario.email}</li>
                <li style={ilStyle}>Fecha de Registro: {cliente.fechaRegistro}</li>
            </ul>
            <h2 style={h2Style}>Ordenes recientes</h2>
            <table style={tStyle}>
                <thead style={theadStyle}>
                    <tr>
                        <th>ID</th>
                        <th>Fecha Orden</th>
                        <th>Total</th>
                        <th>Productos</th>
                        <th>Estado Envío</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {ordenes.length > 0 ? (
                        ordenes.map((orden) => (
                            <tr key={orden.id}>
                                <td style={tdStyle}>{orden.id}</td>
                                <td style={tdStyle}>{orden.fechaOrden}</td>
                                <td style={tdStyle}>{orden.total}</td>
                                <td style={tdStyle}>{orden.totalProductos}</td>
                                <td style={tdStyle}>{orden.envios}</td>
                                <td style={tdStyle}>
                                    <button  style={butSty}>Ver</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" style={tdStyle}>No hay órdenes recientes</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </section>
    );
};

export default SectionDU;