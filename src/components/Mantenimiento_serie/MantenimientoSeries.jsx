import React, { useEffect } from 'react';
import './DetalleSerie.css';
import Modal from './Modal';
import { useState } from 'react';
import serieApi from '../../api/serie.js';
import productoApi from '../../api/producto.js';
import { useNavigate } from 'react-router-dom';


const MantenimientoS = () => {
  
  const [showModal, setShowModal] = useState(false);
  
  const [imagenUrl, setImagenUrl] = useState('https://arauco.com/peru/wp-content/uploads/sites/22/2018/01/135-BLANCO-1-1.jpg');
  const [nombre, setNombre] = useState('Nombre');
  const [descripcion, setDescripcion] = useState('Descripcion');
  const [productos, setProductos] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    handleOnLoad();
  }, []);

  const handleOnLoad = async () => {
    try {
      await productoApi.findAll()
        .then((response) => {
          console.log(response.filter(product => product.idSerie === null));
          setAllProducts(response.filter(product => product.idSerie === null));
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddProduct = (product) => {
    setProductos([...productos, product]);
    setAllProducts(allProducts.filter(p => p.id !== product.id));
  };

  const handleRemoveProduct = (product) => {
    setProductos(productos.filter(p => p.id !== product.id));
    setAllProducts([...allProducts, product]);
  };

  const handleImageUrlChange = (e) => {
    setImagenUrl(e.target.value);
  };

  const handleNombreChange = (e) => {
    setNombre(e.target.value);
  };

  const handleDescripcionChange = (e) => {
    setDescripcion(e.target.value);
  };

  const handleCreateSerie = async () => {
    const payloadSerie = {
      imagen: imagenUrl,
      nombre: nombre,
      descrip: descripcion,
      fechaRegistro: new Date()
    }
    try{
      await serieApi.create(payloadSerie)
        .then((response) => {
          console.log(response);
          productos.forEach(async (product) => {
            const payloadProducto = {
              id: product.id,
              idSerie: response.id,
            }
            await productoApi.update(payloadProducto)
              .then(() => {
                console.log('Producto actualizado');
              });

          });
          
        });
        alert('Serie creada');
        navigate('/listado_series');

    }
    catch (error) {
      console.log(error);
    }
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const styleModal = {
    display: 'flex',
  };

  return (<>
    <div className="serie-form">
      <h1>Agregar Serie</h1>
      <div className='serie-detalle'>
        <div className="form-group">
            <label htmlFor="imagen">Agregar Imagen</label>
            <img src={imagenUrl} alt='Anhadir imagen' className="image-preview" />
            <input type="text" value={imagenUrl} onChange={
              handleImageUrlChange
            } />
            <input type="file" />
        </div>
        <div className="form-group">
            <label htmlFor="nombre">Nombre</label>
            <input type="text" id="nombre"  placeholder='Nombre' value={nombre} onChange={
              handleNombreChange
            } />
        
            <label htmlFor="descripcion">Descripción</label>
            <textarea id="descripcion" placeholder='Descripcion' value={descripcion} onChange={
              handleDescripcionChange
            }></textarea>
        
        
      <div className="product-list">
        <h2>Productos en la serie</h2>
        <button onClick={handleOpenModal}>+</button>
        <Modal show={showModal} onClose={handleCloseModal}>
        {allProducts.length === 0 && <p>No hay productos disponibles para agregar</p>}
        
        <p>Agregar producto</p>
        <div style={styleModal} >
            <input type="text" placeholder='buscar producto'/>
            <button>Buscar</button>
        </div>

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Descripción</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {allProducts?.map((product) => (
                <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.nombre}</td>
                <td><button onClick={
                  () => handleAddProduct(product)
                }>Agregar</button></td>
              </tr>
            ))}
          </tbody>
        </table>
        

        <button onClick={handleCloseModal}>Cerrar</button>
      </Modal>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Descripción</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            
            {productos?.map((product) => (
                <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.nombre}</td>
                <td><button onClick={
                  () => handleRemoveProduct(product)
                }>Remover</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button className="save-button" onClick={
        handleCreateSerie
      }>Guardar</button>
    </div>
    </div>
    
    </div>
    </> );
};

export default MantenimientoS;
