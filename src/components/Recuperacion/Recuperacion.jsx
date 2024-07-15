import React, { useEffect, useState } from 'react';
//import userAccounts from '../../data/userAccounts';
import Header from '../Shares/Header/Header';
import Footer from '../Shares/Footer/Footer';
import usuarioApi from '../../api/usuario.js';


export default function Recuperacion() {
    const [email, setEmail] = useState('');
    const [message,setMessage] = useState('');
    const [userAccounts, setUserAccounts] = useState([]);

    useEffect(() => {
        handleOnLoad();
    }, []);

    const handleOnLoad = async () => {
        try {
          const usuariosData = await usuarioApi.findAll();
          setUserAccounts(usuariosData);
          console.log(usuariosData);
        } catch (error) {
          console.log(error);
        }
      }
    
    function handleSubmit(e) {
        e.preventDefault();
        const user = userAccounts.find(user => user.email === email);
        if (user) {
            setMessage('Se ha enviado un correo electrónico con las instrucciones para recuperar la contraseña');
            console.log(user.password);
        } else {
            setMessage('El correo electrónico no está registrado');
        }
      }
    
    return (
        <>
        <Header/>
        <section className='sectionLogin'>
            <h3>Recuperación de contraseña</h3>
        <br />

            <form className="form-login" onSubmit={handleSubmit}>

                <input type="email" id="inputEmail" className="form-control" placeholder="Email " required  value={email}
                            onChange={ (e) => {
                                setEmail(e.target.value);
                            }}  />
                
                <br />
                {message && <p className="errorMessage">{message}</p>}
                <br />
                <button className="submitButton" type="submit">Recuperar contraseña</button>
                <br />
                <br />
                <a  href="/login">Regresar a Login</a>
                
            </form>
        </section>
        <Footer/>
        </>
    );
}
