var uiTest = {};
uiTest.preload = function(){
    uiTest.btnKey = "btn1";
    game.stage.backgroundColor = '#85b5e1';
    game.load.atlasJSONHash("ui", "assets/sprites/ui/spriteSheet.png", "assets/sprites/ui/references.json");
    game.load.atlasJSONHash("dCreate", "assets/sprites/sentinelParts/spriteSheet.png", "assets/sprites/sentinelParts/references.json");
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

    uiTest.panelBtn.events.onInputDown.add(function(){
        console.log("Dragging Panel!!!");
    });
    var dx = uiTest.panelBtn.x;
    var dy = uiTest.panelBtn.y;

    var sprSuffix = "$$0026.png"

    uiTest.fSpike = game.add.image(dx, dy, "dCreate", "n9_farSpike" + sprSuffix);
    uiTest.fLeg = game.add.image(dx, dy, "dCreate", "n8_farLeg"+ sprSuffix);
    uiTest.fFoot = game.add.image(dx, dy, "dCreate", "n7_farFoot"+ sprSuffix);
    uiTest.fAxel = game.add.image(dx, dy, "dCreate", "n6_farAxel"+ sprSuffix);
    uiTest.cSpike = game.add.image(dx, dy, "dCreate", "n5_closeSpike"+ sprSuffix);
    uiTest.cLeg = game.add.image(dx, dy, "dCreate", "n4_closeLeg"+ sprSuffix);
    uiTest.cFoot = game.add.image(dx, dy, "dCreate", "n3_closeFoot"+ sprSuffix);
    uiTest.cAxel = game.add.image(dx, dy, "dCreate", "n2_closeAxel"+ sprSuffix);
    uiTest.eye = game.add.image(dx, dy, "dCreate", "n1_closeEyek"+ sprSuffix);  //TODO: fix spelling error in sprite sheet asset

    //customize shit
    uiTest.cSpike.tint = 0xff0000;
    uiTest.cFoot.tint = 0xff0000;
};

uiTest.update = function() {};
