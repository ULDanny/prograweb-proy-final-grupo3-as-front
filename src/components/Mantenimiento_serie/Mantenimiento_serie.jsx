
import React from 'react';
import './DetalleSerie.css';
import Modal from './Modal';
import { useState } from 'react';
const Mantenimiento = () => {
  
  const [showModal, setShowModal] = useState(false);

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
      <h1>Detalle Serie</h1>
      <div className='serie-detalle'>
        <div className="form-group">
            <label htmlFor="imagen">Agregar Imagen</label>
            <img src='' alt='Anhadir imagen' className="image-preview" />
            <button>Agregar Imagen</button>
        </div>
        <div className="form-group">
            <label htmlFor="nombre">Nombre</label>
            <input type="text" id="nombre" defaultValue={serie.marcaProd} />
        
            <label htmlFor="descripcion">Descripción</label>
            <textarea id="descripcion" defaultValue={serie.descrip}></textarea>
        
        
      <div className="product-list">
        <h2>Productos en la serie</h2>
        <button onClick={handleOpenModal}>+</button>
        <Modal show={showModal} onClose={handleCloseModal}>
        <p>Agregar producto</p>
        <div style={styleModal} >
            <input type="text" placeholder='buscar producto'/>
            <button>Buscar</button>
        </div>
        

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
            
            <tr >
                <td>ID producto</td>
                <td>Descripcion</td>
                <td><button>Remover</button></td>
              </tr>
          </tbody>
        </table>
      </div>
      <button className="save-button">Guardar</button>
    </div>
    </div>
    
    </div>
    </> );
};

export default Mantenimiento;
