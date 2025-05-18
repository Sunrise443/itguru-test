Ext.define('First.view.main.login.Login', {
    extend: 'Ext.window.Window',
    xtype: 'login',
    modal: true,

    requires: [
        'Ext.plugin.Viewport',
        'Ext.window.MessageBox',
        'Ext.form.Panel',

        'First.view.main.login.LoginController'
    ],

    controller: 'login-cont',
    title: 'Окно Входа',
    bodyPadding: 10,
    closable: false,
    autoShow: true,

    items: {
        xtype: 'form',
        reference: 'form',
        items: [{
            xtype: 'textfield',
            allowBlank: false,
            fieldLabel: 'Логин',
            name: 'login',
            emptyText: 'Введите логин',
        }, {
            xtype: 'textfield',
            allowBlank: false,
            fieldLabel: 'Пароль',
            name: 'password',
            emptyText: 'Введите пароль',
            inputType: 'password'
        }],

        buttons: [
            {
                text: 'Войти',
                formBind: true,
                handler: 'onLogin'
            }
        ],
    },
});