const creationGuiConfig = {
    default:{},
    colorPanel:{},
    partsPanel:{}
};

creationGuiConfig.default.graphicSources = {
    renderSuffix: "$$0020.png",
    panelGraphic: "green_panel.png",
    upButtonIcon: "grey_arrowUpWhite.png",
    downButtonIcon: "grey_arrowDownWhite.png"
};

creationGuiConfig.colorPanel.main = {
    x: 475,
    y: 150,
    atlusKey: "ui",
    textureSrc: "green_panel.png",
    alpha: 0.5
};
creationGuiConfig.colorPanel.upButton = {
    x: creationGuiConfig.colorPanel.main.x + 50,
    y: creationGuiConfig.colorPanel.main.y - 50,
    atlusKey: "ui",
    textureSrc: "grey_arrowUpWhite.png"
};
creationGuiConfig.colorPanel.downButton = {
    x: creationGuiConfig.colorPanel.main.x + 50,
    y: creationGuiConfig.colorPanel.main.y + 150,
    atlusKey: "ui",
    textureSrc: "grey_arrowDownWhite.png"
};
creationGuiConfig.colorPanel.captionText = {
    text: "Material Color",
    font: {
        font: "14px Arial Black",
        fill: "white",
        stroke: "black",
        strokeThickness: 5
    },
    x: creationGuiConfig.colorPanel.main.x,
    y: creationGuiConfig.colorPanel.main.y - 25
}
creationGuiConfig.colorPanel.icons = {
    x: creationGuiConfig.colorPanel.main.x - 100,
    y: creationGuiConfig.colorPanel.main.y + 10,
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

creationGuiConfig.partsPanel.main = {
    x: 350,
    y: 150,
    atlusKey: "ui",
    textureSrc: "green_panel.png",
    alpha: 0.5
};
creationGuiConfig.partsPanel.upButton = {
    x: creationGuiConfig.partsPanel.main.x + 50,
    y: creationGuiConfig.partsPanel.main.y - 50,
    atlusKey: "ui",
    textureSrc: "grey_arrowUpWhite.png"
};
creationGuiConfig.partsPanel.downButton = {
    x: creationGuiConfig.partsPanel.main.x + 50,
    y: creationGuiConfig.partsPanel.main.y + 150,
    atlusKey: "ui",
    textureSrc: "grey_arrowDownWhite.png"
};
creationGuiConfig.partsPanel.captionText = {
    text: "Sentinel Part",
    font: {
        font: "14px Arial Black",
        fill: "white",
        stroke: "black",
        strokeThickness: 5
    },
    x: creationGuiConfig.partsPanel.main.x,
    y: creationGuiConfig.partsPanel.main.y - 25
}