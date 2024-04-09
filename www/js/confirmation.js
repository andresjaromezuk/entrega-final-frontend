window.addEventListener('load', async ()=>{

    const ticket_products = document.querySelector('#ticket-products')
    const ticket_total = document.querySelector('#ticket-total')
    const ticket_id = window.location.search.split("?")[1]
   
    const ticket_json = await fetch(`https://entrega-final-backend-f00v.onrender.com/api/tickets/${ticket_id}`,{
        method: 'GET',
        headers:{
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${document.cookie.split("=")[1]}`
        }
       
    })

    const ticket = await ticket_json.json()
    console.log(ticket)

    if (ticket_json.status === 200){

        ticket.payload.products.forEach(element => {
            ticket_products.innerHTML += `
            <ul class="list-unstyled" style="border: 1px solid #555; border-radius: 5px; padding: 15px;  width: 95vh;">
            <li class="media">
                <img class="mr-3" src="${element.product.thumbnail[0]}" style="width:300px">
                <div class="media-body">
                <h5 class="mt-0 mb-1">${element.product.title}</h5>
                <h6 class="mt-0 mb-1">$ ${element.product.price}</h5>
                <p style="margin-top: 20px"> Cantidad: ${element.quantity}</p>
                </div>
            </li>
            </ul>`
        })
        console.log(ticket_total)
        ticket_total.innerHTML = `
        <div class="list-unstyled" style="border: 1px solid #555; border-radius: 5px; padding: 40px; width: 95vh; margin-top: 40px">
        <div class="media">
            <div class="media-body">
            <h5 class="mt-0 mb-1">Total: $${ ticket.payload.amount}</h5>
            <h6 class="mt-0 mb-1">N° de pedido: ${ticket.payload.code}</h6>
            <h7 class="mt-0 mb-1">Email: ${ticket.payload.purchaser}</h7>
            </div>
        </div>
        </div>`
        
    } else{
        console.log("ENTRA ACÁ")
        window.location.href = '/products.html'
    }

})