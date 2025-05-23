/**
 * Grids are an excellent way of showing large amounts of tabular data on the client side.
 * Essentially a supercharged `<table>`, Grid makes it easy to fetch, sort and filter large
 * amounts of data.
 *
 * Grids are composed of two main pieces - a {@link Ext.data.Store Store} full of data and
 * a set of columns to render.
 *
 * ## A Basic Grid
 *
 *     var store = Ext.create('Ext.data.Store', {
 *         fields: ['name', 'email', 'phone'],
 *         data: [
 *             { 'name': 'Lisa',  "email":"lisa@simpsons.com",  "phone":"555-111-1224"  },
 *             { 'name': 'Bart',  "email":"bart@simpsons.com",  "phone":"555-222-1234" },
 *             { 'name': 'Homer', "email":"home@simpsons.com",  "phone":"555-222-1244"  },
 *             { 'name': 'Marge', "email":"marge@simpsons.com", "phone":"555-222-1254"  }
 *         ]
 *     });
 *
 *     Ext.create('Ext.grid.Grid', {
 *         title: 'Simpsons',
 *
 *         store: store,
 *
 *         columns: [
 *             { text: 'Name',  dataIndex: 'name', width: 200 },
 *             { text: 'Email', dataIndex: 'email', width: 250 },
 *             { text: 'Phone', dataIndex: 'phone', width: 120 }
 *         ],
 *
 *         height: 200,
 *         layout: 'fit',
 *         fullscreen: true
 *     });
 *
 * The code above produces a simple grid with three columns. We specified a Store which will
 * load JSON data inline. In most apps we would be placing the grid inside another container
 * and wouldn't need to provide the {@link #height}, {@link #width} and
 * {@link #cfg-fullscreen} options but they are included here to for demonstration.
 *
 * The grid we created above will contain a header bar with a title ('Simpsons'), a row of
 * column headers directly underneath and finally the grid rows under the headers.
 *
 * ## Columns
 *
 * By default, each {@link Ext.grid.column.Column column} is sortable and toggles between
 * ascending and descending sorting when you click on its header. There are several basic
 * configs that can be applied to columns to change these behaviors. For example:
 *
 *     columns: [
 *         {
 *             text: 'Name',
 *             dataIndex: 'name',
 *             sortable: false,  // column cannot be sorted
 *             width: 250
 *         },
 *         {
 *             text: 'Email',
 *             dataIndex: 'email',
 *             hidden: true  // column is initially hidden
 *         },
 *         {
 *             text: 'Phone',
 *             dataIndex: 'phone',
 *             width: 100
 *         }
 *     ]
 *
 * We turned off sorting on the 'Name' column so clicking its header now has no effect. We
 * also made the Email column hidden by default (it can be shown again by using the
 * {@link Ext.grid.plugin.ViewOptions ViewOptions} plugin). See the
 * {@link Ext.grid.column.Column column class} for more details.
 *
 * A top-level column definition may contain a `columns` configuration. This means that the
 * resulting header will be a group header, and will contain the child columns.
 *
 * ## Rows and Cells
 *
 * Grid extends the `{@link Ext.dataview.List List}` component and connects records in the
 * store to `{@link Ext.grid.Row row components}` for the list's items. The Row component
 * utilizes the configs of the grid's {@link Ext.grid.column.Column columns} to create the
 * appropriate type of {@link Ext.grid.cell.Base cells}. Essentially, a Row is a container
 * for {@link Ext.Widget Cell widgets}.
 *
 * For the most part, configuring a grid is about configuring the columns and their cells.
 * There are several built-in column types to display specific types of data:
 *
 *  - {@link Ext.grid.column.Boolean} for true/false values.
 *  - {@link Ext.grid.column.Date} for date/time values.
 *  - {@link Ext.grid.column.Number} for numeric values.
 *
 * These columns specify (via their {@link Ext.grid.column.Column#cell cell config}) one
 * of these basic cell widget types:
 *
 *  - {@link Ext.grid.cell.Boolean}
 *  - {@link Ext.grid.cell.Date}
 *  - {@link Ext.grid.cell.Number}
 *
 * In addition to the above basic cell types, there are two other useful cell types to
 * know about:
 *
 *  - {@link Ext.grid.cell.Text} is the base class for the boolean, date and number cell
 *    classes. It is useful when a cell contains only text.
 *  - {@link Ext.grid.cell.Widget} is a cell class that manages a single child item (either
 *    a {@link Ext.Component component} or a {@link Ext.Widget widget}). The child item is
 *    configured using the `{@link Ext.grid.cell.Widget#widget widget config}`. The most
 *    important part of this config is the `xtype` of the child item to create.
 *
 * ## Cells and Binding
 *
 * One technique to controll cell content and styling is to use data binding to target
 * cell configs like {@link Ext.grid.cell.Base#cls} and {@link Ext.grid.cell.Base#bodyCls}.
 * This is done by assigning a {@link Ext.app.ViewModel viewModel} to each Row like so:
 *
 *      itemConfig: {
 *          viewModel: true  // create default ViewModel for each item (i.e., Row)
 *      }
 *
 * Now that each Row has a ViewModel, cells can bind to the fields of the associated record
 * like so:
 *
 *      columns: [{
 *          ...
 *          cell: {
 *              bind: {
 *                  cls: '{record.someCls}'
 *              }
 *          }
 *      }]
 *
 * The "record" property in the ViewModel is managed by the Row. As Row instances are
 * recycled due to buffered rendering, the associated record instance simply changes over
 * time.
 *
 * ### Cell Widgets
 *
 * When using {@link Ext.grid.cell.Widget}, the contained widgets can also use binding to
 * configure themsleves using properties of the associated record.
 *
 *      columns: [{
 *          ...
 *          cell: {
 *              xtype: 'widgetcell',
 *              widget: {
 *                  xtype: 'button',
 *                  bind: {
 *                      text: 'Update {record.firstName}'
 *                  }
 *              }
 *          }
 *      }]
 *
 * ### Row ViewModels
 *
 * In some cases a custom ViewModel could be useful, for example to provide useful values
 * via {@link Ext.app.ViewModel#formulas formulas}.
 *
 *      itemConfig: {
 *          viewModel: {
 *              type: 'rowViewModel'
 *          }
 *      }
 *
 * ## Renderers and Templates
 *
 * Columns provide two other mechanisms to format their cell content:
 *
 *  - {@link Ext.grid.column.Column#renderer}
 *  - {@link Ext.grid.column.Column#tpl}
 *
 * These column configs are processed by the {@link Ext.grid.column.Cell default cell type}
 * for a column. These configs have some downsides compared to data binding but are provided
 * for compatibility with previous releases.
 *
 *  - Renderers and templates must update the cell content when _any_ field changes. They
 *    cannot assume that only changes to the dataIndex will affect the rendering. Using
 *    data binding, only the configs affected by the changed data will be updated.
 *  - Updates are processed synchronously in response to the record update notification.
 *    Contrast to ViewModels which provide a buffered update mechanism.
 *  - Constructing HTML blocks in code (even in a template) is a common cause of security
 *    problems such as XSS attacks.
 *
 * ## Sorting & Filtering
 *
 * Every grid is attached to a {@link Ext.data.Store Store}, which provides multi-sort and
 * filtering capabilities. It's easy to set up a grid to be sorted from the start:
 *
 *     var myGrid = Ext.create('Ext.grid.Panel', {
 *         store: {
 *             fields: ['name', 'email', 'phone'],
 *             sorters: ['name', 'phone']
 *         },
 *         columns: [
 *             { text: 'Name',  dataIndex: 'name' },
 *             { text: 'Email', dataIndex: 'email' }
 *         ]
 *     });
 *
 * Sorting at run time is easily accomplished by simply clicking each column header. If you
 * need to perform sorting on more than one field at run time it's easy to do so by adding
 * new sorters to the store:
 *
 *     myGrid.store.sort([
 *         { property: 'name',  direction: 'ASC' },
 *         { property: 'email', direction: 'DESC' }
 *     ]);
 *
 * See {@link Ext.data.Store} for examples of filtering.
 *
 * ## Plugins
 *
 * Grid supports addition of extra functionality through plugins:
 *
 * - {@link Ext.grid.plugin.ViewOptions ViewOptions} - adds the ability to show/hide
 *   columns and reorder them.
 *
 * - {@link Ext.grid.plugin.ColumnResizing ColumnResizing} - allows for the ability to
 *   resize columns.
 *
 * - {@link Ext.grid.plugin.Editable Editable} - editing grid contents one row at a time.
 *
 * - {@link Ext.grid.plugin.RowOperations RowOperations} - selecting and performing tasks
 *   on severalrows at a time (e.g. deleting them).
 *
 * - {@link Ext.grid.plugin.PagingToolbar PagingToolbar} - adds a toolbar at the bottom of
 *   the grid that allows you to quickly navigate to another page of data.
 *
 * - {@link Ext.grid.plugin.SummaryRow SummaryRow} - adds and pins an additional row to the
 *   top of the grid that enables you to display summary data.
 */
