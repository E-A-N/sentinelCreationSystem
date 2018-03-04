var uiTest = {};
uiTest.preload = function(){
    uiTest.btnKey = "btn1";
    uiTest._sColor = uiTest.colors["light"];
    uiTest._sPart  = null;
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
            uiTest._sPart.tint = uiTest._sColor;
        }, iColor);
        return iColor
    });

    return icons
}
uiTest.storePartColor = function(color){
    uiTest._sColor = color;
}
uiTest.colorSelectionPanel = function(ray, leftSelect, rightSelect){
    var current = 0;
    ray[0].visible = true;
    leftSelect.inputEnabled = true;
    rightSelect.inputEnabled = true;
    leftSelect.events.onInputDown.add(function(){
        ray[current].visible = false;
        var canMoveLeft = current > 0;
        current = canMoveLeft ? current - 1 : ray.length - 1;
        ray[current].visible = true;

        //TODO: find a way to use the uiTest.colors object instead
        uiTest.storePartColor(ray[current].tint);
    });
    rightSelect.events.onInputDown.add(function(){
        ray[current].visible = false;
        var canMoveRight = current < ray.length - 1;
        current = canMoveRight ? current + 1 : 0;
        ray[current].visible = true;

        //TODO: find a way to use the uiTest.colors object instead
        uiTest.storePartColor(ray[current].tint);
    });
};
uiTest.storeSentinelPart = function(part){
    uiTest._sPart = part;
};
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
        uiTest.storeSentinelPart(ray[current]);
    });
    rightSelect.events.onInputDown.add(function(){
        ray[current].visible = false;
        var canMoveRight = current < ray.length - 1;
        current = canMoveRight ? current + 1 : 0;
        ray[current].visible = true;
        uiTest.storeSentinelPart(ray[current]);
    });
};

uiTest.create = function() {

    var panelLoc = "green_panel.png";
    var upLoc = "grey_arrowUpWhite.png";
    var downLoc = "grey_arrowDownWhite.png";

    //Sentinel Part(pt) UI
    var ptPanelBtn = game.add.sprite(325, 150, "ui",panelLoc);
    //"parts" UI coordinates
    var px =  ptPanelBtn.x;
    var py =  ptPanelBtn.y;

    var ptUpBtn = game.add.sprite(px + 50, py - 50, "ui", upLoc);
    var ptDownBtn = game.add.sprite(px + 50, py + 150,"ui", downLoc);



    var ptCaptionText = "Sentinel Part";
    var ptCaptionFont = { font: "14px Arial Black", fill: "white" };
    var ptCaption = game.add.text(px, py - 25, ptCaptionText, ptCaptionFont);
    ptCaption.stroke = "black";
    ptCaption.strokeThickness = 5;

    // uiTest.panelBtn.inputEnabled = true;
    // uiTest.panelBtn.input.enableDrag(true);

    var cPanelBtn = game.add.sprite(450, 150, "ui",panelLoc);
    cPanelBtn.alpha = 0.5;
    var cUpBtn = game.add.sprite(cPanelBtn.x + 50, cPanelBtn.y - 50, "ui", upLoc);
    var cDownBtn = game.add.sprite(cPanelBtn.x + 50, cPanelBtn.y + 150,"ui", downLoc);

    //color UI coordinates
    var cx = cPanelBtn.x;
    var cy = cPanelBtn.y;

    var cCaptionText = "Material Color";
    var cCaptionFont = { font: "14px Arial Black", fill: "white" };
    var cCaption = game.add.text(cx, cy - 25, cCaptionText, cCaptionFont);
    cCaption.stroke = "black";
    cCaption.strokeThickness = 5;

    //Sentinel Preview(pr) UI
    var prPanelBtn = game.add.sprite(75, 150, "ui",panelLoc);
    //"parts" UI coordinates
    var prx =  prPanelBtn.x;
    var pry =  prPanelBtn.y;

    // var prUpBtn = game.add.sprite(prx + 50, pry - 50, "ui", upLoc);
    // var prDownBtn = game.add.sprite(prx + 50, pry + 150,"ui", downLoc);


    var prCaptionText = "~Preview~";
    var prCaptionFont = { font: "24px Arial Black", fill: "white" };
    var prCaption = game.add.text(prx - 20, pry - 35, prCaptionText, prCaptionFont);
    prCaption.stroke = "black";
    prCaption.strokeThickness = 8;

    var parts = uiTest.renderDroid(px , py, "$$0020.png", false);
    var colorIcons = uiTest.renderColorIcons(cx - 100, cy + 10, uiTest.colors);
    uiTest.partSelectionPanel(parts, ptUpBtn, ptDownBtn);
    uiTest.colorSelectionPanel(colorIcons, cUpBtn, cDownBtn);

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

    //Set Default UI Part to Color
    uiTest._sPart = uiTest.fSpike;

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
        p._uiType = "droidPart"; //allows button to be interfaced with dynamically
        return p;
    });

    return parts;
}

uiTest.update = function() {};
