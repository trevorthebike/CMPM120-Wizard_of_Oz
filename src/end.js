class End extends Phaser.Scene {
    constructor() {
        super("endScene");
    }
  
    preload() {
        this.load.image('witchend', 'assets/jpg/witchend1.jpg');
    }
  
    create() {
        gamemusic.stop();
        let startimage = this.add.image( game.config.width/2, game.config.height/2, 'witchend');
        const centerX = this.cameras.main.width / 2;
        const centerY = this.cameras.main.height / 2;
        const container = this.add.container(centerX, centerY);
        const graphics = this.add.graphics();
        graphics.fillStyle(0x000000); // Set the fill color of the box to white
        graphics.fillRect(-textStyle.wordWrap.width / 2, -textStyle.fontSize / 2, textStyle.wordWrap.width, textStyle.fontSize);
        container.add(graphics);
        const text = this.add.text(0, 0, "Then, being at last free to do as she chose, she ran out to the court-yard to tell the Lion that the Wicked Witch of the West had come to an end, and that they were no longer prisoners in a strange land. Press R to move onto next scene.", textStyle);
        text.setOrigin(0.5);
        container.add(text);
        const scaleX = game.config.width / startimage.width;
        const scaleY = game.config.height / startimage.height;
        startimage.setScale(scaleX, scaleY);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
    }
  
    update(){
      if(Phaser.Input.Keyboard.JustDown(keyR)){ this.scene.start('startScene')};
    }
  }