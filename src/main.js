/*
Trevor Gardner
Wizard Of Oz
Cameras: camera to follow the character, very zoomed in to make map seem bigger
Timers: Implemented in monkey scene to make random movement at random time intervals. Also used to select
        between different children of the group randomly. Used in witch scene to give random movement, and to allow
        animations to fully complete before scene transition.
Text objects: Included in every transition stage to give the player instructions and rules
Animation manager: many animinations for charaters, including directional changing animation taht plays when facing that direction
Tilemaps: multiple tilemaps for scenes with multiple layers

In my game, I have added an extra level of polish to the mechanics, with unique mechanics for each scene. 
Implementing random movement for the monkeys and witch posed a technical challenge, while the witch scene presented additional complexity with a collectible object that can be carried by the player. 
This item enables the player to attack the witch using the space button, triggering a death animation if the witch is within a specific range. 
Implementing this ranged attack feature proved to be challenging. 
These innovative features demonstrate my dedication and creativity, deserving an extra grade "tilt" to acknowledge the effort put into the game.
*/

let config ={
    type: Phaser.CANVAS,
    render: {
        pixelArt: true
    },
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1080/2,
        height: 720/2
    },
    physics: {
        default: "arcade",
        arcade: {
            //debug: true
        }
    },
    scene: [Start, Yellow, MonkeyStart, Monkey, WitchStart, Witch, End]
}
let collectedTinman;
let collectedScarecrow;
let collectedLion;
let collectedBucket;
let witchstopped;
let gamemusic;
let witchmusic;
let keyR;
let keyM;
let keyW;
let monkeySpeed = 1000;
const textStyle = {
    fontFamily: "Amatic SC",
    fontStyle: "bold",
    fontSize: "16px",
    color: "#000000",
    align: "center",
    wordWrap: { width: 300, useAdvancedWrap: true },
};
const game = new Phaser.Game(config);

function startNextScene(){
    this.scene.start('yellowScene')
}