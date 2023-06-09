class Monkey extends Phaser.Scene {
    constructor() {
        super("monkeyScene");
    }
  
    preload() {
        this.load.image('yellow', 'assets/jpg/yellowend.jpg');
    }
  
    create() {
        let startimage = this.add.image( game.config.width/2, game.config.height/2, 'yellow').setScale(0.6);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
    }
  
    update(){
      if(Phaser.Input.Keyboard.JustDown(keyR)){ this.scene.start('witchStartScene')};
    }
  }