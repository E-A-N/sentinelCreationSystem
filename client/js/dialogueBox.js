const dialogue = {};

dialogue.onOpen = null;
dialogue.onClose = null;

options = {
    spriteKey : "ui",
    background: "backgroundSprite",
    closeButton: "closeButtonSprite",
    wordWrap: true,
    x: 0,
    y: 0
};

dialogue.init = (game, width, height, options) => {

    //setup background and close button functionaliity
    dialogue.game = game;
    dialogue.container   = game.add.group();
    dialogue.container.x = options.x || game.width /2;
    dialogue.container.y = options.y || game.height - height;
    dialogue.background  = game.add.sprite(0, 0, options.background);
    dialogue.closeButton = game.add.sprite(0, 0, options.closeButton);
    dialogue.wordWrap = options.wordWrap;
    dialogue.wrapWidth = width * 0.9;

    dialogue.background.width  = width;
    dialogue.background.height = height;

    dialogue.container.add(dialogue.background);
    dialogue.container.add(dialogue.closeButton);

    dialogue.closeButton.x = width/2 - dialogue.closeButton.width/2;
    dialogue.closeButton.y = height - dialogue.closeButton.height;
    dialogue.closeButton.inputEnabled = true;
    //onInputDown.add(this.testMessageBox,this);
    dialogue.closeButton.events.onInputDown.add( function(){
        dialogue.container.destroy();
    }, dialogue);

    return dialogue;
};

dialogue.displayMessage = (message, typewriter = false) => {
    dialogue.message = dialogue.game.add.text(0, 0, message);
    dialogue.message.wordWrap = dialogue.wordWrap;

    //position dialogue message in center of box
    dialogue.message.x = dialogue.background.width / 2 - dialogue.message.width /2;
    dialogue.message.y = dialogue.background.height / 2 - dialogue.message.height / 2;
};
