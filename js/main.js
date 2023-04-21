//stopping form from submiting
let baseForm = document.forms[0];
baseForm.onsubmit = function (e) {
  e.preventDefault();
};

//getting data
async function getData(user) {
  let response = await fetch(`https://api.github.com/users/${user}/repos`);
  return await response.json();
}

//dealing With Data and send it to html file
async function dealingWithData(url) {
  const data = await getData(url);
  let reposDiv = document.getElementById("repos");
  reposDiv.style.display = "block";
  if (url.length > 0) {
    if (data.length > 0) {
      for (const repo of data) {
        let repoDiv = document.createElement("div");
        repoDiv.className = "repo";

        let repoName = document.createElement("h2");
        repoName.className = "name";
        repoName.textContent = repo.name;

        let repoUrl = document.createElement("a");
        repoUrl.className = "url";
        repoUrl.textContent = "Visit";
        repoUrl.target = "_blank";
        repoUrl.href = repo.html_url;

        let repoStars = document.createElement("span");
        repoStars.className = "stars";
        repoStars.textContent = `stars ${repo.stargazers_count}`;

        let repoLang = document.createElement("span");
        repoLang.className = "lang";
        repoLang.textContent = repo.language;

        repoDiv.appendChild(repoName);
        repoDiv.appendChild(repoStars);
        if (!!repo.language) {
          repoDiv.appendChild(repoLang);
        }
        repoDiv.appendChild(repoUrl);
        reposDiv.appendChild(repoDiv);
      }
      document.body.appendChild(reposDiv);
    } else {
      reposDiv.textContent = "There are no repos with this UserName";
    }
  } else {
    reposDiv.textContent = "You have to put username ._.";
  }
}

//Run when get data from input
let getbutton = document.getElementById("getrepo");
let getinfo = document.getElementById("getinfo");
let repos = document.getElementById("repos");
getbutton.onclick = function () {
  repos.textContent = "";
  dealingWithData(getinfo.value);
};

// //hide repos div in start
window.onload = function () {
  repos = document.getElementById("repos");
  if (!repos.textContent) {
    repos.style.display = "none";
  }
};
