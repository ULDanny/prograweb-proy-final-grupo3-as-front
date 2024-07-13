import { useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { useAuthUser } from '../../../context/UserContext/UserContext';
import { useEffect } from 'react';

export default function Header(){
    const spanstyle={
        display: 'flex',
        marginLeft: '50px',
        marginBottom: '5px'
    }
    const listStyle={
        display: 'flex',
        whiteSpace: 'nowrap',
        listStyleType: 'none',
        marginTop: '20px',
        marginLeft: '40px',
        marginRight: '550px'
    }
    const liStyle={
        marginRight: '30px',
        fontSize: '15px'
    }
    const buttonStyle={
        padding: '5px',
        height: '40px',
        marginTop: '15px',
        fontSize: '15px'
    }
    const pstyle={
        marginRight:'20px',
        marginTop: '23px',
        fontSize: '15px'
    }
    const hrStyle={
        marginLeft: '30px',
        width: '1300px',
        marginBottom: '40px'
    }
    const spanStyle={
        display: 'flex',
    }
    const navigate = useNavigate()
    
    
    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

    
    const handleLandingPageClick = () => {
        navigate('/')
    }
    const handleLoginClick = () => {
        navigate('/login')
    }

    const handleAccountClick = () => {
        navigate('/account')
    }
    const handleAdminClick = () => {
        navigate('/DashboardAdmin')
    }
    const [tipoFiltro, setTipoFiltro] = useState(() => {
        return localStorage.getItem('tipoFiltro') || '';
    });
    useEffect(() => {
        localStorage.setItem('tipoFiltro', tipoFiltro);
        console.log(localStorage.getItem('tipoFiltro'))
    }, [tipoFiltro]);

    const handleSectionsClick1 = () =>{
        setTipoFiltro('nuevos')
        navigate('/resultadoBusqueda')
    }
    const handleSectionsClick2 = () =>{
        setTipoFiltro('mas-vendidos')
        navigate('/resultadoBusqueda')
    }
    const handleSectionsClick3 = () =>{
        setTipoFiltro('ofertas')
        navigate('/resultadoBusqueda')
    }

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/')
    }
    const h1Style={
        fontSize: '20px'
    }

    const h1ClickStyle ={
        textDecoration: 'none',
        color: 'red'
    }
    const aCarritoStyle ={
        textDecoration:'none',
        color: 'black'
    }

    return(
        <>
            <header style={spanstyle}>
                <h1 style={h1Style} ><a href='' onClick={handleLandingPageClick} style={h1ClickStyle}>TOTAL HARDWARE</a></h1>
                <ul style={listStyle}>
                    <li style={liStyle}><a className='aHeaderLink' href='' onClick={handleSectionsClick1}>Nuevos</a></li>
                    <li style={liStyle}><a className='aHeaderLink' href='' onClick={handleSectionsClick2}>Mas Vendidos</a></li>
                    <li style={liStyle}><a className='aHeaderLink' href='' onClick={handleSectionsClick3}>Ofertas</a></li>
                </ul>
                <img></img>
                <span style={spanStyle}>
                <p style={pstyle}><a style={aCarritoStyle} href="" onClick={() => navigate('/Carrito')}>Carrito</a></p>
                <p style={pstyle}>Ayuda</p>
                {user ? (
                    <>
                    {user.rol == 'admin' ? (
                        <>
                         <button style={buttonStyle} onClick={handleAdminClick}>Admin</button>
                        </>):(
                            <>
                                <button style={buttonStyle} onClick={handleAccountClick}>Mi Cuenta</button>
                            </>
                        )}
                    
                       
                        <button style={buttonStyle} onClick={handleLogout}>Logout</button>
                    </>
                    ) : (
                            <>
                                <button style={buttonStyle} onClick={handleLoginClick}>Iniciar Sesion</button>
                            </>
                        )}
                </span>   
            </header>
            <hr style={hrStyle}></hr>
        </>
    )
}