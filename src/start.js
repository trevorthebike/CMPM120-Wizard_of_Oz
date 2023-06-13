class Start extends Phaser.Scene {
    constructor() {
        super("startScene");
    }
  
    preload() {
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
        this.load.spritesheet('monkey', 'png/monkey.png', {
          frameWidth: 48,
          frameHeight: 64
        })
        this.load.spritesheet('witch', 'png/witch.png', {
            frameWidth: 24,
            frameHeight: 32
        })
        this.load.spritesheet('splash', 'png/splash.png', {
            frameWidth: 32,
            frameHeight: 32
        })
        this.load.image('scarecrow', 'png/ScareCrow.png');
        this.load.image('start', 'jpg/start1.jpg');
        this.load.image('waterbucket', 'png/waterbucket.png');
        this.load.audio('gamemusic1', "music.ogg");
        this.load.audio('witchmusic', "witch.ogg");
        this.load.audio('splashsound', "splash1.wav");
    }
  
    create() {
        let startimage = this.add.image( game.config.width/2, game.config.height/2, 'start');
        const centerX = this.cameras.main.width / 2;
        const centerY = this.cameras.main.height / 2;
        const container = this.add.container(centerX, centerY);
        const text = this.add.text(0, -20, "Using the arrow keys, guide Dorothy through the land of Oz, collecting characters along the yellow brick road and reaching the end to progress to the next level. Press F for fullscreen. Press R to move onto next scene.", textStyle);
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
        text.setOrigin(0.5);
        container.add(text);
        witchstopped = false;
        const scaleX = game.config.width / startimage.width;
        const scaleY = game.config.height / startimage.height;
        startimage.setScale(scaleX, scaleY);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        collectedTinman = false;
        collectedScarecrow = false;
        collectedLion = false;
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
            }
        );
        function createAnimations(spriteKey, animations, repeat) {
            animations.forEach(animation => {
              this.anims.create({
                key: animation.key,
                frameRate: 6,
                repeat: repeat,
                frames: this.anims.generateFrameNumbers(spriteKey, animation.frames)
              });
            });
        }
        const splashAnimations = [
        {
            key: 'splashAnim',
            frames: { start: 0, end: 3 }
        }
        ];
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
        const witchAnimations = [
            {
                key: 'witchfront',
                frames: { start: 6, end: 8 }
            },
            {
                key: 'witchback',
                frames: { start: 0, end: 2 }
            },
            {
                key: 'witchright',
                frames: { start: 3, end: 5 }
            },
            {
                key: 'witchleft',
                frames: { start: 9, end: 11 }
            }
            ];
        createAnimations.call(this, 'splash', splashAnimations, 2);
        createAnimations.call(this, 'lion', lionAnimations, -1);
        createAnimations.call(this, 'tinman', tinmanAnimations, -1);
        createAnimations.call(this, 'monkey', monkeyAnimations, -1);
        createAnimations.call(this,'witch', witchAnimations, -1);
    }
  
    update(){
      if(Phaser.Input.Keyboard.JustDown(keyR)){ this.scene.start('yellowScene')};
    }
  }
