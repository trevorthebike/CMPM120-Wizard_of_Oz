class MonkeyStart extends Phaser.Scene {
    constructor() {
        super("monkeyStartScene");
    }
  
    preload() {
        this.load.image('yellow', 'assets/jpg/yellowend.jpg');
    }
  
    create() {
        let startimage = this.add.image( game.config.width/2, game.config.height/2, 'yellow');
        const scaleX = game.config.width / startimage.width;
        const scaleY = game.config.height / startimage.height;
        startimage.setScale(scaleX, scaleY);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
    }
  
    update(){
      if(Phaser.Input.Keyboard.JustDown(keyR)){ this.scene.start('monkeyScene')};
    }
  }