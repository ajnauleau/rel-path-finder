'use babel';

import RelPathFinderView from './rel-path-finder-view';
import { CompositeDisposable } from 'atom';

export default {

  relPathFinderView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.relPathFinderView = new RelPathFinderView(state.relPathFinderViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.relPathFinderView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'rel-path-finder:toggle': () => this.toggle()
    }));
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

  toggle() {
    console.log('RelPathFinder was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
