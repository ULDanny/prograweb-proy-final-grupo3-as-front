import React, { useState, useEffect } from 'react';
import Calendario from '../Calendario/Calendario'
import ordenApi from '../../api/orden';
import clienteApi from '../../api/cliente';

const InformacionDashboard = () => {
    const [startDate, setStartDate] = useState(new Date());
    const [ordenes, setOrdenes] = useState(0);
    const [clientesNuevos, setClientesNuevos] = useState(0);
    const [ingresos, setIngresos] = useState(0);

    const handleDateChange = (date) => {
        setStartDate(date);
    };

    useEffect(() => {
        const fetchData = async () => {
            const formattedDate = startDate.toISOString().split('T')[0];

            const ordenesResponse = await ordenApi.findAll();
            const ordenesDelDia = ordenesResponse.filter(orden => orden.fechaOrden.startsWith(formattedDate));
            setOrdenes(ordenesDelDia.length);

            const clientesResponse = await clienteApi.findAll();
            const clientesDelDia = clientesResponse.filter(cliente => cliente.fechaRegistro.startsWith(formattedDate));
            setClientesNuevos(clientesDelDia.length);

            const ingresosDelDia = ordenesDelDia.reduce((total, orden) => total + parseFloat(orden.total), 0);
            setIngresos(ingresosDelDia.toFixed(2));
        };

        fetchData();
    }, [startDate]);

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
                            <p>{ordenes}</p>
                        </div>
                        <p>Órdenes del día</p>
                    </div>
                    <div style={styles.box}>
                        <div style={styles.datos}>
                            <p>{clientesNuevos}</p>
                        </div>
                        <p>Clientes nuevos</p>
                    </div>
                    <div style={styles.box}>
                        <div style={styles.datos}>
                            <p>{ingresos}</p>
                        </div>
                        <p>Ingresos del día</p>
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
        width: '40px',
        fontSize: '40px',
    },
};

export default InformacionDashboard;
