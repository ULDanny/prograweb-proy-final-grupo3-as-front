import React from 'react';

function MetodoEnvio({ selectedEnvioMethod }) {
    const sectionStyle = {
        marginBottom: '20px',
        marginLeft: '20px',
        marginRight: '20px',
        fontSize: '20px'

    };
    const h3Stlye = {
        backgroundColor: 'grey',
        height: '30px',
        marginBottom: '10px'
    }
    const labStyle = {
        background: 'white',
        height: '30px',
    }
    const label1 = {
        marginLeft: '100px',
    }

    return (
        <div style={sectionStyle}>
            <h3 style={h3Stlye}>Método de Envío</h3>
            <div style={labStyle}>
                <label>
                    <input 
                        type="radio" 
                        name="envioM" 
                        checked={selectedEnvioMethod === 'Económico Aéreo - S/ 10.00'} 
                        disabled 
                    /> Económico Aéreo - S/10.00
                </label>
                <label style={label1}>
                    <input 
                        type="radio" 
                        name="envioM" 
                        checked={selectedEnvioMethod === 'Envío prioritario (5 a 10 días) - S/ 17.00'} 
                        disabled 
                    /> Envío prioritario (5 a 10 días) - S/ 17.00
                </label>
            </div>
        </div>
    );
}

export default MetodoEnvio;