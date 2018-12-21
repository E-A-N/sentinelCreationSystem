var uiTest = {};
uiTest.currentUserBuild = {
    "eye":{
        type: "default",
        src: {},
        tint: 0xFFFFFF
    }
}
uiTest.preload = function(){
    uiTest.btnKey = "btn1";
    uiTest._sColor = creationGuiConfig.default.graphicSources.colors["red"];
    uiTest._sPart  = null;
    uiTest._sType  = "default";
    // uiTest.preview = {
    //     x: 75,
    //     y: 150
    // };
    game.stage.backgroundColor = '#85b5e1';
    game.load.atlasJSONHash("ui", "assets/sprites/ui/spriteSheet.png", "assets/sprites/ui/references.json");
    game.load.atlasJSONHash("dCreate", "assets/sprites/sentinelParts/spriteSheet.png", "assets/sprites/sentinelParts/references.json");
};
uiTest.updatePreview = function(){
    var model = uiTest.currentUserBuild;
    for (var p in model){
        model[p].src.tint = model[p].tint;
        //console.log(p);
        //model[p].src.type = p.type;
    }

};
uiTest.renderColorIcons = function(x, y, colors, isVisible = false){
    var names = Object.keys(colors);
    var icons = [];
    var suffix = "$$0020.png";

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
            //uiTest._sPart.tint = uiTest._sColor;
            var name = uiTest._sPart._name;
            uiTest.currentUserBuild[name].tint = iColor.tint //
            uiTest.updatePreview();
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
    //TODO: create event emitter that updates the preview panel when a button is clicked
    leftSelect.events.onInputDown.add(function(){
        ray[current].visible = false;
        var canMoveLeft = current > 0;
        current = canMoveLeft ? current - 1 : ray.length - 1;
        ray[current].visible = true;

        //TODO: find a way to use the uiTest.colors object instead
        uiTest.storePartColor(ray[current].tint);
        uiTest.updatePreview();
    });
    rightSelect.events.onInputDown.add(function(){
        ray[current].visible = false;
        var canMoveRight = current < ray.length - 1;
        current = canMoveRight ? current + 1 : 0;
        ray[current].visible = true;

        //TODO: find a way to use the uiTest.colors object instead
        uiTest.storePartColor(ray[current].tint);
        //uiTest.updatePreview();
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
        uiTest.updatePreview();
    });
    rightSelect.events.onInputDown.add(function(){
        ray[current].visible = false;
        var canMoveRight = current < ray.length - 1;
        current = canMoveRight ? current + 1 : 0;
        ray[current].visible = true;
        uiTest.storeSentinelPart(ray[current]);
        uiTest.updatePreview();
    });
};

