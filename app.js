/*
 * This file launches the application by asking Ext JS to create
 * and launch() the Application class.
 */
Ext.application({
    extend: 'First.Application',

    name: 'First',

    requires: [
        // This will automatically load all classes in the First namespace
        // so that application classes do not need to require each other.
        'First.*'
    ],

    // The name of the initial view to create.
    mainView: 'First.view.main.Main'
});
