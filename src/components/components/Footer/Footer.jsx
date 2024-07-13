import facebook from '../../assets/img/facebook.png'
import instagram from '../../assets/img/instagram.png'
import twitter from '../../assets/img/twitter.png'
import youtube from '../../assets/img/youtube.png'

const Footer = () => {
    return (
        <footer style={styles.footer}>
            <div style={styles.secciones}>
                <h2>Nombre de la tienda</h2>
                <p>2010 - 2024</p>
                <p>Pryvacy - Terms</p>
            </div>
            <div style={styles.secciones}>
                <div style={styles.footerSection}>
                    <ul style={styles.list}>
                        <p><strong>Cuenta</strong></p>
                        <li>Login</li>
                        <li>Registro</li>
                        <li>Carrito</li>
                    </ul>
                    <ul style={styles.list}>
                        <p><strong>Productos</strong></p>
                        <li>Más vendidos</li>
                        <li>Nuevos</li>
                        <li>Ofertas</li>
                    </ul>
                    <ul style={styles.list}>
                        <p><strong>Ayuda</strong></p>
                        <li>Acerca de nosotros</li>
                        <li>Pólitica de envío</li>
                        <li>FAQ</li>
                    </ul>
                </div>
            </div>
            <div style={styles.secciones}>
                <div style={styles.socialIcons}>
                    <img src={facebook} alt="facebook" className="social" style={styles.social} />
                    <img src={instagram} alt="instagram" className="social" style={styles.social} />
                    <img src={twitter} alt="twitter" className="social" style={styles.social} />
                    <img src={youtube} alt="youtube" className="social" style={styles.social} />
                </div>
            </div>
        </footer>
    );
}

const styles = {
    footer: {
        backgroundColor: 'grey',
        padding: '20px',
        color: 'white',
        display: 'flex',
    },
    footerSection: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    secciones: {
        width: '33%',
    },
    list: {
        listStyleType: 'none',
        padding: '0',
    },
    socialIcons: {
        marginTop: '20px',
    },
    social: {
        width: '35px',
        margin: '10px',
    }
      
};

export default Footer;
