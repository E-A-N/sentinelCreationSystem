function preload() {

    game.stage.backgroundColor = '#85b5e1';

    game.load.baseURL = 'http://examples.phaser.io/assets/';
    game.load.crossOrigin = 'anonymous';

    game.load.image('player', 'sprites/phaser-dude.png');
    game.load.image('platform', 'sprites/platform.png');

}

var player;
var platforms;
var cursors;
var jumpButton;
var leftBtn;
var rightBtn;

function create() {
    player = game.add.sprite(100, 200, 'player');
    var clickEv = function(spr){
        if (spr.name === "left"){
            player.tint = 0xFFFFFF;
        }
        else {
            player.tint = 0;
        }
    };
    var onOver = function(spr){
        spr.tint = 0xFFFFFF;
    }
    var onOut = function(spr){
        spr.tint = 0;
    }

    leftBtn = game.add.button(50, 200, 'player', clickEv, this);
    rightBtn = game.add.button(150, 200, 'player', clickEv, this);
    leftBtn.name = "left";
    rightBtn.name = "right";

    leftBtn.inputEnabled = true;
    rightBtn.inputEnabled = true;

    leftBtn.onInputOver.add(onOver, this);
    rightBtn.onInputOver.add(onOver, this);
    leftBtn.onInputOut.add(onOut, this);
    rightBtn.onInputOut.add(onOut, this);
    leftBtn.tint = 0;
    rightBtn.tint = 0;


    game.physics.arcade.enable(player);

    player.body.collideWorldBounds = true;
    player.body.gravity.y = 500;

    platforms = game.add.physicsGroup();

    platforms.create(500, 150, 'platform');
    platforms.create(-200, 300, 'platform');
    platforms.create(400, 450, 'platform');

    platforms.setAll('body.immovable', true);

    cursors = game.input.keyboard.createCursorKeys();
    jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

}

function update () {

    game.physics.arcade.collide(player, platforms);

    player.body.velocity.x = 0;

    if (cursors.left.isDown)
    {
        player.body.velocity.x = -250;
    }
    else if (cursors.right.isDown)
    {
        player.body.velocity.x = 250;
    }

    if (jumpButton.isDown && (player.body.onFloor() || player.body.touching.down))
    {
        player.body.velocity.y = -400;
    }
}
