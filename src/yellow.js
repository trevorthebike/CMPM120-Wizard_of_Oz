class Yellow extends Phaser.Scene{
    constructor(){
        super({key: 'yellowScene'})
        this.VEL = 100;
    }

    preload(){
        this.load.path = './assets/';
        this.load.image('scarecrow', 'png/ScareCrow.png');
        this.load.image('tilesetImage', 'png/tileset.png');
        this.load.tilemapTiledJSON('tilemapJSON', 'yellow.json');
        //this.load.audio('gamemusic1', "assets/since_2_a.m.ogg");
    }

    create(){
        gamemusic = this.sound.add('gamemusic1');
        gamemusic.play({
            volume: 0.05,
            loop: true}   );
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        const map = this.add.tilemap('tilemapJSON');
        const tileset = map.addTilesetImage('tileset', 'tilesetImage');
        const bgLayer = map.createLayer('Background', tileset, 0, 0);
        const treeLayer = map.createLayer('Trees', tileset, 0, 0);
        this.tinman = this.physics.add.sprite(320, 320, 'tinman', 0);
        this.scarecrow = this.physics.add.sprite(320, 32, 'scarecrow', 0);
        this.lion = this.physics.add.sprite(100, 320, 'lion', 4);
        this.dorothy = this.physics.add.sprite(32, 32, 'dorothy', 0).setScale(1.5);
        this.dorothy.play('dorothyfront');
        this.tinman.play('tinmanfront');
        this.lion.play('lionwalkfront');
        this.dorothy.body.setCollideWorldBounds(true);
        this.cameras.main.setBounds(0,0,map.widthInPixels, map.heightInPixels);
        this.cameras.main.startFollow(this.dorothy, true, 0.5, 0.5);
        this.physics.world.bounds.setTo(0, 0, map.widthInPixels, map.heightInPixels);
        this.cursors = this.input.keyboard.createCursorKeys();
        treeLayer.setCollisionByProperty({ collides: true });
        this.physics.add.collider(this.dorothy, treeLayer);
        this.physics.add.overlap(this.dorothy, this.lion , collectLion, null, this);
        this.physics.add.overlap(this.dorothy, this.scarecrow, collectScarecrow, null, this);
        this.physics.add.overlap(this.dorothy, this.tinman, collectTinman, null, this);
        let fkey = this.input.keyboard.addKey('F');
        fkey.on(
        'down', 
        function () {
            if (this.scale.isFullscreen) {
            this.scale.stopFullscreen();
            } else {
            this.scale.startFullscreen();
            }
        }, 
        this );
        this.yoffset = 0;
        this.xoffset = 0;
    }

    update(){
        if(Phaser.Input.Keyboard.JustDown(keyR)){ this.scene.start('monkeyStartScene')};
        this.direction = new Phaser.Math.Vector2(0);
        if(this.cursors.left.isDown){
          this.xoffset = 50;
          this.yoffset = 0;
            this.dorothy.play('dorothyleft', true);
            this.direction.x = -1; 
            if(collectedLion) {
              this.lion.play('lionwalkleft', true);
            }
            if(collectedTinman) {
              this.tinman.play('tinmanleft', true);
            }
        }
        else if(this.cursors.right.isDown){
          this.xoffset = -50;
          this.yoffset = 0;
            this.dorothy.play('dorothyright', true);
            this.direction.x = 1; 
            if(collectedLion) {
              this.lion.play('lionwalkright', true);
            }
            if(collectedTinman) {
              this.tinman.play('tinmanright', true);
            }
        }
        if(this.cursors.up.isDown){
          this.xoffset = 0;
          this.yoffset = 50;
            this.dorothy.play('dorothyback', true);
            if(collectedLion) {
              this.lion.play('lionwalkback', true);
            }
            if(collectedTinman) {
              this.tinman.play('tinmanback', true);
            }
            this.direction.y = -1; 
        }
        else if(this.cursors.down.isDown){
          this.dorothy.play('dorothyfront', true);
          this.xoffset = 0;
          this.yoffset = -50;
          if(collectedLion) {
            this.lion.play('lionwalkfront', true);
          }
          if(collectedTinman) {
            this.tinman.play('tinmanfront', true);
          }
            this.direction.y = 1; 
        }
        this.direction.normalize();
        this.dorothy.setVelocity(this.VEL * this.direction.x, this.VEL * this.direction.y);
        if(collectedLion){
            this.lion.x = this.dorothy.x+this.xoffset;
            this.lion.y = this.dorothy.y+this.yoffset; 
        }
        if(collectedScarecrow){
          this.scarecrow.x = this.dorothy.x+this.xoffset*2;
          this.scarecrow.y = this.dorothy.y+this.yoffset*2; 
        }
        if(collectedTinman){
          this.tinman.x = this.dorothy.x+this.xoffset*3;
          this.tinman.y = this.dorothy.y+this.yoffset*3; 
        }
        if(collectedScarecrow && collectedLion && collectedTinman){
          if(this.dorothy.y >= 1450 && this.dorothy.x >= 1450){
            this.scene.start("monkeyStartScene");
          }
        }
    }
}

function collectLion(dorothy, lion){
    collectedLion = true;
}

function collectScarecrow(dorothy, lion){
  collectedScarecrow = true;
}


function collectTinman(dorothy, lion){
  collectedTinman= true;
}