import SectionCardUR from './SectionCardLO'


export default function CarrouselLO(props) {
    return <>
    
        {
            props.data.map((obj) => {
                return <SectionCardUR key={obj.id} id={obj.id} nombre ={obj.nombre} apellido ={obj.apellido} FechaOrden = {obj.FechaOrden } total = {obj.total} correo ={obj.correo}  Envios= {obj.Envios} />
            })
        }
    </>
}