
import React, { useEffect, useState } from 'react';
//import orders from '../../data/ordenes';
import Pagination from '../Pagination/Pagination';
import './ListOrdenes.css';
import OrdenFila from './OrdenFila';
import orderApi from '../../api/orden.js';

const ListOrders = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortedOrders, setSortedOrders] = useState([]);

  const [sortCriteria, setSortCriteria] = useState('default');

 useEffect(() => {
    handleOnLoad();
  }, []);

  const handleOnLoad = async () => {
    try {
      await orderApi.findAllComplete()
        .then((response) => {
          console.log(response);
          console.log(JSON.parse(localStorage.getItem('user')).id);
          console.log(response.filter(
            order => order.idCliente === JSON.parse(localStorage.getItem('user')).id && 
            order.envios !="Cancelado"
          ))
          setSortedOrders(response.filter(
            order => order.idCliente === JSON.parse(localStorage.getItem('user')).id && 
            order.envios !="Cancelado"
          ));
        });
    } catch (error) {
      console.log(error);
    }
  };
  const handleSortChange = (event) => {
    setSortCriteria(event.target.value);
    let sortOrders = orders;
    if (sortCriteria === 'price-high-low') {
      sortOrders = sortOrders.sort((a, b) => a.precioTotal - b.precioTotal);
    } else if (sortCriteria === 'price-low-high') {
      sortOrders = sortOrders.sort((a, b) => b.precioTotal - a.precioTotal);
    } else if (sortCriteria === 'date-old') {
      sortOrders = sortOrders.sort((a, b) => new Date(b.date2) - new Date(a.date2));
    } else if (sortCriteria === 'date-new') {
      sortOrders = sortOrders.sort((a, b) => new Date(a.date2) - new Date(b.date2));
    } 

    setSortedOrders(sortOrders);
  };

  const ordersPerPage = 5;

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = sortedOrders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(sortedOrders.length / ordersPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };


  return (
    <div className='order-list'>
      <h2>Órdenes Recientes</h2>
      <div className="order-header">
        <span>Orden Recientes</span>
        <select value={sortCriteria} onChange={handleSortChange}>
          <option value="default">Por defecto</option>
          <option value="price-high-low">Precio (de mayor a menor)</option>
          <option value="price-low-high">Precio (de menor a mayor)</option>
          <option value="date-old">Fecha (más antiguos primero)</option>
          <option value="date-new">Fecha (más nuevos primero)</option>
        </select>
      </div>
      <div>
        {currentOrders.map(order => (
          <OrdenFila key={order.id} {...order} />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default ListOrders;
