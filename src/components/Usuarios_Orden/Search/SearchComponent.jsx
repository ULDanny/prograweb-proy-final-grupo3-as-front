import React from 'react';
const SearchComponent = ({ usuarios, setElementosFiltrados }) => {
    const [terminoBusqueda, setTerminoBusqueda] = React.useState('');
    const [criterioOrden, setCriterioOrden] = React.useState('default');

    const handleInputChange = (event) => {
        setTerminoBusqueda(event.target.value);
    };

    const handleSortChange = (event) => {
        setCriterioOrden(event.target.value);
    };

    const handleShowClick = () => {
        let filtrados = usuarios.filter(item =>
            item.nombre.toLowerCase().includes(terminoBusqueda.toLowerCase()) ||
            item.apellido.toLowerCase().includes(terminoBusqueda.toLowerCase()) ||
            item.correo.toLowerCase().includes(terminoBusqueda.toLowerCase()) ||
            item.fechaRegistro.includes(terminoBusqueda) ||
            item.id.toString().includes(terminoBusqueda)
        );

        if (criterioOrden === 'nombre-a-z') {
            filtrados = filtrados.sort((a, b) => a.nombre.localeCompare(b.nombre));
        } else if (criterioOrden === 'nombre-z-a') {
            filtrados = filtrados.sort((a, b) => b.nombre.localeCompare(a.nombre));
        } else if (criterioOrden === 'id-asc') {
            filtrados = filtrados.sort((a, b) => a.id - b.id);
        } else if (criterioOrden === 'id-desc') {
            filtrados = filtrados.sort((a, b) => b.id - a.id);
        }

        setElementosFiltrados(filtrados);
    };

    const inputStyleUR = {
        width: '70%',
        height: '30px',
        marginLeft: "none",
        paddingLeft: "none",
    };
    const selectStyleUR = {
      height: '30px',
      width: '15%'
    }
    const mostrarUR = {
        marginLeft: '5px',
        padding: '4px',
        backgroundColor: 'black',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    }
    const divSt = {
        paddingLeft:'0',
        marginLeft : '',
    }

    return (
        <div style={divSt}>
            <input
                type="text"
                placeholder="Buscar por nombre, apellido o id ..."
                value={terminoBusqueda}
                onChange={handleInputChange}
                style={inputStyleUR}
            />
            <select value={criterioOrden} onChange={handleSortChange} style={selectStyleUR}>
                <option value='nombre-a-z'>Nombre (A-Z)</option>
                <option value="nombre-z-a">Nombre (Z-A)</option>
                <option value="id-asc">ID (menor a mayor)</option>
                <option value="id-desc">ID (mayor a menor)</option>
            </select>
            <button onClick={handleShowClick} style={mostrarUR}>Mostrar</button>
        </div>
    );
};

export default SearchComponent;