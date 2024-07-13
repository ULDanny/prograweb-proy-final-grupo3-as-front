import "./OrderComplete.css"

const OrderComplete =() =>{
    return(
        <>
        <div class="order-container">
            <h1>¡Muchas gracias por tu pedido!</h1>
            <p>Puedes ver el detalle y estado de tu pedido ingresando a <a href="#">tu cuenta</a>.</p>
        </div>
        <br /><br />
        <div className="recommendations">
            <p class="recommendations-title">También te podría interesar...</p>
            <div class="recommendations-items">
                <div class="order-item">
                    <img src="https://imagedelivery.net/4fYuQyy-r8_rpBpcY7lH_A/falabellaPE/882958605_1/w=1500,h=1500" alt="Imagen del producto"/>
                    <p>Item 1</p>
                    <a href="">Learn More</a>
                </div>
                <div class="order-item">
                    <img src="https://imagedelivery.net/4fYuQyy-r8_rpBpcY7lH_A/falabellaPE/20034222_1/w=1500,h=1500" alt="Imagen del producto"/>
                    <p>Item 1</p>
                    <a href="#">Learn More</a>
                </div>
                <div class="order-item">
                    <img src="https://imagedelivery.net/4fYuQyy-r8_rpBpcY7lH_A/falabellaPE/883085758_1/w=1500,h=1500" alt="Imagen del producto"/>
                    <p>Item 1</p>
                    <a href="#">Learn More</a>
                </div>
                <div class="order-item">
                    <img src="https://imagedelivery.net/4fYuQyy-r8_rpBpcY7lH_A/falabellaPE/883085764_1/w=1500,h=1500" alt="Imagen del producto"/>
                    <p>Item 1</p>
                    <a href="#">Learn More</a>
                </div> 
                <div class="order-item">
                    <img src="https://imagedelivery.net/4fYuQyy-r8_rpBpcY7lH_A/falabellaPE/17924885_1/w=1500,h=1500" alt="Imagen del producto"/>
                    <p>Item 1</p>
                    <a href="#">Learn More</a>
                </div> 
            </div>
            <div className="espacio"></div>
        </div>
        </>
    )
}

export default OrderComplete