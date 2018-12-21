let uiTest = {};

/**
    Current Droid Build contains all of the collected rendering information to
    display a users current N-Droid build.
    @global
*/
uiTest.customization = {
    build: {},
    color: 0xFFFFFF,
    part: null,
    storeSentinelPart: (part) => {
        uiTest.customization.part = part;
    },
    storePartColor: (color) => {
        uiTest.customization.color = color;
    },
    updatePreview: (model = uiTest.customization.build) => {
        for (let part in model){
            //Add new graphic effects to droid parts here
            model[part].src.tint = model[part].tint;
        }
    }
};
uiTest.preload = function(){
    uiTest.btnKey = "btn1";
    uiTest.customization.color = creationGuiConfig.default.graphicSources.colors["red"];
    uiTest.customization.part  = null;
    uiTest._sType  = "default";
    game.stage.backgroundColor = '#85b5e1';
    game.load.atlasJSONHash("ui", "assets/sprites/ui/spriteSheet.png", "assets/sprites/ui/references.json");
    game.load.atlasJSONHash("dCreate", "assets/sprites/sentinelParts/spriteSheet.png", "assets/sprites/sentinelParts/references.json");
};
uiTest.renderColorIcons = function(x, y, colors, isVisible = false){
    let names = Object.keys(colors);
    let icons = [];
    let suffix = "$$0020.png";

    icons = names.map(function(c, index){
        let iColor = game.add.sprite(x, y, "dCreate", "n2_closeAxel"+ suffix);
        iColor.x += iColor.width;
        iColor.tint = colors[c];
        iColor.visible = isVisible;
        iColor.inputEnabled = true;

        //Set UI Type so button can be clicked to set customization color dynamically
        iColor._uiType = "colorBtn";
        //iColor.input.enableDrag(true);
        iColor.events.onInputDown.add(function(){
            //uiTest.customization.part.tint = uiTest.customization.color;
            let name = uiTest.customization.part._name;
            uiTest.customization.build[name].tint = iColor.tint //
            uiTest.customization.updatePreview();
        }, iColor);
        return iColor
    });

    return icons
}
uiTest.colorSelectionPanel = function(colorCollection, leftSelect, rightSelect){
    let current = 0;
    colorCollection[0].visible = true;
    leftSelect.inputEnabled = true;
    rightSelect.inputEnabled = true;
    //TODO: create event emitter that updates the preview panel when a button is clicked
    leftSelect.events.onInputDown.add(function(){
        colorCollection[current].visible = false;
        let canMoveLeft = current > 0;
        current = canMoveLeft ? current - 1 : colorCollection.length - 1;
        colorCollection[current].visible = true;


        uiTest.customization.storePartColor(colorCollection[current].tint);
        uiTest.customization.updatePreview();
    });
    rightSelect.events.onInputDown.add(function(){
        colorCollection[current].visible = false;
        let canMoveRight = current < colorCollection.length - 1;
        current = canMoveRight ? current + 1 : 0;
        colorCollection[current].visible = true;

        uiTest.customization.storePartColor(colorCollection[current].tint);
        uiTest.customization.updatePreview();
    });
};
uiTest.partSelectionPanel = function(partCollection, leftSelect, rightSelect){
    let current = 0;
    partCollection[0].visible = true;
    leftSelect.inputEnabled = true;
    rightSelect.inputEnabled = true;
    leftSelect.events.onInputDown.add(function(){
        partCollection[current].visible = false;
        let canMoveLeft = current > 0;
        current = canMoveLeft ? current - 1 : partCollection.length - 1;
        partCollection[current].visible = true;
        uiTest.customization.storeSentinelPart(partCollection[current]);
        uiTest.customization.updatePreview();
    });
    rightSelect.events.onInputDown.add(function(){
        partCollection[current].visible = false;
        let canMoveRight = current < partCollection.length - 1;
        current = canMoveRight ? current + 1 : 0;
        partCollection[current].visible = true;
        uiTest.customization.storeSentinelPart(partCollection[current]);
        uiTest.customization.updatePreview();
    });
};
uiTest.renderDroid = function(x, y, suffix, isVisible = true){
    //Note: isVisible effects preview only because partSelection preview updates
    //every time it's button is pressed
    let parts = [];

    //render parts as visible but none collidable objects
    //TODO: add core uiTest.fCore = game.add.image(x, y, "dCreate", "n9_farCore" + suffix);
    let fSpike = game.add.image(x, y, "dCreate", "n9_farSpike" + suffix);
    let fLeg = game.add.image(x, y, "dCreate", "n8_farLeg"+ suffix);
    let fFoot = game.add.image(x, y, "dCreate", "n7_farFoot"+ suffix);
    let fAxel = game.add.image(x, y, "dCreate", "n6_farAxel"+ suffix);
    let cSpike = game.add.image(x, y, "dCreate", "n5_closeSpike"+ suffix);
    let cLeg = game.add.image(x, y, "dCreate", "n4_closeLeg"+ suffix);
    let cFoot = game.add.image(x, y, "dCreate", "n3_closeFoot"+ suffix);
    let cAxel = game.add.image(x, y, "dCreate", "n2_closeAxel"+ suffix);
    let eye = game.add.image(x, y, "dCreate", "n1_closeEyek"+ suffix);  //TODO: fix spelling error in sprite sheet asset

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
    uiTest.customization.part = fSpike;

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
    items.mainButton = game.add.sprite(...previewPanelData);
    items.mainButton.alpha = creationGuiConfig.previewPanel.main.alpha;

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

    //Build a default user N-droid build for user to see
    items.previewIcons.forEach(function(p){
        uiTest.customization.build[p._name] = {
            src: p,
            tint: p.tint
            //type: p_type,
        }
    });

    return items;
};

uiTest.create = function() {

    // uiTest.panelBtn.inputEnabled = true;
    // uiTest.panelBtn.input.enableDrag(true);

    let partsPanelItems = uiTest.createPartsPanelItems();
    let colorPanelItems = uiTest.createColorPanelItems();
    let previewPanelItems = uiTest.createPreviewPanelItems();

    uiTest.partSelectionPanel(partsPanelItems.partsIcons, partsPanelItems.upButton, partsPanelItems.downButton);
    uiTest.colorSelectionPanel(colorPanelItems.colorIcons, colorPanelItems.downButton, colorPanelItems.upButton);

};
uiTest.update = function() {};
