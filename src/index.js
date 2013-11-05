window.domready = require('domready');
window.drag = require('drag');
window.agent = require('superagent');
window.repoCollage = new Firebase('https://repo-collage.firebaseio.com/');
window.positions = repoCollage.child('positions');

NodeList.prototype.forEach = Array.prototype.forEach;

window.app = {}

app.getRepos = function (user, cb) {

  app.user = user

  if (localStorage.repos) {
    console.log('use localStorage.repos')
    return cb(JSON.parse(localStorage.repos))
  } else {
    agent.get("https://api.github.com/users/" + user + "/repos?per_page=1000").end(function(err, res) {
      localStorage.repos = JSON.stringify(res.body);
      return cb(res.body);
    });
  }
}

app.renderRepos = function (repos, cb) {

  var $draggables = document.querySelector('.draggables');

  repos.map(function(repo, index) {
    el = document.createElement('li')
    el.innerHTML = repo.name
    el.id = app.user + "-" + repo.name.replace(/\./g, 'DOT')
    $draggables.appendChild(el)

    el.style.top = index * (document.querySelector('li').offsetHeight + 5);

    drag(el)
      .end(function(el) {
        positions.child(this.el.id)
          .set([this.pos.x, this.pos.y].join(','))
      })
      .bind();

  });

  return cb(repos);
}

domready(function() {

  app.getRepos('heroku', function(repos) {
    app.renderRepos(repos, function() {
      // console.log('done rendering repos')
    });
  })

  repoCollage.on('value', function(snapshot) {
    if (!snapshot.val()) return false;
    var positions = snapshot.val().positions;
    if (positions) {
      Object.keys(positions).map(function(repo) {
        console.log(repo, positions[repo])
        var position = positions[repo].split(',');
        var el = document.querySelector('#'+repo)
        if (el) {
          el.style.left = position[0]
          el.style.top = position[1]
        }
      });
    }
  });

})
