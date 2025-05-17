Ext.define('First.view.main.products.Products', {
    extend: 'Ext.form.Panel',
    xtype: 'products',
    controller: 'products',

    requires: [
        'First.view.main.products.ProductsController',
        'First.view.main.list.List'
    ],

    header: {
        title: {
            bind: {
                text: 'Список товаров'
            }
        }
    },
    
    bodyPadding: 20,

    items: [
        {   
            xtype: 'textfield',
            allowBlank: true,
            fieldLabel: 'ID',
            emptyText: 'Введите фильтр',
        },
        {
            xtype: 'textfield',
            allowBlank: true,
            fieldLabel: 'Описание',
            emptyText: 'Введите фильтр',
        },
        {
            xtype: 'mainlist',
            border: true,
            style: {
                marginTop: '20px'
            }
        }
    ]
});