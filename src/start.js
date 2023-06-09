class Start extends Phaser.Scene {
    constructor() {
        super("startScene");
    }
  
    preload() {
        this.load.image('start', 'assets/jpg/start.jpg');
    }
  
    create() {
        let startimage = this.add.image( game.config.width/2, game.config.height/2, 'start');
        const scaleX = game.config.width / startimage.width;
        const scaleY = game.config.height / startimage.height;
        startimage.setScale(scaleX, scaleY);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        collectedTinman = false;
        collectedScarecrow = false;
        collectedLion = false;
    }
  
    update(){
      if(Phaser.Input.Keyboard.JustDown(keyR)){ this.scene.start('yellowScene')};
    }
  }