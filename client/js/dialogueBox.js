/*
    NOTE: This module on works with bitmap fonts!
    game.load.bitmapFont("fontKey", "graphicSourc.png", "fontSource.fnt");

    checkout: https://www.pentacom.jp/pentacom/bitfontmaker2/
    checkout: https://github.com/andryblack/fontbuilder for easy creating custom pixel
    checkout: https://convertio.co/ttf-bmp/
    checkout: https://fontforge.github.io/en-US/ convert ttf to bitmap (png/fnt)
    checkout: https://github.com/photonstorm/phaser-examples/tree/master/examples/assets/fonts/bitmapFonts
    credit to https://github.com/netgfx/Phaser-typewriter for reference material

*/

const PhaserDialogue = () => {
    let box = {};
    box.onOpen  = null;
    box.onClose = null;
    box.postMessageAction  = null;
    box.onType  = null;
    box.isTypeing = false;
    box.currentImages = [];

    /*
    imageModel = {
        x: 0,
        y: 0,
        key: "phaserSprite",
        onType: () => {console.log("hi")},
        preMessage: null,
        postMessageAction: () => {console.log("goodbye")}
    }
    */

    /*
    optionsModel = {
        spriteKey : "ui",
        background: "backgroundSprite",
        closeButton: "closeButtonSprite",
        fontSize: 14,
        fontFamily: "chillerBlack",
        wordWrap: true,
        typeDelay: 0.01,
        width: 600,
        height: 400,
        x: 0,
        y: 0
    };
    */

    box.init = (game, options) => {

        //setup background and close button functionaliity
        box.game = game;
        box.container   = game.add.group();
        box.container.x = options.x || game.width * 0.5 - (options.width * 0.5);
        box.container.y = options.y || game.height - options.height;
        box.initGuiSprites(options);
        box.wordWrap = options.wordWrap;
        box.messageWidthOffset = options.messageWidthOffset || 0;
        box.messageXOffset = options.messageXOffset || 0;
        box.messageYOffset = options.messageYOffset || 0;
        box.wrapWidth = (options.width * 0.9) - box.messageWidthOffset;
        box.typeDelay = options.typeDelay || 0.01;
        box.fontFamily = options.fontFamily;
        box.fontSize   = options.fontSize;

        box._isTypeing = false;
        box._que = [];
        box._autoTime = false;

        box.background.width  = options.width;
        box.background.height = options.height;
        box.background.inputEnabled = true;

        box.container.add(box.background);
        box.container.add(box.closeButton);

        box.closeButton.width  = 50;
        box.closeButton.height = 50;
        box.closeButton.x = options.width/2 - box.closeButton.width/2;
        box.closeButton.y = options.height - (box.closeButton.height + 10);
        box.closeButton.alpha = 0;
        box.closeButton.events.onInputDown.add(box.close, box);

        box.closeButton.tint = 0x000999;

        box.container.inputEnableChildren = true;
        box.container.onChildInputDown.add(box.userInput, box);

        return box;
    };
    box.initGuiSprites = (options) => {
        //init gui background
        if ( options.spriteKey && options.background){
            box.background  = game.add.sprite(0, 0, options.spriteKey, options.background);
        }
        else if (options.background){
            box.background  = game.add.sprite(0, 0, options.background);
        }
        else {
            box.background = null;
        }

        //init gui close button
        if (options.spriteKey && options.closeButton){
            box.closeButton = game.add.sprite(0, 0, options.spriteKey, options.closeButton);
        }
        else if (options.closeButton){
            box.closeButton = game.add.sprite(0, 0, options.closeButton);
        }
        else {
            box.closeButton = null;
        }   
    };
    box.generateBackground = (width, height) => {
        let graphics = box.game.add.graphics(0,0);
        graphics.beginFill(0xffffff);
        graphics.lineStyle(4, 0xfd02eb, 1);

        graphics.moveTo(0, 0);
        graphics.lineTo(width, 0);
        graphics.lineTo(width, height);
        graphics.lineTo(0,height);
        graphics.lineTo(0,0);
        graphics.endFill();
        
        return graphics;
    }
    box.setPropertyChain = (property, value) => {
        box[property] = value;
        return dialouge;
    };
    box.setOnTypeCallback = (target, fun) => {
        target.onType = () => {
            fun(target);
        };

        return box;
    };
    box.setPostMessageActionCallback = (target, fun) => {
        target.postMessageAction = () => {
            fun(target);
        };

        return box;
    };
    box.setOnPreMessageCallback = (target, fun) => {
        target.preMessage = () => {
            fun(target);
        };

        return box
    }
    box.setOnCloseCallback = (fun) => {
        box.onClose= fun;

        return box;
    };
    box.setOnOpenCallback = (fun) => {
        box.onOpen = fun;

        return box;
    };
    box.setMessageAlpha = (message, alpha) => {

        let messageExists = typeof message !== "undefined" && Array.isArray(message.children);

        if (messageExists) {
            let amountOfChars = message.children.length;
            for (let i = 0; i < amountOfChars; i++){
                let letter = message.getChildAt(i);
                letter.alpha = alpha;
            };
        }

        return messageExists;
    }

    /**
     * @param {string} message - the text content that will be displayed in the box box.
     * @param {object} imageData - configuration data for graphics
     * imageDataExample = {
     *     images: [phaserImageData],
     *     hasNewImages: Bool,
     *     clearCurrentImages: Bool, 
     * }
     * @param {bool} typewriter - condition for letters in message to be displayed sequentially
     */
    box.displayMessage = (message, imageData, typewriter = false, call) => {
        let newMessageIsReady = !box._isTypeing;
        if (newMessageIsReady){
            box._messageText = message;
            if (box.message){
                box.message.destroy();
            }
            let imageDataExists = imageData !== null;
            let newImagesToDisplay = imageDataExists && imageData.hasNewImages && Array.isArray(imageData.images);
            let destroyCurrentImages = imageDataExists && box.currentImages.length > 0 && imageData.clearCurrentImages === true;
            if (newImagesToDisplay) {
                imageData.images.forEach((data) => {
                    let spriteData;
                    let isFromSpriteSheet = Object.keys(data).length === 4;
                    if (isFromSpriteSheet){
                        spriteData = box.game.add.sprite(data.x, data.y, data.key, data.src);
                    }
                    else {
                        spriteData = box.game.add.sprite(data.x, data.y, data.key);
                    }
                    let imgShell = {
                        sprite: spriteData,
                        onType: null,
                        preMessageAction: null,
                        postMessageAction: null
                    }
                    box.currentImages.push(imgShell)
                })
            }
            else if (destroyCurrentImages){
                box.currentImages.forEach((imgShell) => {
                    imgShell.sprite.destroy();
                });
                box.currentImages = [];
            }   

            if (typewriter){
                box.typewrite(message);
                box.postMessageAction = call;
            }
            else {
                // Only support bitmap text until there's a way to use both seamlessly
                box.message = box.game.add.bitmapText(0, 0, box.fontFamily, message, box.fontSize)
                box.message.maxWidth = box.wrapWidth;


                //position Dialogue message in center of display
                box.message.x = ((box.background.width * 0.5) - (box.message.width * 0.5)) + box.messageXOffset;
                box.message.y = (box.background.height * 0.05) + box.messageYOffset;// - (box.message.height * 0.5);

                box.container.add(box.message);

                let typingActionExists = typeof box.onType === "function";
                if (typingActionExists){
                    box.onType(message);
                }

                let doMessageAction = typeof call === "function";
                if (doMessageAction){
                    call(box.message, message);
                    box.postMessageAction = null;
                }
            }
        }
        else {
            box._que.push([message, imageData, typewriter, call]);
        }
        return box;
    };
    box.clearQue = () => {
        box._que = [];
    }
    box.typewrite = (message) => {

        let fontFamily = box.fontFamily;
        let fontSize   = box.fontSize;
        let xPosition  = box.background.width * 0.5;
        let yPosition  = (box.background.height * 0.25) + box.messageYOffset;
        let typedText  = box.game.add.bitmapText(xPosition, yPosition, fontFamily, message, fontSize);
        typedText.maxWidth = box.wrapWidth;

        box.setMessageAlpha(typedText, 0);

        //Tutorial resets position for some reason?? Find out why!
        typedText.x = ((box.background.width * 0.5) - (typedText.width * 0.5)) + box.messageXOffset;
        typedText.y = (box.background.height * 0.05) + box.messageYOffset;

        //calculate timing
        let amountOfChars = typedText.children.length;
        let currentChar = 0;
        let delay = Phaser.Timer.SECOND * Math.min(1,box.typeDelay); //a millesecond;
        let timer = box.game.time.create(false);
        timer.start();
        box._isTypeing = true;
        timer.repeat(delay, amountOfChars, () => {
            //do onType function here
            let char = typedText.getChildAt(currentChar);
            char.alpha = 1;

            let typingActionExists = typeof box.onType === "function";
            if (typingActionExists){
                box.onType(message, char);
            }
            currentChar++;
        });

        timer.onComplete.add(box.timerAction);

        box._timer = timer;
        box.message = typedText;
        box.container.add(box.message);

        return box;
    };

    box.timerAction = (timer) => {
        box._isTypeing = false;
        timer.stop();
        timer.destroy();

        let postActionExists = typeof box.postMessageAction === "function";
        let canShowNewMessage = box._que.length > 0 && box._autoTime === true;

        if (postActionExists){
            box.postMessageAction(box.container, box._messageText);
        }
        if (canShowNewMessage){
            let newMessage = box._que.shift();
            box.displayMessage(...newMessage);
        }
    };

    box.userInput = () => {
        //NOTE address future edge case of both an auto timer being on and user being able to click to skip message
        let noMessagesLeft = !box._isTypeing && box._que.length === 0;
        let permitExistingMessage = !box._isTypeing && box._que.length > 0 && box._autoTime === false;
        if (noMessagesLeft){
            box.closeButton.alpha = 1;
            box.closeButton.inputEnabled = true;
            //box.close();
        }
        else if (box._isTypeing) {
            box.setMessageAlpha(box.message, 1);
            box.timerAction(box._timer);
        }
        else if (permitExistingMessage){
            let newMessage = box._que.shift();
            box.displayMessage(...newMessage);
        }
    };

    box.close = () => {
        box._timer.stop();
        box._timer.destroy();
        box.container.destroy();

        let postActionExists = typeof box.onClose === "function";
        if (postActionExists){
            box.onClose();
        }
    }

    return box;
}