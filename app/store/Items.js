Ext.define('First.store.Items', {
    extend: 'Ext.data.Store',

    alias: 'store.items',

    model: 'First.model.Item',
    storeId: 'list',

    data: { items: [
        { ID: 1, Name: 'Notebook Lenovo', Description: 'ThinPad', Price: 100, Amount: 20 },
        { ID: 2, Name: 'Keyboard OKLICK', Description: '140m oklick', Price: 50, Amount: 8 },
        { ID: 3, Name: 'Network adapter', Description: 'WiFi d-link', Price: 7, Amount: 0 },
        { ID: 4, Name: 'Notebook MSI', Description: 'Thin GF63', Price: 120.91, Amount: 31 },
        { ID: 5, Name: 'Keyboard Microsoft', Description: 'Microsoft', Price: 12.001, Amount: 4 },
    ]},

    proxy: {
        type: 'memory',
        reader: {
            type: 'json',
            rootProperty: 'items'
        }
    }
});
