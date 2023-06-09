/*
Trevor Gardner
Wizard Of Oz
physics systems: maybe?
cameras: camera to follow the character, very zoomed in to make map seem bigger
particle effects: maybe?
text objects: not yet implemented
the animation manager: many animinations for charaters, including directional changing animation
tilemaps: multiple tilemaps for scenes with multiple layers
*/

let config ={
    type: Phaser.CANVAS,
    render: {
        pixelArt: true
    },
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 900/3,
        height: 1100/3
    },
    physics: {
        default: "arcade",
        arcade: {
          //  debug: true
        }
    },
    scene: [Start, Yellow, MonkeyStart, Monkey, WitchStart, Witch, End]
}
let collectedTinman;
let collectedScarecrow;
let collectedLion;
let keyR;
let monkeySpeed = 1000;
const game = new Phaser.Game(config);

function startNextScene(){
    this.scene.start('yellowScene')
}
/*
function createPath(player, enemy){
    var toX = Math.floor(player.x/16);
    var toY = Math.floor(player.y/16);
    var fromX = Math.floor(enemy.x/16);
    var fromY = Math.floor(enemy.y/16);
    console.log('going from ('+fromX+','+fromY+') to ('+toX+','+toY+')');
    finder.findPath(fromX, fromY, toX, toY, function( path ) {
      if (path === null) {
        console.warn("Path was not found.");
      } else {
        console.log(path);
        moveEnemy(player,enemy,path);
      }
    });
    finder.calculate();
}

function moveEnemy(player,enemy,path){
    let mytimeline = game.scene.scenes[0].tweens.createTimeline();
    let newx, newy;
    for ( var i = 0; i < path.length-1; i++ ) {
        newx = path[ i + 1 ].x;
        newy = path[ i + 1 ].y;
        mytimeline.add(
        {
            targets: enemy,
                x: {
                   value: newx * map.tileWidth,
                   duration: 100
                 },
                y: {
                 value: newy * map.tileHeight,
                 duration: 100
    
    }
      }
    );
  }
  mytimeline.play();
}*/