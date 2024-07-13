import React from 'react';
//import Header from "../components/HeaderUO/HeaderLO"
//import Footer from "../components/FooterUO/Footer"
import Header from '../components/Shares/Header/Header';
import Footer from '../components/Shares/Footer/Footer';
import { useItemId } from '../context/itemIdContext'
import {Usuarios} from "../data/Usuarios";
import MenuNavAdmin from '../components/MenuNavAdmin/MenuNavAdmin';

const DetalleUsuario = () =>{
    const DO = {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        background: '#f4f4f4',

    }
    const minDO = {
        flex: 1,
        display: 'flex',
    }
    const contentStyleDO = {
        flex: 1,
    }
    const hStyle={
        fontSize: '14px',
        background: 'white',
        marginRight: '20px',
        marginBottom: '15px',
        height: '500px',
        border: 'solid'
    }
    
    const tStyle =  {
        width: '100%',
        borderCollapse: 'collapse',
    }
    const h2Style = {
        background: 'grey',
        height :'40px',
        paddingLeft: '10px',

    }
    
    const theadStyle =  {
        border: '1px solid #ddd',
    }
    const ulStyle ={
        display: 'flex',
        listStyle: 'none',
        fontSize :'15px',
        
    }
    const ilStyle = {
        marginLeft: '4rem',
    }
    const tdStyle = {
        padding: '10px 70px 30px',
        textAlign: 'center',
        
    }
    const butSty = {
        marginLeft: '5px',
        padding: '4px',
        backgroundColor: 'black',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',

    }
    const tdStyl = {}
    const { itemId } = useItemId();
    const findItemById = (id) => {
        return Usuarios.find(item => item.id === parseInt(id));
    };
    const item = findItemById(itemId);

  // Verificar si se encontró el item
  if (!item) {
    return <p>Item no encontrado</p>;
  }
  
    return(
    <>
    <div style={DO}>
       <Header />
            <div style={minDO}>
                <MenuNavAdmin />
                <div style={contentStyleDO}> 
                <section style={hStyle}>
                    <h2 style={h2Style}>Detalle de Usuario Registrado</h2>
                    <ul style={ulStyle}>
                        <li style={ilStyle}>ID: {item.id}</li>
                        <li style={ilStyle}>Nombre: {item.nombre} {item.apellido}</li>
                        <li style={ilStyle}>Correo: {item.correo}</li>
                        <li style={ilStyle}>Fecha de Registro: {item.fechaRegistro}</li>
                    </ul>
                    <h2 style={h2Style}>Ordenes recientes </h2>
                    <table style={tStyle}>
                        <thead style={theadStyle}>
                            <tr>
                                <th>ID</th>
                                <th>Fecha Orden</th>
                                <th>Total</th>
                                <th>Productos</th>
                                <th>Estado</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody >
                            <tr>
                                <td style={tdStyle}>{item.id}</td>
                                <td style={tdStyle}>{item.FechaOrden}</td>
                                <td style={tdStyle}>{item.total}</td>
                                <td style={tdStyle}>{item.productos}</td>
                                <td style={tdStyle}>{item.Estado}</td>
                                <td style={tdStyle}><button style={butSty}>Ver</button></td>
                            </tr>  
                        </tbody>          
                    </table>
                </section>
    
                </div>
            </div>
            <Footer />           

       

    </div>
       
    </>
    );
};
export default DetalleUsuario;