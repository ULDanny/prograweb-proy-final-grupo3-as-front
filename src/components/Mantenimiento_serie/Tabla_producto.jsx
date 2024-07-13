import './Mantenimiento_serie.css';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Productos_series } from '../../data/Productos_series';


export default function TablaProductos(props){
   


    const navigate = useNavigate();
    const [productos, setProductos] = useState(Productos_series);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const rawProductos = localStorage.getItem('productos');
        if (!rawProductos) {
            localStorage.setItem('productos', JSON.stringify(Productos_series));
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
                producto.nombreProd.toLowerCase().includes(searchTerm.toLowerCase())
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

    return (
        <section style={styles.section}>
            
            <div>
                <article>
                <div>Productos de la serie</div>
                <button>+</button>
                </article>
                <table id="productTable" style={styles.tabla}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productos.map((producto) => (
                            <tr key={producto.id}>
                                <td>{producto.id}</td>
                                <td style={styles.tablaNombreProd}>{producto.nombreProd}</td>
                                
                                <td>
                                    
                                    <button type="button" style={styles.BotonAccion} onClick={() => handleEliminar(producto.id)}>Remover</button>
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
        width: '100%',
        borderCollapse: 'collapse',
        marginTop: '0px',
        color: 'black',
        textAlign: 'center',
    },
    tablaNombreProd: {
        width: '50%',
        fontSize: '10px',
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

