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
    dialogue.background  = game.add.sprite(0, 0, options.spriteKey, options.background);
    dialogue.closeButton = game.add.sprite(0, 0, options.spriteKey, options.closeButton);
    dialogue.wordWrap = options.wordWrap;
    dialogue.wrapWidth = width * 0.9;

    dialogue.background.width  = width;
    dialogue.background.height = height;

    dialogue.container.add(dialogue.background);
    dialogue.container.add(dialogue.closeButton);

    dialogue.closeButton.x = width/2 - dialogue.closeButton.width/2;
    dialogue.closeButton.y = height - (dialogue.closeButton.height + 25);
    dialogue.closeButton.inputEnabled = true;
    dialogue.closeButton.events.onInputDown.add( function(){
        dialogue.container.destroy();
    }, dialogue);

    dialogue.closeButton.tint = 0x000999;

    return dialogue;
};

dialogue.displayMessage = (message, typewriter = false) => {
    if (dialogue.message){
        dialogue.message.destroy();
    }
    dialogue.message = dialogue.game.add.text(0, 0, message);
    dialogue.message.wordWrap = dialogue.wordWrap;
    dialogue.message.wordWrapWidth = dialogue.wrapWidth;

    //position dialogue message in center of box
    dialogue.message.x = (dialogue.background.width * 0.5) - (dialogue.message.width * 0.5);
    dialogue.message.y = (dialogue.background.height * 0.25) - (dialogue.message.height * 0.5);

    dialogue.container.add(dialogue.message);

    return dialogue;
};
