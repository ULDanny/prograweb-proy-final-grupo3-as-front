import Carrousel from "./SectionSupCarrousel"
import { productos } from "../../../data/productos"
import { coleccion } from "../../../data/coleccion"
import ProductosAPI from '../../../api/producto'
import CategoriaAPI from '../../../api/serie'
import { useState } from "react"
import { useEffect } from "react"
export default function Section_Sup(){
    const hrStyle={
        width: '1300px',
        marginRight: '1270px'
    }
    const [ Productos, setProductos ] = useState([])
    const [ categorias, setCategorias ] = useState([])

    const handleOnLoad = async () => {
        const ProductosData = await ProductosAPI.findAll();
        setProductos(ProductosData)
        const CategoriaData = await CategoriaAPI.findAll();
        setCategorias(CategoriaData)
    }

    useEffect(() => {
        handleOnLoad();
    }, [])
    return (
        <>
            <Carrousel data={categorias.filter(categoria => categoria.nombre.toLowerCase().includes("coleccion"))} useGrid={false}/>
            <br></br>
            <br></br>
            <hr style={hrStyle}></hr>
            <br></br>
            <Carrousel data={Productos.filter(producto => producto.nombre.toLowerCase().includes("laptop"))} useGrid={true}/>
            <br></br>
            <hr style={hrStyle}></hr>
            <br></br>
        </>
    )
}