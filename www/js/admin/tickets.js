window.addEventListener('load', async () => {

    const ticket_table = document.querySelector('#tickets')

    const ticket_response = await fetch('https://entrega-final-backend-f00v.onrender.com/api/tickets',{ 
    headers: {
        'Authorization': `Bearer ${document.cookie.split("=")[1]}`
    }})

    if(ticket_response.status === 200){
        const tickets = await ticket_response.json()

        tickets.payload.forEach(ticket => {     
            ticket_table.innerHTML += `
            <tr>
                <th scope="row">${ticket.code}</th>
                <td>${ticket.amount}</td>
                <td>${ticket.purchaser}</td>
                <td>${ticket.purchase_datatime}</td>
                <td><a href="/confirmation?${ticket._id}">Ver detalle</a></td>
             </tr>
            `
        });
        
    }
})