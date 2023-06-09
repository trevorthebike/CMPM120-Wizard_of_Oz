class WitchStart extends Phaser.Scene {
    constructor() {
        super("witchStartScene");
    }
  
    preload() {
        this.load.image('monkeyend', 'assets/jpg/monkeyend.jpg');
    }
  
    create() {
        let startimage = this.add.image( game.config.width/2, game.config.height/2, 'monkeyend');
        const scaleX = game.config.width / startimage.width;
        const scaleY = game.config.height / startimage.height;
        startimage.setScale(scaleX, scaleY);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
    }
  
    update(){
      if(Phaser.Input.Keyboard.JustDown(keyR)){ this.scene.start('witchScene')};
    }
  }