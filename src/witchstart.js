class WitchStart extends Phaser.Scene {
    constructor() {
        super("witchStartScene");
    }
  
    preload() {
        this.load.image('monkeyend', 'assets/jpg/monkeyend1.jpg');
    }
  
    create() {
        let startimage = this.add.image( game.config.width/2, game.config.height/2, 'monkeyend');
        const centerX = this.cameras.main.width / 2;
        const centerY = this.cameras.main.height / 2;
        const container = this.add.container(centerX, centerY);
        const graphics = this.add.graphics();
        graphics.fillStyle(0x000000); // Set the fill color of the box to white
        graphics.fillRect(-textStyle.wordWrap.width / 2, -textStyle.fontSize / 2, textStyle.wordWrap.width, textStyle.fontSize);
        container.add(graphics);
        const text = this.add.text(0, 0, "Oh no the monkeys got you. Find a water bucket and press space to throw it. Find the witch and drench her", textStyle);
        text.setOrigin(0.5);
        container.add(text);
        gamemusic.stop();
        const scaleX = game.config.width / startimage.width;
        const scaleY = game.config.height / startimage.height;
        startimage.setScale(scaleX, scaleY);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
    }
  
    update(){
      if(Phaser.Input.Keyboard.JustDown(keyR)){ this.scene.start('witchScene')};
    }
  }