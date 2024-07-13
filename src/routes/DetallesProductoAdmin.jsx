import Header from "../components/Shares/Header/Header"
import Footer from "../components/Shares/Footer/Footer"
import MenuNavAdmin from '../components/MenuNavAdmin/MenuNavAdmin'
import FormDetallesProductos from '../components/FormDetallesProductos/FormDetallesProductos'

function DetallesProductoAdmin() {
  return (
    <>
      <Header />
      <section style={styles.section}>
        <MenuNavAdmin />
        <FormDetallesProductos />
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

export default DetallesProductoAdmin
