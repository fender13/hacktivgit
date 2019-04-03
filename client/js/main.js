const axi = axios.create({
  baseURL: 'http://localhost:3000'
})

$(document).ready(function(event) {
  const url_string = window.location.href
  const url = new URL(url_string)
  const code = url.searchParams.get("code")

  let err = ''

  if (localStorage.getItem('token') != null) {
    err = localStorage.getItem('token').slice(0, 5)
  }
  
  if (code == null) {
    $('.page').hide()
    $('.page.home').show()
    $('.logout-button').hide()
    $('.dashboard-button').hide()
    $('.github-login-button').show()
  } else if (err == 'error') {
    $('.page').hide()
    $('.page.home').show()
    $('.logout-button').hide()
    $('.dashboard-button').hide()
    $('.github-login-button').show()
    localStorage.clear()
  } else {
    axi
      .get(`/login/${code}`)
      .then(({ data }) => {
        localStorage.setItem('token', data.token)
        $('.page').hide()
        $('.github-login-button').hide()
        $('.page.dashboard').show()
        $('.dashboard-button').show()
        $('.logout-button').show()
        $('.table-repo').hide()
        getAllRepos()
      })
      .catch(({ response }) => {
        console.log(response)
      })
  }
})

function getAllRepos() {
  axi
    .get('/repo', {
      headers: {'token': localStorage.getItem('token')}
    })
    .then(({ data }) => {
      console.log(data)
      if (data.length == 0) {
        let html = `<option value="task" selected>Select Repository</option>` + ''
        $('#inputSelect').append(html)
      } else {
        let html = `<option value="task" selected>Select Repository</option>` + ''
        for (let i = 0; i < data.length; i++) {
          html +=`<option value="${data[i].owner.login}|${data[i].name}">${data[i].name}</option>`
        }
        $('#inputSelect').append(html)
      }
    })
    .catch(({ response }) => {
      console.log(response)
    })
}

function dashboardMenu(menu) {
  if (menu.value) {
    $('.table-repo').show()
    $('.list-repo-empty').hide()

    let split = menu.value.split('|')

    axi
      .get(`repo/getrepo/${split[0]}/${split[1]}`, {
        headers: {'token': localStorage.getItem('token')}
      })
      .then(({ data }) => {
        console.log(data)
        let html = ''
        for (let i = 0; i < data.length; i++) {
          console.log(data[i], 'ini data')
          html += `
          <tr class="row100">
              <td class="column100 column1" data-column="column1">${data[i].name}</td>
              <td class="column100 column2" data-column="column2">${data[i].type}</td>
              <td class="column100 column3" data-column="column3">${data[i].size}</td>
              <td class="column100 column4" data-column="column4"><a href="${data[i].html_url}" target="_blank">View on Github</a></td>
          </tr>
          `
        }
        $('.body-listrepo').append(html)
      })
      .catch(({ response }) => {
        console.log(response)
      })
  } else {
    $('.table-repo').hide()
    $('.list-repo-empty').show()
  }
}




