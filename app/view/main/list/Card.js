Ext.define('First.view.main.list.Card', {
    extend: 'Ext.window.Window',
    xtype: 'card',
    id: 'card',
    autoShow: true,
    controller: 'list-cont',
    
    requires: [

        'Ext.form.Panel',
    ],

    title: 'Карточка товара:',
    frame: true,
    bodyPadding: 10,

    header: {
        bind: {
            title: 'Карточка товара: ' + '{name}',
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
                bind: '{id}',
                inputWrapCls: "",
                triggerWrapCls: "",
                fieldStyle: "background:none",
            },
            {
                xtype: 'textfield',
                fieldLabel: 'Наименование',
                name: 'description',
                readOnly: true,
                bind: '{desc}',
                border: false,
                inputWrapCls: "",
                triggerWrapCls: "",
                fieldStyle: "background:none",
            },
            {
                fieldLabel: 'Цена',
                name: 'price',
                xtype: 'numberfield',
                bind: '{price}'
            },
            {
                fieldLabel: 'Кол-во',
                name: 'amount',
                xtype: 'numberfield',
                bind: '{amount}'
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