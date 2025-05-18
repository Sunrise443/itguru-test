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
            maskRe: /[0-9.-]/,
            listeners: {
                specialkey: 'onIDFilter'
            }
        },
        {
            xtype: 'textfield',
            allowBlank: true,
            fieldLabel: 'Описание',
            emptyText: 'Введите фильтр',
            listeners: {
                specialkey: 'onDescFilter'
            }
        },
        {
            xtype: 'mainlist',
            reference: 'productsGrid',
            border: true,
            style: {
                marginTop: '20px'
            }
        }
    ]
});