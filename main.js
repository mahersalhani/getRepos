let input = document.querySelector("input");
let button = document.querySelector("button");
let shwoData = document.querySelector(".shwo-data");

function getRepos() {
  if (input.value === "") {
    shwoData.innerHTML = "<span class='msg'>Plase Write Github Username</span>";
  } else {
    let myRequest = new XMLHttpRequest();

    myRequest.onreadystatechange = function () {
      //To Creat a Loading Case
      if (0 < this.readyState && this.readyState < 4) {
        shwoData.innerHTML = "<div class='loading'></div>";
      }

      //If We had 404 Error
      if (this.status === 404) {
        shwoData.innerHTML = "<span class='msg'>Please Write Avalibale Username</span>";
      }

      //Success Case
      if (this.readyState === 4 && this.status === 200) {
        //to Remove Any Thing From shwoData
        shwoData.innerHTML = "";

        let repos = JSON.parse(this.responseText);
        console.log(repos);

        if (repos.length === 0) {
          shwoData.innerHTML = "<span class='msg'>No Repos Avalibale</span>";
        } else {
          for (let i = 0; i < repos.length; i++) {
            let dataHolder = document.createElement("div"),
              name = document.createElement("span"),
              info = document.createElement("div"),
              stars = document.createElement("span"),
              link = document.createElement("a");

            dataHolder.className = "data-holder";
            name.className = "name";
            stars.className = "stars";
            info.className = "info";

            name.innerHTML = repos[i].name;
            dataHolder.append(name);

            stars.innerHTML = `${repos[i].stargazers_count} Star`;

            link.href = repos[i].svn_url;
            link.target = "_blanck";
            link.innerHTML = "visit";
            dataHolder.append(link);

            info.append(stars);
            info.append(link);

            dataHolder.append(info);
            shwoData.append(dataHolder);
          }
        }

        //
      }
    };

    myRequest.open("get", `https://api.github.com/users/${input.value}/repos`, true);
    myRequest.send();
  }
}

button.addEventListener("click", function () {
  getRepos();
});

input.addEventListener("keyup", function (e) {
  if (e.key === "Enter") {
    getRepos();
  }
});
