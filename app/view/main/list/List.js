/**
 * This view is an example list of people.
 */
Ext.define('First.view.main.list.List', {
    extend: 'Ext.grid.Panel',
    xtype: 'mainlist',
    controller: 'list',

    requires: [
        'First.store.Items'
    ],

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
