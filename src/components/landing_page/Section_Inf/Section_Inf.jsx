import Carrousel2 from "./SectionSupCarrousel"

import { coleccion2 } from "../../../data/coleccion2"
import { productosnuevos } from "../../../data/productos2(nuevos)"
export default function Section_Inf(){
    const hrStyle={
        width: '1300px',
        marginRight: '1270px'
    }
    return (
        <>
            <Carrousel2 data={coleccion2} useGrid={false}/>
            <br></br>
            <br></br>
            <hr style={hrStyle}></hr>
            <br></br>
            <Carrousel2 data={productosnuevos} useGrid={true}/>
            <br></br>
            <hr style={hrStyle}></hr>
            <br></br>
        </>
    )
}