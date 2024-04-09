const title = document.querySelector('h1')
const showProducts = document.querySelector('#showProducts')
const input = document.querySelector('input')
const back_button = document.querySelector('#back-button')
const cart_button = document.querySelector('#cart-button')

window.addEventListener('load', async ()=>{
    const query = new URLSearchParams(window.location.search);
    const param_id = query.get('product')
    input.value = param_id

    //Carrito guardado
    const cart_id = localStorage.getItem('cart')

    //Mostrar producto
    const response_json = await fetch(`https://entrega-final-backend-f00v.onrender.com/api/products/${param_id}`)
    const response = await response_json.json()
    showAllProducts(response.payload)


    //Agregar al carrito
    document.querySelector('#add-to-cart-button').addEventListener('click', async (e) =>{
        e.preventDefault()
        const product_id = input.value
        let response
        if(!cart_id){
            //Crea carrito vacío
                response = await fetch('https://entrega-final-backend-f00v.onrender.com/api/carts',{
                    method: 'POST',
                    headers:{
                        'Content-Type': 'application/json',
                    }
                })
            if (response.status === 201 ){
                //Agrega producto al carrito
        
                const data = await response.json()
                const cart_id = data.payload._id
                
                //Guardamos id de carrito en localstorage
                localStorage.setItem("cart", cart_id);
                
                await addProductToCart(cart_id, product_id)
            }
        }else{
            addProductToCart(cart_id, product_id)
        }
    
    })
})

back_button.addEventListener('click', ()=>{
    window.location.href = `/products.html`
})
cart_button.addEventListener('click', ()=>{
    window.location.href = `/cart.html`
})


function showAllProducts(payload){
        showProducts.innerHTML = `
        <div class="card mb-3">
        <img src="${payload.thumbnail[0]}"" class="card-img-top" alt="..." style="width:500px">
        <div class="card-body">
          <h5 class="card-title">${payload.title}</h5>
          <p class="card-text">$ ${payload.price}</p>
          <p class="card-text"><small class="text-muted">${payload.description}</small></p>
        </div>
        </div>
        `
}

async function addProductToCart(cart_id, product_id){
    const cart = await fetch(`https://entrega-final-backend-f00v.onrender.com/api/carts/${cart_id}/product/${product_id}`,{
        method: 'PUT',
        headers:{
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${document.cookie.split("=")[1]}`
        }
    })
    if(cart.status === 200){
        alert("El producto fue agregado al carrito")
    } else{
        alert("Debes loguearte para agregar el producto al carrito")
    }
}

