const email = document.querySelector('input')
const formLogin = document.querySelector('form')

formLogin.addEventListener('submit', async e => {
  e.preventDefault()
  console.log(email.value)
  const response = await fetch(`https://entrega-final-backend-f00v.onrender.com/api/users/check?q=restore&email=${email.value}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    // @ts-ignore
    //body: new URLSearchParams(new FormData(formLogin))
  })

  if (response.status === 200) {
    const {payload} = await response.json()
    window.location.href = '/checkEmail.html'
  } else {
    const error = await response.json()
    alert("Credenciales inválidas")
  }
})