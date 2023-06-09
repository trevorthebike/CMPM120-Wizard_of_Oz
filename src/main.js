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
const game = new Phaser.Game(config);

function startNextScene(){
    this.scene.start('yellowScene')
  }