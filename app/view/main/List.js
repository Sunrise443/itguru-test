/**
 * This view is an example list of people.
 */
Ext.define('First.view.main.List', {
    extend: 'Ext.grid.Panel',
    xtype: 'mainlist',

    requires: [
        'First.store.Items'
    ],

    title: 'Товары',

    store: {
        type: 'items'
    },

    columns: [
        { text: 'ID',  dataIndex: 'ID' },
        { text: 'Имя', dataIndex: 'Name', flex: 1 },
        { text: 'Описание', dataIndex: 'Description', flex: 1 },
        { text: 'Цена', dataIndex: 'Price', flex: 1 },
        { text: 'Кол-во', dataIndex: 'Amount', flex: 1 }
    ],

    listeners: {
        select: 'onItemSelected'
    }
});
