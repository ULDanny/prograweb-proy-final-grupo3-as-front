import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import productoApi from '../../api/producto';

const FormDetallesProductos = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [producto, setProducto] = useState({
        nombre: '',
        procesador: '',
        marca: '',
        grafica: '',
        RAM: '',
        stock: '',
        precio: '',
        imagen: '',
        vendido: 0,
        oferta: 'no',
        idSerie: '',
        fecha: '',
        createdAt: '',
        updatedAt: ''
    });

    useEffect(() => {
        if (id) {
            fetchProducto(id);
        }
    }, [id]);

    const fetchProducto = async (id) => {
        try {
            const productoData = await productoApi.findOne(id);
            setProducto(productoData);
        } catch (error) {
            console.error('Error al cargar el producto:', error);
        }
    };

    const handleClick = async () => {
        try {
            const payload = {
                ...producto,
                fecha: new Date().toISOString(), // Añadimos la fecha de creación o edición
            };

            if (id) {
                await productoApi.update(payload);
            } else {
                await productoApi.create(payload);
            }
            navigate('/ListaProductosAdmin');
        } catch (error) {
            console.error('Error al guardar el producto:', error);
        }
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
                        <label htmlFor="inputImagen" style={styles.nombreCampo}>Link de la imagen:</label>
                        <input
                            type="text"
                            id="inputImagen"
                            style={styles.campo}
                            value={producto.imagen}
                            onChange={e => setProducto({ ...producto, imagen: e.target.value })}
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
                                value={producto.RAM}
                                onChange={e => setProducto({ ...producto, RAM: e.target.value })}
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
                        <div style={styles.agregarDatos22}>
                            <label htmlFor="oferta" style={styles.nombreCampo}>Oferta:</label>
                            <input
                                type="text"
                                id="oferta"
                                style={styles.campo}
                                value={producto.oferta}
                                onChange={e => setProducto({ ...producto, oferta: e.target.value })}
                            />
                        </div>
                        <div style={styles.agregarDatos22}>
                            <label htmlFor="idSerie" style={styles.nombreCampo}>ID Serie:</label>
                            <input
                                type="number"
                                id="idSerie"
                                style={styles.campo}
                                value={producto.idSerie}
                                onChange={e => setProducto({ ...producto, idSerie: e.target.value })}
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
    nombreCampo: {
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
