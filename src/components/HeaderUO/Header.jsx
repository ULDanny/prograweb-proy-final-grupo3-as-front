export default function Header(){
    const spanstyle={
        display: 'flex',
        marginLeft: '20px',
        marginBottom: '5px',
        background: 'white',
        marginRight: '20px',
    }
   
    const buttonStyle={
        width: '100px',
        padding: '5px',
        height: '35px',
        marginTop: '15px',
        marginLeft: '1600px',
        borderColor: 'black',
        backgroundColor: 'orange',
    }
    const hrStyle={
        width: 'maxWidth',
        marginLeft: '30px',
        marginBottom: '20px',
    }
    return(
        <>
            <header style={spanstyle}>
                <h2>PCERDA</h2>
                
                <button style={buttonStyle}>Cerrar Sesion</button>
            </header>
            <hr style={hrStyle}></hr>
        </>
    )
    

}