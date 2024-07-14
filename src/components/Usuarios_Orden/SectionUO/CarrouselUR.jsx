import React from 'react';
import SectionCardUR from './SectionCardUR';

export default function CarrouselUR({ data, style }) {
    return (
        <>
            {data.map(usuario => (
                <SectionCardUR
                    key={usuario.id}
                    id={usuario.id}
                    nombre={usuario.nombre}
                    apellido={usuario.apellido}
                    email={usuario.email}
                    fecha={usuario.fecha}
                    estado={usuario.estado}
                />
            ))}
        </>
    );
}