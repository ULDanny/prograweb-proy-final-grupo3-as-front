import Header from "../components/Shares/Header/Header"
import Footer from "../components/Shares/Footer/Footer"
import MenuNavAdmin from '../components/MenuNavAdmin/MenuNavAdmin'
import InformacionDashboard from '../components/InformacionDashboard/InformacionDashboard'

function DashboardAdmin() {
  return (
    <>
      <Header />
      <section style={styles.section}>
        <MenuNavAdmin />
        <InformacionDashboard />
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


export default DashboardAdmin;