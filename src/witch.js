class Witch extends Phaser.Scene {
    constructor() {
        super("witchScene");
        this.VEL = 100;
    }
  
    preload() {
        this.load.spritesheet('dorothy', 'assets/png/dorothy.png', {
            frameWidth: 16,
            frameHeight: 16
        })
        this.load.image('monkeyend', 'assets/monkeyend.jpg');
        //this.load.image('tilesetImage', 'assets/png/tileset.png');
        this.load.tilemapTiledJSON('tilemapJSON2', 'assets/witch.json');
        
    }
  
    create() {
        const map = this.add.tilemap('tilemapJSON2');
        const tileset = map.addTilesetImage('tileset', 'tilesetImage');
        const bgLayer = map.createLayer('Background', tileset, 0, 0);
        const treeLayer = map.createLayer('Trees', tileset, 0, 0);
        //rlet startimage = this.add.image( game.config.width/2, game.config.height/2, 'monkeyend').setScale(0.6);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        this.dorothy = this.physics.add.sprite(320, 320, 'dorothy', 0).setScale(1.5);
        this.dorothy.play('dorothyfront');

        //this.dorothy.body.setCollideWorldBounds(true);
        this.cameras.main.setBounds(0,0,map.widthInPixels, map.heightInPixels);
        this.cameras.main.startFollow(this.dorothy, true, 0.5, 0.5);
        this.physics.world.bounds.setTo(0, 0, map.widthInPixels, map.heightInPixels);
        this.cursors = this.input.keyboard.createCursorKeys();
        treeLayer.setCollisionByProperty({ collides: true });
        this.physics.add.collider(this.dorothy, treeLayer);
    }
  
    update(){
      if(Phaser.Input.Keyboard.JustDown(keyR)){ this.scene.start('endScene')};
      
      this.direction = new Phaser.Math.Vector2(0);
        if(this.cursors.left.isDown){
            this.dorothy.play('dorothyleft', true);
            this.direction.x = -1; 
        }
        else if(this.cursors.right.isDown){
            this.dorothy.play('dorothyright', true);
            this.direction.x = 1;
        }
        if(this.cursors.up.isDown){
            this.dorothy.play('dorothyback', true);
            this.direction.y = -1; 
        }
        else if(this.cursors.down.isDown){
          this.dorothy.play('dorothyfront', true);
          this.direction.y = 1; 
        }
        this.direction.normalize();
        this.dorothy.setVelocity(this.VEL * this.direction.x, this.VEL * this.direction.y);
    }
  }