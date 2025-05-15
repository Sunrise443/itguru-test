Ext.define('First.model.Item', {
    extend: 'First.model.Base',

    fields: [
        {name: 'ID', type: 'int'},
        {name: 'Name', type: 'string'},
        {name: 'Description', type: 'string'},
        {name: 'Price', type: 'float'},
        {name: 'Amount', type: 'int'}
    ]
});
