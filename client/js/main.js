const axi = axios.create({
  baseURL: 'http://localhost:3000'
})

const baseurl = 'http://localhost:3000'

$(document).ready(function(event) {
  const url_string = window.location.href
  const url = new URL(url_string)
  const code = url.searchParams.get("code")

  if (!localStorage.getItem('token') && code == null) {
    $('.page').hide()
    $('.page.home').show()
    $('.logout-button').hide()
    $('.dashboard-button').hide()
    $('.github-login-button').show()
  } else if (!localStorage.getItem('token') && code != null) {
    githubLogin(code)
  } else {
    $('.page').hide()
    $('.github-login-button').hide()
    $('.page.dashboard').show()
    $('.dashboard-button').show()
    $('.logout-button').show()
    $('.table-repo').hide()
    $('.table-searched-repo').hide()
    $('.search-form-repo').hide()
    $('.search-result').hide()
    getAllRepos()
  }
})

function githubLogin(code) {
  axi
    .get(`/login/${code}`)
    .then(({ data }) => {
      localStorage.setItem('token', data.token)
      window.location = "http://localhost:8080"     
    })
    .catch(({ response }) => {
      console.log(response)
    })
}

function getAllRepos() {
  axi
    .get('/repo', {
      headers: {'token': localStorage.getItem('token')}
    })
    .then(({ data }) => {
      if (data.length == 0) {
        let html = `<option value="task" selected>Select Repository</option>` + ''
        $('#inputSelect').append(html)
      } else {
        $('#inputSelect').html('')
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
    $('.search-form-repo').hide()
    $('.table-searched-repo').hide()
    $('.search-form-repo').hide()
    $('.search-result').hide()
    let split = menu.value.split('|')

    axi
      .get(`repo/getrepo/${split[0]}/${split[1]}`, {
        headers: {'token': localStorage.getItem('token')}
      })
      .then(({ data }) => {
        let html = ''
        $('.dashboard-title').html('')
        $('.body-listrepo').html('')
        let dashboardTitle = `<h5 id="repo-name">${split[1]} | ${split[0]}</h5>`

        for (let i = 0; i < data.length; i++) {
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
        $('.dashboard-title').append(dashboardTitle)
      })
      .catch(({ response }) => {
        console.log(response)
      })
  } else if (menu.value == 'task') {
    $('.table-repo').hide()
    $('.table-searched-repo').hide()
    $('.list-repo-empty').show()
  }
}

$('#new-repository').on('click', function(event) {
  const repoName = $("#input-repo-name").val()
  const description = $("#input-description").val()
  const status = $("#input-status-private").val()

  $.ajax({
    url: `${baseurl}/repo`,
    type: 'POST',
    data: {
      name: repoName,
      description: description,
      private: status
    },
    headers: { 'token': localStorage.getItem('token') }
  })
    .done((data) => {
      event.preventDefault()
      $("#input-repo-name").val('')
      $("#input-description").val('')
      $("#input-status-private").val('')

      $('#create-repo').modal('hide') 
      getAllRepos()
    })
    .fail((err) => {
      console.log(err)
    })
  console.log(repoName)
})

$('#delete-repo-button').on('click', function(event) {
  let repoName = document.getElementById('repo-name')
  let split = repoName.innerText.split(' | ')
  $.ajax({
    url: `${baseurl}/repo/${split[1]}/${split[0]}`,
    type: 'DELETE',
    headers: { 'token': localStorage.getItem('token') }
  })
    .done((data) => {
      event.preventDefault()
      getAllRepos()
    })
    .fail((err) => {
      console.log(err)
    })
})

$('#logout-button').on('click', function(event) {
  event.preventDefault()
  $('.page').hide()
  $('.page.home').show()
  $('.logout-button').hide()
  $('.dashboard-button').hide()
  $('.github-login-button').show()
  localStorage.clear()
})

$('#search-github-user').on('click', function(event) {
  $('.table-repo').hide()
  $('.list-repo-empty').hide()
  $('.search-form-repo').show()

  $('#search-form').on('submit', function(event) {
    event.preventDefault()
    const searchByUser = $("#search-by-user").val()

    $.ajax({
      url: `${baseurl}/repo/${searchByUser}/repos`,
      type: 'GET',
      headers: { 'token': localStorage.getItem('token') }
    })
    .done((data) => {
      if (data.length == 0) {
        $('.search-result').show()
        $('.table-searched-repo').hide()
      } else {
        $("#search-by-user").val('')
        $('.search-result').hide()
        $('.table-searched-repo').show()
        
        $('.body-search-reponame').html('')
        let html = ''
        for (let i = 0; i < data.length; i++) {
          console.log(data[i])
          html += `
          <tr class="row100">
              <td class="column100 column1" data-column="column1">${data[i].name}</td>
              <td class="column100 column4" data-column="column4"><a href="${data[i].html_url}" target="_blank">View on Github</a></td>
          </tr>
          `
        }
        $('.body-search-reponame').append(html)
      }
    })
    .fail((err) => {
      console.log(err)
    })
  })
})



