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

        Main.sessionMode.hasOverview = false;
        Main.layoutManager.connect('startup-complete', () => {
            Main.sessionMode.hasOverview = this._realHasOverview
        });
        // handle Ubuntu's method
        try {
            Main.layoutManager.startInOverview = false;
        } catch(e) {
            log("No-Overview GNOME extension info: legacy method");
        }   
    }

    disable() {
        Main.sessionMode.hasOverview = this._realHasOverview;
        // handle Ubuntu's method
        try {
            Main.layoutManager.startInOverview = true;
        } catch(e) {
            log("No-Overview GNOME extension info: legacy method");
        }
    }
}

function init() {
	return new Extension();
}