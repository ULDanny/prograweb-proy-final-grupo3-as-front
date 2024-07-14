import React from 'react';
import Header from '../components/Shares/Header/Header';
import Footer from "../components/Shares/Footer/Footer";
import MenuNavAdmin from '../components/MenuNavAdmin/MenuNavAdmin'
import SectionDU from '../components/Usuarios_Orden/SectionUO/SectionDU';

const DetalleUsuario = () => {
    const DO = {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        background: '#f4f4f4',
    };
    const minDO = {
        flex: 1,
        display: 'flex',
    };
    const contentStyleDO = {
        flex: 1,
    };
    return (
        <div style={DO}>
            <Header />
            <div style={minDO}>
                <MenuNavAdmin />
                <div style={contentStyleDO}> 
                    <SectionDU />
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default DetalleUsuario;