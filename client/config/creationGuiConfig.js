const creationGuiConfig = {};

creationGuiConfig.colorPanel.main = {
    x: 450,
    y: 450,
    atlusKey: "ui",
    textureSrc: "green_panel.png"
};
creationGuiConfig.colorPanel.upBtn = {
    x: creationGuiConfig.colorPanel.main.x + 50,
    y: creationGuiConfig.colorPanel.main.y - 50,
    atlusKey: "ui",
    textureSrc: "grey_arrowUpWhite.png"
};
creationGuiConfig.colorPanel.downBtn = {
    x: creationGuiConfig.colorPanel.main.x + 50,
    y: creationGuiConfig.colorPanel.main.y + 150,
    atlusKey: "ui",
    textureSrc: "grey_arrowDownWhite.png"
};
creationGuiConfig.colorPanel.caption = {
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
