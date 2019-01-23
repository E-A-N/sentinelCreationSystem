/*
    NOTE: Make sure a bitmap font is loaded into game for typewriter to work correctly
        game.load.bitmapFont("fontKey", "graphicSourc.png", "fontSource.fnt");

        checkout: https://www.pentacom.jp/pentacom/bitfontmaker2/
        checkout: https://github.com/andryblack/fontbuilder for easy creating custom pixel
        checkout: https://convertio.co/ttf-bmp/
        checkout: https://fontforge.github.io/en-US/ convert ttf to bitmap (png/fnt)

        credit to https://github.com/netgfx/Phaser-typewriter for reference material

*/


const dialogue = {};

dialogue.onOpen  = null;
dialogue.onClose = null;
dialogue.onType  = null;
dialogue.isTypeing = false;

/*
optionsModel = {
    spriteKey : "ui",
    background: "backgroundSprite",
    closeButton: "closeButtonSprite",
    fontSize: 14,
    fontFamily: "chillerBlack",
    wordWrap: true,
    width: 600,
    height: 400,
    x: 0,
    y: 0
};
*/

dialogue.init = (game, options) => {

    //setup background and close button functionaliity
    dialogue.game = game;
    dialogue.container   = game.add.group();
    dialogue.container.x = options.x || game.width * 0.5 - (options.width * 0.5);
    dialogue.container.y = options.y || game.height - options.height;
    dialogue.background  = game.add.sprite(0, 0, options.spriteKey, options.background);
    dialogue.closeButton = game.add.sprite(0, 0, options.spriteKey, options.closeButton);
    dialogue.wordWrap = options.wordWrap;
    dialogue.wrapWidth = options.width * 0.9;
    dialogue.fontFamily = options.fontFamily;
    dialogue.fontSize   = options.fontSize;

    dialogue.background.width  = options.width;
    dialogue.background.height = options.height;

    dialogue.container.add(dialogue.background);
    dialogue.container.add(dialogue.closeButton);

    dialogue.closeButton.x = options.width/2 - dialogue.closeButton.width/2;
    dialogue.closeButton.y = options.height - (dialogue.closeButton.height + 10);
    dialogue.closeButton.inputEnabled = true;
    dialogue.closeButton.events.onInputDown.add( function(){
        dialogue.container.destroy();
    }, dialogue);

    dialogue.closeButton.tint = 0x000999;

    return dialogue;
};
dialogue.setPropertyChain = (property, value) => {
    dialogue[property] = value;
    return dialouge;
}
dialogue.displayMessage = (message, typewriter = false, call) => {
    if (dialogue.message){
        dialogue.message.destroy();
    };

    if (typewriter){
        dialogue.typewrite(message, call);
    }
    else {
        dialogue.message = dialogue.game.add.text(0, 0, message);
        dialogue.message.wordWrap = dialogue.wordWrap;
        dialogue.message.wordWrapWidth = dialogue.wrapWidth;

        //position dialogue message in center of box
        dialogue.message.x = (dialogue.background.width * 0.5) - (dialogue.message.width * 0.5);
        dialogue.message.y = (dialogue.background.height * 0.25) - (dialogue.message.height * 0.5);

        dialogue.container.add(dialogue.message);

        let doMessageAction = typeof call === "function";
        if (doMessageAction){
            call(dialogue.message, message);
        }
    }
    return dialogue;
};

dialogue.typewrite = (message, call) => {

    let fontFamily = dialogue.fontFamily;
    let fontSize   = dialogue.fontSize;
    let xPosition  = dialogue.background.width * 0.5;
    let yPosition  = dialogue.background.height * 0.25;
    let typedText  = game.add.bitmapText(xPosition, yPosition, fontFamily, message, fontSize);
    typedText.maxWidth = dialogue.wrapWidth;

    let amountOfChars = typedText.children.length;

    //Iterate through all of text and make invisible
    for (let i = 0; i < amountOfChars; i++){
        let letter = typedText.getChildAt(i);
        letter.alpha = 0;
    };

    //Tutorial resets position for some reason?? Find out why!
    typedText.x = (dialogue.background.width * 0.5) - (typedText.width * 0.5);
    typedText.y = dialogue.background.height * 0.05

    //calculate timing
    let currentChar = 0;
    let time = Phaser.Timer.SECOND * 0.01; //a millesecond;
    let timer = game.time.create(false);
    timer.start();
    dialogue.isTypeing = true;
    timer.repeat(time, amountOfChars, () => {
        //do onType function here
        let char = typedText.getChildAt(currentChar);
        char.alpha = 1;

        let doTypingAction = typeof call === "function";
        if (doTypingAction){
            call(dialogue.message, message);
        }
        currentChar++;
    });
    timer.onComplete.add(() => {
        dialogue.isTypeing = false;
        let doMessageAction = typeof call === "function";
        if (doMessageAction){
            call(dialogue.container, message);
        }
    });

    dialogue.message = typedText;
    dialogue.container.add(dialogue.message);

    return dialogue;
};
