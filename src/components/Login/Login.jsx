import './Login.css'

import  { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import usuarioApi from '../../api/usuario.js';
import clienteApi from '../../api/cliente.js';
import { useAuthUser } from '../../context/UserContext/UserContext.jsx';


export default function Login() {
   

    const [userAccounts, setUserAccounts] = useState([]); 
    const [clienteAccounts, setClienteAccounts] = useState([]);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error,setError] = useState(false);
    const [errorText,setErrorText] = useState('');
    const navigate = useNavigate();
    const { login } = useAuthUser();


    useEffect(() => {
        handleOnLoad();
      }
        , []);

    const handleOnLoad = async () => {
        try {
          const usuariosData = await usuarioApi.findAll();
          setUserAccounts(usuariosData);
            const clientesData = await clienteApi.findAll();
            setClienteAccounts(clientesData);
        } catch (error) {
          console.log(error);
        }
      }


    function handleSubmit(e) {
        e.preventDefault();
        const user = userAccounts.find(user => user.email === email && user.password === password );
        if (user) {
          if(user.estado != 'Activo'){
            setErrorText('Usuario bloqueado. Enviar un correo a soporte@mail.com');
            setError(true);
            return;
          }
          login(user); 
          if (user.rol == 'admin') {
            const data = { ...user,idCliente:null, username: null, lastname: null };
            localStorage.setItem('user', JSON.stringify(data));
            navigate('/dashboardAdmin');
            return;
          }
          const cliente = clienteAccounts.find(cliente => cliente.idUsuario === user.id);
          const data = { ...user, idCliente: cliente.id,  username: cliente.nombre, lastname: cliente.apellido  };
          localStorage.setItem('user', JSON.stringify(data));
          navigate('/');
        } else {
          setErrorText('Usuario o contraseña incorrectos');
          setError(true);
        }
      }



    return (
        <><section className='sectionLogin'>
            <h3>Ingreso para clientes registrados</h3>
        <br />

            <form className="form-login" onSubmit={handleSubmit}>
                
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
                    {error && <p className='errorMessage'>{errorText}</p>}
                <br />
                <button className="submitButton" type="submit" >Ingresar</button>
                <br />
                <br />

                <a  href="/recuperacion">Olvidé mi contraseña</a>
                <br />
                <br />
                <a  href="/signin">No tengo cuenta, deseo registrarme</a>

                
            </form>
            </section>
        </>
    )
}