window.addEventListener('load', async ()=>{
    
    const cart_id = localStorage.getItem('cart')
    
    const cart_products = document.querySelector('#cart-products')
    const empty_cart = document.querySelector('#empty-cart')
    const cart_total = document.querySelector('#cart-total')

    if (cart_id){
        const response_json = await fetch(`https://entrega-final-backend-f00v.onrender.com/api/carts/${cart_id}`)
    
        const cart = await response_json.json()
    
        const total = showProductsInCart(cart)

        const add_product = document.querySelectorAll('#add_product')
        const reduce_product = document.querySelectorAll('#remove_product')
        const _id = document.querySelectorAll('#product-id')
        const buy_button = document.querySelector('#buy-button')
        const clean_cart = document.querySelector('#clean-cart')
        const cart_subtotal = document.querySelector('#cart-subtotal')
        const delete_product = document.querySelectorAll('#delete-product')

        //Total
        cart_subtotal.innerText = `$ ${total}`

        //Agregar o quitar productos
        for (let i = 0; i < add_product.length; i++) {
            add_product[i].addEventListener('click', async function(e){
                const product_id = _id[i].value
                console.log(product_id)
                const cart = await fetch(`https://entrega-final-backend-f00v.onrender.com/api/carts/${cart_id}/product/${product_id}`,{
                    method: 'PUT',
                    headers:{
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${document.cookie.split("=")[1]}`
                    }
                })
                window.location.reload()
            })
            
            reduce_product[i].addEventListener('click', async function(e){
                const product_id = _id[i].value
               
                const cart = await fetch(`https://entrega-final-backend-f00v.onrender.com/api/carts/${cart_id}/product/${product_id}`,{
                    method: 'DELETE',
                    headers:{
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${document.cookie.split("=")[1]}`
                    }
                })
                window.location.reload()
            })
            
            delete_product[i].addEventListener('click', async function(e){
                const product_id = _id[i].value
                let products = cart.payload.products

                products = products.filter(item => item.product._id !== product_id)
                const updated_cart = await fetch(`https://entrega-final-backend-f00v.onrender.com/api/carts/${cart_id}`,{
                    method: 'PUT',
                    headers:{
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${document.cookie.split("=")[1]}`
                    },
                    body: JSON.stringify({ 
                        products:products
                    })
                })
                window.location.reload()
            })
            
        }

        //Comprar
        buy_button.addEventListener('click', async function(){
            const purchaser = await saveUser()

            const {products} = cart.payload

            const ticket_json = await fetch('https://entrega-final-backend-f00v.onrender.com/api/tickets',{
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${document.cookie.split("=")[1]}`
                },
                body: JSON.stringify({
                    purchaser: purchaser,
                    products: products
                })
            })

            const ticket = await ticket_json.json()
            if(ticket_json.status === 201){
                localStorage.removeItem('cart');
                window.location.href = `/confirmation.html?${ticket.payload._id}`
            }
            
        })

        //vaciar carrito
        clean_cart.addEventListener("click", async function(){
            const cleaned_cart = await fetch(`https://entrega-final-backend-f00v.onrender.com/api/carts/${cart_id}`,{
                method: 'DELETE',
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${document.cookie.split("=")[1]}`
                }
            })
            if(cleaned_cart.status === 204){
                window.location.reload()
            }

        })
    } else {
        empty_cart.innerHTML += `
        <div class="jumbotron jumbotron-fluid">
        <div class="container">
            <h1 class="display-4">Tu carrito está vacío</h1>
            <p class="lead">Debes agregar productos para iniciar el proceso de compra</p>
        </div>
        </div>
        `
    }

    function showProductsInCart(response){
        if(response.payload.products.length > 0){
            let total = 0
            response.payload.products.forEach(element => {
                cart_products.innerHTML += `
                <ul class="list-unstyled">
                <li class="media">
                    <img class="mr-3" src="${element.product.thumbnail[0]}" style="width:300px">
                    <div class="media-body">
                    <h5 class="mt-0 mb-1">${element.product.title}</h5>
                    <h6 class="mt-0 mb-1">$ ${element.product.price}</h5>
                    <div style="display: flex; align-items: center; margin-top: 15px">
                      <button type="button" class="btn btn-info" style="margin-right: 15px" id="remove_product">-</button>
                      <label style="margin-top: 5px">Cantidad:</label>
                      <input type="text" value="${element.quantity}"style="width: 40px; border-style: none; text-align: center" id="product-quantity">
                      <input type="hidden" value="${element.product._id}" id="product-id">
                      <button type="button" class="btn btn-info" style="margin-left: 15px" id="add_product">+</button>
                    </div>
                    <div>
                        <button type="button" id="delete-product" class="btn btn-info" style="margin-top: 30px">Eliminar</button>
                    </div>
                    </div>
                </li>
                </ul>
                `
                total+= element.product.price * element.quantity

                cart_total.innerHTML=`
                <div class="card" style="width: 500px; margin-top: 50px">
                <h5 class="card-header">Total</h5>
                <div class="card-body">
                    <h5 class="card-title" style="margin-bottom: 30px" id="cart-subtotal"></h5>
                    <button type="button" class="btn btn-info" id="clean-cart">Vaciar carrito</button>
                </div>
                </div>
                <div style="text-align:center">
                    <button type="button" class="btn btn-info btn-lg" style="margin-top: 80px; width: 300px" id="buy-button">Comprar</button>
                </div>
                `
            });
            return total
        } else{
            empty_cart.innerHTML += `
            <div class="jumbotron jumbotron-fluid">
            <div class="container">
                <h1 class="display-4">Tu carrito está vacío</h1>
                <p class="lead">Debes agregar productos para iniciar el proceso de compra</p>
            </div>
            </div>
            `
        }
    }
})

async function saveUser(){
    const user_response = await fetch('https://entrega-final-backend-f00v.onrender.com/api/users/profile',{
        headers:{
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${document.cookie.split("=")[1]}`
        }
    })
    const user_payload = await user_response.json()
    return user_payload.payload.email
}