class End extends Phaser.Scene {
    constructor() {
        super("endScene");
    }
  
    preload() {
        this.load.image('witchend', 'assets/jpg/witchend.jpg');
    }
  
    create() {
        let startimage = this.add.image( game.config.width/2, game.config.height/2, 'witchend').setScale(0.6);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
    }
  
    update(){
      if(Phaser.Input.Keyboard.JustDown(keyR)){ this.scene.start('startScene')};
    }
  }