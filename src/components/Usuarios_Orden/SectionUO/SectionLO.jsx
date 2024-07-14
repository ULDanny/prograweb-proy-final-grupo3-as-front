import React, { useState, useEffect } from 'react';
import ordenAPI from '../../../api/orden';
import detalleOrdenAPI from '../../../api/detalleOrden';
import usuarioAPI from '../../../api/usuario';
import clienteAPI from '../../../api/cliente';
import CarrouselLO from "./CarrouselLO";
import SearchComponent from "../Search/SearchComponent";

export default function SectionLO() {
    const [elementosFiltrados, setElementosFiltrados] = useState([]);
    const [ordenes, setOrdenes] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const ordenes = await ordenAPI.findAll();
                const detalleOrdenes = await detalleOrdenAPI.findAll();
                const usuarios = await usuarioAPI.findAll();
                const clientes = await clienteAPI.findAll();

                const ordenesConDetalles = ordenes.map(orden => {
                    const detalles = detalleOrdenes.filter(detail => detail.idOrden === orden.id);
                    const totalProductos = detalles.reduce((acc, curr) => acc + curr.cantidad, 0);
                    const cliente = clientes.find(client => client.id === orden.idCliente);
                    const usuario = usuarios.find(user => user.id === cliente.idUsuario);

                    return {
                        ...orden,
                        totalProductos,
                        nombre: cliente ? cliente.nombre : '',
                        apellido: cliente ? cliente.apellido : '',
                        correo: usuario ? usuario.email : '',
                    };
                });

                setOrdenes(ordenesConDetalles);
                setElementosFiltrados(ordenesConDetalles);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const criteriosOrdenOrdenes = [
        { value: 'id-asc', label: 'ID (menor a mayor)', func: (a, b) => a.id - b.id },
        { value: 'id-desc', label: 'ID (mayor a menor)', func: (a, b) => b.id - a.id },
        { value: 'total-asc', label: 'Total (menor a mayor)', func: (a, b) => parseFloat(a.total) - parseFloat(b.total) },
        { value: 'total-desc', label: 'Total (mayor a menor)', func: (a, b) => parseFloat(b.total) - parseFloat(a.total) }
    ];

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
        height: '40px',
        paddingLeft: '10px',
        backgroundColor: 'grey',
    };
    const theadStyle = {
        border: '1px solid #ddd',
    };
    const tbodyStyle = {};

    return (
        <section style={hStyle}>
            <h2 style={h2Style}>Órdenes</h2>
            <SearchComponent
                data={ordenes}
                setElementosFiltrados={setElementosFiltrados}
                criteriosOrden={criteriosOrdenOrdenes}
                placeholder="Buscar por ID, usuario, correo ..."
            />
            <table style={tStyle}>
                <thead style={theadStyle}>
                    <tr>
                        <th>ID</th>
                        <th>Usuarios</th>
                        <th>Fecha Orden</th>
                        <th>Total</th>
                        <th>Correo</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody style={tbodyStyle}>
                    <CarrouselLO data={elementosFiltrados} />
                </tbody>
            </table>
        </section>
    );
}