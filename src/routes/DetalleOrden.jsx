//import Header from "../components/HeaderUO/HeaderLO"
//import Footer from "../components/FooterUO/Footer"
import Header from "../components/Shares/Header/Header"
import Footer from "../components/Shares/Footer/Footer"
import MetodoEnvio from "../components/Usuarios_Orden/MetodoEnvio/ME"
import { useItemId } from '../context/itemIdContext'
import {Usuarios} from "../data/Usuarios"

export default function DetalleOrden(){
    const DO = {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        background: '#f4f4f4',

    }
    const minDO = {
        display: 'flex',
    }
    const contentStyleDO = {
        display: 'flex',
    }
    const sectionStyleDO1 = {
        marginBottom: '20px',
        marginLeft: '20px',
        background: 'white',
        width: '50%',
        paddingLeft: '20px',
        border: 'solid',
        fontSize: '20px',  
  
      };
    
      const liStyleDO1= {
        display: 'flex',
        flexDirection: 'column',
        marginLeft: '20px',   
      };
      
      const h4Style = {
        marginLeft: '20px',
        marginBottom: '0px',
        fontSize: '20px'
    }
    const h3Style ={
      backgroundColor: 'grey',
      marginLeft: '20px',
      marginRight: '20px',
      height: '40px',
       fontSize: '20px'


    }
    const asideStyle = {
        marginBottom: '20px',
        marginLeft: '50px',
        backgroundColor: 'white',
        width: '50%',
        height: '350px',
        marginRight: '20px',
        border: 'solid',
        fontSize: '20px'


  
      };
    
      const liStyle = {
        display: 'flex',
        flexDirection: 'column',
        marginLeft: '20px',
      };
      const sectionStyle = {
        marginBottom: '20px',
        background: 'white',
        width: '50%',
        marginLeft: '20px', 
        height: '350px',
        paddingLeft: '20px',
        border: 'solid',
        fontSize: '20px'


  
      };
      const asideStyle2 = {
        marginBottom: '20px',
        backgroundColor: 'white',
        marginLeft: '50px',
        width: '50%',
        paddingLeft: '20px',
        border: 'solid',
        fontSize: '20px'

  
      };
    
      const buttonStyle = {
        padding: '10px 20px',
        backgroundColor: '#ff4c4c',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        marginLeft: '250px',
        marginTop: '0',
        height:'50px',
        fontSize: '20px'


      };
      const ROStyle = {
        marginLeft: '20px',
      }
    
      const handleCancelOrder = () => {
        alert('Pedido cancelado');
      };
      
    const { itemId } = useItemId();
    const findItemById = (id) => {
        return Usuarios.find(item => item.id === parseInt(id));
    };
    const item = findItemById(itemId);
    if (!item) {
        return <p>Item no encontrado</p>;
      }

    const calcularTotal = (items, envioCosto) => {
        const subtotal = items.reduce((acc, item) => acc + item.precio * item.cantItem, 0);
        const impuestos = subtotal * 0.18;
        const envio = parseFloat(envioCosto.match(/S\/ (\d+(\.\d+)?)/)[1]);
        const total = subtotal + impuestos + envio;
        
        return {
            subtotal: `S/ ${subtotal.toFixed(2)}`,
            impuestos: `S/ ${impuestos.toFixed(2)}`,
            total: `S/ ${total.toFixed(2)}`,
        };
    };
    const { subtotal, impuestos, total } = calcularTotal(item.items, item.envioMethod);

    
    return(
    <>
    <div style={DO}>
       <Header />
       <p style={h4Style}>Detalle de Orden N°: {item.OrdenNro}</p>
       <h3 style={h3Style}>Detalles de Compra</h3>
            <div style={minDO}>
            <section style={sectionStyleDO1}>
                <div style={liStyleDO1}>
                    <h3>Dirección de Envío</h3>
                  <p>{item.Direccion}</p>
                  <p>J{item.Departamento}</p>
                  <p>{item.Departamento}</p>
                  <p>{item.Pais}</p>
                </div>
            </section>
            <aside style={asideStyle}>
                <div style={liStyle}>
                    <h3>Pago</h3>
                    <label>
                      <input type="radio" name="payment" disabled/> Pago con código QR
                    </label>
                    <label>
                      <input type="radio" name="payment" checked disabled /> Pago con tarjeta de crédito
                    </label>
                    <p>Tarjeta de Crédito que termina en: ****{item.UltimoDigito}</p>
                </div>
            </aside>
            </div>
            <MetodoEnvio selectedEnvioMethod={item.envioMethod} />
            <div style={contentStyleDO}>
            <section style={sectionStyle}>
                <h3>Items de pedido</h3>
                <p>{item.items.map((item) => (
                    <li >
                        {item.nombreItem} - S/ {item.precio} x {item.cantItem}
                    </li>
                ))} </p>

            </section>
            <aside style={asideStyle2}>
                    <h3 style={ROStyle}>Resumen de Orden</h3>
                    <p style={ROStyle}>Subtotal: {subtotal}</p>
                    <p style={ROStyle}>Envío: {item.envioMethod}</p>
                    <p style={ROStyle}>Impuestos: {impuestos}</p>
                    <p style={ROStyle}>Total: {total}</p>
                    <button style={buttonStyle} onClick={handleCancelOrder}>
                        Cancelar Pedido
                    </button>
                </aside>           
            </div>
            <Footer />           

    </div>
       
    </>
    )
}