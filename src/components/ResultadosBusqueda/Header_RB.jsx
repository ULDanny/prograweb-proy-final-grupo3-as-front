import React, { useEffect, useState } from "react";
import ProductosAPI from '../../api/producto';

export default function Header_RB() {
    const labelStyle = {
        fontSize: '15px'
    };
    const divStule = {
        display: 'flex',
        marginBottom: '20px',
        marginLeft: '30px',
        marginTop: '30px'
    };
    const buttonStyle = {
        padding: '10px',
        marginLeft: '20px'
    };
    const imgStyle = {
        height: '130px',
        width: '130px',
        marginRight: '20px'
    };
    const selectStyle = {
        height: '35px',
        width: '220px',
        fontSize: '15px',
        marginLeft: '30px'
    };
    const spanStyle = {
        marginLeft: '850px',
        marginBottom: '50px'
    };
    const divStyle = {
        backgroundColor: 'grey',
        padding: '15px',
        fontSize: '15px',
        color: 'white',
        paddingLeft: '30px',
        paddingRight: '1100px',
        marginBottom: '60px',
        marginLeft: '0px'
    };
    const h2Style = {
        fontSize: '10px',
        paddingRight: '40px'
    };

    const [sortCriteria, setSortCriteria] = useState('default');
    const [ItemsFiltrados, setItemsFiltrados] = useState([]);

    const handleOnLoad = () => {
        ProductosAPI.findAll()
            .then(ProductosData => {
                setItemsFiltrados(ProductosData);
                return localStorage.getItem('tipoFiltro') ? handleShowFiltered(ProductosData) : handleShowClick(ProductosData);
            })
    };

    const handleSortChange = (event) => {
        setSortCriteria(event.target.value);
    };

    const handleShowFiltered = (data) => {
        let filtrados = [...data];

        if (localStorage.getItem('tipoFiltro').toLowerCase() === 'nuevos') {
            filtrados = filtrados.filter(item =>
                item.fecha.toLowerCase().includes('2024-05')
            );
        } else if (localStorage.getItem('tipoFiltro').toLowerCase() === 'mas-vendidos') {
            filtrados = filtrados.filter(item =>
                item.vendido > 20
            );
        } else if (localStorage.getItem('tipoFiltro') === 'ofertas') {
            filtrados = filtrados.filter(item =>
                item.oferta.toLowerCase().includes('si')
            );
        }

        setItemsFiltrados(filtrados);
    };

    const handleShowClick = (data) => {
        let filtrados = [...data];

        filtrados = filtrados.filter(item =>
            item.nombre.toLowerCase().includes(localStorage.getItem('busqueda').toLowerCase()) ||
            item.grafica.toLowerCase().includes(localStorage.getItem('busqueda').toLowerCase()) ||
            item.procesador.toLowerCase().includes(localStorage.getItem('busqueda').toLowerCase()) ||
            item.precio.toString().includes(localStorage.getItem('busqueda').toLowerCase())
        );

        if (sortCriteria === 'precio alto-bajo') {
            filtrados = filtrados.sort((a, b) => b.precio - a.precio);
        } else if (sortCriteria === 'precio bajo-alto') {
            filtrados = filtrados.sort((a, b) => a.precio - b.precio);
        } else if (sortCriteria === 'nombre a-z') {
            filtrados = filtrados.sort((a, b) => a.nombre.localeCompare(b.nombre));
        } else if (sortCriteria === 'nombre z-a') {
            filtrados = filtrados.sort((a, b) => b.nombre.localeCompare(a.nombre));
        }

        setItemsFiltrados(filtrados);
    };

    useEffect(() => {
        handleOnLoad(); 
    }, [sortCriteria]); 
    
    return (
        <>
            <span style={spanStyle}>
                <label style={labelStyle} htmlFor="opciones">Ordenar Por:</label>
                <select style={selectStyle} value={sortCriteria} onChange={handleSortChange}>
                    <option value="default">Default</option>
                    <option value="precio alto-bajo">Precio (de mayor a menor)</option>
                    <option value="precio bajo-alto">Precio (de menor a mayor)</option>
                    <option value="nombre a-z">Nombre (A-Z)</option>
                    <option value="nombre z-a">Nombre (Z-A)</option>
                </select>
                <button style={buttonStyle} onClick={() => handleShowClick(ItemsFiltrados)}>Mostrar</button>
            </span>
            <br /><br /><br />
            <span style={divStyle}><b>RESULTADOS DE BUSQUEDA</b></span>
            <br /><br />
            <span>
                {ItemsFiltrados.map(item => (
                    <span key={item.id} style={divStule}>
                        <img style={imgStyle} src={item.imagen} alt={item.nombre} />
                        <div>
                            <h2 style={h2Style}>{item.nombre}</h2>
                            <p>S/.{item.precio}</p>
                        </div>
                    </span>
                ))}
            </span>
        </>
    );
}
