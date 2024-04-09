const datos = document.querySelector('#datos')
const compras = document.querySelector('#compras')
const header = document.querySelector('.thead-light')
const tbody = document.querySelector('tbody')

window.addEventListener('load', async () => {
    const user_json = await fetch('https://entrega-final-backend-f00v.onrender.com/api/users/profile',{ 
    headers: {
        'Authorization': `Bearer ${document.cookie.split("=")[1]}`
      }})
    if (user_json.status !== 200) {
       window.location.href = '/login.html'
    } else{

        const ticket_response = await fetch('https://entrega-final-backend-f00v.onrender.com/api/tickets',{ 
        headers: {
            'Authorization': `Bearer ${document.cookie.split("=")[1]}`
        }})

        if(ticket_response.status === 200){
            const tickets = await ticket_response.json()

            if(tickets.payload.length === 0){
                compras.innerHTML=`
                <h4 style="margin-bottom: 20px; text-decoration: underline;">Tus compras</h4>
                <p>Aún no tienes compras realizadas</p> `
            }else{
                header.innerHTML=`
                <h4 style="margin-bottom: 20px; text-decoration: underline;">Tus compras</h4>
                <tr>
                    <th scope="col">Número de pedido</th>
                    <th scope="col">Monto</th>
                    <th scope="col">Fecha de compra</th>
                    <th scope="col"></th>
                </tr>
                `
                tickets.payload.forEach(ticket => {     
                    tbody.innerHTML += `
                    <tr>
                        <th scope="row">${ticket.code}</th>
                        <td>${ticket.amount}</td>
                        <td>${ticket.purchase_datatime}</td>
                        <td><a href="/confirmation.html?${ticket._id}">Ver detalle</a></td>
                     </tr>
                    `
                });
            }
            
        }else{
            compras.innerHTML=`
            <h4 style="margin-bottom: 20px; text-decoration: underline;">Tus compras</h4>
            <p>Aún no tienes compras realizadas</p> `
        }
    

        const response = await user_json.json()
        
        datos.innerHTML=`
        <h4 style="margin-bottom: 20px; text-decoration: underline;">Tus datos</h4>
        <p><strong>Nombre:</strong> ${response.payload.firstName}</p>
        <p><strong>Apellido:</strong>  ${response.payload.lastName}</p>
        <p><strong>Email:</strong>  ${response.payload.email}</p>
        <p><strong>Edad:</strong>  ${response.payload.age}</p>
        <button type="submit" id="session-button" class="btn btn-info">Cerrar sesión</button>
        `

        const button = document.querySelector('#session-button')

        
        button.addEventListener('click', async()=>{
            const response_json = await fetch('https://entrega-final-backend-f00v.onrender.com/api/sessions/logout',  {
                method: 'DELETE'
            })
    
            if(response_json.status === 200){
                document.cookie = "Authorization=; expires=Thu, 19 Dec 2024 12:00:00 UTC; path=/"
                window.location.href = '/login.html'
            }
        })
    }
   
})

