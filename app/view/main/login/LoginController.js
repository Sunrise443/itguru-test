Ext.define('First.view.main.login.LoginController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.login-cont',

    onLogin: function () {
        var form = this.getView().down('form');
        var loginField = form.down('[name=login]');
        var passField = form.down('[name=password]');

        var login = loginField.getValue();
        var password = passField.getValue();

        if (login !== 'admin' || password !== 'padmin') {
            Ext.Msg.alert('Ошибка', 'Неверный логин или пароль');
            passField.setValue('');
            return;
        }

        passField.setValue('')
        loginField.setValue('')
        localStorage.setItem('FirstLoggedIn', 'true');

        this.getView().destroy();

        Ext.create({
            xtype: 'app-main',
            renderTo: Ext.getBody()
        })
    },
});
