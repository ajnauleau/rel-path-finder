"use babel";

import { CompositeDisposable } from "atom";
const scopeDescriptors = require("./settings");
const getSuggestions = require("./main");
const main = require("./main");

export default {
  relPathFinderView: null,
  modalPanel: null,
  subscriptions: null,
  config: scopeDescriptors,
  provider: function() {
    return main;
  },

  activate(state) {
    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(
      atom.commands.add("atom-workspace", {
        "rel-path-finder:find": () => this.find()
      })
    );

    return {
      provider: function() {
        return main;
      }
    };
    console.log(main);
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.relPathFinderView.destroy();
  },

  serialize() {
    return {
      relPathFinderViewState: this.relPathFinderView.serialize()
    };
  },

  find() {
    console.log("Searching for Relative Paths");
    let editor;
    if ((editor = atom.workspace.getActiveTextEditor())) {
      let selection = editor.getSelectedText();
    }

    console.log(main.getSuggestions(selection));
  }
};
