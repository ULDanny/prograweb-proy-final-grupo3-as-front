import React from 'react';

const SearchComponent = ({ data, setElementosFiltrados, criteriosOrden, placeholder }) => {
    const [terminoBusqueda, setTerminoBusqueda] = React.useState('');
    const [criterioOrden, setCriterioOrden] = React.useState(criteriosOrden[0].value);

    const handleInputChange = (event) => {
        setTerminoBusqueda(event.target.value);
    };

    const handleSortChange = (event) => {
        setCriterioOrden(event.target.value);
    };

    const handleShowClick = () => {
        let filtrados = data.filter(item =>
            Object.values(item).some(val => 
                val && val.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
            )
        );

        const criterio = criteriosOrden.find(c => c.value === criterioOrden);
        if (criterio) {
            filtrados = filtrados.sort(criterio.func);
        }

        setElementosFiltrados(filtrados);
    };

    const inputStyleUR = {
        width: '70%',
        height: '30px',
        paddingLeft: '10px',
    };
    const selectStyleUR = {
        height: '30px',
        width: '15%',
    };
    const mostrarUR = {
        marginLeft: '5px',
        padding: '4px',
        backgroundColor: 'black',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    };
    const divSt = {
        display: 'flex',
        alignItems: 'center',
        padding: '10px 0',
    };

    return (
        <div style={divSt}>
            <input
                type="text"
                placeholder={placeholder}
                value={terminoBusqueda}
                onChange={handleInputChange}
                style={inputStyleUR}
            />
            <select value={criterioOrden} onChange={handleSortChange} style={selectStyleUR}>
                {criteriosOrden.map(criterio => (
                    <option key={criterio.value} value={criterio.value}>{criterio.label}</option>
                ))}
            </select>
            <button onClick={handleShowClick} style={mostrarUR}>Mostrar</button>
        </div>
    );
};

export default SearchComponent;