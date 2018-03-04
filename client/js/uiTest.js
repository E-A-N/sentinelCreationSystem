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

uiTest.renderColorIcons = function(x, y, colors, isVisible = false){
    var names = Object.keys(colors);
    var icons = [];
    var suffix = "$$0020.png";

    var clickEv = function(spr){
        conosle.log(spr.tint);
    };
    icons = names.map(function(c, index){
        var iColor = game.add.sprite(x, y, "dCreate", "n2_closeAxel"+ suffix);
        iColor.x += iColor.width;
        iColor.tint = colors[c];
        iColor.visible = isVisible;
        iColor.inputEnabled = true;

        //Set UI Type so button can be interfaced with dynamically
        iColor._uiType = "colorBtn";
        //iColor.input.enableDrag(true);
        iColor.events.onInputDown.add(function(){
            console.log(this.tint);
            console.log("clicked!!");
        }, iColor);
        console.log(c);
        return iColor
    });

    return icons
}
uiTest.colorSelectionPanel = function(colors, leftSelect, rightSelect){};

uiTest.partSelectionPanel = function(ray, leftSelect, rightSelect){
    var current = 0;
    ray[0].visible = true;
    leftSelect.inputEnabled = true;
    rightSelect.inputEnabled = true;
    leftSelect.events.onInputDown.add(function(){
        ray[current].visible = false;
        var canMoveLeft = current > 0;
        current = canMoveLeft ? current - 1 : ray.length - 1;
        ray[current].visible = true;
        console.log("An up Button has been clicked!");
    });

    rightSelect.events.onInputDown.add(function(){
        ray[current].visible = false;
        var canMoveRight = current < ray.length - 1;
        current = canMoveRight ? current + 1 : 0;
        ray[current].visible = true;
        console.log("A down Button has been clicked!");
    });
};

uiTest.create = function() {

    //Sentinel Part(pt) UI
    var ptUpBtn = game.add.sprite(100, 100, "ui", "grey_arrowUpWhite.png");
    var ptDownBtn = game.add.sprite(100, 300,"ui", "grey_arrowDownWhite.png");
    var ptPanelBtn = game.add.sprite(50, 150, "ui","green_panel.png");

    //"parts" UI coordinates
    var px =  ptPanelBtn.x;
    var py =  ptPanelBtn.y;

    var ptCaptionText = "Sentinel Part";
    var ptCaptionFont = { font: "14px Arial Black", fill: "white" };
    var ptCaption = game.add.text(px, py - 25, ptCaptionText, ptCaptionFont);
    ptCaption.stroke = "black";
    ptCaption.strokeThickness = 5;

    // uiTest.panelBtn.inputEnabled = true;
    // uiTest.panelBtn.input.enableDrag(true);

    var cPanelBtn = game.add.sprite(200, 150, "ui","green_panel.png");
    cPanelBtn.alpha = 0.5;
    var cUpBtn = game.add.sprite(cPanelBtn.x + 50, cPanelBtn.y - 50, "ui", "grey_arrowUpWhite.png");
    var cDownBtn = game.add.sprite(cPanelBtn.x + 50, cPanelBtn.y + 150,"ui", "grey_arrowDownWhite.png");

    //color UI coordinates
    var cx = cPanelBtn.x;
    var cy = cPanelBtn.y;

    var cCaptionText = "Choose Color";
    var cCaptionFont = { font: "14px Arial Black", fill: "white" };
    var cCaption = game.add.text(cx, cy - 25, cCaptionText, cCaptionFont);
    cCaption.stroke = "black";
    cCaption.strokeThickness = 5;


    var parts = uiTest.renderDroid(px , py, "$$0020.png", false);
    var colorIcons = uiTest.renderColorIcons(cx - 100, cy + 10, uiTest.colors);
    uiTest.partSelectionPanel(parts, ptUpBtn, ptDownBtn);
    uiTest.partSelectionPanel(colorIcons, cUpBtn, cDownBtn);

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

    parts.push(uiTest.fSpike);
    parts.push(uiTest.fLeg);
    parts.push(uiTest.fFoot);
    parts.push(uiTest.fAxel);
    parts.push(uiTest.cSpike);
    parts.push(uiTest.cLeg);
    parts.push(uiTest.cFoot);
    parts.push(uiTest.cAxel);
    parts.push(uiTest.eye);

    parts = parts.map(function(p){
        p.visible = isVisible;
        p._uiType = "droidPart"; //allows button can be interfaced with dynamically
        return p;
    });

    return parts;
}

uiTest.update = function() {};
