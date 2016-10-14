// We create our only state
var mainState = {
    // Here we add all the functions we need for our state
    // For this project we will just have 3
    preload: function () {
        // This function will be executed at the beginning
        // That's where we load the game's assets
        // Load the image
        game.load.image("unicorn","unicorn.png");
        game.load.image("sparkles","sparkles.png");
    }
    , create: function () {
        // This function is called after the 'preload' function 
        // Here we set up the game, display sprites, etc.
        this.keyboard = 
            game.input.keyboard.createCursorKeys();
        
        this.player = game.add.sprite(200,200,"unicorn")
        this.player.scale.setTo(1,1);
        
        this.sparkles = game.add.group();
        this.sparkles.enableBody = true;
        this.sparkles.createMultiple(50,"sparkles");
        
       
        game.physics.arcade.enable(this.player);
        this.player.body.gravity.y = 400;
        this.player.body.collideWorldBounds = true;
       game.time.events.loop(220, this.addSparkles,this);
        
    }
    , update: function () {
        this.player.body.velocity.x = 0;
        
        if(this.keyboard.right.isDown){
            
            this.player.body.velocity.x = 500;
        }else if(this.keyboard.left.isDown) {
            this.player.body.velocity.x = -500;
             }
        
          if(this.keyboard.up.isDown){
              
              this.player.body.velocity.y = -500;
          }
       
        // This contains Game Logic 
        }
    
    , addSparkles: function(){
            var sparkles = this.sparkles.getFirstDead();
        if(!sparkles) {
            return;
        }
        sparkles.scale.setTo(.75,.75);
        sparkles.anchor.setTo(.5,1);
        sparkles.reset(game.rnd.pick([game.width/2,0]),0);
        sparkles.body.gravity.y = 500;
        sparkles.body.velocity.x = 150 *
        game.rnd.pick([-2, 2]);
        sparkles.body.bounce.x = 1;
        sparkles.checkWorldBounds = true;
        sparkles.outOfBoundsKill = true;
    }
};
// We initialize Phaser
var game = new Phaser.Game(800, 800, Phaser.AUTO, '');
// And we tell Phaser to add and start our 'main' state
game.state.add('main', mainState);
game.state.start('main');