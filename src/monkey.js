class Monkey extends Phaser.Scene {
    constructor() {
        super("monkeyScene");
        this.VEL = 200;
    }
  
    preload() {
        //this.load.image('tilesetImage', 'assets/png/tileset.png');
        this.load.tilemapTiledJSON('tilemapJSON1', 'assets/monkey1.json');
    }
  
    create() {
        gamemusic = this.sound.add('gamemusic1');
        gamemusic.play({
            volume: 0.05,
            loop: true}   );
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
        this.monkeys = this.physics.add.group();
        for (let i = 0; i < 40; i++) {
        const monkey = this.monkeys.create(Math.random()*1500, Math.random()*1500 , 'monkey', 3);
            monkey.play('monkeyfront');
        }
        this.dorothy.play('dorothyfront');
        this.physics.add.overlap(this.dorothy, this.monkeys, monkeyHit, null, this);
        this.changeDirectionTimer = this.time.addEvent({
            delay: Phaser.Math.Between(100, 300),
            callback: changeDirection1,
            callbackScope: this,
            loop: true
          });
    }
  
    update(){
        //if(Phaser.Input.Keyboard.JustDown(keyR)){ this.scene.start('witchStartScene')}; //for debugging
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
        this.monkeys.getChildren().forEach(function(monkey) {
            if (monkey.x > 1500 || monkey.x < 0 || monkey.y > 1500 || monkey.y < 0) {
              monkey.x = Math.random()*1500;
              monkey.y = Math.random()*1500;
            }
        });
    }
}

function monkeyHit(dorothy, monkey){
   this.scene.start('witchStartScene')
}

function changeDirection1() {
    const randomAngle = Phaser.Math.FloatBetween(0, Math.PI * 2);
    const direction = new Phaser.Math.Vector2(Math.cos(randomAngle), Math.sin(randomAngle));
    direction.normalize();
    const randomIndex = Phaser.Math.Between(0, this.monkeys.getLength() - 1);
    const monkey = this.monkeys.getChildren()[randomIndex];
    if (direction.x < 0) {
      monkey.play('monkeyleft');
    } else if (direction.x > 0) {
      monkey.play('monkeyright');
    } else if (direction.y < 0) {
      monkey.play('monkeyback');
    } else if (direction.y > 0) {
      monkey.play('monkeyfront');
    }
    monkey.setVelocity(this.VEL * direction.x, this.VEL * direction.y);
}