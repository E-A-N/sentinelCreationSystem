const dialogue = {};

options = {
    background: "backgroundSprite",
    closeButton: "closeButtonSprite",
    wordWrap: true,
}

dialogue.init = (game, width, height, options) => {

    //setup background and close button functionaliity
    dialogue.game = game;
    dialogue.container   = game.add.group();
    dialogue.background  = game.add.sprite(0, 0, options.background);
    dialouge.closeButton = game.add.sprite(0, 0, options.closeButton);
    dialouge.wordWrap = options.wordWrap;
    dialouge.wrapWidth = width * 0.9;

    dialouge.background.width  = width;
    dialouge.background.height = height;

    dialouge.container.add(dialouge.background);
    dialouge.container.add(dialouge.closeButton);

    dialouge.closeButton.x = width/2 - dialouge.closeButton.width/2;
    dialouge.closeButton.y = height - closeButton.height;
    dialouge.closeButton.inputEnabled = true;
    dialouge.closeButton.onInputDown.add( function(){
        dialouge.container.destroy();
    }, dialouge);

    return dialouge;
};

dialouge.displayMessage = (message, typewriter = false) => {
    dialouge.message = dialouge.game.add.text(0, 0, message);
    dialouge.message.wordWrap = dialouge.wordWrap;

    //position dialouge message in center of box
    dialouge.message.x = dialouge.background.width / 2 - dialouge.message.width /2;
    dialouge.message.y = dialouge.background.height / 2 - dialouge.message.height / 2;
};
