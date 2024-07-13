import SectionCardUR from './SectionCardUR'


export default function CarrouselUR(props) {
    return <>
        {
            props.data.map((obj) => {
                return <SectionCardUR key={obj.id} id={obj.id} nombre ={obj.nombre} apellido ={obj.apellido} correo ={obj.correo}  fecha = {obj.fechaRegistro} estado = {obj.estado}/>
            })
        }
    </>
}