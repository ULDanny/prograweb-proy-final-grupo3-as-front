
import React, { useEffect } from 'react';
import './DetalleSerie.css'; 
//import { dataseries } from '../../data/series';
import MenuNavAdmin from '../MenuNavAdmin/MenuNavAdmin';
import Modal from './Modal';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import serieApi from '../../api/serie.js';
import productoApi from '../../api/producto.js';


const Detalle_serie = () => {
  const { id } = useParams();
  const [serie, setSerie] = useState({});
  const [imagenUrl, setImagenUrl] = useState('');
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [productos, setProductos] = useState([]);
  const [allProducts, setAllProducts] = useState([]);


  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    handleOnLoad();
  }, []);

  const handleOnLoad = async () => {
    try {
      await serieApi.findOneComplete(id)
        .then((response) => {
          console.log(response);
          setSerie(response);
          setImagenUrl(response.imagen);
          setNombre(response.nombre);
          setDescripcion(response.descrip);
          setProductos(response.productos);
        });
      await productoApi.findAll()
        .then((response) => {
          console.log(response.filter(product => product.idSerie === null));
          setAllProducts(response.filter(product => product.idSerie === null));
        });
        
        
    } catch (error) {
      console.log(error);
    }
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

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleRemoveProduct = async (id) => {
    const productoRemoveSerie ={
      id: id,
      idSerie: null
    }
    try {
      await productoApi.update(productoRemoveSerie)
        .then((response) => {
          console.log(response);
          alert('Producto removido de la serie');
          handleOnLoad();
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddProduct = async (id) => {
    const productoAddSerie ={
      id: id,
      idSerie: serie.id
    }
    await productoApi.update(productoAddSerie)
      .then((response) => {
        console.log(response);
        alert('Producto agregado a la serie');
        handleOnLoad();
      });
    }

    const handleupdateSerie = async () => {
      const serieUpdate = {
        id: serie.id,
        nombre: nombre,
        descrip: descripcion,
        imagen: imagenUrl,
      }
      try {
        await serieApi.update(serieUpdate)
          .then((response) => {
            console.log(response);
            alert('Serie actualizada correctamente');
            handleOnLoad();
          });
      } catch (error) {
        console.log(error);
      }
    };


  const styleModal = {
    display: 'flex',
  };

  return (<>
    <div className="serie-form">
      <h1>Detalle Serie</h1>
      <div className='serie-detalle'>
        <div className="form-group">
            <label htmlFor="imagen">Agregar Imagen</label>
            <img src={imagenUrl} alt="imagen" className="image-preview" />
            <label > URL Imagen</label>
            <input type="text" placeholder="Ingrese URL de la imagen" value={imagenUrl} onChange={handleImageUrlChange} />
            <br />
            <input type="file" />
        </div>
        <div className="form-group">
            <label htmlFor="nombre">Nombre</label>
            <input type="text" id="nombre" value={nombre} onChange={
              handleNombreChange
            } />
        
            <label htmlFor="descripcion">Descripción</label>
            <textarea id="descripcion" value={descripcion} onChange={
              handleDescripcionChange
            }></textarea>
        
        
      <div className="product-list">
        <h2>Productos en la serie</h2>
        <button onClick={handleOpenModal}>+</button>
        <Modal show={showModal} onClose={handleCloseModal}>
          {allProducts && allProducts.length === 0 && <p>No hay productos disponibles para agregar</p>}
        
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
                  () => handleAddProduct(product.id)
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
                  () => handleRemoveProduct(product.id)
                }>Remover</button></td>
              </tr>
            ))}

          </tbody>
        </table>
      </div>
      <button className="save-button"
      onClick={
        () => handleupdateSerie()
      }
      >Guardar</button>
    </div>
    </div>
    
    </div>
    </> );
};

export default Detalle_serie;
