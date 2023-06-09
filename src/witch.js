class Witch extends Phaser.Scene {
    constructor() {
        super("witchScene");
    }
  
    preload() {
        this.load.image('monkeyend', 'assets/jpg/monkeyend.jpg');
    }
  
    create() {
        let startimage = this.add.image( game.config.width/2, game.config.height/2, 'monkeyend').setScale(0.6);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
    }
  
    update(){
      if(Phaser.Input.Keyboard.JustDown(keyR)){ this.scene.start('endScene')};
    }
  }