class Start extends Phaser.Scene {
    constructor() {
        super("startScene");
    }
  
    preload() {
        this.load.image('start', 'assets/jpg/start.jpg');
    }
  
    create() {
        let startimage = this.add.image( game.config.width/2, game.config.height/2, 'start').setScale(0.2);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        collectedTinman = false;
        collectedScarecrow = false;
        collectedLion = false;
    }
  
    update(){
      if(Phaser.Input.Keyboard.JustDown(keyR)){ this.scene.start('yellowScene')};
    }
  }