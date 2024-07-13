import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { dataProductos } from '../../data/datos';

const TablaProductos = () => {
    const navigate = useNavigate();
    const [productos, setProductos] = useState(dataProductos);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const rawProductos = localStorage.getItem('productos');
        if (!rawProductos) {
            localStorage.setItem('productos', JSON.stringify(dataProductos));
        } else {
            setProductos(JSON.parse(rawProductos));
        }
    }, []);

    useEffect(() => {
        handleSearch();
    }, [searchTerm]);

    const handleSearch = () => {
        const rawProductos = localStorage.getItem('productos');
        if (rawProductos) {
            const allProductos = JSON.parse(rawProductos);
            const filteredProductos = allProductos.filter(producto =>
                producto.id.toString().includes(searchTerm) ||
                producto.nombre.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setProductos(filteredProductos);
        }
    };

    const handleEliminar = (id) => {
        const updatedProductos = productos.filter(producto => producto.id !== id);
        setProductos(updatedProductos);
        localStorage.setItem('productos', JSON.stringify(updatedProductos));
    };

    const handleView = (id) => {
        navigate(`/producto/${id}`);
    };
    const tablaStyle={
        fontSize: '15px'
    }
    const nombrestyle ={
        fontSize: '10px',
        paddingRight: '-100px'
    }
    return (
        <section style={styles.section}>
            <div style={styles.tituloPagina}>
                <h3 style={styles.titulo}>Productos</h3>
                <button style={styles.BotonTitulo} type="button" onClick={() => navigate('/AgregarProductosAdmin')}>Agregar producto</button>
            </div>
            <div style={styles.searchContainer}>
                <input
                    type="text"
                    id="searchBar"
                    placeholder="Buscar por id, serie o detalle..."
                    style={styles.searchBar}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <div>
                <table id="productTable" style={styles.tabla}>
                    <thead>
                        <tr>
                            <th style={tablaStyle}>ID</th>
                            <th style={tablaStyle}>Nombre</th>
                            <th style={tablaStyle}>Precio</th>
                            <th style={tablaStyle}>Fecha de registro</th>
                            <th style={tablaStyle}>Stock</th>
                            <th style={tablaStyle}>Estado</th>
                            <th style={tablaStyle}>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productos.map((producto) => (
                            <tr key={producto.id}>
                                <td style={styles.tablaNombre}>{producto.id}</td>
                                <td style={nombrestyle}>{producto.nombre}</td>
                                <td style={styles.tablaNombre}>{producto.precio}</td>
                                <td style={styles.tablaNombre}>{producto.fechaRegistro}</td>
                                <td style={styles.tablaNombre}>{producto.stock}</td>
                                <td style={styles.tablaNombre}>{producto.estado}</td>
                                <td>
                                    <button type="button" style={styles.BotonAccion} onClick={() => handleView(producto.id)}>Editar</button>
                                    <button type="button" style={styles.BotonAccion} onClick={() => handleEliminar(producto.id)}>Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
}

const styles = {
    section: {
        backgroundColor: 'white',
        width: '100%',
        margin: '10px',
        padding: '0px',
        display: 'flex',
        flexDirection: 'column',
    },
    tituloPagina: {
        marginBottom: '20px',
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'grey',
    },
    titulo: {
        margin: '15px',
        color: 'black',
    },
    BotonTitulo: {
        marginRight: '5px',
        margin: '10px',
        padding: '8px',
        backgroundColor: 'black',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
    searchContainer: {
        width: '100%',
        marginBottom: '15px',
        display: 'flex',
    },
    searchBar: {
        width: '100%',
        padding: '8px',
        borderRadius: '5px',
        color: 'black',
        border: '1px solid black',
        backgroundColor: 'white',
        boxSizing: 'border-box',
    },
    BotonBuscar: {
        marginLeft: '5px',
        padding: '8px',
        backgroundColor: 'black',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
    tabla: {
        width: '80%',
        borderCollapse: 'collapse',
        marginTop: '0px',
        color: 'black',
        textAlign: 'center',
    },
    tablaNombre: {
        width: '50%',
        fontSize: '10px'
    },
    celda: {
        textAlign: 'center',
        padding: '8px',
        border: '1px solid black',
    },
    BotonAccion: {
        marginLeft: '5px',
        padding: '4px',
        backgroundColor: 'black',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
};

export default TablaProductos;