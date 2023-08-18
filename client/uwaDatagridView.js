define("UWADatagridView", [
    "UWA/Class/View",
    "UWA/Class/Debug",
    "UWA/String",
  ], function (View, Debug, UWAString) {
    "use strict";

    console.log("inside view");
    var UWADatagridView = UWA.Class.View.extend(UWA.Class.Debug, {
      tagName: "div",

      className: "myClass",

    //   domEvents: {
    //     "click .icon": "open",
    //     "click button.edit": "openEditDialog",
    //     "click button.delete": "delete",
    //   },

      setup: function () {
        console.log("inside setup");
        // this.collection.fetch(); // onComplete() --> posts --> render()
        // this.listenTo(this.model, "onChange", this.render);
        this.log("initialized!");
      },

      render: function () {
        console.log("rendering");

        // Create dataGrid instance
        uwaDatagridView1 = new UWA.Controls.DataGrid({
            className: 'my-dataGrid',
            columns: [
                {
                    dataIndex: 'id',
                    isFixed: true,
                    noSortable: true,
                    isFirst: true
                },
                {
                    text: 'Date',
                    dataIndex: 'date',
                    format: function (value) {
                        return UWA.Date.strftime(value, '%d %B %Y');
                    },
                    sortKey: function (value) {
                        return value.getMonth();
                    },
                    isFixed: true,
                    className: 'date-column'
                },
                {
                    text: 'Name',
                    dataIndex: 'name',
                    sortKey: function (value) {
                        return value.split(' ').slice(1).join(' ');
                    }
                },
                {
                    text: 'First Value',
                    dataIndex: 'first_value'
                },
                {
                    text: 'Second Value',
                    dataIndex: 'second_value'
                },
                {
                    text: 'Third Value',
                    dataIndex: 'third_value'
                },
                {
                    text: 'Fourth Value',
                    dataIndex: 'fourth_value'
                }
            ],
            data: [
                {'id': 1, 'date': new Date('2012-07-01'), 'name': 'Foo Bar 1', 'first_value': '100', 'second_value': '15 256', 'third_value': '2 000', 'fourth_value': '3 200',
                    'className': 'class-first-line', 'isFixed': true},
                {'id': 2, 'date': new Date('2012-03-10'), 'name': 'Foo Bar 2', 'first_value': '10 200', 'second_value': '15 250', 'third_value': '145 000', 'fourth_value': '15 000'},
                {'id': 3, 'date': new Date('2012-10-08'), 'name': 'Foo Bar 3', 'first_value': '120 400', 'second_value': '150 226', 'third_value': '45 000', 'fourth_value': '100'},
                {'id': 4, 'date': new Date('2012-10-12'), 'name': 'Foo Bar 4', 'first_value': '10 000', 'second_value': '15 200', 'third_value': '45 001', 'fourth_value': '30'},
                {'id': 5, 'date': new Date('2012-02-10'), 'name': 'Foo Bar 5', 'first_value': '10 000', 'second_value': '15 006', 'third_value': '45 000', 'fourth_value': '13 000'},
                {'id': 6, 'date': new Date('2012-04-10'), 'name': 'Foo Bar 6', 'first_value': '15 000', 'second_value': '22 256', 'third_value': '5 480', 'fourth_value': '30 010'},
                {'id': 7, 'date': new Date('2012-05-10'), 'name': 'Foo Bar 7', 'first_value': '10 000', 'second_value': '15 256', 'third_value': '45 070', 'fourth_value': '3000'},
                {'id': 8, 'date': new Date('2012-06-10'), 'name': 'Foo Bar 8', 'first_value': '10 000', 'second_value': '100 256', 'third_value': '45 010', 'fourth_value': '3000'},
                {'id': 9, 'date': new Date('2012-07-10'), 'name': 'Foo Bar 9', 'first_value': '188 000', 'second_value': '1 256', 'third_value': '45 400', 'fourth_value': '3000'},
                {'id': 10, 'date': new Date('2012-08-10'), 'name': 'Foo Bar 10', 'first_value': '10 000', 'second_value': '15 256', 'third_value': '4 000', 'fourth_value': '3000'}
            ],
            sortable: widget.getBool('sortable')
        }).inject(this.container);

        uwaDatagridView1.addScroller();
        return this;
      },
    });

  return UWADatagridView;
  });
