Ext.define('First.view.main.card.Card', {
    extend: 'Ext.window.Window',
    xtype: 'card',
    id: 'card',
    controller: 'card-cont',
    autoShow: true,
    
    requires: [
        'First.view.main.card.CardController',

        'Ext.form.Panel',
    ],

    title: 'Карточка товара:',
    frame: true,
    bodyPadding: 10,

    header: {
        bind: {
            title: 'Карточка товара: ' + 'НАЗВАНИЕ ПОМЕНЯТЬ',
        }
    },

    items: {
        xtype: 'form',
        reference: 'prodForm',
        items: [
            {
                xtype: 'textfield',
                fieldLabel: 'ID',
                name: 'id',
                readOnly: true,
                value: '3',
                border: false,
                inputWrapCls: "",
                triggerWrapCls: "",
                fieldStyle: "background:none",
            },
            {
                xtype: 'textfield',
                fieldLabel: 'Наименование',
                name: 'description',
                readOnly: true,
                value: 'HElloooooooo',
                border: false,
                inputWrapCls: "",
                triggerWrapCls: "",
                fieldStyle: "background:none",
            },
            {
                fieldLabel: 'Цена',
                name: 'price',
                xtype: 'numberfield',
                value: 132
            },
            {
                fieldLabel: 'Кол-во',
                name: 'amount',
                xtype: 'numberfield',
                value: 1
            },
        ],
        buttons: [
            {
                text: 'Сохранить',
                formBind: true,
                handler: 'onSave'
            },
            {
                text: 'Отмена',
                handler: 'onCancel'
            }
        ]
    }
});