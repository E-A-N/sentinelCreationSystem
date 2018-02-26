var uiTest = {};
uiTest.preload = function(){
    uiTest.btnKey = "btn1";
    game.stage.backgroundColor = '#85b5e1';
    game.load.atlasJSONHash(uiTest.btnKey, "assets/sprites/ui/spriteSheet.png", "assets/sprites/ui/references.json", "reen_boxTick.png");
};

uiTest.create = function() {

    var clickEv = function(spr){
        if (spr.name === "left"){
            //player.tint = 0xFFFFFF;
        }
        else {
            //player.tint = 0;
        }
    };
    var onOver = function(spr){
        spr.tint = 0xFFFFFF;
    };
    var onOut = function(spr){
        spr.tint = 0;
    };

    uiTest.leftBtn = game.add.button(50, 200, uiTest.btnKey, clickEv, this);


    leftBtn = uiTest.leftBtn;
    leftBtn.name = "left";
    leftBtn.inputEnabled = true;
    leftBtn.onInputOver.add(onOver, this);
    leftBtn.onInputOut.add(onOut, this);
    leftBtn.tint = 0;
};

uiTest.update = function() {};
