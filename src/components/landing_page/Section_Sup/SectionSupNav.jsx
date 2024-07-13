import { useState } from "react"
import { productosTotal } from "../../../data/productosTotal"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
export default function Section_Sup_Nav(){

    const [busqueda, setBusqueda] = useState('')
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.setItem('busqueda', busqueda);
        console.log(localStorage.getItem('busqueda'))
    }, [busqueda]);
    
    const navStyle = {
        height: '20px',
        padding: '10px',
        marginLeft:'0px',
        paddingRight: '650px', 
        fontSize: '15px'
    }
    const navStyle2 = {
        padding: '10px',
        height: '40px',
        marginLeft: '10px',
        fontSize: '15px'
    }
    const barraStyle={
        marginLeft: '200px',
        marginTop: '100px',
        display : 'flex'
    }
    const sectionStyle ={
        marginTop: '60px',
        marginBottom: '30px',
        marginRight: '1400px',
       
    }
    const Redirigir = () =>{
        localStorage.removeItem('tipoFiltro')
        navigate('/resultadoBusqueda')
    }
    return (
        <>
            <section style={sectionStyle}>
                <span style={barraStyle}>
                    <input style={navStyle}  type="text" placeholder="Busca productos por nombre " value={busqueda}  onChange={(event) => setBusqueda(event.target.value)
                        }></input>
                    <input style={navStyle2} type="submit" value="Enviar" onClick={Redirigir}></input>
                </span>
            </section>
        </>
    )
}