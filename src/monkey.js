class Monkey extends Phaser.Scene {
    constructor() {
        super("monkeyScene");
        this.VEL = 100;
    }
  
    preload() {
        this.load.image('tilesetImage', 'assets/png/tileset.png');
        this.load.spritesheet('dorothy', 'assets/png/dorothy.png', {
            frameWidth: 16,
            frameHeight: 16
        })
        this.load.spritesheet('monkey', 'assets/png/monkey.png', {
            frameWidth: 48,
            frameHeight: 64
          })
        this.load.tilemapTiledJSON('tilemapJSON1', 'assets/monkey1.json');
    }
  
    create() {
        const map = this.add.tilemap('tilemapJSON1');
        const tileset = map.addTilesetImage('tileset', 'tilesetImage');
        const bgLayer = map.createLayer('Background', tileset, 0, 0);
        const treeLayer = map.createLayer('Trees', tileset, 0, 0);
        this.dorothy = this.physics.add.sprite(32, 32, 'dorothy', 0).setScale(1.5);
        this.dorothy.body.setCollideWorldBounds(true);
        this.cameras.main.setBounds(0,0,map.widthInPixels, map.heightInPixels);
        this.cameras.main.startFollow(this.dorothy, true, 0.5, 0.5);
        this.physics.world.bounds.setTo(0, 0, map.widthInPixels, map.heightInPixels);
        this.cursors = this.input.keyboard.createCursorKeys();
        treeLayer.setCollisionByProperty({ collides: true });
        this.physics.add.collider(this.dorothy, treeLayer);
        
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
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
          
        const monkeyAnimations = [
        {
            key: 'monkeyfront',
            frames: { start: 6, end: 8 }
        },
        {
            key: 'monkeyback',
            frames: { start: 0, end: 2 }
        },
        {
            key: 'monkeyright',
            frames: { start: 3, end: 5 }
        },
        {
            key: 'monkeyleft',
            frames: { start: 9, end: 11 }
        }
        ];
        createAnimations.call(this, 'monkey', monkeyAnimations);
        this.monkeys = this.physics.add.group();
        for (let i = 0; i < 10; i++) {
        const monkey = this.monkeys.create(100 + i * 50, 320, 'monkey', 3);
            monkey.setVelocityY(monkeySpeed*Math.random());
            monkey.play('monkeyfront');
        }
        this.dorothy.play('dorothyfront');
        this.physics.add.overlap(this.dorothy, this.monkeys, monkeyHit, null, this);
        /*
        let finder;
        finder = new EasyStar.js();
        let grid = [];
        for (let y = 0; y < map.height; y++) {
        let col = [];
        for (let x = 0; x < map.width; x++) {
            let tile = map.layers[0].data[y][x];
            col.push(tile.index);
        }
        grid.push(col);
        }
        finder.setGrid(grid);

        let tileset1 = map.tilesets[0];
        let properties = tileset1.tileProperties; // Corrected line
        let acceptableTiles = [];
        console.log(tileset1.total);
        for (let i = tileset1.firstgid - 1; i < tileset1.total; i++) {
            if (!properties[i].collide) {
                console.log("pushed tile");
                acceptableTiles.push(i + 1);
                if (properties[i].score) {
                    finder.setTileCost(i + 1, properties[i].score);
                }
            }
        }
        finder.setAcceptableTiles(acceptableTiles);*/
    }
  
    update(){
        if(Phaser.Input.Keyboard.JustDown(keyR)){ this.scene.start('witchStartScene')};
        this.monkeys.getChildren().forEach((monkey) => {
            //moveEnemy(monkey, this.dorothy.x, this.dorothy.y);
          });
        this.direction = new Phaser.Math.Vector2(0);
        if(this.cursors.left.isDown){
            this.dorothy.play('dorothyleft', true);
            this.monkeys.playAnimation('monkeyleft', true);
            this.direction.x = -1; 
        }
        else if(this.cursors.right.isDown){
            this.dorothy.play('dorothyright', true);
            this.monkeys.playAnimation('monkeyright', true);
            this.direction.x = 1; 
        }
        if(this.cursors.up.isDown){
            this.dorothy.play('dorothyback', true);
            this.monkeys.playAnimation('monkeyback', true);
            this.direction.y = -1; 
        }
        else if(this.cursors.down.isDown){
            this.dorothy.play('dorothyfront', true);
            this.monkeys.playAnimation('monkeyfront', true);
            this.direction.y = 1; 
        }
        this.direction.normalize();
        this.dorothy.setVelocity(this.VEL * this.direction.x, this.VEL * this.direction.y);
        this.monkeys.children.iterate(function (monkey) {
            if(monkey.y>1600){
                monkey.setVelocityY(-monkeySpeed*Math.random());
            }
            else if(monkey.y<0){
                monkey.setVelocityY(monkeySpeed*Math.random());
            }
        });
    }
}

function monkeyHit(dorothy, monkey){
   this.scene.start('witchStartScene')
}