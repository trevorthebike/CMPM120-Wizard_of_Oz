class Monkey extends Phaser.Scene {
    constructor() {
        super("monkeyScene");
        this.VEL = 100;
    }
  
    preload() {
        this.load.image('tilesetImage', 'png/tileset.png');
        this.load.tilemapTiledJSON('tilemapJSON', 'yellow.json');
        this.load.spritesheet('dorothy', 'assets/png/dorothy.png', {
            frameWidth: 16,
            frameHeight: 16
        })
    }
  
    create() {
        const map = this.add.tilemap('tilemapJSON');
        const tileset = map.addTilesetImage('tileset', 'tilesetImage');
        const bgLayer = map.createLayer('Background', tileset, 0, 0);
        const treeLayer = map.createLayer('Trees', tileset, 0, 0);
        this.dorothy = this.physics.add.sprite(32, 32, 'dorothy', 0).setScale(1.5);
        //this.dorothy.play('dorothyfront');
        this.dorothy.body.setCollideWorldBounds(true);
        this.cameras.main.setBounds(0,0,map.widthInPixels, map.heightInPixels);
        this.cameras.main.startFollow(this.dorothy, true, 0.5, 0.5);
        this.physics.world.bounds.setTo(0, 0, map.widthInPixels, map.heightInPixels);
        this.cursors = this.input.keyboard.createCursorKeys();
        treeLayer.setCollisionByProperty({ collides: true });
        this.physics.add.collider(this.dorothy, treeLayer);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        this.anims.create({
          key: 'dorothyfront1', 
          frameRate: 4,
          repeat: -1,
          frames: this.anims.generateFrameNumbers('dorothy', { frames: [0, 4, 8] })
        });
        this.anims.create({
          key: 'dorothyright1', 
          frameRate: 4,
          repeat: -1,
          frames: this.anims.generateFrameNumbers('dorothy', { frames: [1, 5, 9] })
        });
        this.anims.create({
          key: 'dorothyback1', 
          frameRate: 4,
          repeat: -1,
          frames: this.anims.generateFrameNumbers('dorothy', { frames: [2, 6, 10] })
        });
        this.anims.create({
          key: 'dorothyleft1', 
          frameRate: 4,
          repeat: -1,
          frames: this.anims.generateFrameNumbers('dorothy', { frames: [3, 7, 11] })
        });
        this.dorothy.play('dorothyfront1');
    }
  
    update(){
        if(Phaser.Input.Keyboard.JustDown(keyR)){ this.scene.start('witchStartScene')};
        this.direction = new Phaser.Math.Vector2(0);
        if(this.cursors.left.isDown){
            this.dorothy.play('dorothyleft1', true);
            this.direction.x = -1; 
        }
        else if(this.cursors.right.isDown){
            this.dorothy.play('dorothyright1', true);
            this.direction.x = 1; 
        }
        if(this.cursors.up.isDown){
            this.dorothy.play('dorothyback1', true);
            this.direction.y = -1; 
        }
        else if(this.cursors.down.isDown){
            this.dorothy.play('dorothyfront1', true);
            this.direction.y = 1; 
        }
        this.direction.normalize();
        this.dorothy.setVelocity(this.VEL * this.direction.x, this.VEL * this.direction.y);
    }
  }