class Player {
  constructor() {
    this.index = playerCount;
    this.distance = 0;
    this.health = 100;
    this.positionX = 0;
    this.positionY = 0;
    this.score = 0;
    this.name = null;
    this.team = playerCount;
    this.bullets = [];
    this.body = createSprite(playerCount * displayWidth / 10, displayHeight / 2, 10, 10);
    // this.rank = null;
  }
  // getcarsAtEnd(){
  //database.ref("carsAtEnd").on("value",data =>{
  //  this.rank = data.val()
  //})
  //}

  // static updatecarsAtEnd(rank){
  //  database.ref("/").update({
  //    carsAtEnd:rank
  //  })
  // }
  getCount() {
    var playerCountRef = database.ref('playerCount');
    playerCountRef.on("value", (data) => {
      playerCount = data.val();
    })
  }

  updateCount(count) {
    database.ref('/').update({
      playerCount: count
    });
  }

  update() {
    if (player.index === 1) {
      this.team = 1;
      var playerIndex = "teams/team" + this.team + "/" + "player" + this.team + this.index;
      console.log(playerIndex);
      database.ref(playerIndex).update({
        health: this.health,
        name: this.name,
        positionX: this.positionX,
        positionY: this.positionY,
        score: this.score
      });
    }
    if (player.index === 2) {
      this.team = 2;
      var playerIndex = "teams/team" + this.team + "/" + "player" + this.team + this.index;
      console.log(playerIndex);
      database.ref(playerIndex).update({
        health: this.health,
        name: this.name,
        positionX: this.positionX,
        positionY: this.positionY,
        score: this.score

      });
    }

  }
  createPlayerSprite() {
    player.body = createSprite(100, 200);

    player.body.addImage("car1", car1_img);

    players.push(player.body);
  }
  makeBullets() {
    var bullet = createSprite(displayHeight / 2, displayWidth / 2, 10, 10);
    bullet.x = player.positionX;
    bullet.y = player.positionY;
    //console.log(bullet);
    if (player.team === 1) {
      bullet.velocityX = 5;

    } else if (player.team === 2) {
      bullet.velocityX = -5;

    }
    this.bullets.push(bullet);
    // console.log(this.bullets);
    // console.log("bullets")
  }

  static getPlayerInfo() {
    var playerInfoRef = database.ref('teams');
    playerInfoRef.on("value", (data) => {
      allPlayers = data.val();
    })
  }
}
