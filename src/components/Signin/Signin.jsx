import Header from "../Shares/Header/Header";
import Footer from "../Shares/Footer/Footer";
//import userAccounts from "../../data/userAccounts";
import usuarioApi from '../../api/usuario.js';
import  { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import clienteApi from '../../api/cliente.js';

export default function Signin() {
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confPassword, setConfPassword] = useState('');
    const [userAccounts, setUserAccounts] = useState([]);
    const [error,setError] = useState('');
    const navigate = useNavigate();



    useEffect(() => {
        handleOnLoad();
      }
        , []);

    const handleOnLoad = async () => {
        try {
            const usuariosData = await usuarioApi.findAll();
            console.log(usuariosData);
            setUserAccounts(usuariosData);
        } catch (error) {
            console.log(error);
        }
    }

    
    const handleSubmit = async (e) => { 
        e.preventDefault();
        if (password !== confPassword) {
            setError('Las contraseñas no coinciden');
        } else {
            // correo electrónico ya está registrado?
            const existingUser = userAccounts.find(user => user.email === email);
            if (existingUser) {
                setError('El correo electrónico ya está registrado');
            } else {
                const payloadUsuario = {
                    rol: "cliente",
                    email: email,
                    password: password,
                    estado: "Activo"
                }
                
                await usuarioApi.create(payloadUsuario)
                    .then(async (response) => {
                        console.log(response);
                        const payloadCliente = {
                            idUsuario: response.id,
                            nombre: nombre,
                            apellido: apellido,
                            fechaRegistro: new Date(),
                        }
                        await clienteApi.create(payloadCliente)
                            .then(() => {
                                navigate('/login');
                            })
                            .catch((error) => {
                                console.log(error);
                            });
                    })
            }
        }
    }
    



    return (
        <>
        
        <Header/>
        <section className='sectionLogin'>
            <h3>Registrar</h3>
        <br />

            <form className="form-login" onSubmit={handleSubmit}>

                <input type="text" id="inputNombre" className="form-control" placeholder="Nombre" required value={nombre}
                            onChange={ (e) => {
                                setNombre(e.target.value);
                            }} />

                <br />
                <br />
                <input type="text" id="inputApellido" className="form-control" placeholder="Apellido" required value={apellido}
                            onChange={ (e) => {
                                setApellido(e.target.value);
                            }} />
                            <br /><br />
                
                <input type="email" id="inputEmail" className="form-control" placeholder="Email " required  value={email}
                            onChange={ (e) => {
                                setEmail(e.target.value);
                            }}  />
                
            
                <br />
                <br />
                <input type="password" id="inputPassword" className="form-control" placeholder="Password" required value={password}
                            onChange={ (e) => {
                                setPassword(e.target.value);
                            }} />
                    
       
                    <br />
                    <br />
                    <input type="password" id="inputConfPassword" className="form-control" placeholder="Confirmar Password" required value={confPassword}
                            onChange={ (e) => {
                                setConfPassword(e.target.value);
                            }} />
                    <br />
                    
                    { <p className='errorMessage'>{error}</p>}
                <br />
                <button className="submitButton" type="submit">Crear nueva cuenta</button>
                <br />
                <br />

                
            </form>
            </section>

            <Footer/>
        </>
    )
}