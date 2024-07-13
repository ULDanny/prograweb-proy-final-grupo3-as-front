import "./footer.css"

const Footer = () =>{
    return (
        <footer className="footer">
            <div className="container">
                <div>
                    <h3>LA TIENDITA DEL ABUELO</h3>
                    <p>Copyright 2024 </p>
                    <a href="#">Privacy</a> - <a href="#">Terms</a>
                </div>
                <div>
                    <h3>Cuenta</h3>
                    <a href="#">Login</a>
                    <a href="#">Registro</a>
                    <a href="#">Carrito</a>
                </div>
                <div>
                    <h3>Productos</h3>
                    <a href="">Mas vendidos</a>
                    <a href="">Nuevos</a>
                    <a href="">Ofertas</a>
                </div>
                <div>
                    <h3>Ayuda</h3>
                    <a href="">Acerca de nosotros</a>
                    <a href="">Política de envios</a>
                </div>
            
                <div className="social-icons">
                    <a href=""><img src="https://upload.wikimedia.org/wikipedia/commons/b/b9/2023_Facebook_icon.svg" alt="Facebook" /></a>
                    <a href=""><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/768px-Instagram_logo_2016.svg.png" alt="Instagram" /></a>
                    <a href=""><img src="https://upload.wikimedia.org/wikipedia/commons/c/ce/X_logo_2023.svg" alt="X" /></a>
                    <a href=""><img src="https://upload.wikimedia.org/wikipedia/commons/0/09/YouTube_full-color_icon_%282017%29.svg" alt="Youtube" /></a>
                </div>
            </div>
        </footer>
    )
}

export default Footer   