Ext.define('Ext.grid.Grid', {
    extend: 'Ext.dataview.List',
    xtype: 'grid',

    isGrid: true,

    requires: [
        'Ext.TitleBar',
        'Ext.grid.NavigationModel',
        'Ext.grid.Row',
        'Ext.grid.column.Column',
        'Ext.grid.column.Date',
        'Ext.grid.column.Template',
        'Ext.grid.menu.*',
        'Ext.grid.HeaderContainer',
        'Ext.grid.selection.*',
        'Ext.grid.plugin.ColumnResizing',
        'Ext.grid.plugin.HeaderReorder'
    ],

    mixins: [
        'Ext.mixin.ConfigProxy'
    ],

    storeEventListeners: {
        sort: 'onStoreSort'
    },

    config: {
        /**
         * @cfg {Ext.grid.column.Column[]} columns (required)
         * An array of column definition objects which define all columns that appear in this grid.
         * Each column definition provides the header text for the column, and a definition of where
         * the data for that column comes from.
         *
         * This can also be a configuration object for a {Ext.grid.header.Container HeaderContainer}
         * which may override certain default configurations if necessary. For example, the special
         * layout may be overridden to use a simpler layout, or one can set default values shared
         * by all columns:
         *
         *      columns: {
         *          items: [
         *              {
         *                  text: "Column A"
         *                  dataIndex: "field_A",
         *                  width: 200
         *              },{
         *                  text: "Column B",
         *                  dataIndex: "field_B",
         *                  width: 150
         *              },
         *              ...
         *          ]
         *      }
         *
         */
        columns: null,

        /**
         * @cfg {Object} columnMenu
         * This is a config object which is used by columns in this grid to create their
         * header menus.
         *
         * The default column menu contains the following items.
         *
         * - A "Sort Ascending" menu item
         * - A "Sort Descending" menu item
         * - A Columns menu item with each of the columns in a sub-menu of check items
         *   that is used to hide or show each column.
         * - A "Group by this field" menu item to enable grouping.
         * - A "Show in groups" check menu item to enable/disable grouping.
         *
         * These items have {@link #cfg!weight} of `-100`, `-90` and `-80` respectively to
         * place them at the start of the menu.
         *
         * This can be configured as `null` to prevent columns from showing a column menu.
         */
        columnMenu: {
            cached: true,
            $value: {
                xtype: 'menu',
                weighted: true,
                align: 'tl-bl?',
                hideOnParentHide: false,  // Persists when owning Column is hidden
                items: {
                    sortAsc: {
                        xtype: 'gridsortascmenuitem',
                        group: 'sortDir',
                        weight: -100 // Wants to be the first
                    },
                    sortDesc: {
                        xtype: 'gridsortdescmenuitem',
                        group: 'sortDir',
                        weight: -90 // Wants to be the second
                    },
                    //---------------------------------
                    // Columns menu is inserted here
                    //---------------------------------
                    groupByThis: {
                        xtype: 'gridgroupbythismenuitem',
                        handler: 'column.onGroupByThis',
                        separator: true,
                        weight: -50
                    },
                    showInGroups: {
                        xtype: 'gridshowingroupsmenuitem',
                        handler: 'column.onToggleShowInGroups',
                        weight: -40
                    }
                }
            }
        },

        /**
         * @cfg {Boolean} columnResize
         * Set to `false` to disable column resizing within this grid.
         */
        columnResize: true,

        headerContainer: {
            xtype: 'headercontainer'
        },

        /**
         * @cfg {Boolean} hideHeaders
         * `true` to hide the grid column headers.
         *
         * @since 6.0.1
         */
        hideHeaders: false,

        /**
         * @cfg {Boolean} enableColumnMove
         * Set to `false` to disable column reorder.
         * 
         * **Note**: if `gridviewoptions` plugin is enabled on grids gets 
         * precedence over `enableColumnMove` for touch supported device.
         */
        enableColumnMove: true,

        /**
         * @cfg {Boolean} hideScrollbar
         *
         * @private
         */
        hideScrollbar: null,

        /**
         * @hide
         * Grid Rows are not focusable. Cells are focusable.
         */
        itemsFocusable: false,

        /**
         * @cfg {String} title
         * The title that will be displayed in the {@link #titleBar} at the top of this Grid.
         * Setting this value automatically creates a titleBar with the provided
         * title using the following defaults:
         *
         *    {
         *        xtype: 'titlebar',
         *        docked: 'top'
         *    }
         *
         * Note: Using this config triggers behaviour where the grid titleBar
         * is only displayed when the title is not empty. Use the {@link #titleBar} config
         * for more control of the grid's titlebar behaviour and settings.
         *
         * Should not be used in conjunction with {@link #titleBar}.
         */
        title: '',

        /**
         * @cfg {Object} titleBar
         * A configuration object for {@link Ext.TitleBar}. May be used to specify
         * a custom configuration for the grid's titleBar.
         *
         * Should not be used in conjunction with {@link #title}.
         */
        titleBar: {
            xtype: 'titlebar',
            docked: 'top'
        },

        /**
         * @cfg {Boolean} sortable
         * Configure as `false` to disable column sorting via clicking the header and via
         * the Sorting menu items.
         */
        sortable: true,

        /**
         * @cfg {Boolean} multiColumnSort
         * Configure as `true` to have columns retain their sorted state after other
         * columns have been clicked upon to sort.
         *
         * As subsequent columns are clicked upon, they become the new primary sort key.
         *
         * Clicking on an already sorted column which is *not* the primary sort key does
         * not toggle its direction. Analogous to bringing a window to the top by
         * clicking it, this makes that column's field the primary sort key. Subsequent
         * clicks then toggle it.
         *
         * Clicking on a primary key column toggles `ASC` -> `DESC` -> no sorter.
         *
         * The column sorting menu items may be used to toggle the direction without
         * affecting the sorter priority.
         *
         * The maximum number of sorters allowed in a Store is configurable via its
         * underlying data collection. See {@link Ext.util.Collection#multiSortLimit}
         */
        multiColumnSort: false,

        /**
         * @cfg {Ext.grid.menu.Columns} columnsMenuItem
         * The config object for the grid's column hide/show menu
         */
        columnsMenuItem: {
            lazy: true,
            $value: {
                xtype: 'gridcolumnsmenu',
                weight: -80,
                separator: true
            }
        },

        /**
         * @cfg {Boolean} [columnLines=false]
         * Configure as `true` to display lines between grid cells.
         */
        columnLines: null,

        /**
         * @cfg {Boolean/Object} [rowNumbers=false]
         * Configure as `true` to a {@link Ext.grid.column.RowNumberer row numberer}
         * column which gravitates to the start of the grid.
         *
         * May be a {@link Ext.grid.column.RowNumberer} configuration object. For
         * instance to set the column title use:
         *
         *     rowNumbers: {
         *         text: 'Index'
         *     }
         */
        rowNumbers: null
    },

    /**
     * @cfg {Object/Ext.grid.Row} itemConfig
     * The object is used to configure the {@link Ext.grid.Row rows) created by this Grid.
     *
     * An `xtype` property may be included to specify a user-supplied subclass of
     * {@link Ext.grid.Row}.
     *
     * See the {@link Ext.grid.row#cfg!body} and {@link Ext.grid.row#cfg!expandedField}
     * configs on the {@link Ext.grid.RowRow class} to easily add extra content to grid
     * rows.
     *
     * Be aware that if you specify a {@link Ext.grid.row#cfg!body row body}, you must
     * configure the owning grid with `{@link #variableHeights}: true`.
     */
    itemConfig: {
        xtype: 'gridrow'
    },

    /**
     * @cfg groupHeader
     * @inheritdoc
     */
    groupHeader: {
        xtype: 'rowheader'
    },

    /**
     * @cfg infinite
     * @inheritdoc
     */
    infinite: true,

    // The type of navigationMode to create
    navigationModel: 'grid',

    /**
     * @cfg pinnedHeader
     * @inheritdoc
     */
    pinnedHeader: {
        xtype: 'rowheader'
    },

    /**
     * @cfg scrollable
     * @inheritdoc
     */
    scrollable: true,

    /**
     * @cfg scrollToTopOnRefresh
     * @inheritdoc
     */
    scrollToTopOnRefresh: false,

    /**
     * @cfg striped
     * @inheritdoc
     */
    striped: true,

    // Our reserveScrollbar config is propagated down to the headerContainer
    proxyConfig: {
        headerContainer: [
            /**
             * @cfg {Boolean} [reserveScrollbar=false]
             * *only meaningful on platforms which has space-consuming scroll bars*
             *
             * Configure as `true` to leave space for a scrollbar to appear even if the
             * content does not overflow.
             *
             * This is useful for trees which may expand and collapse causing visual
             * flickering when scrollbars appear or disappear.
             */
            'reserveScrollbar'
        ]
    },

    /**
     * @cfg {Ext.grid.selection.Model} selectable
     * A configuration object which allows passing of configuration options to create or
     * reconfigure a {@link Ext.grid.selection.Model selection model}.
     *
     * The following options control what can be selected:
     *
     *  - {@link Ext.grid.selection.Model#cfg!cells cells}
     *  - {@link Ext.grid.selection.Model#cfg!columns columns}
     *  - {@link Ext.grid.selection.Model#cfg!rows rows}
     *
     * These options control how selections can be made:
     *
     *  - {@link Ext.grid.selection.Model#cfg!checkbox checkbox}
     *  - {@link Ext.grid.selection.Model#cf!deselectable deselectable}
     *  - {@link Ext.grid.selection.Model#cfg!drag drag}
     *  - {@link Ext.grid.selection.Model#cfg!extensible extensible}
     *  - {@link Ext.grid.selection.Model#cfg!mode mode}
     *  - {@link Ext.grid.selection.Model#cfg!reducible reducible}
     */

    /**
     * @event columnadd
     * Fires whenever a column is added to the Grid.
     * @param {Ext.grid.Grid} this The Grid instance.
     * @param {Ext.grid.column.Column} column The added column.
     * @param {Number} index The index of the added column.
     */

    /**
     * @event columnmove
     * Fires whenever a column is moved in the grid.
     * @param {Ext.grid.Grid} this The Grid instance.
     * @param {Ext.grid.column.Column} column The moved column.
     * @param {Number} fromIndex The index the column was moved from.
     * @param {Number} toIndex The index the column was moved to.
     */

    /**
     * @event columnremove
     * Fires whenever a column is removed from the Grid.
     * @param {Ext.grid.Grid} this The Grid instance.
     * @param {Ext.grid.column.Column} column The removed column.
     */

    /**
     * @event columnshow
     * Fires whenever a column is shown in the Grid.
     * @param {Ext.grid.Grid} this The Grid instance.
     * @param {Ext.grid.column.Column} column The shown column.
     */

    /**
     * @event columnhide
     * Fires whenever a column is hidden in the Grid.
     * @param {Ext.grid.Grid} this The Grid instance.
     * @param {Ext.grid.column.Column} column The shown column.
     */

    /**
     * @event columnresize
     * Fires whenever a column is resized in the Grid.
     * @param {Ext.grid.Grid} this The Grid instance.
     * @param {Ext.grid.column.Column} column The resized column.
     * @param {Number} width The new column width.
     */

    /**
     * @event columnsort
     * Fires whenever a column is sorted in the Grid.
     * @param {Ext.grid.Grid} this The Grid instance.
     * @param {Ext.grid.column.Column} column The sorted column.
     * @param {String} direction The direction of the sort on this Column. Either 'asc'
     * or 'desc'.
     */

    /**
     * @event cellselection
     * Fires when cell selection is being used and cells are selected or deselected.
     * @param {Ext.grid.Grid} grid this Grid
     * @param {Ext.grid.selection.Rows} selection An object which encapsulates the
     * selected cell range(s).
     */

    /**
     * @event columnselection
     * Fires when column selection is being used and columns are selected or deselected.
     * @param {Ext.grid.Grid} grid this Grid
     * @param {Ext.grid.selection.Columns} selection An object which encapsulates the
     * selected columns.
     */

    /**
     * @event beforestartedit
     * Fires when editing is initiated, but before the value changes.  Editing can be canceled by
     * returning false from the handler of this event.
     * @param {Ext.Editor} editor
     * @param {Ext.dom.Element} boundEl The underlying element bound to this editor
     * @param {Object} value The field value being set
     * @param {Ext.grid.Location} The location where actionable mode was successfully started
     * @since 7.0
     */

    /**
     * @event startedit
     * Fires when this editor is displayed
     * @param {Ext.Editor} editor
     * @param {Ext.dom.Element} boundEl The underlying element bound to this editor
     * @param {Object} value The starting field value
     * @param {Ext.grid.Location} The location where actionable mode was successfully started
     * @since 7.0
     */

    /**
     * @event beforecomplete
     * Fires after a change has been made to the field, but before the change is reflected in the
     * underlying field.  Saving the change to the field can be canceled by returning false from
     * the handler of this event. Note that if the value has not changed and ignoreNoChange = true,
     * the editing will still end but this event will not fire since no edit actually occurred.
     * @param {Ext.Editor} editor
     * @param {Object} value The current field value
     * @param {Object} startValue The original field value
     * @param {Ext.grid.Location} The location where actionable mode was successfully started
     * @since 7.0
     */

    /**
     * @event complete
     * Fires after editing is complete and any changed value has been written to the underlying
     * field.
     * @param {Ext.Editor} editor
     * @param {Object} value The current field value
     * @param {Object} startValue The original field value
     * @param {Ext.grid.Location} The location where actionable mode was successfully started
     * @since 7.0
     */

    /**
     * @event canceledit
     * Fires after editing has been canceled and the editor's value has been reset.
     * @param {Ext.Editor} editor
     * @param {Object} value The user-entered field value that was discarded
     * @param {Object} startValue The original field value that was set back into the editor after
     * cancel
     * @since 7.0
     */

    /**
     * @event specialkey
     * Fires when any key related to navigation (arrows, tab, enter, esc, etc.) is pressed. You can
     * check
     * {@link Ext.event.Event#getKey} to determine which key was pressed.
     * @param {Ext.Editor} editor
     * @param {Ext.form.field.Field} field The field attached to this editor
     * @param {Ext.event.Event} event The event object
     * @since 7.0
     */

    /**
     * @event beforestaterestore
     * Fires before the state of the object is restored. 
     * Return false from an event handler to stop the restore.
     * @param {Ext.grid.Grid} grid this Grid
     * @param {Object} state The hash of state values returned from the StateProvider. If this
     * event is not vetoed, then the state object is passed to *`applyColumnState`.
     * @since 7.6
     */
    /**
     * @event staterestore
     * Fires after the state of the object is restored.
     * @param {Ext.grid.Grid} grid this Grid
     * @param {Object} state The hash of state values returned from the StateProvider.
     * @since 7.6
     */
    /**
     * @event beforestatesave
     * Fires before the state of the object is saved to the configured state provider.
     * Return false to stop the save.
     * @param {Ext.grid.Grid} grid this Grid
     * @param {Object} state The hash of state values.
     * @since 7.6
     */
    /**
     * @event statesave
     * Fires after the state of the object is saved to the configured state provider.
     * @param {Ext.grid.Grid} grid this Grid
     * @param {Object} state The hash of state values.
     * @since 7.6
     */

    /**
     * @private
     * @readonly
     * @property {String} [selectionModel=grid]
     * The selection model type to create. Defaults to `'grid'` for grids.
     */
    selectionModel: 'grid',

    /**
     * @property classCls
     * @inheritdoc
     */
    classCls: Ext.baseCSSPrefix + 'grid',
    columnLinesCls: Ext.baseCSSPrefix + 'column-lines',

    /**
     * @property {Object} columnStateEventMap Column events to be applied 
     * when grid is stateful.
     * Mapping of this property 
     *      `property`: Column event name
     *      `value`: Matching event config
     */
    columnStateEventMap: {
        columnhide: 'hidden',
        columnmove: 'weight',
        columnresize: 'width',
        columnshow: 'hidden'
    },

    /**
     * @property {Number} columnStateEventDelay
     * A buffer to be applied if many state events are fired within a short period.
     */
    columnStateEventDelay: 100,

    getTemplate: function() {
        var template = this.callParent();

        template.push({
            reference: 'resizeMarkerElement',
            className: Ext.baseCSSPrefix + 'resize-marker-el',
            hidden: true
        });

        return template;
    },

    beforeInitialize: function() {
        // In a locking grid assembly, child grids will have an ownerGrid reference.
        // By default, in a non-locking grid, ownerGrid references this grid.
        this.ownerGrid = this;
        this.registerColumnState();
        this.callParent();
    },

    initialize: function() {
        var me = this,
            columns = me.getColumns(),
            persist = me.registeredColumns,
            titleBar = me.getTitleBar(),
            headerContainer = me.getHeaderContainer(),
            scroller = me.getScrollable(),
            selectable = me.getSelectable();

        me.callParent();

        if (scroller) {
            headerContainer.getScrollable().addPartner(scroller, 'x');
        }

        if (titleBar) {
            me.insert(0, titleBar);
        }

        me.add(headerContainer);

        if (selectable) {
            selectable.onViewCreated(me);
        }

        // In the case of a grid without configured columns, registered columns will never
        // be added as they are normally added during updateColumns. Here we catch that case
        // and add all registeredColumns. This issue comes from ExtAngular and how it creates
        // the grid.
        if (!columns.length && persist && persist.length) {
            headerContainer.add(persist);
        }
    },

    doDestroy: function() {
        this.destroyMembers('columnsMenu', 'columnsMenuItem', 'rowNumbererColumn');
        this.callParent();
    },

    addColumn: function(column) {
        return this.getHeaderContainer().add(column);
    },

    addSharedMenuItem: function(sharedItem) {
        (this.sharedMenuItems || (this.sharedMenuItems = [])).push(sharedItem);
    },

    removeSharedMenuItem: function(sharedItem) {
        var sharedMenuItems = this.sharedMenuItems;

        if (sharedMenuItems) {
            Ext.Array.remove(sharedMenuItems, sharedItem);
        }
    },

    beforeShowColumnMenu: function(column, menu) {
        var me = this,
            i, n, item, sharedMenuItems;

        me.getColumnsMenuItem();  // ensure "Columns" menu is created and registered

        sharedMenuItems = me.sharedMenuItems;

        for (i = 0, n = sharedMenuItems && sharedMenuItems.length; i < n; ++i) {
            item = sharedMenuItems[i];

            item.onBeforeShowColumnMenu(menu, column, me);
        }

        return me.fireEvent('beforeshowcolumnmenu', me, column, menu);
    },

    onColumnMenuHide: function(column, menu) {
        var me = this,
            sharedMenuItems = me.sharedMenuItems,
            n = sharedMenuItems && sharedMenuItems.length,
            i, item;

        for (i = 0; i < n; ++i) {
            item = sharedMenuItems[i];

            if (!item.destroyed && !item.destroying && !menu.isHidden()) {
                item.onColumnMenuHide(menu, column, me);
            }
        }
    },

    getColumnForField: function(fieldName) {
        return this.getHeaderContainer().getColumnForField(fieldName);
    },

    /**
     * Get columns using a selector to filter which columns
     * to return.
     *
     * @param {String/Function} selector
     * If the selector is a `String`, columns will be found using
     * {@link Ext.ComponentQuery}. If the selector is a `Function`,
     * {@link Ext.Array#filter} will be used to filter the columns.
     * If no selector is provided, all columns will be returned.
     * @return {Array}
     */
    getColumns: function(selector) {
        return this.getHeaderContainer().getColumns(selector);
    },

    getVisibleColumns: function() {
        return this.getHeaderContainer().getVisibleColumns();
    },

    insertColumn: function(index, column) {
        return this.getHeaderContainer().insert(index, column);
    },

    insertColumnBefore: function(column, before) {
        var ret;

        if (!before) {
            ret = this.getHeaderContainer().add(column);
        }
        else {
            ret = before.getParent().insertBefore(column, before);
        }

        return ret;
    },

    /**
     * Converts the given parameter to a cell.
     * @param {HTMLElement/Ext.event.Event/Ext.dom.Element/Ext.data.Model/Ext.grid.Row} value The
     * value. Can be an event or an element to find the cell via the DOM. Otherwise, a record or
     * row can be passed. If this occurs, the column parameter also needs to be passed.
     * @param {Ext.grid.column.Column} [column] The column. Needed if the first parameter is a
     * model or a row.
     * @return {Ext.grid.cell.Base} The cell, if it can be found.
     *
     * @since 6.5.0
     */
    mapToCell: function(value, column) {
        var me = this,
            ret;

        if (value) {
            if (value.isGridCell && value.row.getGrid() === me) {
                ret = value;
            }
            else {
                if (value.isEntity) {
                    value = me.mapToItem(value);
                }

                if (value) {
                    if (value.isGridRow) {
                        column = column || me.getFirstVisibleColumn();

                        if (column) {
                            ret = value.getCellByColumn(column);
                        }
                    }
                    else {
                        ret = Ext.Component.from(value, me.innerCt, 'gridcellbase');
                    }
                }
            }
        }

        return ret || null;
    },

    mapToItem: function(value, as) {
        if (value && value.isGridCell) {
            value = value.row;
        }

        return this.callParent([value, as]);
    },

    /**
     * Converts the given parameter to a row body.
     * @param {Ext.event.Event/Ext.dom.Element/HTMLElement/Ext.data.Model/Ext.grid.Row} value The
     * value.
     * Can be an event or an element to find the row body via the DOM. Otherwise, a record or row
     * can be passed.
     * @return {Ext.grid.RowBody} The row body, if it can be found.
     *
     * @since 6.5.0
     */
    mapToRowBody: function(value) {
        if (value) {
            if (!value.isGridRow) {
                value = this.mapToItem(value);
            }

            if (value && value.isGridRow) {
                value = value.getBody();
            }
        }

        return value || null;
    },

    removeColumn: function(column) {
        return this.getHeaderContainer().remove(column);
    },

    /**
     * @protected
     * This method is for use by plugins which require the grid to enter actionable mode
     * to focus in-cell elements.
     *
     * An example of this can be found in the {@link Ext.grid.plugin.CellEditing cell editing}
     * plugin.
     *
     * Actionable plugins have an `{@link Ext.grid.plugin.CellEditing#activateCell activateCell}`
     * method which will be called whenever the application wants to enter actionable mode
     * on a certain cell. A {@link Ext.grid.Location grid location} object will be passed.
     *
     * The `activateCell` method must return an {@link Ext.grid.Location} if it accepts
     * control, indicating in its {@link Ext.grid.Location#element element} setting
     * exactly where focus has moved to.
     *
     * Actionable plugins may also expose a `triggerEvent` config which is the name of an
     * event to be used to trigger actioning that plugin, in addition fo the ARIA standard
     * method of the user pressing `F2` or `ENTER` when focused on a cell.
     *
     * @param {Object} actionable A plugin which creates or manipulates in-cell focusable
     * elements.
     */
    registerActionable: function(actionable) {
        this.getNavigationModel().registerActionable(actionable);
    },

    /**
     * @protected
     * This method is for use by plugins which require the grid to enter actionable mode
     * to focus in-cell elements. See {@link #method!registerActionable}.
     *
     * @param {Object} actionable The actionable plugin to unregister.
     */
    unregisterActionable: function(actionable) {
        this.getNavigationModel().unregisterActionable(actionable);
    },

    //-------------------------
    // Event handlers

    onColumnAdd: function(container, column, columnIndex) {
        var me = this,
            items, ln, i, row;

        if (!me.initializingColumns && !me.destroying) {
            items = me.items.items;
            ln = items.length;

            for (i = 0; i < ln; i++) {
                row = items[i];

                if (row.hasGridCells) {
                    row.insertColumn(columnIndex, column);
                }
            }

            me.onColumnChange('columnadd', [me, column, columnIndex]);
        }

        // Update column state, if new column is added
        if (!me.isConfiguring && column.headerId == null) {
            me.onStateChange();
            me.applyColumnState();
        }
    },

    onColumnHide: function(container, column) {
        var me = this,
            items, ln, i, row;

        if (me.initialized && !me.destroying) {
            items = me.items.items;
            ln = items.length;

            for (i = 0; i < ln; i++) {
                row = items[i];

                if (row.hasGridCells) {
                    row.hideColumn(column);
                }
            }

            me.onColumnChange('columnhide', [me, column]);
        }
    },

    onColumnMove: function(container, columns, group, fromIdx) {
        var me = this,
            before = null,
            colLen = columns.length,
            items, ln, i, j, row, column,
            index, leaves;

        if (me.initialized && !me.destroying) {
            items = me.items.items;
            ln = items.length;

            // Find the item that will be after the last leaf we're going to insert
            // Don't bother checking the array bounds, if it goes out of bounds then
            // null is the right answer
            leaves = me.getHeaderContainer().getColumns();
            index = leaves.indexOf(columns[colLen - 1]);
            before = leaves[index + 1] || null;

            for (i = colLen - 1; i >= 0; --i) {
                column = columns[i];

                for (j = 0; j < ln; j++) {
                    row = items[j];

                    if (row.hasGridCells) {
                        row.insertColumnBefore(column, before);
                    }
                }

                me.onColumnChange('columnmove', [me, column, fromIdx + i, leaves.indexOf(column)]);

                before = column;
            }
        }
    },

    onColumnRemove: function(container, column) {
        var me = this,
            items, ln, i, row;

        if (me.initialized && !me.destroying) {
            if (column === me.sortedColumn) {
                me.sortedColumn = null;
            }

            items = me.items.items;
            ln = items.length;

            for (i = 0; i < ln; i++) {
                row = items[i];

                if (row.hasGridCells) {
                    row.removeColumn(column);
                }
            }

            me.onColumnChange('columnremove', [me, column]);
        }
    },

    onColumnResize: function(container, column, width, oldWidth) {
        var me = this;

        if (!me.destroying) {
            // Will be null on the first time
            if (oldWidth && !column.getHidden()) {
                if (me.infinite) {
                    me.refreshScrollerSize();
                }

                me.fireEvent('columnresize', me, column, width);
            }
        }
    },

    onColumnShow: function(container, column) {
        var me = this,
            items, ln, i, row;

        if (me.initialized && !me.destroying) {
            items = me.items.items;
            ln = items.length;

            for (i = 0; i < ln; i++) {
                row = items[i];

                if (row.hasGridCells) {
                    row.showColumn(column);
                }
            }

            me.onColumnChange('columnshow', [me, column]);
        }
    },

    onColumnSort: function(container, column, direction) {
        this.fireEvent('columnsort', this, column, direction);
    },

    onRender: function() {
        var hideHeaders = this._hideHeaders;

        this.callParent();

        // hideHeaders requires measure, so must be done on render
        if (hideHeaders) {
            this.updateHideHeaders(hideHeaders);
        }

        // Store will be null for bound store intially.
        if (this.store) {

            // Will update the sortState for inline store.
            this.handleStoreSort();
        }
    },

    applyColumns: function(columns) {
        if (this.isColumnsStateful()) {
            // do not carry state info to the column data
            columns = Ext.clone(columns);
        }

        return columns;
    },

    privates: {
        dataItemMap: {
            header: 1,
            footer: 1
        },

        // column state header id separator for the nested group 
        headerIdSeparator: '-',

        handleStoreSort: function() {
            if (this.rendered) {
                this.getHeaderContainer().setSortState();
            }
        },

        onStoreGroupChange: function(store, grouper) {
            this.callParent([store, grouper]);
            this.handleStoreSort();
        },

        onStoreSort: function() {
            this.handleStoreSort();
        },

        registerColumn: function(column) {
            var me = this,
                columns = me.registeredColumns,
                headerCt = me.getHeaderContainer();

            if (!column.isGridColumn) {
                column = Ext.create(column);
            }

            if (!columns) {
                me.registeredColumns = columns = [];
            }

            columns.push(column);

            // We may have already configured the columns, even if we are
            // configuring, so check if we have items
            if (!me.isConfiguring || (headerCt && headerCt.items.getCount())) {
                headerCt.add(column);
            }

            return column;
        },

        unregisterColumn: function(column, destroy) {
            var columns = this.registeredColumns,
                headerCt = this.getHeaderContainer();

            if (!this.destroying) {
                if (columns) {
                    Ext.Array.remove(columns, column);
                }

                if (headerCt) {
                    headerCt.remove(column, destroy === true);
                }
            }

            return column;
        },

        /**
         * @private
         * We MUST use our own cells as delegates for grid-based events.
         * Cell events will not work without this. The event system would not
         * carry cell information if we don't delegate onto our cells.
         */
        generateSelectorFunctions: function() {
            var me = this;

            me.callParent();

            // This is used solely by the view event listener to filter the event reactions
            // to the level of granularity needed.
            // At the Grid level, this will be cell elements.
            me.eventDelegate = function(candidate) {
                var comp = Ext.Component.from(candidate),
                    ret = true,
                    row;

                // Don't fire child events for the grid itself
                if (!comp || comp === me) {
                    return false;
                }

                // If it's a direct child of the grid, and it's a row or header/footer, it's ok
                if (comp.getRefOwner() === me) {
                    ret = comp.isGridRow || me.dataItemMap[comp.$dataItem];
                }
                else {
                    // Otherwise, this is to check for either:
                    // a) cell
                    // b) a row body
                    //
                    // We don't want to fire events for things inside the row body, or items inside
                    // cells
                    row = comp.row;

                    // GroupHeaders and GroupFooters are created at the List class level
                    // so they do not get a "grid" upward link, so check their "list" upward link.
                    ret = row && row.isGridRow && (row.grid || row.list) === me;
                }

                return ret;
            };
        },

        getFirstVisibleColumn: function() {
            var columns = this.getVisibleColumns();

            return columns.length ? columns[0] : null;
        },

        getLastVisibleColumn: function() {
            var columns = this.getVisibleColumns(),
                len = columns.length;

            return len ? columns[len - 1] : null;
        },

        isFirstVisibleColumn: function(column) {
            return this.getFirstVisibleColumn() === column;
        },

        isLastVisibleColumn: function(column) {
            return this.getLastVisibleColumn() === column;
        },

        createDataItem: function(cfg) {
            var item = this.callParent([cfg]);

            item.grid = this;

            return item;
        },

        // -----------------------
        // Event handlers

        onColumnChange: function(changeEvent, eventArgs) {
            var me = this;

            // Total width will change upon add/remove/hide/show
            // So keep innerCt size synced
            if (changeEvent !== 'columnmove' && changeEvent !== 'columnadd' &&
                changeEvent !== 'columnremove') {
                me.refreshInnerWidth();
            }

            if (!me.isConfiguring) {
                me.fireEventArgs(changeEvent, eventArgs);
            }

            me.clearItemCaches();
            // TODO: This may cause a change in row heights, currently should
            // be handled by using variableHeights, but the grid could re-measure as
            // needed
            // this.refreshScrollerSize();
        },

        refreshInnerWidth: function() {
            var body = this.getHeaderContainer().bodyElement.dom;

            this.setInnerWidth(Math.max(body.scrollWidth, body.clientWidth));
        },

        onColumnComputedWidthChange: function(changedColumns, totalColumnWidth) {
            var me = this,
                groupingInfo = me.groupingInfo;

            if (!me.destroying) {
                // Set the item containing element to the correct width.
                me.setInnerWidth(totalColumnWidth);

                me.setCellSizes(changedColumns, me.items.items);
                me.setCellSizes(changedColumns, me.itemCache.unused);

                if (me.isGrouping()) {
                    me.setCellSizes(changedColumns, groupingInfo.header.unused);
                    me.setCellSizes(changedColumns, groupingInfo.footer.unused);
                }

                // Row sizing rules change if we have flexed columns.
                if (me.hasListeners.columnlayout) {
                    me.fireEvent('columnlayout', me, changedColumns, totalColumnWidth);
                }
            }
        },

        onCellSelect: function(location) {
            var cell = location.getCell();

            if (cell) {
                cell.addCls(this.selectedCls);
            }
        },

        onCellDeselect: function(location) {
            var cell = location.getCell();

            if (cell) {
                cell.removeCls(this.selectedCls);
            }
        },

        setCellSizes: function(changedColumns, items) {
            var len = items.length,
                changedColCount = changedColumns.length,
                row, i, j;

            // Size the cells
            for (i = 0; i < len; i++) {
                row = items[i];

                if (row.hasGridCells) {
                    for (j = 0; j < changedColCount; j++) {
                        row.setColumnWidth(changedColumns[j]);
                    }
                }
            }
        },

        // -----------------------
        // Configs

        // columnLines

        updateColumnLines: function(columnLines) {
            this.el.toggleCls(this.columnLinesCls, columnLines);
        },

        // columnResize

        updateColumnResize: function(enabled) {
            var me = this,
                plugin = me.findPlugin('columnresizing');

            if (!plugin) {
                if (enabled) {
                    me.addPlugin('columnresizing');
                }
            }
            else {
                plugin.setGrid(enabled ? me : null);
            }
        },

        // columns

        updateColumns: function(columns) {
            var me = this,
                header = me.getHeaderContainer(),
                count = columns && columns.length,
                persist = me.registeredColumns;

            // If the header container is an instance, then it's already
            // peeked at the columns config and included it, so bail out
            if (header) {

                // With a new column set, the rowHeight must be invalidated.
                // The new columns may bring in a different data shape.
                me.rowHeight = null;

                if (header) {
                    header.beginColumnUpdate();

                    if (header.getItems().getCount()) {
                        // Preserve persistent columns
                        if (persist) {
                            header.remove(persist, false);
                        }

                        // Also preserve any returning columns...
                        if (count) {
                            header.remove(columns.filter(function(col) {
                                return col.isInstance;
                            }), /* destroy= */ false);
                        }

                        header.removeAll(/* destroy= */ true, /* everything= */ true);
                    }

                    if (count) {
                        me.initializingColumns = me.isConfiguring;

                        // Update column state property
                        if (me.isColumnsStateful()) {
                            // calculate column state header id
                            me.updateColumnStateProp(columns);

                            // update column config with state data
                            // and re-arrange, if it moved to a different header group
                            me.adjustColumnFromState(columns);
                        }

                        header.setColumns(columns);

                        // Re-add any persistent columns, any adjusted weights are recalculated
                        if (persist) {
                            header.add(persist);
                        }

                        delete me.initializingColumns;

                        // TODO: This may cause a change in row heights, currently should
                        // be handled by using variableHeights, but the grid could re-measure as
                        // needed
                        // me.refreshScrollerSize();
                    }

                    header.endColumnUpdate();
                }
            }
        },

        applyStore: function(store, oldStore) {
            var me = this,
                ret = me.callParent([ store, oldStore ]);

            //<debug>
            if (ret && ret.isVirtualStore && me.getGrouped()) {
                Ext.Logger.warn('Virtual store does not suppport grouping');
            }
            //</debug>

            return ret;
        },

        applyRowNumbers: function(rowNumbers) {
            var me = this;

            if (rowNumbers) {
                rowNumbers = me.rowNumbererColumn = Ext.create(Ext.apply({
                    xtype: 'rownumberer',
                    weight: -1000,
                    editRenderer: me.renderEmpty
                }, rowNumbers));
            }

            return rowNumbers;
        },

        updateRowNumbers: function(rowNumbers, oldRowNumbers) {
            if (oldRowNumbers) {
                this.unregisterColumn(oldRowNumbers, true);
            }

            if (rowNumbers) {
                this.registerColumn(rowNumbers);
            }
        },

        updateStore: function(newStore, oldStore) {
            this.callParent([newStore, oldStore]);

            // Need to update sortState for the bound store
            if (newStore && this.getHeaderContainer().isRendered()) {
                // Sync Store sorters when grid renders
                this.handleStoreSort();
            }
        },

        renderEmpty: function() {
            return '\xA0';
        },

        // columnsMenuItem

        applyColumnsMenuItem: function(config, existing) {
            return Ext.updateWidget(existing, config, this, 'createColumnsMenuItem');
        },

        createColumnsMenuItem: function(config) {
            return Ext.apply({
                grid: this
            }, config);
        },

        // headerContainer

        applyHeaderContainer: function(config, existing) {
            return Ext.updateWidget(existing, config, this, 'createHeaderContainer');
            //
            // if (headerContainer && !headerContainer.isComponent) {
            //     headerContainer = Ext.factory(Ext.apply({
            //         sortable: this.getSortable(),
            //         grid: this
            //     }, headerContainer), Ext.grid.HeaderContainer);
            // }
            //
            // return headerContainer;
        },

        createHeaderContainer: function(config) {
            config = this.mergeProxiedConfigs('headerContainer', config, /* alwaysClone= */ true);
            config.sortable = this.getSortable();
            config.grid = this;

            return config;
        },

        updateHeaderContainer: function(headerContainer) {
            if (headerContainer) {
                // TODO just call these methods directly from rootHeaderCt?
                // the old headerContainers are destroyed if they are replaced...
                headerContainer.on({
                    columnresize: 'onColumnResize',
                    columnshow: 'onColumnShow',
                    columnhide: 'onColumnHide',
                    columnadd: 'onColumnAdd',
                    columnmove: 'onColumnMove',
                    columnremove: 'onColumnRemove',
                    columnsort: 'onColumnSort',
                    columngroupremove: 'onColumnGroupRemove',
                    scope: this
                });
            }
        },

        // hideHeaders

        updateHideHeaders: function(hideHeaders) {
            if (this.rendered) {
                // eslint-disable-next-line vars-on-top
                var headerContainer = this.getHeaderContainer();

                // To hide the headers, just pull the following element upwards to cover it
                if (hideHeaders) {
                    headerContainer.el.setStyle({
                        visibility: 'hidden',
                        marginBottom: '-' + headerContainer.el.measure('h') + 'px'
                    });
                }
                else {
                    headerContainer.el.setStyle({
                        visibility: '',
                        marginBottom: ''
                    });
                }
            }
        },

        updateHideScrollbar: function(hide) {
            var w = Ext.scrollbar.width();

            this.element.setStyle('margin-right', hide ? -w + 'px' : '');
        },

        // title

        updateTitle: function(title) {
            var titleBar = this.getTitleBar(),
                hasCustomTitleBar = !!this.initialConfig.titleBar;

            if (titleBar) {
                if (title) {
                    titleBar.setTitle(title);
                    titleBar.show();
                }
                else if (!hasCustomTitleBar) {
                    titleBar.hide();
                }
            }
        },

        // titleBar

        applyTitleBar: function(config, existing) {
            if (existing && !Ext.isDefined(config.hidden)) {
                Ext.merge(config, {
                    hidden: false
                });
            }

            if (existing && !Ext.isDefined(config.items)) {
                Ext.merge(config, {
                    items: []
                });
            }

            return Ext.updateWidget(existing, config);
        },

        updateTitleBar: function(titleBar) {
            if (!titleBar || !titleBar.getTitle || !titleBar.setTitle || !!
            titleBar.getTitle()) {
                return;
            }

            titleBar.setTitle(this.getTitle());
        },

        // totalColumnWidth

        applyTotalColumnWidth: function(totalColumnWidth) {
            var rows = this.dataItems;

            // If we don't have any items yet, wait
            return rows.length === 0 ? undefined : totalColumnWidth;
        },

        // verticalOverflow

        updateVerticalOverflow: function(value, was) {
            var headerContainer = this.getHeaderContainer(),
                summaryRow = this.findPlugin('summaryrow') || this.findPlugin('gridsummaryrow'),
                scrollable = this.getScrollable(),
                verticalScrollbarWidth = scrollable && scrollable.getScrollbarSize().width,
                y = !!(scrollable && scrollable.getY()),
                addOverflow = y && verticalScrollbarWidth > 0 && value,
                row;

            this.callParent([value, was]);

            // TODO: refactor this code within headerContainer and summaryRow
            headerContainer.setVerticalOverflow(addOverflow);

            if (summaryRow) {
                row = summaryRow.getRow();

                if (!row.destroyed) {
                    row.rightSpacer.setStyle({
                        width: (addOverflow ? (verticalScrollbarWidth - 1) : 0) + 'px'
                    });
                }
            }
        },

        // Enable column reorder
        updateEnableColumnMove: function(enabled) {
            var me = this,
                plugin = me.findPlugin('headerreorder');

            if (!plugin && enabled) {
                plugin = me.addPlugin('headerreorder');
            }

            if (plugin) {
                plugin.setGrid(enabled ? me : null);
            }
        },

        /**
         * @method getSelection
         * Returns the grid's selection if {@link Ext.grid.selection.Model#cfg!mode mode} is single 
         * @return {Ext.data.Model} returns selected record if selectable is rows
         * @return {Ext.grid.column.Column} returns selected column if selectable is columns
         * @return {Ext.data.Model} returns selected record if selectable is cells
         * 
         * Returns the last selected column/cell's record/row's record based on selectable
         * if {@link Ext.grid.selection.Model#cfg!mode mode} is multi
         */
        getSelection: function() {
            var me = this,
                selectable = me.getSelectable(),
                selection = selectable.getSelection(),
                selectionType = selection.type;

            if (selectionType === 'columns') {
                return selection.lastColumnSelected;
            }

            if (selectionType === 'cells') {
                return selection.endCell && selection.endCell.record;
            }

            return this.callParent();
        },

        /**
         * Register events for column state persistance.
         * @private
         */
        registerColumnState: function() {
            var me = this,
                eventsMap = me.columnStateEventMap,
                eventObj = {},
                key;

            if (!me.isColumnsStateful()) {
                return;
            }

            for (key in eventsMap) {
                eventObj[key] = 'onStateChange';
            }

            eventObj.scope = me;
            eventObj.buffer = me.columnStateEventDelay;

            me.on(eventObj);
        },

        /**
         * Handler for {@link #columnStateEventMap} events.
         * @private
         */
        onStateChange: function() {
            var me = this,
                state, items;

            if (!me.isColumnsStateful()) {
                return;
            }

            state = me.columnStateData || {};
            items = me.getHeaderContainer().items;

            me.updateColumnStateProp(items.items);

            me.columnStateData = me.calculateColumnState(items, state);

            me.persistColumnState(me.columnStateData);
        },

        /**
         * Iterate through each column and assign headerId and item group move.
         * @param {Ext.grid.column.Column[]/Object[]} columns {@link #columns}
         * @param {String} ownerHeaderId Column Header Id
         * @private
         */
        updateColumnStateProp: function(columns, ownerHeaderId) {
            var i, column;

            ownerHeaderId = ownerHeaderId ? (ownerHeaderId + this.headerIdSeparator) : '';

            for (i = 0; i < columns.length; i++) {
                column = columns[i];

                column.headerId = this.getColumnStateId(column) || (ownerHeaderId + 'h' + i);

                // re-iterate for header group
                if (column.isHeaderGroup || !Ext.isEmpty(column.columns)) {
                    this.updateColumnStateProp(column.innerItems || column.columns,
                                               column.headerId);
                }
            }

            return columns;
        },

        /**
         * Read all the column state.
         * @param {Ext.grid.column.Column[]} columns {@link #columns}
         * @param {Object[]} columnsState Column State
         * @private
         */
        calculateColumnState: function(columns, columnsState) {
            var me = this,
                eventsMap = me.columnStateEventMap,
                key, cfg, prop, hId, value;

            columns.each(function(column) {
                // don't calculate column state if it's explicitly set to false
                if (column.getStateful() === false) {
                    return;
                }

                hId = me.getColumnStateId(column);

                // Locked Grid: If column is moved to different region,
                // store data to the region specific prefixed ID
                if (column.region && column.region !== column.regionKey) {
                    hId = column.regionKey + ':' + hId;
                }

                columnsState[hId] = columnsState[hId] || {};

                for (key in eventsMap) {
                    prop = eventsMap[key];

                    cfg = column.self.$config.configs[prop];

                    if (cfg) {
                        value = column[cfg.names.get]();

                        // do not store the state property, if it's not changed
                        if (!Ext.isEmpty(value)) {
                            columnsState[hId][prop] = value;
                        }
                    }
                }

                // assign parent header id to the column, if it's inside nested column
                delete columnsState[hId].parentHeaderId;

                if (column.parent && column.parent.headerId) {
                    columnsState[hId].parentHeaderId = column.parent.headerId;
                }

                // Locked Grid - Pass column new region key info to the state data
                if (column.region) {
                    columnsState[hId].region = column.region;
                }
                else {
                    // remove saved region from state data, if column is moved back to
                    // its original state
                    delete columnsState[hId].region;
                }

                // get column order on the nested group
                if (column.isHeaderGroup) {
                    me.calculateColumnState(column.items, columnsState);
                }
            });

            return columnsState;
        },

        /**
         * Reposition columns from the saved state.
         * @param {Object[]} columns {@link #columns}
         * @private
         */
        adjustColumnFromState: function(columns) {
            var me = this,
                stateData;

            if (!me.isColumnsStateful()) {
                return;
            }

            stateData = me.getColumnState();

            if (Ext.Object.isEmpty(stateData)) {
                return;
            }

            if (me.fireEvent('beforestaterestore', me, stateData) === false) {
                return;
            }

            me.updateColumnStateBeforeAdd(stateData, columns);

            me.fireEvent('staterestore', me, stateData);
        },

        /**
         * Return matched column from the group
         * @private
         */
        findColumnByParentHeaderId: function(columns, column) {
            var i, item, matched, innerItems;

            for (i = 0; i < columns.length; i++) {
                item = columns[i] || columns.items[i];

                if (item.headerId === column.parentHeaderId) {
                    return item;
                }
                else if (!Ext.isEmpty(item.columns) || item.isHeaderGroup) {
                    innerItems = item.isGridColumn ? item.innerItems : item.columns;

                    matched = this.findColumnByParentHeaderId(innerItems, column);

                    if (matched) {
                        return matched;
                    }
                }
            }
        },

        /**
         * Update column config with saved state data
         * @private
         */
        updateColumnStateBeforeAdd: function(columnsState, columns) {
            var me = this,
                i, column, data;

            if (!me.isColumnsStateful() || Ext.isEmpty(columns)) {
                return;
            }

            for (i = 0; i < columns.length; i++) {
                column = columns[i];
                data = columnsState[column.headerId];

                if (data) {
                    Ext.apply(column, data);

                    if (!Ext.isEmpty(column.columns)) {
                        me.updateColumnStateBeforeAdd(columnsState, column.columns);
                    }
                }
            }

            // re-arrange column item based on it's parent header ID
            me.adjustNestedStateBeforeAdd(columns);
        },

        /**
         * If column item is moved to different header, move the item
         * @private
         */
        adjustNestedStateBeforeAdd: function(columns) {
            var me = this,
                i, column, matched, mainColumns;

            for (i = 0; i < columns.length; i++) {
                column = columns[i];

                mainColumns = me._columns;

                if (!column.parentHeaderId) {
                    // Move nested column to root header container
                    if (mainColumns.indexOf(column) === -1) {
                        me.rearrangeColumn(mainColumns, columns, column);

                        // re-iterate the loop to have correct column order after move
                        i = -1;
                    }

                    continue;
                }

                matched = me.findColumnByParentHeaderId(columns, column);

                if (matched && Ext.isArray(matched.columns)) {
                    me.rearrangeColumn(matched.columns, columns, column);

                    // re-iterate the loop to have correct column order after move
                    i = -1;
                }
                else {
                    // move deep nested column to its moved header container
                    matched = me.findColumnByParentHeaderId(mainColumns, column);

                    if (matched && Ext.isArray(matched.columns) &&
                    matched.columns.indexOf(column) === -1) {
                        me.rearrangeColumn(matched.columns, columns, column);

                        // re-iterate the loop to have correct column order after move
                        i = -1;
                    }
                }
            }
        },

        rearrangeColumn: function(matched, columns, column) {
            Ext.Array.insert(matched, column.weight, [column]);
            Ext.Array.removeAt(columns, columns.indexOf(column));
        },

        /**
         * Reposition columns from the saved state.
         * @param {Object} columnsState Columns state data.
         * @param {Ext.grid.column.Column[]/Object[]} columns {@link #columns}
         * @private
         */
        applyColumnState: function(columnsState, columns) {
            var me = this,
                eventsMap = me.columnStateEventMap,
                data, key, prop, cfg;

            if (!me.isColumnsStateful()) {
                return;
            }

            columnsState = columnsState || me.getColumnState();

            if (Ext.Object.isEmpty(columnsState)) {
                return;
            }

            if (Ext.isEmpty(columns)) {
                columns = me.getHeaderContainer().items;
            }

            columns.each(function(column) {
                // Locked Grid - do not update the moved column property
                if (column.region) {
                    return;
                }

                data = columnsState[me.getColumnStateId(column)];

                if (data) {
                    for (key in eventsMap) {
                        prop = eventsMap[key];

                        // ignore weight property to be set, if it has different new group
                        if (Ext.isEmpty(data[prop]) || prop === 'weight' &&
                        data.parentHeaderId !== me.getColumnStateId(column.parent)) {
                            continue;
                        }

                        cfg = column.self.$config.configs[prop];

                        if (cfg) {
                            column[cfg.names.set](data[prop]);
                        }
                    }

                    if (column.isHeaderGroup) {
                        me.applyColumnState(columnsState, column.items);
                    }
                }
            });

            me.adjustNestedState(columns, columnsState);
        },

        adjustNestedState: function(columns, columnsState) {
            var matched, pId, stateItem, headerCt;

            columns.each(function(column) {
                pId = column.parentHeaderId;

                stateItem = columnsState[column.headerId];

                if (stateItem) {
                    pId = stateItem.parentHeaderId;
                    column.parentHeaderId = pId;
                }

                if (!pId) {
                    headerCt = column.getRootHeaderCt();

                    // Move nested column to root header container, if dragged out side
                    if (headerCt.indexOf(column) === -1) {
                        headerCt.insert(stateItem.weight, column);

                        // re-run the loop if column gets re-arranged.
                        this.adjustNestedState(columns, columnsState);

                        return false;
                    }

                    return;
                }

                matched = this.findColumnByParentHeaderId(columns, column);

                if (matched && matched.isHeaderGroup) {
                    matched.insert(stateItem.weight, column);

                    // re-run the loop if column gets re-arranged.
                    this.adjustNestedState(columns, columnsState);

                    return false;
                }
            }, this);
        },

        /**
         * Return {Object} saved column state.
         * @private
         */
        getColumnState: function() {
            var me = this,
                state, provider, id;

            if (!me.isColumnsStateful()) {
                return;
            }

            if (me.columnStateData) {
                return me.columnStateData;
            }

            state = me.getStateBuilder();

            if (state) {
                provider = Ext.state.Provider.get();
                id = state.root.id + '-column-state';

                return provider.get(id);
            }
        },

        /**
         * Save column state.
         * @param {Object} columnsState Column State data
         * @private
         */
        persistColumnState: function(columnsState) {
            var me = this,
                state, provider, id;

            if (me.fireEvent('beforestatesave', me, columnsState) === false) {
                return;
            }

            state = me.getStateBuilder();

            if (state) {
                provider = Ext.state.Provider.get();
                id = state.root.id + '-column-state';

                provider.set(id, columnsState);

                me.fireEvent('statesave', me, columnsState);
            }
        },

        /**
         * Checks if grid is stateful and has column state map events
         * @returns {Boolean}
         */
        isColumnsStateful: function() {
            var me = this,
                stateId = me.getStateId(),
                stateful = me.config.stateful,
                eventsMap = me.columnStateEventMap;

            return !(!stateId || !stateful || Ext.Object.isEmpty(eventsMap));
        },

        /**
         * Manage state for the header group remove
         */
        onColumnGroupRemove: function(headerCt, column) {
            var me = this,
                id, region;

            if (!me.isColumnsStateful()) {
                return;
            }

            region = me.region;
            id = me.getColumnStateId(column);

            // Locked Grid: notify if header group is removed
            if (region && region.isLockedGridRegion) {
                me.fireEvent('regioncolumngroupremove', column, id);

                return;
            }

            column.setHidden(true);
            me.onStateChange();
        },

        getColumnStateId: function(column) {
            return column.stateId || column._stateId || column.headerId;
        }
    } // privates

}, function(Grid) {
    Grid.prototype.indexModifiedFields = Ext.Array.toMap;
});
