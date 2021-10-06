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
        // handle Ubuntu's modified GNOME Shell for Dock
        try {
            Main.layoutManager.startInOverview = false;
        } catch(e) {
            log("No-Overview extension warning: command not found because not running Ubuntu");
        }   
    }

    disable() {
        Main.sessionMode.hasOverview = this._realHasOverview;
        // handle Ubuntu's modified GNOME Shell for Dock
        try {
            Main.layoutManager.startInOverview = true;
        } catch(e) {
            log("No Overview extension warning: command not found because not running Ubuntu");
        }
    }
}

function init() {
	return new Extension();
}

