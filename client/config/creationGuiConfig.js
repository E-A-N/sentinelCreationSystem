const creation = {
    default:{},
    colorPanel:{},
    partsPanel:{},
    previewPanel:{}
};

creation.default.customizationModel = {
    "name":{
        type: "default",
        src: "",
        tint: 0xFFFFFF
    }
};
creation.default.parts = {
    //NOTE: n{number} refers to ideal rendering order
    farSpike:  "n9_farSpike",
    farLeg:    "n8_farLeg",
    farFoot:   "n7_farFoot",
    farAxel:   "n6_farAxel",
    closeSpike:"n5_closeSpike",
    closeLeg:  "n4_closeLeg",
    closeFoot: "n3_closeFoot",
    closeAxel: "n2_closeAxel",
    closeEyek: "n1_closeEyek", //remember to fix this spelling error in the texture packer
};
creation.default.graphicSources = {
    renderSuffix: "$$0020.png", //NOTE future suffix ex: $Default$0020.png
    atlasKey: "ui",
    panelGraphic: "green_panel.png",
    upButtonIcon: "grey_arrowUpWhite.png",
    downButtonIcon: "grey_arrowDownWhite.png",
    colors:{
        red: 0xe50505,
        blue: 0x065ce5,
        green: 0x26b203,
        yellow: 0xeae71e,
        orange: 0xe88504,
        purple: 0x93008c,
        grey: 0x777477,
        dark: 0x282828,
        light: 0xf2f2f2,
        babyBlue: 0x1be8d7
    }
};

creation.colorPanel.main = {
    x: 475,
    y: 150,
    atlasKey: creation.default.graphicSources.atlasKey,
    textureSrc: creation.default.graphicSources.panelGraphic,
    alpha: 0.5
};
creation.colorPanel.upButton = {
    x: creation.colorPanel.main.x + 50,
    y: creation.colorPanel.main.y - 50,
    atlasKey: creation.default.graphicSources.atlasKey,
    textureSrc: creation.default.graphicSources.upButtonIcon
};
creation.colorPanel.downButton = {
    x: creation.colorPanel.main.x + 50,
    y: creation.colorPanel.main.y + 150,
    atlasKey: creation.default.graphicSources.atlasKey,
    textureSrc: creation.default.graphicSources.downButtonIcon
};
creation.colorPanel.captionText = {
    text: "Material Color",
    font: {
        font: "14px Arial Black",
        fill: "white",
        stroke: "black",
        strokeThickness: 5
    },
    x: creation.colorPanel.main.x,
    y: creation.colorPanel.main.y - 25
}
creation.colorPanel.icons = {
    x: creation.colorPanel.main.x - 100,
    y: creation.colorPanel.main.y + 10,
    colors: {
        red: 0xe50505,
        blue: 0x065ce5,
        green: 0x26b203,
        yellow: 0xeae71e,
        orange: 0xe88504,
        purple: 0x93008c,
        grey: 0x777477,
        dark: 0x282828,
        light: 0xf2f2f2,
        babyBlue: 0x1be8d7
    }
};

creation.partsPanel.main = {
    x: 350,
    y: 150,
    atlasKey: creation.default.graphicSources.atlasKey,
    textureSrc: creation.default.graphicSources.panelGraphic,
    alpha: 0.5
};
creation.partsPanel.upButton = {
    x: creation.partsPanel.main.x + 50,
    y: creation.partsPanel.main.y - 50,
    atlasKey: creation.default.graphicSources.atlasKey,
    textureSrc: creation.default.graphicSources.upButtonIcon
};
creation.partsPanel.downButton = {
    x: creation.partsPanel.main.x + 50,
    y: creation.partsPanel.main.y + 150,
    atlasKey: creation.default.graphicSources.atlasKey,
    textureSrc: creation.default.graphicSources.downButtonIcon
};
creation.partsPanel.captionText = {
    text: "Sentinel Part",
    font: {
        font: "14px Arial Black",
        fill: "white",
        stroke: "black",
        strokeThickness: 5
    },
    x: creation.partsPanel.main.x,
    y: creation.partsPanel.main.y - 25
}

creation.previewPanel.main = {
    x: 75,
    y: 150,
    atlasKey: creation.default.graphicSources.atlasKey,
    textureSrc: creation.default.graphicSources.panelGraphic,
    alpha: 0.5
};
creation.previewPanel.captionText = {
    text: "~Preview~",
    font: {
        font: "24px Arial Black",
        fill: "white",
        stroke: "black",
        strokeThickness: 8
    },
    x: creation.previewPanel.main.x - 20,
    y: creation.previewPanel.main.y - 35
}
