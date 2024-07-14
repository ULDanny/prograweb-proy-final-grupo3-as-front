import React, { useState, useEffect } from 'react';
import CarrouselUR from "./CarrouselUR";
import SearchComponent from '../Search/SearchComponent';
import usuarioAPI from '../../../api/usuario';
import clienteAPI from '../../../api/cliente';

export default function SectionUR() {
    const [elementosFiltrados, setElementosFiltrados] = useState([]);
    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const dataUsuarios = await usuarioAPI.findAll();
                const dataClientes = await clienteAPI.findAll();
                const combinedData = dataUsuarios.map(usuario => {
                    const cliente = dataClientes.find(c => c.idUsuario === usuario.id);
                    return {
                        id: usuario.id,
                        nombre: cliente?.nombre || '',
                        apellido: cliente?.apellido || '',
                        email: usuario.email,
                        estado: usuario.estado,
                        fecha: cliente?.fechaRegistro || ''
                    };
                });
                setUsuarios(combinedData);
                setElementosFiltrados(combinedData);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    const criteriosOrdenUsuarios = [
        { value: 'nombre-a-z', label: 'Nombre (A-Z)', func: (a, b) => a.nombre.localeCompare(b.nombre) },
        { value: 'nombre-z-a', label: 'Nombre (Z-A)', func: (a, b) => b.nombre.localeCompare(a.nombre) },
        { value: 'id-asc', label: 'ID (menor a mayor)', func: (a, b) => a.id - b.id },
        { value: 'id-desc', label: 'ID (mayor a menor)', func: (a, b) => b.id - a.id }
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
        backgroundColor: 'grey',
        height: '40px',
        paddingLeft: '10px',
    };

    const theadStyle = {
        border: '1px solid #ddd',
    };

    const bodyStyle = {};

    const carrStyle = {
        marginTop: '10px',
    };

    return (
        <section style={hStyle}>
            <h2 style={h2Style}>Usuarios Registrados</h2>
            <SearchComponent
                data={usuarios}
                setElementosFiltrados={setElementosFiltrados}
                criteriosOrden={criteriosOrdenUsuarios}
                placeholder="Buscar por nombre, apellido o correo ..."
            />
            <table style={tStyle}>
                <thead style={theadStyle}>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Correo</th>
                        <th>Fecha de Registro</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody style={bodyStyle}>
                    <CarrouselUR data={elementosFiltrados} style={carrStyle} />
                </tbody>
            </table>
        </section>
    );
}