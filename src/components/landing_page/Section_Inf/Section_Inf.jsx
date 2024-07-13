import Carrousel2 from "./SectionSupCarrousel"
import { useState } from "react"
import { coleccion2 } from "../../../data/coleccion2"
import { productosnuevos } from "../../../data/productos2(nuevos)"
import { useEffect } from "react"
import productoAPI from '../../../api/producto'
import serieApi from '../../../api/serie'
export default function Section_Inf(){
    const hrStyle={
        width: '1300px',
        marginRight: '1270px'
    }
    const [ productos, setproductos ] = useState([])
    const [ series, setseries ] = useState([])

    const handleOnLoad = async () => {
        const productosData = await productoAPI.findAll();
        setproductos(productosData)
        const seriesData = await serieApi.findAll();
        setseries(seriesData)
    }

    useEffect(() => {
        handleOnLoad();
    }, [])

    return (
        <>
            <Carrousel2 data={series.filter(serie=>!serie.nombre.toLowerCase().includes("coleccion"))} useGrid={false}/>
            <br></br>
            <br></br>
            <hr style={hrStyle}></hr>
            <br></br>
            <Carrousel2 data={productos.filter(producto => producto.nombre.toLowerCase().includes("pc"))} useGrid={true}/>
            <br></br>
            <hr style={hrStyle}></hr>
            <br></br>
        </>
    )
}