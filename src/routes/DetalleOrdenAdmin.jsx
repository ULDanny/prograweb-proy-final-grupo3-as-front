import Header from '../components/Shares/Header/Header';
import Footer from "../components/Shares/Footer/Footer";
import SectionDO from '../components/Usuarios_Orden/SectionUO/SectionDO';


const DetalleOrdenAdmin = () => {
  const DO = {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    background: '#f4f4f4',
};

    return (
        <div style={DO}>
            <Header />
            <SectionDO />
            <Footer />
        </div>
    );
};

export default DetalleOrdenAdmin;