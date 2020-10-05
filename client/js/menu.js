var menuState = {

    create: function () {

        // game.add.plugin(Phaser.Plugin.Debug);
        // game.add.plugin(Phaser.Plugin.Inspector);
        // game.add.plugin(PhaserSuperStorage.StoragePlugin);
        // game.add.plugin(PhaserInput.Plugin);

        var img = game.add.image(95, 150, 'ant-head');
        img.inputEnabled = true;
        img.events.onInputDown.add(function(){
            game.state.start("uiTest");
        })
        console.log("...skipping menu state")
        game.state.start("uiTest");
    }

};
