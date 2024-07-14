import { useNavigate } from "react-router-dom";
import { useItemId } from '../../../context/itemIdContext';
import React, { useState } from 'react';
import usuarioAPI from '../../../api/usuario';

export default function SectionCardUR(props) {
    const [estado, setEstado] = useState(props.estado);

    const handleToggleStatus = async () => {
        const nuevoEstado = estado === 'Activo' ? 'Inactivo' : 'Activo';
        setEstado(nuevoEstado);
        try {
            await usuarioAPI.update({ id: props.id, estado: nuevoEstado });
            alert(`Estado de usuario ${props.id} cambiado a ${nuevoEstado}`);
        } catch (error) {
            console.error('Error updating user status:', error);
            alert('Error al cambiar el estado del usuario');
        }
    };

    const trStyle = {
        paddingLeft: '20px',
        textAlign: 'center',
    };

    const trStyleUR = {
        marginTop: '15px',
    };

    const StyleBott = {
        marginLeft: '5px',
        padding: '4px',
        backgroundColor: 'black',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    };

    const navigate = useNavigate();
    const { setItemIdContext } = useItemId();
    const handleItemClick = (itemId) => {
        console.log('Item ID:', itemId);
        setItemIdContext(itemId);
        navigate(`/items/${itemId}`);
    };

    return (
        <tr key={props.id} style={trStyleUR}>
            <td style={trStyle}>{props.id}</td>
            <td style={trStyle}>{props.nombre}</td>
            <td style={trStyle}>{props.apellido}</td>
            <td style={trStyle}>{props.email}</td>
            <td style={trStyle}>{props.fecha}</td>
            <td style={trStyle}>{estado}</td>
            <td style={trStyle}>
                <button onClick={() => handleItemClick(props.id)} style={StyleBott}>Ver</button>
                {' | '}
                <button onClick={handleToggleStatus} style={StyleBott}>
                    {estado === 'Activo' ? 'Desactivar' : 'Activar'}
                </button>
            </td>
        </tr>
    );
}