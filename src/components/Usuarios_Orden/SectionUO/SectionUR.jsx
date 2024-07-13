import React, { useState } from 'react';
import CarrouselUR from "./CarrouselUR";
import { Usuarios } from "../../../data/Usuarios";
import SearchComponent from '../Search/SearchComponent';
export default function SectionUR(props) {

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

    const [elementosFiltrados, setElementosFiltrados] = useState(Usuarios);
    return (
        <section style={hStyle}>
            <h2 style={h2Style}>Usuarios Registrados</h2>
            <SearchComponent
                usuarios={Usuarios}
                setElementosFiltrados={setElementosFiltrados}
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