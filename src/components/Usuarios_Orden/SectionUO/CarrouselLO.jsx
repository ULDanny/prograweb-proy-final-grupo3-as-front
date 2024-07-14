import SectionCardLO from './SectionCardLO';

export default function CarrouselLO(props) {
    return <>
        {
            props.data.map((obj) => {
                return <SectionCardLO 
                    key={obj.id} 
                    id={obj.id} 
                    nombre={obj.nombre} 
                    apellido={obj.apellido} 
                    FechaOrden={obj.fechaOrden} 
                    total={obj.total} 
                    correo={obj.correo} 
                    Envios={obj.envios} // Asegurarse de que 'envios' sea pasado aquí
                />
            })
        }
    </>
}
