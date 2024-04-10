const showProducts = document.querySelector('#showProducts')
const prevPage = document.querySelector('#prevPage')
const nextPage = document.querySelector('#nextPage')


window.addEventListener('load', async () => {
    
    const response_json = await fetch('https://entrega-final-backend-f00v.onrender.com/api/products?limit=3')
    const response = await response_json.json()
    
    const payload = response.payload
    console.log(response.payload)
    
    let prevLink = "/products?limit=3&page=1"
    
    let nextLink = payload.nextLink

    let product_id 

    //Mostrar productos
    product_id = showAllProducts(payload)
    
    //Botones de páginas
    showPageButtons(payload)
   
    console.log(product_id)
    prevPage.addEventListener('click', async ()=>{
        const response_json = await fetch(`https://entrega-final-backend-f00v.onrender.com/api/${prevLink}`)
        const response = await response_json.json()
        showProducts.innerHTML = ""
        product_id = showAllProducts(response.payload)
        showPageButtons(response.payload)
        console.log(response.payload.prevLink)
        console.log(response.payload.nextLink)
        prevLink = response.payload.prevLink
        nextLink = response.payload.nextLink
        productDetail(product_id)
    })
    
    nextPage.addEventListener('click', async ()=>{
        const response_json = await fetch(`https://entrega-final-backend-f00v.onrender.com/api${nextLink}`)
        const response = await response_json.json()
        showProducts.innerHTML = ""
        product_id = showAllProducts(response.payload)
        showPageButtons(response.payload)
        nextLink = response.payload.nextLink
        prevLink = response.payload.prevLink
        productDetail(product_id)
    })

    productDetail(product_id)
    
})

function showAllProducts(payload){
    const product_id = []
    payload.docs.forEach(element => {
      
        // showProducts.innerHTML = `
        // <img class="card-img-top" src="${element.thumbnail[0]}">
        // <div class="card-body">
        //   <h5 class="card-title"> ${element.title}</h5>
        //   <h6 class="card-title">$ ${element.price}</h5>
        //   <p class="card-text">${element.description}</p>
        //   <a href="#" class="btn btn-primary" id="product-button">Ver detalle</a>
        // </div>
        // `
        showProducts.innerHTML += `
        <div class="card">
        <img class="card-img-top" src="${element.thumbnail[0]}" alt="Card image cap" >
        <div class="card-body">
          <h5 class="card-title">${element.title}</h5>
          <p class="card-text">$ ${element.price}</p>
          <p class="card-text"><small class="text-muted">${element.description}</small></p>
          <a href="#" class="btn btn-info" id="product-button">Ver detalle</a>
        </div>
        `
        product_id.push(element._id)
    });
    return product_id
}

function showPageButtons(payload){
    if(payload.hasPrevPage){
        prevPage.innerHTML = `<button type="button" class="btn btn-info btn-lg">Anterior</button>`
    }
    
    if(payload.hasNextPage){
        nextPage.innerHTML = `<button type="button" class="btn btn-info btn-lg">Siguiente</button>`
    }
}

function productDetail(product_id){
    const productsButton = document.querySelectorAll('#product-button')
    productsButton.forEach((productButton, index)=>{
        productButton.addEventListener('click', async ()=>{
            window.location.href = `/product?product=${product_id[index]}`
        })
    })
}