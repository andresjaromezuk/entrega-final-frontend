const formRegister = document.querySelector('form')

formRegister.addEventListener('submit', async e => {
    e.preventDefault()
  
    const response = await fetch('https://entrega-final-backend-f00v.onrender.com/api/users/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      // @ts-ignore
      body: new URLSearchParams(new FormData(formRegister))
    })
    console.log(response)
    if (response.status === 201) {
      const {payload} = await response.json()
      document.cookie = `Authorization=${payload}; expires=Thu, 19 Dec 2024 12:00:00 UTC; path=/`
      window.location.href = '/profile.html'
    } else {
      const error = await response.json()
      alert(error.message)
    }
  })