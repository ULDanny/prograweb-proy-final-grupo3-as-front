
//import Header from '../components/HeaderUO/Header'
import Header from '../components/Shares/Header/Header'
//import Footer from '../components/FooterUO/Footer'
import Footer from '../components/Shares/Footer/Footer'
import Section from '../components/Usuarios_Orden/SectionUO/SectionUR'
import MenuNavAdmin from '../components/MenuNavAdmin/MenuNavAdmin'
export default function UsuariosRegistrados(){
    const UR = {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        background: '#f4f4f4',

    }
    const minUR = {
        flex: 1,
        display: 'flex',
    }
    const contentStyle = {
        flex: 1,
    };
    
    return(
    <>
    <div style={UR}>
       <Header />
            <div style={minUR}>
                <MenuNavAdmin />
                <div style={contentStyle}> 
                <Section />
                </div>
            </div>
            <Footer />           

       

    </div>
       
    </>
    )
}