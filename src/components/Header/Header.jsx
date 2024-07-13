import "./Header.css"
const Header = () =>{
    return (
        <header>
            <nav className="navbar">
                <ul className="nav-left">
                    <li className="logo"><a href="/">TIENDA</a></li>
                    <li><a href="">Mas vendidos</a></li>
                    <li><a href="">Nuevos</a></li>
                    <li><a href="">Ofertas</a></li>
                </ul>
                <ul className="nav-right">
                    <li><a href="/carrito">🛒</a></li>
                    <li><a href="">Ayuda</a></li>
                    <li><button className="loginButton">Mi cuenta</button></li>
                </ul>
            </nav>
        </header>
    )
}

export default Header