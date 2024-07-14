import './Registro_usuario.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import usuarioApi from '../../api/usuario.js';
import clienteApi from '../../api/cliente.js';

export default function RegistroUsuario() {

    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    const usernuevo = {
        email: 'hola@mail.com',
        username: 'juan',
        userlastname: 'perez',
        password: '1234'
    }

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        const parsedUser = storedUser ? JSON.parse(storedUser) : usernuevo;
        setUser(parsedUser);
    }, []);

    const handleUpdate = async () => {
        try {
            
            const updatedUser = {
                id: user.id,
                email: document.getElementById('email').value,
            }
            await usuarioApi.update(updatedUser);

            const updatedCliente = {
                id: user.idCliente,
                nombre: document.getElementById('username').value,
                apellido: document.getElementById('userlastname').value,
            }

            await clienteApi.update(updatedCliente);
            alert('Usuario actualizado correctamente');
           
            const userStorage = {
                ...user,
                email: updatedUser.email,
                username: updatedCliente.nombre,
                userlastname: updatedCliente.apellido,
            }
            setUser(userStorage);
            localStorage.setItem('user', JSON.stringify(userStorage));
            navigate('/account');
        }
        catch (error) {
            console.log(error);
            alert('Error al actualizar el usuario');
        }



            /*
        const updatedUser = {
            username: document.getElementById('username').value,
            userlastname: document.getElementById('userlastname').value,
            email: document.getElementById('email').value,
            password: user.password // La contraseña no se actualiza aquí
        };*/

        

        // Navegar a la ruta /cambio_password
        
    }

    return (
        <>
            {user ? (/*
                <>
                    <section className="todo">
                        <section className="conjunto">
                            <article className="elementos">
                                <div><b>Mi cuenta</b></div><br />
                                <ul className="lista">
                                    <li>Órdenes Recientes</li><br />
                                    <li>Datos de Registro</li><br />
                                    <li onClick={() => navigate('/cambio_password')}>Cambiar Password</li><br />
                                </ul>
                            </article>

                            <article className="Datos">
                                <div><b>Datos de Registro</b></div><br />
                                <article className="dat">
                                    <input type="text" id="username" className="CajasUs" placeholder='Nombre' defaultValue={user.username}></input><br /><br />
                                    <input type="text" id="userlastname" className="CajasUs" placeholder='Apellido' defaultValue={user.userlastname}></input><br /><br />
                                    <input type="text" id="email" className="CajasUs" placeholder='Correo' defaultValue={user.email}></input><br /><br /><br />
                                    <button id="botonact" onClick={handleUpdate}>Actualizar</button>
                                </article>
                            </article>
                        </section>
                    </section>
                </>*/
                <article className="Datos">
                                <div><b>Datos de Registro</b></div><br />
                                <article className="dat">
                                    <input type="text" id="username" className="CajasUs" placeholder='Nombre'  defaultValue={user.username}></input><br /><br />
                                    <input type="text" id="userlastname" className="CajasUs" placeholder='Apellido' defaultValue={user.lastname}></input><br /><br />
                                    <input type="text" id="email" className="CajasUs" placeholder='Correo' defaultValue={user.email}></input><br /><br /><br />
                                    <button id="botonact" onClick={handleUpdate}>Actualizar</button>
                                </article>
                            </article>
            ) : (
                <p>No hay detalles de usuario disponibles</p>
            )}
        </>
    );
}
