var uiTest = {};
uiTest.preload = function(){
    uiTest.btnKey = "btn1";
    game.stage.backgroundColor = '#85b5e1';
    game.load.atlasJSONHash("ui", "assets/sprites/ui/spriteSheet.png", "assets/sprites/ui/references.json");
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

    uiTest.upBtn = game.add.sprite(100, 100, "ui", "grey_arrowUpWhite.png");
    uiTest.downBtn = game.add.sprite(100, 300,"ui", "grey_arrowDownWhite.png");
    uiTest.panelBtn = game.add.sprite(50, 150, "ui","green_panel.png");

    uiTest.upBtn.inputEnabled = true;
    uiTest.upBtn.input.enableDrag(true);
    uiTest.downBtn.inputEnabled = true;
    uiTest.downBtn.input.enableDrag(true);
    uiTest.panelBtn.inputEnabled = true;
    uiTest.panelBtn.input.enableDrag(true);

};

uiTest.update = function() {};
