import Header from "../components/Shares/Header/Header"
import Footer from "../components/Shares/Footer/Footer"
import MenuNavAdmin from '../components/MenuNavAdmin/MenuNavAdmin'
import Detalle_serie from "../components/Mantenimiento_serie/DetalleSerie";

function DetalleSerie() {
  return (
    <>
      <Header />
      <section style={styles.section}>
        <MenuNavAdmin />
        <Detalle_serie />
      </section>
      <Footer />
    </>
  );
}

const styles = {
  section: {
    display: 'flex',
  },
}


export default DetalleSerie;