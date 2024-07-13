import CarrouselLO from "./CarrouselLO"
import {Usuarios} from "../../../data/Usuarios"
import SearchComponent from "../Search/SearchComponent"
import React, { useState } from 'react';

export default function SectionLO(){
    const hStyle={
        fontSize: '14px',
        background: 'white',
        marginRight: '20px',
        marginBottom: '15px',
        fontSize: '14px',
        height: '500px',
        marginLeft: '10px'
        


    }
    const secStyle = {

        padding: '10px 990px 10px 10px',
        marginLeft: '0px',
    }
    const tStyle =  {
        width: '100%',
        borderCollapse: 'collapse',
    }
    const h2Style = {
        height :'40px',
        paddingLeft: '10px',
        backgroundColor: 'grey',

    }
    
    const theadStyle =  {
        border: '1px solid #ddd',
    }
    const liStyle ={
        display: 'flex',
    }
    const tbodyStyle = {

    }
    const [elementosFiltrados, setElementosFiltrados] = useState(Usuarios);

    return(
    <>
    <section style={hStyle}>
        <h2 style={h2Style}>Órdenes </h2>
        <SearchComponent
                usuarios={Usuarios}
                setElementosFiltrados={setElementosFiltrados}
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
    </>
    )
}