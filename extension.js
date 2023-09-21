/*
  No overview at start-up
  GNOME Shell 45+ extension
  Contributors: @fthx, @fmuellner
  License: GPL v3
*/


import * as Main from 'resource:///org/gnome/shell/ui/main.js';

export default class NoOverviewExtension {
    constructor() {
        this._realHasOverview = Main.sessionMode.hasOverview;
    }

    enable() {
        if (!Main.layoutManager._startingUp) {
            return;
        }

        Main.sessionMode.hasOverview = false;

        this._startup_complete = Main.layoutManager.connect('startup-complete', () => {
            Main.sessionMode.hasOverview = this._realHasOverview;
        });
    }

    disable() {
        Main.sessionMode.hasOverview = this._realHasOverview;
        Main.layoutManager.disconnect(this._startup_complete);
    }
}
