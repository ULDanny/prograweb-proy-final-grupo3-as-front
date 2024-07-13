import ListOrders from "../ListOrdenes/ListOrdenes";
import './UserLogged.css';
import { useEffect, useState } from "react";
import CambioPassword from "../Cambio_password/Cambio_password";
import RegistroUsuario from "../Registro_usuario/Registro_usuario";
export default function UserLogged(){

    const [userMenuOption, setUserMenuOption] = useState('Orders');
    let SelectedComponent = ListOrders
    const [option,setOption] = useState('')
    useEffect(() => {
        setOption(localStorage.getItem('option'))
    }, []);
    const menuOptionComponents = {
        'Orders': ListOrders,
        'RegistrationData': RegistroUsuario,
        'ChangePassword': CambioPassword
      };

      const handleMenuClick = (option) => {
        setUserMenuOption(option);
        localStorage.setItem('option',option)
    };
    

       


    return (
        <>
            <section id="UserLoggedsection">
                <nav id="UserNavMenu">
                    <h3>Mi cuenta</h3>
                    <ul>
                        <li><a href="" onClick={() => handleMenuClick('Orders')}>Ordenar recientes</a></li>
                        <li><a href="" onClick={() => handleMenuClick('RegistrationData')}>Datos de registro</a></li>
                        <li><a href="" onClick={() => handleMenuClick('ChangePassword')}>Cambiar password</a></li>
                    </ul>
                </nav>
                {option === 'Orders' && <ListOrders />}
                {option === 'RegistrationData' && <RegistroUsuario />}
                {option === 'ChangePassword' && <CambioPassword />}
            </section>
        </>
    );
}