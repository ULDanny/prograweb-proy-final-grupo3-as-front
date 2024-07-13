import { Navigate, useNavigate } from "react-router-dom";
import { useItemId } from '../../../context/itemIdContext'

export default function SectionCardLO(props){
    const trStyle = {
        paddingLeft : '20px',
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
    const navigate = useNavigate();
    const { setItemIdContext } = useItemId();
    const handleItemClick = (itemId) => {
        console.log('Item ID:', itemId);
        setItemIdContext(itemId);
        navigate(`/DetalleOrden/${itemId}`);
      };
      
  return<>
    <tr key={props.id} >
      <td style={trStyle}>{props.id}</td>
      <td style={trStyle}>{props.nombre} {props.apellido}</td>
      <td style={trStyle}>{props.FechaOrden}</td>
      <td style={trStyle}>{props.total}</td>
      <td style={trStyle}>{props.correo}</td>
      <td style={trStyle}>{props.Envios}</td>
      <td style={trStyle}>

        <button onClick={() => handleItemClick(props.id)} style={butSty}>Ver</button>
         
      </td>
    </tr>     
    </>
}