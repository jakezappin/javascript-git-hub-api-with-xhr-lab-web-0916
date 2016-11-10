const rootURL = "https://api.github.com"

function getRepositories() {
  var name = document.getElementById("username").value
  var uri = rootURL + "/users/" + name + "/repos"
  var xhr = new XMLHttpRequest()
  xhr.addEventListener("load", displayRepositories)
  xhr.open("GET", uri)
  xhr.send()
  return false;
}

function displayRepositories() {
  var repos = JSON.parse(this.responseText)
  var repoList = "<ul>" + repos.map(repo => {
    var dataUsername = 'data-username="' + repo.owner.login + '"'
    var dataRepoName = 'data-repository="' + repo.name + '"'
    return(`
          <li>
            <h2>${repo.name}</h2>
            <a href="${repo.html_url}">${repo.html_url}</a><br>
            <a href="#" ${dataRepoName} ${dataUsername} onclick="getCommits(this)">Get Commits</a><br>
            <a href="#" ${dataRepoName} ${dataUsername} onclick="getBranches(this)">Get Branches</a></li>
          </li>`
          )
  }).join('') + "</ul>";
  document.getElementById("repositories").innerHTML = repoList
}

function getCommits(elem) {
  var repoName = elem.dataset.repository
  var uri = rootURL + "/repos/" + elem.dataset.username + "/" + repoName + "/commits"
  var xhr = new XMLHttpRequest()
  xhr.addEventListener("load", displayCommits)
  xhr.open("GET", uri)
  xhr.send()
}

function displayCommits() {
  var commits = JSON.parse(this.responseText)
  var commitsList = `<ul>${commits.map(commit => '<li><h3>' + commit.commit.author.name + ' (' + commit.author.login + ')</h3>' + commit.commit.message + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = commitsList
}

function getBranches(elem) {
  var repoName = elem.dataset.repository
  var uri = rootURL + "/repos/" + elem.dataset.username + "/" + repoName + "/branches"
  var xhr = new XMLHttpRequest()
  xhr.addEventListener("load", displayBranches)
  xhr.open("GET", uri)
  xhr.send()
}

function displayBranches() {
  var branches = JSON.parse(this.responseText)
  var branchesList = `<ul>${branches.map(branch => '<li>' + branch.name + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = branchesList
}
