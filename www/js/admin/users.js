
window.addEventListener('load', async () => {
    const row = document.querySelector("#users")
    const response_json = await fetch('https://entrega-final-backend-f00v.onrender.com/api/users/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Bearer ${document.cookie.split("=")[1]}`
      }
    })

    if (response_json.status === 200){

      const users = await response_json.json()
    
      users.payload.forEach((user, index) => {
          row.innerHTML+=
          `
          <tr>
            <th scope="row">${index + 1}</th>
            <td>${user.firstName} ${user.lastName}</td>
            <td>${user.email}</td>
            <td>
            <input type="text" value="${user.role}" id="role">
            <input type="hidden" value="${user._id}" id="_id">
            </td>
            <td>
              <button id="save">Guardar</button>
              <button id="delete">Eliminar</button>
            </td>
          </tr>
          `
        });
        
        const save_button = document.querySelectorAll('#save')
        const delete_button = document.querySelectorAll('#delete')
        const role_input = document.querySelectorAll('#role')
        const _id_input = document.querySelectorAll('#_id')
        
        const notification = document.querySelector('#notification')
        const error_notification = document.querySelector('#error_notification')
  
        for (let i = 0; i < save_button.length; i++) {
          save_button[i].addEventListener('click', async (e) =>{
            const role_value = role_input[i].value 
            const user_id = _id_input[i].value
            
            const response_json = await fetch(`https://entrega-final-backend-f00v.onrender.com/api/users/premium/${user_id}`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${document.cookie.split("=")[1]}`
              },
              body: JSON.stringify({
                "role": role_value
              })
            })
  
            if(response_json.status === 201){
              notification.innerHTML = `<div class="alert alert-success" role="alert"> Usuario actualizado correctamente</div>`
              setTimeout(function(){
                location.reload()
              }, 2000)
            } else {
              const error = await response_json.json()
              error_notification.innerHTML = `<div class="alert alert-danger" role="alert"> Hubo un error al actualizar el usuario: ${error.message}</div>`
              setTimeout(function(){
                location.reload()
              }, 2000)
            }
        
          })
         
          delete_button[i].addEventListener('click', async (e) =>{
            const user_id = _id_input[i].value
  
            const check = confirm("¿Estás seguro de eliminar este usuario?")
  
            if (check ===true) {
              const response_json = await fetch(`https://entrega-final-backend-f00v.onrender.com/api/users/${user_id}`, {
                method: 'DELETE',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${document.cookie.split("=")[1]}`
                }
              })
              console.log(response_json)
              if(response_json.status === 204){
                notification.innerHTML = `<div class="alert alert-success" role="alert"> Usuario eliminado correctamente</div>`
                setTimeout(function(){
                  location.reload()
                }, 2000)
              } else {
                const error = await response_json.json()
                error_notification.innerHTML = `<div class="alert alert-danger" role="alert"> Hubo un error al eliminar el usuario: ${error.message}</div>`
                setTimeout(function(){
                  location.reload()
                }, 2000)
              }
            }
          })
          
        }
        const delete_big_button = document.querySelector('#delete-users')
        
        delete_big_button.addEventListener('click', async (e)=>{
          const check = confirm("¿Estás seguro que quiere eliminar usuario inactivos?")
    
            if (check ===true) {
              const response_json = await fetch(`https://entrega-final-backend-f00v.onrender.com/api/users`, {
                method: 'DELETE',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${document.cookie.split("=")[1]}`
                }
              })
              console.log(response_json)
              if(response_json.status === 204){
                notification.innerHTML = `<div class="alert alert-success" role="alert"> Limpieza de usuarios finalizada</div>`
                setTimeout(function(){
                  location.reload()
                }, 2000)
              } else {
                const error = await response_json.json()
                error_notification.innerHTML = `<div class="alert alert-danger" role="alert"> Hubo un error al limpiar usuarios: ${error.message}</div>`
                setTimeout(function(){
                  location.reload()
                }, 2000)
              }
            }
        })
    } else{
      alert("No tienes permiso para acceder a este recurso")
      window.location.href = "/login"
    }


    


    
    
})