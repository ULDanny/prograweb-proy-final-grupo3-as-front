import Header from "../components/Shares/Header/Header"
import Footer from "../components/Shares/Footer/Footer"
import Section_Sup_Nav from "../components/landing_page/Section_Sup/SectionSupNav"
import Section_Sup from "../components/landing_page/Section_Sup/SectionSuperior"
import Section_Inf from "../components/landing_page/Section_Inf/Section_Inf"
export default function LandingPage(){
    return (
        <>
            <Header />
            <Section_Sup_Nav />
            <Section_Sup />
            <Section_Inf />
            <Footer />
        </>
    )
    
}