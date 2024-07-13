import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const MenuNavAdmin = () => {
    const navigate = useNavigate();
    return (
        <>
            <section style={styles.section}>
                <h1 style={styles.title}>Admin</h1>
                <div style={styles.div}>
                    <button style={styles.button} type="button" onClick={() => navigate('/DashboardAdmin')}>Dashboard</button>
                    <button style={styles.button} type="button" onClick={() => navigate('/UsuariosRegistrados')}>Usuarios registrados</button>
                    <button style={styles.button} type="button" onClick={() => navigate('/ListaProductosAdmin')}>Productos</button>
                    <button style={styles.button} type="button" onClick={() => navigate('/ListadoOrdenes')}>Órdenes</button>
                    
                    <button style={styles.button} type="button" onClick={() => navigate('/listado_series')}>Series</button>
                </div>
            </section>
        </>
    );
}

const styles = {
    section: {
        backgroundColor: 'grey',
        width: '20%',
        margin: '10px',
        padding: '20px',
        flexDirection: 'column',
        marginRight: '0px',
    },
    title: {
        marginTop: '0',
        margin: '15px', 
        color: 'black',
    },
    div: {
        listStyleType: 'none',
        padding: '0',
    },
    button: {
        textDecoration: 'none',
        color: 'white',
        display: 'block',
        width: '100%',
        padding: '10px',
        backgroundColor: 'black',
        border: 'none',
        transition: 'background-color 0.3s ease',
        borderRadius: '5px',
        marginBottom: '10px',
        cursor: 'pointer',


    },
};

export default MenuNavAdmin;   