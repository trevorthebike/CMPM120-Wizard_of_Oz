class Witch extends Phaser.Scene {
    constructor() {
        super("witchScene");
        this.VEL = 100;
    }
  
    preload() {
        this.load.tilemapTiledJSON('tilemapJSON2', 'assets/witch.json');
    }
  
    create() {
        gamemusic = this.sound.add('witchmusic');
        gamemusic.play({
            volume: 0.05,
            loop: true}   );
        const map = this.add.tilemap('tilemapJSON2');
        const tileset = map.addTilesetImage('tileset', 'tilesetImage');
        const bgLayer = map.createLayer('Background', tileset, 0, 0);
        const treeLayer = map.createLayer('Trees', tileset, 0, 0);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        this.dorothy = this.physics.add.sprite(320, 320, 'dorothy', 0).setScale(1.5);
        this.dorothy.play('dorothyfront');
        this.dorothy.body.setCollideWorldBounds(true);
        this.cameras.main.setBounds(0,0,map.widthInPixels, map.heightInPixels);
        this.cameras.main.startFollow(this.dorothy, true, 0.5, 0.5);
        this.physics.world.bounds.setTo(0, 0, map.widthInPixels, map.heightInPixels);
        this.cursors = this.input.keyboard.createCursorKeys();
        treeLayer.setCollisionByProperty({ collides: true });
        this.physics.add.collider(this.dorothy, treeLayer);
        this.waterbucket = this.physics.add.sprite(250, 250, 'waterbucket').setScale(0.25);
        this.witch = this.physics.add.sprite(250, 250, 'witch', 0).setScale(1.5);
        this.witch.play('witchfront');
        this.physics.add.overlap(this.dorothy, this.witch, witchHit, null, this);
        this.changeDirectionTimer = this.time.addEvent({
            delay: Phaser.Math.Between(500, 1000), 
            callback: changeDirection,
            callbackScope: this,
            loop: true
          });
        const spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        spaceKey.on('down', () => {
            let splashsound = this.sound.add('splashsound');
            splashsound.play({
                volume: 0.5,
                loop: false}   );
            const playerPosition = new Phaser.Math.Vector2(this.dorothy.x, this.dorothy.y);
            const witchPosition = new Phaser.Math.Vector2(this.witch.x, this.witch.y);
            const distance = playerPosition.distance(witchPosition);
            if (distance <= 100) {
                if(collectedBucket){
                    handleSpellCast.call(this);
                }
            }
            else if(collectedBucket){
                this.waterbucket.setScale(2); 
                this.waterbucket.play('splashAnim');
                this.time.delayedCall(2000, () => {
                    this.waterbucket.setTexture('waterbucket'); 
                    this.waterbucket.scaleX = 1; 
                    this.waterbucket.scaleY = 1;
                }, [], this);
            }
        });
        collectedBucket = false;
        this.physics.add.overlap(this.dorothy, this.waterbucket, collectBucket, null, this);
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
        if(this.witch.x > 1500 || this.witch.x < 0){
            this.witch.x = 300;
        }
        if(this.witch.y > 1500 || this.witch.y < 0){
            this.witch.y = 300;
        }
        if(collectedBucket){
            this.waterbucket.x = this.dorothy.x+10;
            this.waterbucket.y = this.dorothy.y; 
        }
    }
}

function handleSpellCast() {
    witchstopped = true;
    console.log("Spell cast!");
    this.witch.play('splashAnim');
    this.time.delayedCall(1000, () => {
        this.scene.start('endScene');
      }, [], this);
    
  }

function witchHit(dorothy, monkey){
    this.dorothy.x -= 100;
    this.dorothy.y -= 100;
}

function collectBucket(dorothy, waterbucket){
    collectedBucket = true;
}

function changeDirection() {
    const randomAngle = Phaser.Math.FloatBetween(0, Math.PI * 2);
    this.direction.setTo(Math.cos(randomAngle), Math.sin(randomAngle));
    this.direction.normalize();
    if (this.direction.x < 0) {
        this.witch.play('witchleft');
        } else if (this.direction.x > 0) {
        this.witch.play('witchright');
        } else if (this.direction.y < 0) {
        this.witch.play('witchback');
        } else if (this.direction.y > 0) {
        this.witch.play('witchfront');
    }
    if(!witchstopped){
       this.witch.setVelocity(this.VEL * this.direction.x, this.VEL * this.direction.y);
    }
    if(witchstopped){
        this.witch.setVelocity(0,0);
    }
}