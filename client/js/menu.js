var menuState = {

    create: function () {

        // game.add.plugin(Phaser.Plugin.Debug);
        // game.add.plugin(Phaser.Plugin.Inspector);
        // game.add.plugin(PhaserSuperStorage.StoragePlugin);
        // game.add.plugin(PhaserInput.Plugin);

        var img = game.add.image(95, 150, 'boiler-logo');
        img.inputEnabled = true;
        img.events.onInputDown.add(function(){
            game.state.start("uiTest");
        })
    }

};
