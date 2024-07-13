export default function Aside(){
    const navStyle={
        marginLeft: '20px',
        marginBottom: '15px',
        marginRight: '20px',
        background: 'white',
        fontSize: '14px',
        width : '200px',
        height: '500px',
        border: 'solid',
    }
    const ulStyleA = {
        listStyle: 'none',

    }
    const liStyle = {
        marginTop: '20px',
        fontSize: '16px',
    }
    const aStyle = {
        textDecoration: 'none',
    }
    return(
    <>
    <aside style={navStyle} >
        <h2> Admin</h2>
        <ul style={ulStyleA}> 
           <a href="" style={aStyle}><li style={liStyle}>Dasboard</li></a>
           <a href="/UsuariosRegistrados" style={aStyle}><li style={liStyle}>Usuarios Registrados</li></a>
           <a href="" style={aStyle}><li style={liStyle}>Productos</li></a>
           <a href="/ListadoOrdenes" style={aStyle}><li style={liStyle}>Ordenes</li></a>
           <a href="" style={aStyle}><li style={liStyle}>Productos más vendidos</li></a>
           <a href="" style={aStyle}><li style={liStyle}>Series</li></a>
        </ul>
    </aside>
    </>
    )
}