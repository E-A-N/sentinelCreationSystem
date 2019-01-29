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
    uiTest.customization.color = creation.default.graphicSources.colors["red"];
    uiTest.customization.part  = null;
    uiTest._sType  = "default";
    game.stage.backgroundColor = '#85b5e1';
    game.load.atlasJSONHash("ui", "assets/sprites/ui/spriteSheet.png", "assets/sprites/ui/references.json");
    game.load.atlasJSONHash("dCreate", "assets/sprites/sentinelParts/spriteSheet.png", "assets/sprites/sentinelParts/references.json");
    game.load.bitmapFont("carrierCommand", "assets/font/carrierCommand.png", "assets/font/carrierCommand.xml")
};
uiTest.renderColorIcons = function(x, y, colors, isVisible = false){
    let names = Object.keys(colors);
    let icons = [];
    let suffix = "$$0020.png";

    icons = names.map(function(c, index){
        let shell = {};
        const iconTextData = [
            x + 135,
            y + 100,
            colors[c].text,
            creation.colorPanel.captionText.style
        ];
        iText = game.add.text(...iconTextData);

        const iconColorData = [
            x,
            y,
            "dCreate",
            "n2_closeAxel"+ suffix
        ];
        let iColor = game.add.sprite(...iconColorData);
        iColor.x += iColor.width;
        //iColor.tint = colors[c];
        iColor.tint = colors[c].value;
        iColor.inputEnabled = true;

        //Set UI Type so button can be clicked to set customization color dynamically
        iColor._uiType = "colorBtn";

        //iColor.input.enableDrag(true);
        iColor.events.onInputDown.add(function(){
            //Assign N-droid part to current icon color
            //uiTest.customization.part.tint = uiTest.customization.color;
            let name = uiTest.customization.part._name;
            uiTest.customization.build[name].tint = iColor.tint //
            uiTest.customization.updatePreview();
        }, iColor);

        iColor.visible = isVisible;
        iText.visible = isVisible;
        shell.icon = iColor;
        shell.text = iText;
        //return iColor
        return shell;
    });

    return icons;
}
uiTest.colorSelectionPanel = function(colorCollection, leftSelect, rightSelect){
    let current = 0;
    colorCollection[0].icon.visible = true;
    colorCollection[0].text.visible = true;
    leftSelect.inputEnabled = true;
    rightSelect.inputEnabled = true;
    //TODO: create event emitter that updates the preview panel when a button is clicked
    leftSelect.events.onInputDown.add(function(){
        colorCollection[current].icon.visible = false;
        colorCollection[current].text.visible = false;
        let canMoveLeft = current > 0;
        current = canMoveLeft ? current - 1 : colorCollection.length - 1;
        colorCollection[current].icon.visible = true;
        colorCollection[current].text.visible = true;


        uiTest.customization.storePartColor(colorCollection[current].icon.tint);
        uiTest.customization.updatePreview();
    });
    rightSelect.events.onInputDown.add(function(){
        colorCollection[current].icon.visible = false;
        colorCollection[current].text.visible = false;
        let canMoveRight = current < colorCollection.length - 1;
        current = canMoveRight ? current + 1 : 0;
        colorCollection[current].icon.visible = true;
        colorCollection[current].text.visible = true;

        uiTest.customization.storePartColor(colorCollection[current].icon.tint);
        uiTest.customization.updatePreview();
    });
};
uiTest.partSelectionPanel = function(partCollection, leftSelect, rightSelect){
    let current = 0;
    partCollection[0].visible = true;
    partCollection[0]._caption.visible = true;
    leftSelect.inputEnabled = true;
    rightSelect.inputEnabled = true;
    leftSelect.events.onInputDown.add(function(){
        partCollection[current].visible = false;
        partCollection[current]._caption.visible = false;
        let canMoveLeft = current > 0;
        current = canMoveLeft ? current - 1 : partCollection.length - 1;
        partCollection[current].visible = true;
        partCollection[current]._caption.visible = true;
        uiTest.customization.storeSentinelPart(partCollection[current]);
        uiTest.customization.updatePreview();
    });
    rightSelect.events.onInputDown.add(function(){
        partCollection[current].visible = false;
        partCollection[current]._caption.visible = false;
        let canMoveRight = current < partCollection.length - 1;
        current = canMoveRight ? current + 1 : 0;
        partCollection[current].visible = true;
        partCollection[current]._caption.visible = true;

        uiTest.customization.storeSentinelPart(partCollection[current]);
        uiTest.customization.updatePreview();
    });
};
uiTest.renderDroid = function(x, y, suffix, isVisible = true, context = 0){
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

    //eanDebug check to see if an optional callback would be better than checking for context
    switch (context) {
        case creation.default.render.context.parts:
            parts = uiTest.renderPartCaptions(parts);
        break;
    };

    parts = parts.map(function(p){
        p.visible = isVisible;
        p._uiType = "droidPart"; //allows button to be interfaced with dynamically
        return p;
    });

    return parts;
}
uiTest.renderPartCaptions = (parts) => {
    parts = parts.map ((part) => {
        let textData = [
            creation.partsPanel.captionText.partX,
            creation.partsPanel.captionText.partY,
            creation.partsPanel.captionText.captions[part._name],
            creation.colorPanel.captionText.style
        ];
        part._caption = game.add.text(...textData);
        part._caption.visible = false;

        return part;
    });

    return parts;
}
uiTest.createPartsPanelItems = () => {
    const items = {}
    const partsPanelData = [
        creation.partsPanel.main.x,
        creation.partsPanel.main.y,
        creation.partsPanel.main.atlasKey,
        creation.partsPanel.main.textureSrc
    ];
    const partsPanelButton = game.add.sprite(...partsPanelData);
    partsPanelButton.alpha = creation.partsPanel.main.alpha;
    items.mainButton = partsPanelButton;

    const upButtonData = [
        creation.partsPanel.upButton.x,
        creation.partsPanel.upButton.y,
        creation.partsPanel.upButton.atlasKey,
        creation.partsPanel.upButton.textureSrc
    ];
    const upButton = game.add.sprite(...upButtonData);
    items.upButton = upButton;

    const downButtonData = [
        creation.partsPanel.downButton.x,
        creation.partsPanel.downButton.y,
        creation.partsPanel.downButton.atlasKey,
        creation.partsPanel.downButton.textureSrc
    ];
    const downButton = game.add.sprite(...downButtonData);
    items.downButton = downButton;

    const captionTextData = [
        creation.partsPanel.captionText.x,
        creation.partsPanel.captionText.y,
        creation.partsPanel.captionText.text,
        creation.partsPanel.captionText.style
    ];
    const captionText = game.add.text(...captionTextData);
    items.captionText = captionText;

    const partsIconsData = [
        creation.partsPanel.main.x,
        creation.partsPanel.main.y,
        creation.default.graphicSources.renderSuffix,
        false, //is visible
        creation.default.render.context.parts
    ];
    const partsIcons = uiTest.renderDroid(...partsIconsData);
    //add
    items.partsIcons = partsIcons;

    return items;
};
uiTest.createColorPanelItems = () => {
    const items = {}
    const colorPanelData = [
        creation.colorPanel.main.x,
        creation.colorPanel.main.y,
        creation.colorPanel.main.atlasKey,
        creation.colorPanel.main.textureSrc
    ];
    const colorPanelButton = game.add.sprite(...colorPanelData);
    colorPanelButton.alpha = creation.colorPanel.main.alpha;
    items.mainButton = colorPanelButton;

    const upButtonData = [
        creation.colorPanel.upButton.x,
        creation.colorPanel.upButton.y,
        creation.colorPanel.upButton.atlasKey,
        creation.colorPanel.upButton.textureSrc
    ];
    const upButton = game.add.sprite(...upButtonData);
    items.upButton = upButton;

    const downButtonData = [
        creation.colorPanel.downButton.x,
        creation.colorPanel.downButton.y,
        creation.colorPanel.downButton.atlasKey,
        creation.colorPanel.downButton.textureSrc
    ];
    const downButton = game.add.sprite(...downButtonData);
    items.downButton = downButton;

    const captionTextData = [
        creation.colorPanel.captionText.x,
        creation.colorPanel.captionText.y,
        creation.colorPanel.captionText.text,
        creation.colorPanel.captionText.style
    ];
    const captionText = game.add.text(...captionTextData);
    items.captionText = captionText;

    const colorIconsData = [
        creation.colorPanel.icons.x,
        creation.colorPanel.icons.y,
        creation.colorPanel.icons.colors
    ];
    const colorIcons = uiTest.renderColorIcons(...colorIconsData);
    items.colorIcons = colorIcons;

    return items;
};
uiTest.createPreviewPanelItems = () => {
    const items = {}
    const previewPanelData = [
        creation.previewPanel.main.x,
        creation.previewPanel.main.y,
        creation.previewPanel.main.atlasKey,
        creation.previewPanel.main.textureSrc
    ];
    items.mainButton = game.add.sprite(...previewPanelData);
    items.mainButton.alpha = creation.previewPanel.main.alpha;

    const captionTextData = [
        creation.previewPanel.captionText.x,
        creation.previewPanel.captionText.y,
        creation.previewPanel.captionText.text,
        creation.previewPanel.captionText.style
    ];
    items.captionText = game.add.text(...captionTextData);

    const previewIconsData = [
        creation.previewPanel.main.x,
        creation.previewPanel.main.y,
        creation.default.graphicSources.renderSuffix,
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

    const dOpts = {
        spriteKey: creation.previewPanel.main.atlasKey,
        background: creation.default.graphicSources.panelGraphic,
        closeButton: creation.default.graphicSources.panelGraphic,
        fontFamily: creation.default.graphicSources.bitmapFont,
        fontSize: 10,
        typeDelay: 0.04,
        width: 500,
        height: 200,
        wordWrap: true,
    };

    let msg = "This is an extended message in which I'm using to test word wrap. Yes, word wrap! Hopefully in the future we can make a really cool story driven web game with high replayability!! This next sentence is just to see how far things can go, how far we can push the limits!!!! Apparently the limits to this text ability is astounding, there seems to be none at all!!";

    let msgBox = dialogue
        .init(game, dOpts)
        .displayMessage(msg, true, () => {
            console.log("The message is finished typing!");
        })
        .displayMessage("Frosty", false, () => {
            console.log("The message is finished typing!");
        });

};
uiTest.update = function() {};
