import React, { useState } from 'react';
import Calendario from '../Calendario/Calendario'

const InformacionDashboard = () => {
    const [startDate, setStartDate] = useState(new Date());
    const handleDateChange = (date) => {
        setStartDate(date);
    };

    return (
        <>
            <section style={styles.section}>
                <div style={styles.tituloPagina}>
                    <h3 style={styles.titulo}>Dashboard</h3>
                    <Calendario startDate={startDate} handleDateChange={handleDateChange} />
                </div>
                    <div style={styles.container}>
                        <div style={styles.box}>
                            <div style={styles.datos}>
                                <p>27</p>
                            </div>
                            <p>Órdenes del día de hoy</p>
                        </div>
                        <div style={styles.box}>
                            <div style={styles.datos}>
                                <p>27</p>
                            </div>
                            <p>Usuarios nuevos</p>
                        </div>
                        <div style={styles.box}>
                            <div style={styles.datos}>
                                <p>27</p>
                            </div>
                            <p>Ingresos de hoy</p>
                        </div>
                    </div>
            </section>
        </>
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
        marginBottom: '15px',
    },
    titulo: {
        margin: '15px',
        color: 'black',
    },
    container: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    box: {
        width: '27%',
        backgroundColor: 'grey',
        padding: '0px 20px',
        textAlign: 'center',
    },
    datos: {
        with: '40px',
        fontSize: '40px',
    },

};

export default InformacionDashboard;
