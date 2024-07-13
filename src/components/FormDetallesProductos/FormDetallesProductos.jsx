import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const FormDetallesProductos = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    
    const [producto, setProducto] = useState({
        nombre: '',
        procesador: '',
        marca: '',
        grafica: '',
        ram: '',
        stock: '',
        precio: '',
        imagen: null,
    });

    useEffect(() => {
        if (id) {
            const productos = JSON.parse(localStorage.getItem('productos')) || [];
            const productoEncontrado = productos.find(p => p.id.toString() === id);
            if (productoEncontrado) {
                setProducto(productoEncontrado);
            }
        }
    }, [id]);

    const handleImagenChange = (e) => {
        const file = e.target.files[0];
        setProducto({...producto, imagen: URL.createObjectURL(file)});
    };

    const handleClick = () => {
        const productos = JSON.parse(localStorage.getItem('productos')) || [];
        if (id) {
            const updatedProductos = productos.map(p => p.id.toString() === id ? { ...producto } : p);
            localStorage.setItem('productos', JSON.stringify(updatedProductos));
        } else {
            const newProduct = {
                id: productos.length + 1,
                ...producto,
                fechaRegistro: new Date().toLocaleDateString(),
                estado: 'Disponible'
            };
            productos.push(newProduct);
            localStorage.setItem('productos', JSON.stringify(productos));
        }
        navigate('/ListaProductosAdmin');
    };

    return (
        <section style={styles.section}>
            <div style={styles.tituloPagina}>
                <h3 style={styles.titulo}>{id ? 'Editar producto' : 'Agregar producto'}</h3>
            </div>
            <div style={styles.formAgregarProductos}>
                <div style={styles.agregarImagen}>
                    <div style={styles.imagen}>
                        {producto.imagen && <img src={producto.imagen} alt="Imagen seleccionada" style={styles.imagen} />}
                    </div>
                    <div style={styles.divBotonAgregar}>
                        <label htmlFor="inputImagen" style={styles.botonAgregarImagen}>Cargar imagen</label>
                        <input
                            type="file"
                            id="inputImagen"
                            name="inputImagen"
                            style={{ display: 'none' }}
                            onChange={handleImagenChange}
                        />
                    </div>
                </div>
                <div style={styles.agregarDatos}>
                    <div style={styles.agregarDatos1}>
                        <div style={styles.agregarDatos11}>
                            <label htmlFor="nombre" style={styles.nombreCampo}>Nombre:</label>
                            <input
                                type="text"
                                id="nombre"
                                style={styles.campo}
                                value={producto.nombre}
                                onChange={e => setProducto({ ...producto, nombre: e.target.value })}
                            />
                        </div>
                        <div style={styles.agregarDatos11}>
                            <label htmlFor="procesador" style={styles.nombreCampo}>Procesador:</label>
                            <input
                                type="text"
                                id="procesador"
                                style={styles.campo}
                                value={producto.procesador}
                                onChange={e => setProducto({ ...producto, procesador: e.target.value })}
                            />
                        </div>
                    </div>
                    <div style={styles.agregarDatos2}>
                        <div style={styles.agregarDatos22}>
                            <label htmlFor="marca" style={styles.nombreCampo}>Marca:</label>
                            <input
                                type="text"
                                id="marca"
                                style={styles.campo}
                                value={producto.marca}
                                onChange={e => setProducto({ ...producto, marca: e.target.value })}
                            />
                        </div>
                        <div style={styles.agregarDatos22}>
                            <label htmlFor="grafica" style={styles.nombreCampo}>Gráfica:</label>
                            <input
                                type="text"
                                id="grafica"
                                style={styles.campo}
                                value={producto.grafica}
                                onChange={e => setProducto({ ...producto, grafica: e.target.value })}
                            />
                        </div>
                        <div style={styles.agregarDatos22}>
                            <label htmlFor="ram" style={styles.nombreCampo}>RAM:</label>
                            <input
                                type="text"
                                id="ram"
                                style={styles.campo}
                                value={producto.ram}
                                onChange={e => setProducto({ ...producto, ram: e.target.value })}
                            />
                        </div>
                        <div style={styles.agregarDatos22}>
                            <label htmlFor="stock" style={styles.nombreCampo}>Stock:</label>
                            <input
                                type="number"
                                id="stock"
                                style={styles.campo}
                                value={producto.stock}
                                onChange={e => setProducto({ ...producto, stock: e.target.value })}
                            />
                        </div>
                        <div style={styles.agregarDatos22}>
                            <label htmlFor="precio" style={styles.nombreCampo}>Precio:</label>
                            <input
                                type="number"
                                id="precio"
                                style={styles.campo}
                                value={producto.precio}
                                onChange={e => setProducto({ ...producto, precio: e.target.value })}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div style={styles.divBotonAgregar}>
                <button style={styles.botonAgregar} type="button" onClick={handleClick}>{id ? 'Guardar cambios' : 'Agregar producto'}</button>
            </div>
        </section>
    );
}

    const styles = {
        section: {
            backgroundColor: 'white',
            width: '100%',
            margin: '10px',
            padding: '0px',
            display: 'flex',
            flexDirection: 'column',
        },
        tituloPagina: {
            marginBottom: '20px',
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: 'grey',
        },
        titulo: {
            margin: '15px',
            color: 'black',
        },
        formAgregarProductos: {
            display: 'flex',
        },
        agregarImagen: {
            marginRight: '10px',
            marginBottom: '0px',
            width: '30%',
            height: '100%',
        },
        imagen: {
            width: '100%',
            height: 'auto',
            display: 'block',
            marginBottom: '10px',
            marginRight: '20px',
            backgroundColor: 'black',
        },
        imagen: {
            width: '100%',
            height: 'auto',
            maxHeight: '200px',
            objectFit: 'contain',
        },
        botonAgregarImagen: {
            marginLeft: '0px',
            padding: '8px',
            backgroundColor: 'black',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
        },
        agregarDatos: {
            marginBottom: '0px',
        },
        agregarDatos1: {
            marginBottom: '0px',
        },
        agregarDatos2: {
            marginBottom: '0px',
            display: 'flex',
            flexWrap: 'wrap',
        },
        agregarDatos22: {
            width: '30%',
            marginRight: '20px',
            marginLeft: '0px',
        },
        nombreCampo: {
            display: 'block',
            marginBottom: '0px',
            color: 'black',
        },
        campo: {
            width: '100%',
            padding: '5px',
            borderRadius: '5px',
            color: 'black',
            marginBottom: '2px',
            border: '1.5px solid black',
            backgroundColor: 'white',
            boxSizing: 'border-box',
        },
        divBotonAgregar: {
            alignSelf: 'flex-end',
        },
        botonAgregar: {
            marginLeft: '5px',
            padding: '8px',
            backgroundColor: 'black',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
        },
    };

    export default FormDetallesProductos;
