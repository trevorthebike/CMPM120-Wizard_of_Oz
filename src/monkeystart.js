class MonkeyStart extends Phaser.Scene {
    constructor() {
        super("monkeyStartScene");
    }
  
    preload() {
        this.load.image('yellow', 'assets/jpg/yellowend1.jpg');
    }
  
    create() {
        let startimage = this.add.image( game.config.width/2, game.config.height/2, 'yellow');
        const centerX = this.cameras.main.width / 2;
        const centerY = this.cameras.main.height / 2;
        const container = this.add.container(centerX, centerY);
        const graphics = this.add.graphics();
        graphics.fillStyle(0x000000); // Set the fill color of the box to white
        graphics.fillRect(-textStyle.wordWrap.width / 2, -textStyle.fontSize / 2, textStyle.wordWrap.width, textStyle.fontSize);
        container.add(graphics);
        const text = this.add.text(0, -100, "Use the arrow keys to skillfully avoid the monkeys. Press R to move onto next scene.", textStyle);
        text.setOrigin(0.5);
        container.add(text);
        gamemusic.stop();
        const scaleX = game.config.width / startimage.width;
        const scaleY = game.config.height / startimage.height;
        startimage.setScale(scaleX, scaleY);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
    }
  
    update(){
      if(Phaser.Input.Keyboard.JustDown(keyR)){ this.scene.start('monkeyScene')};
    }
  }