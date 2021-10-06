/*
  No overview at start-up
  Contributors: @fthx, @fmuellner
  License: GPL v3
*/


const Main = imports.ui.main;


class Extension {
    constructor() {
        this._realHasOverview = Main.sessionMode.hasOverview;
    }

    enable() {
        if (!Main.layoutManager._startingUp) {
            return;
        }

        // default: new method, fallback: old method
        try {
            Main.layoutManager.startInOverview = false;
        } catch(e) {
            log("No-Overview GNOME extension info: alternative method to avoid overview");
            Main.sessionMode.hasOverview = false;
            Main.layoutManager.connect('startup-complete', () => {
                Main.sessionMode.hasOverview = this._realHasOverview
            });
        }
    }

    disable() {
        // default: new method, fallback: old method
        try {
            Main.layoutManager.startInOverview = true;
        } catch(e) {
            log("No-Overview GNOME extension info: alternative method to restore overview");
            Main.sessionMode.hasOverview = this._realHasOverview;
        }
    }
}

function init() {
	return new Extension();
}

