const formLogin = document.querySelector('form')

formLogin.addEventListener('submit', async e => {
  e.preventDefault()

  const error_notification = document.querySelector('#error_notification')

  const response = await fetch('https://entrega-final-backend-f00v.onrender.com/api/sessions/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    // @ts-ignore
    body: new URLSearchParams(new FormData(formLogin))
  })

  if (response.status === 201) {
    const {payload} = await response.json()
    document.cookie = `Authorization=${payload}; expires=Thu, 19 Dec 2024 12:00:00 UTC; path=/`
    window.location.href = '/profile.html'
  } else {
    const error = await response.json()
    error_notification.innerHTML = `<div class="alert alert-danger" role="alert">${error.message}</div>`
  }
})