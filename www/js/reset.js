const formLogin = document.querySelector('form')

window.addEventListener("DOMContentLoaded", async function(){
    const query_string = window.location.search
    const url_params = new URLSearchParams(query_string)
    const timestamp =  url_params.get('timestamp')
    
    const response = await fetch(`https://entrega-final-backend-f00v.onrender.com/api/users/check?q=reset&timestamp=${timestamp}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
      })
    
      if (response.status !== 200) {
        const {payload} = await response.json()
        window.location.href = '/addEmail.html'
        alert("El link a expirado.")
      } 

})


formLogin.addEventListener('submit', async e => {
  e.preventDefault()
  console.log("se ejecuta")
  const response = await fetch('https://entrega-final-backend-f00v.onrender.com/api/users/resetPassword', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    // @ts-ignore
    body: new URLSearchParams(new FormData(formLogin))
  })

  if (response.status === 200) {
    window.location.href = '/login.html'
  } else {
    const error = await response.json()
    alert("Credenciales inválidas")
  }
})