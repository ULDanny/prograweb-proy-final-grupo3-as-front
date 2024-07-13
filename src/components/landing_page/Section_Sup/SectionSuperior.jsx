import Carrousel from "./SectionSupCarrousel"
import { productos } from "../../../data/productos"
import { coleccion } from "../../../data/coleccion"
export default function Section_Sup(){
    const hrStyle={
        width: '1300px',
        marginRight: '1270px'
    }
    return (
        <>
            <Carrousel data={coleccion} useGrid={false}/>
            <br></br>
            <br></br>
            <hr style={hrStyle}></hr>
            <br></br>
            <Carrousel data={productos} useGrid={true}/>
            <br></br>
            <hr style={hrStyle}></hr>
            <br></br>
        </>
    )
}