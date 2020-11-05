class Game {
  constructor() {

  }

  getState() {
    var gameStateRef = database.ref('gameState');
    gameStateRef.on("value", function (data) {
      gameState = data.val();
    })

  }

  update(state) {
    database.ref('/').update({
      gameState: state
    });
  }

  async start() {
    if (gameState === 0) {
      player = new Player();
     // players.push(player.body);
      var playerCountRef = await database.ref('playerCount').once("value");
      if (playerCountRef.exists()) {
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
      

    }
    
    // player.body = createSprite(100, 200);
    // player.body.addImage("car1", car1_img);
    car2 = createSprite(300, 200);
    car2.addImage("car2", car2_img);
    // car3 = createSprite(500,200);
    // car3.addImage("car3",car3_img);
    // car4 = createSprite(700,200);
    // car4.addImage("car4",car4_img);
    
    cars.push(player.body);
    console.log("player body in car");
  }

  play() {
    form.form_hide();

    Player.getPlayerInfo();
    //player.getcarsAtEnd();
    if (allPlayers !== undefined) {
      background(rgb(198, 135, 103));
      image(track, 0, -displayHeight * 4, displayWidth, displayHeight * 5);
      //console.log(allPlayers);

      //var display_position = 100;

      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 175;
      var y;
      for (var t in allPlayers) {
        for (var plr in allPlayers[t]) {
          index = index +1;
          //console.log(index);
          //console.log(allPlayers[t][plr].positionX);
          //console.log(allPlayers[t][plr].positionY);
          
          
          console.log(cars[index-1]);
          console.log(players[index-1]);
          cars[index - 1].x = allPlayers[t][plr].positionX;
          cars[index - 1].y = allPlayers[t][plr].positionY;
          


          if (index === player.index) {
            stroke(10);
            fill("red");
            ellipse(x, y, 60, 60);
            //cars[index - 1].shapeColor = "red";
            camera.position.x = cars[index - 1].x;
            camera.position.y = cars[index - 1].y;
          }

          //textSize(15);
          //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
        }
      }

    }

    if (keyIsDown(UP_ARROW) && player.index !== null) {
      player.positionY -= 10
      player.update();
    }

    if (keyIsDown(DOWN_ARROW) && player.index !== null) {
      player.positionY += 10
      player.update();
    }

    if (keyIsDown(LEFT_ARROW) && player.index !== null) {
      player.positionX -= 10
      player.update();
    }

    if (keyIsDown(RIGHT_ARROW) && player.index !== null) {
      player.positionX += 10
      player.update();
    }

    if(mouseIsPressed){
      //if(mouseButton === LEFT){
        console.log("mouse");
        player.makeBullets();
      //}
    }


    if (player.distance > 3860) {
      gameState = 2;
    }

    drawSprites();
  }
  


  end() {
    console.log("Game Ended");
    console.log(player.rank)
    player.update();
  }
}
