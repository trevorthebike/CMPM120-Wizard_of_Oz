/*
Trevor Gardner
Wizard Of Oz
Cameras: camera to follow the character, very zoomed in to make map seem bigger
Timers: Implemented in monkey scene to make random movement at random time intervals. Also used to select
        between different children of the group randomly. Used in witch scene to give random movement, and to allow
        animations to fully complete before scene transition.
Text objects: Included in every transition stage to give the player instructions and rules
            the animation manager: many animinations for charaters, including directional changing animation
Tilemaps: multiple tilemaps for scenes with multiple layers
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