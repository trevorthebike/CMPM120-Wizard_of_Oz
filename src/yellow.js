class Yellow extends Phaser.Scene{
    constructor(){
        super({key: 'yellowScene'})
        this.VEL = 100;
    }

    preload(){
        this.load.path = './assets/';
        this.load.spritesheet('dorothy', 'png/dorothy.png', {
            frameWidth: 16,
            frameHeight: 16
        })
        this.load.spritesheet('lion', 'png/lion.png', {
          frameWidth: 64,
          frameHeight: 64
        })
        this.load.spritesheet('tinman', 'png/tinrobot.png', {
          frameWidth: 28,
          frameHeight: 36
        })
        this.load.image('scarecrow', 'png/ScareCrow.png');
        this.load.image('tilesetImage', 'png/tileset.png');
        this.load.tilemapTiledJSON('tilemapJSON', 'yellow.json');
    }

    create(){
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        const map = this.add.tilemap('tilemapJSON');
        const tileset = map.addTilesetImage('tileset', 'tilesetImage');
        const bgLayer = map.createLayer('Background', tileset, 0, 0);
        const treeLayer = map.createLayer('Trees', tileset, 0, 0);
        this.tinman = this.physics.add.sprite(320, 320, 'tinman', 0);
        this.scarecrow = this.physics.add.sprite(320, 32, 'scarecrow', 0);
        this.lion = this.physics.add.sprite(100, 320, 'lion', 4);
        this.dorothy = this.physics.add.sprite(32, 32, 'dorothy', 0).setScale(1.5);
        function createAnimations(spriteKey, animations) {
          animations.forEach(animation => {
            this.anims.create({
              key: animation.key,
              frameRate: 6,
              repeat: -1,
              frames: this.anims.generateFrameNumbers(spriteKey, animation.frames)
            });
          });
        }
        
        const lionAnimations = [
          {
            key: 'lionwalkfront',
            frames: { start: 6, end: 8 }
          },
          {
            key: 'lionwalkback',
            frames: { start: 0, end: 2 }
          },
          {
            key: 'lionwalkright',
            frames: { start: 3, end: 5 }
          },
          {
            key: 'lionwalkleft',
            frames: { start: 9, end: 11 }
          }
        ];
        createAnimations.call(this, 'lion', lionAnimations);
        const tinmanAnimations = [
          {
            key: 'tinmanfront',
            frames: { start: 0, end: 2 }
          },
          {
            key: 'tinmanback',
            frames: { start: 3, end: 5 }
          },
          {
            key: 'tinmanright',
            frames: { start: 6, end: 8 }
          },
          {
            key: 'tinmanleft',
            frames: { start: 9, end: 11 }
          }
        ];
        createAnimations.call(this, 'tinman', tinmanAnimations);
        this.anims.create({
          key: 'dorothyfront', 
          frameRate: 4,
          repeat: -1,
          frames: this.anims.generateFrameNumbers('dorothy', { frames: [0, 4, 8] })
        });
        this.anims.create({
          key: 'dorothyright', 
          frameRate: 4,
          repeat: -1,
          frames: this.anims.generateFrameNumbers('dorothy', { frames: [1, 5, 9] })
        });
        this.anims.create({
          key: 'dorothyback', 
          frameRate: 4,
          repeat: -1,
          frames: this.anims.generateFrameNumbers('dorothy', { frames: [2, 6, 10] })
        });
        this.anims.create({
          key: 'dorothyleft', 
          frameRate: 4,
          repeat: -1,
          frames: this.anims.generateFrameNumbers('dorothy', { frames: [3, 7, 11] })
        });
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
        /*let finder;
        finder = new EasyStar.js();
        let grid = [];
        let tile;
        for(let y = 0; y < map.height; y++){
          let col = [];
          for(let x = 0; x < map.width; x++){
            tile = map.getTileAt(x, y);
            col.push(tile.index); 
          }
          grid.push(col);
        }
        finder.setGrid(grid);
        let tileset1 = map.tilesets[0];
        let properties = tileset1.tileProperties;
        let acceptableTiles = [];
        console.log(tiles.total);
        for(let i = tileset.firstgid-1; i < tiles.total; i++){ 
          if (!properties[i].collide) {
            console.log("pushed tile");
            acceptableTiles.push(i+1);
            if(properties[i].score) {
              finder.setTileCost(i+1, properties[i].score);
            }
          }
        }
        finder.setAcceptableTiles(acceptableTiles);*/
    }

    update(){
        if(Phaser.Input.Keyboard.JustDown(keyR)){ this.scene.start('monkeyScene')};
        this.direction = new Phaser.Math.Vector2(0);
        if(this.cursors.left.isDown){
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
            this.lion.x = this.dorothy.x;
            this.lion.y = this.dorothy.y+100; 
        }
        if(collectedScarecrow){
          this.scarecrow.x = this.dorothy.x;
          this.scarecrow.y = this.dorothy.y+60; 
        }
        if(collectedTinman){
          this.tinman.x = this.dorothy.x;
          this.tinman.y = this.dorothy.y+30; 
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