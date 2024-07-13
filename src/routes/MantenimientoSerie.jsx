import Header from "../components/Shares/Header/Header"
import Footer from "../components/Shares/Footer/Footer"
import MenuNavAdmin from '../components/MenuNavAdmin/MenuNavAdmin'

import MantenimientoS from "../components/Mantenimiento_serie/MantenimientoSeries";
function MantenimientoSerie() {
  return (
    <>
      <Header />
      <section style={styles.section}>
        <MenuNavAdmin />
        <MantenimientoS />
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


export default MantenimientoSerie;