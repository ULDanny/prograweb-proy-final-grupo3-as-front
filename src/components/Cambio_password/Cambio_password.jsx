import './Cambio_password.css';
import { useEffect, useState } from 'react';

export default function CambioPassword() {

    const [user, setUser] = useState(null);

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

    const handleUpdate = () => {
        const actualPassword = document.getElementById('actualpassword').value;
        const newPassword = document.getElementById('newpassword').value;
        const againPassword = document.getElementById('againpassword').value;

        if (newPassword !== againPassword) {
            alert('La nueva contraseña y la repetición de la contraseña no coinciden');
            return;
        }

        if (actualPassword !== user.password) {
            alert('La contraseña actual es incorrecta');
            return;
        }

        const updatedUser = {
            ...user,
            password: newPassword
        };

        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
        alert('Contraseña actualizada correctamente');
    }

    return (
        <>
            {user ? (
                /*<>
                    <section className="todo">
                        <section className="conjunto">
                            <article className="elementos">
                                <div><b>Mi cuenta</b></div><br />
                                <ul className="lista">
                                    <li>Órdenes Recientes</li><br />
                                    <li>Datos de Registro</li><br />
                                    <li>Cambiar Password</li><br />
                                </ul>
                            </article>

                            <article className="Datos">
                                <div><b>Cambiar Password</b></div><br />
                                <article className="dat">
                                    <input type="password" id="actualpassword" className="CajasUs" placeholder='Actual'></input><br /><br />
                                    <input type="password" id="newpassword" className="CajasUs" placeholder='Nuevo'></input><br /><br />
                                    <input type="password" id="againpassword" className="CajasUs" placeholder='Repetir'></input><br /><br /><br />
                                    <button id="botonact" onClick={handleUpdate}>Cambiar</button>
                                </article>
                            </article>
                        </section>
                    </section>
                    </>*/

                    <article className="Datos">
                                <div><b>Cambiar Password</b></div><br />
                                <article className="dat">
                                    <input type="password" id="actualpassword" className="CajasUs" placeholder='Actual'></input><br /><br />
                                    <input type="password" id="newpassword" className="CajasUs" placeholder='Nuevo'></input><br /><br />
                                    <input type="password" id="againpassword" className="CajasUs" placeholder='Repetir'></input><br /><br /><br />
                                    <button id="botonact" onClick={handleUpdate}>Cambiar</button>
                                </article>
                            </article>
                
            ) : (
                <p>No hay detalles de usuario disponibles</p>
            )}
        </>
    );
}
