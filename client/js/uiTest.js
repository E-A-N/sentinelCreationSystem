var uiTest = {};
uiTest.preload = function(){
    uiTest.btnKey = "btn1";
    game.stage.backgroundColor = '#85b5e1';
    game.load.atlasJSONHash("ui", "assets/sprites/ui/spriteSheet.png", "assets/sprites/ui/references.json");
    game.load.atlasJSONHash("dCreate", "assets/sprites/sentinelParts/spriteSheet.png", "assets/sprites/sentinelParts/references.json");
};

uiTest.colors = {
    red: 0xe50505,
    blue: 0x065ce5,
    green: 0x26b203,
    yellow: 0xeae71e,
    orange: 0xe88504,
    purple: 0x93008c,
    grey: 0x777477,
    dark: 0x282828,
    light: 0xf2f2f2,
    babyBlue: 0x1be8d7,
};

uiTest.colorSelectionPanel = function(colors, leftSelect, rightSelect){};

uiTest.partSelectionPanel = function(ray, leftSelect, rightSelect){
    var current = 0;
    ray[0].visible = true;
    leftSelect.events.onInputDown.add(function(){
        ray[current].visible = false;
        var canMoveLeft = current > 0;
        current = canMoveLeft ? current - 1 : ray.length - 1;
        ray[current].visible = true;
    });

    rightSelect.events.onInputDown.add(function(){
        ray[current].visible = false;
        var canMoveRight = current < ray.length - 1;
        current = canMoveRight ? current + 1 : 0;
        ray[current].visible = true;
    });
};

uiTest.create = function() {

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
    var x = uiTest.panelBtn.x;
    var y = uiTest.panelBtn.y;

    var parts = uiTest.renderDroid(x, y, "$$0020.png", false);
    var colorIcons = uiTest.renderColorIcons(2, 50, uiTest.colors);
    uiTest.partSelectionPanel(parts, uiTest.upBtn, uiTest.downBtn);

};

uiTest.renderDroid = function(x, y, suffix, isVisible = true){

    var parts = [];

    //render parts as visible but none collidable objects
    uiTest.fSpike = game.add.image(x, y, "dCreate", "n9_farSpike" + suffix);
    uiTest.fLeg = game.add.image(x, y, "dCreate", "n8_farLeg"+ suffix);
    uiTest.fFoot = game.add.image(x, y, "dCreate", "n7_farFoot"+ suffix);
    uiTest.fAxel = game.add.image(x, y, "dCreate", "n6_farAxel"+ suffix);
    uiTest.cSpike = game.add.image(x, y, "dCreate", "n5_closeSpike"+ suffix);
    uiTest.cLeg = game.add.image(x, y, "dCreate", "n4_closeLeg"+ suffix);
    uiTest.cFoot = game.add.image(x, y, "dCreate", "n3_closeFoot"+ suffix);
    uiTest.cAxel = game.add.image(x, y, "dCreate", "n2_closeAxel"+ suffix);
    uiTest.eye = game.add.image(x, y, "dCreate", "n1_closeEyek"+ suffix);  //TODO: fix spelling error in sprite sheet asset

    uiTest.fSpike.visible = isVisible;
    uiTest.fLeg.visible = isVisible;
    uiTest.fFoot.visible = isVisible;
    uiTest.fAxel.visible = isVisible;
    uiTest.cSpike.visible = isVisible;
    uiTest.cLeg.visible = isVisible;
    uiTest.cFoot.visible = isVisible;
    uiTest.cAxel.visible = isVisible;
    uiTest.eye.visible = isVisible;

    parts.push(uiTest.fSpike);
    parts.push(uiTest.fLeg);
    parts.push(uiTest.fFoot);
    parts.push(uiTest.fAxel);
    parts.push(uiTest.cSpike);
    parts.push(uiTest.cLeg);
    parts.push(uiTest.cFoot);
    parts.push(uiTest.cAxel);
    parts.push(uiTest.eye);

    return parts;
}

uiTest.renderColorIcons = function(x,y,colors){
    var names = Object.keys(colors);
    var icons = [];
    var suffix = "$$0020.png";
    var offset = 50;
    icons = names.map(function(c, index){
        var iColor = game.add.image(x + (offset * index), y, "dCreate", "n2_closeAxel"+ suffix);
        iColor.x += iColor.width;
        iColor.tint = colors[c];
        console.log(c);
        return iColor
    });

    return icons
}

uiTest.update = function() {};
