var loadState = {};

loadState.loadAudio = () => {
    let sfxUI = Object.keys(creation.default.audio.ui);
    let decodeList = [];

    sfxUI.forEach((sfx) => {
        let sound = creation.default.audio.ui[sfx];
        game.load.audio(sound.key, sound.src);
    });
}
loadState.preload = () => {


    var loadingLabel = game.add.text(80, 150, "loading...", {font: "30px Courier", fill: "#fff"});

    //Load your images, spritesheets, bitmaps...
    game.load.image("boiler-logo", "assets/img/boilerplate-logo.png");

    loadState.loadAudio();
    //Load your sounds, efx, music...
    //Example: game.load.audio("rockas", "assets/snd/rockas.wav");

    //Load your data, JSON, Querys...
    //Example: game.load.json("version", "http://phaser.io/version.json");
};
loadState.create = () =>{

    game.stage.setBackgroundColor("#000");
    //game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
    game.state.start("menu");
};