uiTest.renderDroid = function(x, y, suffix, isVisible = true){
    //Note: isVisible effects preview only because partSelection preview updates
    //every time it's button is pressed
    var parts = [];

    //render parts as visible but none collidable objects
    //TODO: add core uiTest.fCore = game.add.image(x, y, "dCreate", "n9_farCore" + suffix);
    var fSpike = game.add.image(x, y, "dCreate", "n9_farSpike" + suffix);
    var fLeg = game.add.image(x, y, "dCreate", "n8_farLeg"+ suffix);
    var fFoot = game.add.image(x, y, "dCreate", "n7_farFoot"+ suffix);
    var fAxel = game.add.image(x, y, "dCreate", "n6_farAxel"+ suffix);
    var cSpike = game.add.image(x, y, "dCreate", "n5_closeSpike"+ suffix);
    var cLeg = game.add.image(x, y, "dCreate", "n4_closeLeg"+ suffix);
    var cFoot = game.add.image(x, y, "dCreate", "n3_closeFoot"+ suffix);
    var cAxel = game.add.image(x, y, "dCreate", "n2_closeAxel"+ suffix);
    var eye = game.add.image(x, y, "dCreate", "n1_closeEyek"+ suffix);  //TODO: fix spelling error in sprite sheet asset

    fSpike._name = "fSpike";
    fLeg._name = "fLeg";
    fFoot._name = "fFoot";
    fAxel._name = "fAxel";
    cSpike._name = "cSpike";
    cLeg._name = "cLeg";
    cFoot._name = "cFoot";
    cAxel._name = "cAxel";
    eye._name = "eye";

    //Set Default UI Part to Color
    uiTest._sPart = fSpike;

    parts.push(fSpike);
    parts.push(fLeg);
    parts.push(fFoot);
    parts.push(fAxel);
    parts.push(cSpike);
    parts.push(cLeg);
    parts.push(cFoot);
    parts.push(cAxel);
    parts.push(eye);

    parts = parts.map(function(p){
        p.visible = isVisible;
        p._uiType = "droidPart"; //allows button to be interfaced with dynamically
        return p;
    });

    return parts;
}
uiTest.createPartsPanelItems = () => {
    const items = {}
    const partsPanelData = [
        creationGuiConfig.partsPanel.main.x,
        creationGuiConfig.partsPanel.main.y,
        creationGuiConfig.partsPanel.main.atlasKey,
        creationGuiConfig.partsPanel.main.textureSrc
    ];
    const partsPanelButton = game.add.sprite(...partsPanelData);
    partsPanelButton.alpha = creationGuiConfig.partsPanel.main.alpha;
    items.mainButton = partsPanelButton;

    const upButtonData = [
        creationGuiConfig.partsPanel.upButton.x,
        creationGuiConfig.partsPanel.upButton.y,
        creationGuiConfig.partsPanel.upButton.atlasKey,
        creationGuiConfig.partsPanel.upButton.textureSrc
    ];
    const upButton = game.add.sprite(...upButtonData);
    items.upButton = upButton;

    const downButtonData = [
        creationGuiConfig.partsPanel.downButton.x,
        creationGuiConfig.partsPanel.downButton.y,
        creationGuiConfig.partsPanel.downButton.atlasKey,
        creationGuiConfig.partsPanel.downButton.textureSrc
    ];
    const downButton = game.add.sprite(...downButtonData);
    items.downButton = downButton;

    const captionTextData = [
        creationGuiConfig.partsPanel.captionText.x,
        creationGuiConfig.partsPanel.captionText.y,
        creationGuiConfig.partsPanel.captionText.text,
        creationGuiConfig.partsPanel.captionText.font
    ];
    const captionText = game.add.text(...captionTextData);
    items.captionText = captionText;

    const partsIconsData = [
        creationGuiConfig.partsPanel.main.x,
        creationGuiConfig.partsPanel.main.y,
        creationGuiConfig.default.graphicSources.renderSuffix,
        false //?????
    ];
    const partsIcons = uiTest.renderDroid(...partsIconsData);
    items.partsIcons = partsIcons;

    return items;
};
uiTest.createColorPanelItems = () => {
    const items = {}
    const colorPanelData = [
        creationGuiConfig.colorPanel.main.x,
        creationGuiConfig.colorPanel.main.y,
        creationGuiConfig.colorPanel.main.atlasKey,
        creationGuiConfig.colorPanel.main.textureSrc
    ];
    const colorPanelButton = game.add.sprite(...colorPanelData);
    colorPanelButton.alpha = creationGuiConfig.colorPanel.main.alpha;
    items.mainButton = colorPanelButton;

    const upButtonData = [
        creationGuiConfig.colorPanel.upButton.x,
        creationGuiConfig.colorPanel.upButton.y,
        creationGuiConfig.colorPanel.upButton.atlasKey,
        creationGuiConfig.colorPanel.upButton.textureSrc
    ];
    const upButton = game.add.sprite(...upButtonData);
    items.upButton = upButton;

    const downButtonData = [
        creationGuiConfig.colorPanel.downButton.x,
        creationGuiConfig.colorPanel.downButton.y,
        creationGuiConfig.colorPanel.downButton.atlasKey,
        creationGuiConfig.colorPanel.downButton.textureSrc
    ];
    const downButton = game.add.sprite(...downButtonData);
    items.downButton = downButton;

    const captionTextData = [
        creationGuiConfig.colorPanel.captionText.x,
        creationGuiConfig.colorPanel.captionText.y,
        creationGuiConfig.colorPanel.captionText.text,
        creationGuiConfig.colorPanel.captionText.font
    ];
    const captionText = game.add.text(...captionTextData);
    items.captionText = captionText;

    const colorIconsData = [
        creationGuiConfig.colorPanel.icons.x,
        creationGuiConfig.colorPanel.icons.y,
        creationGuiConfig.colorPanel.icons.colors
    ];
    const colorIcons = uiTest.renderColorIcons(...colorIconsData);
    items.colorIcons = colorIcons;

    return items;
};
uiTest.createPreviewPanelItems = () => {
    const items = {}
    const previewPanelData = [
        creationGuiConfig.previewPanel.main.x,
        creationGuiConfig.previewPanel.main.y,
        creationGuiConfig.previewPanel.main.atlasKey,
        creationGuiConfig.previewPanel.main.textureSrc
    ];
    // items.mainButton = game.add.sprite(...previewPanelData);
    // items.mainButton.alpha = creationGuiConfig.previewPanel.main.alpha;

    const captionTextData = [
        creationGuiConfig.previewPanel.captionText.x,
        creationGuiConfig.previewPanel.captionText.y,
        creationGuiConfig.previewPanel.captionText.text,
        creationGuiConfig.previewPanel.captionText.font
    ];
    items.captionText = game.add.text(...captionTextData);

    const previewIconsData = [
        creationGuiConfig.previewPanel.main.x,
        creationGuiConfig.previewPanel.main.y,
        creationGuiConfig.default.graphicSources.renderSuffix,
        true
    ];
    items.previewIcons = uiTest.renderDroid(...previewIconsData);

    return items;
};
uiTest.create = function() {

    var panelLoc = "green_panel.png";
    var upLoc = "grey_arrowUpWhite.png";
    var downLoc = "grey_arrowDownWhite.png";
    var renderSuffix = "$$0020.png";  //NOTE future suffix ex: $Default$0020.png
    //TODO: think about WHEN the part type should be appended to source string



    // uiTest.panelBtn.inputEnabled = true;
    // uiTest.panelBtn.input.enableDrag(true);

    let partsPanelItems = uiTest.createPartsPanelItems();
    let colorPanelItems = uiTest.createColorPanelItems();
    let previewPanelItems = uiTest.createPreviewPanelItems();

    //Sentinel Preview(pr) UI
    //var prPanelBtn = game.add.sprite(uiTest.preview.x, uiTest.preview.y, "ui",panelLoc);
    //"parts" UI coordinates
    //var prx =  prPanelBtn.x;
    //var pry =  prPanelBtn.y;

    // var prUpBtn = game.add.sprite(prx + 50, pry - 50, "ui", upLoc);
    // var prDownBtn = game.add.sprite(prx + 50, pry + 150,"ui", downLoc);

    // var prCaptionText = "~Preview~";
    // var prCaptionFont = { font: "24px Arial Black", fill: "white" };
    // var prCaption = game.add.text(prx - 20, pry - 35, prCaptionText, prCaptionFont);
    // prCaption.stroke = "black";
    // prCaption.strokeThickness = 8;
    //
    //let previews = uiTest.renderDroid(prx, pry, renderSuffix, true);
    let previews = previewPanelItems.previewIcons
    previews.forEach(function(p){
        uiTest.currentUserBuild[p._name] = {
            src: p,
            tint: p.tint
            //type: p_type,
        }
    });

    uiTest.partSelectionPanel(partsPanelItems.partsIcons, partsPanelItems.upButton, partsPanelItems.downButton);
    uiTest.colorSelectionPanel(colorPanelItems.colorIcons, colorPanelItems.downButton, colorPanelItems.upButton);

};

uiTest.update = function() {};
