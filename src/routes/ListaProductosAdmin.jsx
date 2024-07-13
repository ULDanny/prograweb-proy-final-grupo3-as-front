import Header from "../components/Shares/Header/Header"
import Footer from "../components/Shares/Footer/Footer"
import MenuNavAdmin from '../components/MenuNavAdmin/MenuNavAdmin'
import TablaProductos from '../components/TablaProductos/TablaProductos'

function ListaProductosAdmin() {
  
  return (
    <>
      <Header />
      <section style={styles.section}>
        <MenuNavAdmin />
        <TablaProductos />
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
export default ListaProductosAdmin;
