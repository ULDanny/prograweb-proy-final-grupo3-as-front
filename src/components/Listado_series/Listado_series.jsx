import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { dataseries } from '../../data/series';
import './Listado_series.css';
import MenuNavAdmin from '../MenuNavAdmin/MenuNavAdmin';

const ListadoSeries = () => {
    const navigate = useNavigate();
    const [series, setseries] = useState(dataseries);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const rawseries = localStorage.getItem('series');
        if (!rawseries) {
            localStorage.setItem('series', JSON.stringify(dataseries));
        } else {
            setseries(JSON.parse(rawseries));
        }
    }, []);

    useEffect(() => {
        handleSearch();
    }, [searchTerm]);

    const handleSearch = () => {
        const rawseries = localStorage.getItem('series');
        if (rawseries) {
            const allseries = JSON.parse(rawseries);
            const filteredseries = allseries.filter(serie =>
                serie.id.toString().includes(searchTerm) ||
                serie.marcaProd.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setseries(filteredseries);
        }
    };

    const handleEliminar = (id) => {
        const updatedseries = series.filter(serie => serie.id !== id);
        setseries(updatedseries);
        localStorage.setItem('series', JSON.stringify(updatedseries));
    };

    const handleView = (id) => {
        navigate(`/detalle_serie/${id}`);
    };

    return (/*
        <section class="ListadoSeries">
            <article class="Admin">
                <div id="Admindiv">Admin</div>
                <ul class="ListaAdmin">
                    <li>Dashboard</li><br></br>
                    <li>Usuarios registrados</li><br></br>
                    <li>series</li><br></br>
                    <li>Órdenes</li><br></br>
                    <li>series más vendidos</li><br></br>
                    <li>Series</li><br></br>
                </ul>

            </article>
        <section  style={styles.section}>
            <div style={styles.tituloPagina}>
                <h3 id ="tituloseries" style={styles.titulo}>Series</h3>
                <button id="btndetalleserie" style={styles.BotonTitulo} type="button" onClick={() => navigate('/mantenimiento_series')}>Mantenimiento  Serie</button>
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
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Descripción</th>
                            <th>Fecha de registro</th>
                            <th>Número de series</th>
                            
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {series.map((serie) => (
                            <tr key={serie.id}>
                                <td>{serie.id}</td>
                                <td style={styles.tablamarcaProd}><b>{serie.marcaProd}</b> </td>
                                <td style ={styles.tabladescr}>{serie.descrip}</td>
                                <td>{serie.fechaRegistro}</td>
                                <td>{serie.stockProd}</td>
                                
                                <td>
                                    <button type="button" style={styles.BotonAccion} onClick={() => handleView(serie.id)}>VER</button>
                                    
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            </section>
            </section>*/
            <section class="ListadoSeries">
            <MenuNavAdmin/>
        <section  style={styles.section}>
            <div style={styles.tituloPagina}>
                <h3 id ="tituloseries" style={styles.titulo}>Series</h3>
                <button id="btndetalleserie" style={styles.BotonTitulo} type="button" onClick={() => navigate('/mantenimiento_series')}>Mantenimiento  Serie</button>
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
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Descripción</th>
                            <th>Fecha de registro</th>
                            <th>Número de series</th>
                            
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {series.map((serie) => (
                            <tr key={serie.id}>
                                <td>{serie.id}</td>
                                <td style={styles.tablamarcaProd}><b>{serie.marcaProd}</b> </td>
                                <td style ={styles.tabladescr}>{serie.descrip}</td>
                                <td>{serie.fechaRegistro}</td>
                                <td>{serie.stockProd}</td>
                                
                                <td>
                                    <button type="button" style={styles.BotonAccion} onClick={() => handleView(serie.id)}>VER</button>
                                    
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            </section>
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
        borderRadius: '5px'
    },
    titulo: {
        margin: '15px',
        color: 'black',
        fontSize: '30px',

        
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
        padding: '5px',
        borderRadius: '5px',
        color: 'black',
        border: '1px solid black',
        backgroundColor: 'white',
        boxSizing: 'border-box',
        fontSize : '15px',
        
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
        width: '90%',
        borderCollapse: 'collapse',
        marginTop: '0px',
        color: 'black',
        textAlign: 'center',
        paddingleft : '32px',
    
    },
    tablamarcaProd: {
        
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

export default ListadoSeries;