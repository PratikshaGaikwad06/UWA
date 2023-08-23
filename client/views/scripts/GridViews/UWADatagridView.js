define("scripts/GridViews/UWADatagridView", [
  "UWA/Class/View",
  "UWA/Controls/DataGrid",
  "UWA/Class/Debug",
  "scripts/models/Post",
  "scripts/models/Posts",
], function (View, DataGrid, Debug, Post, Posts) {
  "use strict";

  // Create dataGrid instance
  function createDatagrid(dataArray) {
    var uwaDatagrid = new DataGrid({
      className: "my-dataGrid",
      columns: [
        {
          text: "id",
          dataIndex: "id",
          isFixed: true,
          noSortable: true,
          isFirst: true,
        },
        {
          text: "title",
          dataIndex: "title",
        },
        {
          text: "message",
          dataIndex: "message",
        },
      ],
      data: JSON.parse(JSON.stringify(dataArray)),
      sortable: widget.getBool("sortable"),
    });
    uwaDatagrid.addScroller();
    return uwaDatagrid;
  }

  var dataGrid;

  console.log("inside view");
  var UWADatagridView = View.extend(Debug, {
    tagName: "div",

    className: "myClass",

    //   domEvents: {
    //     "click .icon": "open",
    //     "click button.edit": "openEditDialog",
    //     "click button.delete": "delete",
    //   },

    setup() {
      var that = this;
      console.log("inside setup");
      this.collection.fetch({
        reset: true,
        onComplete: function (posts, response, options) {
          // console.table(posts.toArray());
          console.log("oncomplete" + response);
          that.render();
          console.log("proceeding");
          // console.log("data grid", createDatagrid(this.collection.toArray()));
        },
        onFailure: function (posts, response, options) {
          UWA.log("Oupss");
          console.log("onfailure");
        },
      });
      // this.collection.fetch(); // onComplete() --> posts --> render()
      // this.listenTo(this.model, "onChange", this.render);
      this.log("initialized!");
    },

    domEvents: {
      "click button.getRows": "getCollectionRows",
      "click button.addRow": "addRowInCollection",
      "click button.deleteRow": "deleteRowInCollection",
    },

    render() {
      console.log("rendering");
      // console.log(this.collection.toArray());
      dataGrid = createDatagrid(this.collection.toArray());
      console.log(JSON.parse(JSON.stringify(this.collection.toArray())));
      this.container.setContent([
        dataGrid,
        {
          tag: "button",
          text: "Get",
          class: "getRows",
        },
        {
          tag: "button",
          text: "Add",
          class: "addRow",
        },
        {
          tag: "button",
          text: "Delete",
          class: "deleteRow",
        },
      ]);
      return this;
    },
    getCollectionRows() {
      console.log("in get collection");
      this.setup();
    },

    addRowInCollection() {
      const that = this;
      console.log("in add row", that);
      const post = new Post();
      post.save(
        {
          title: "Sample Title",
          message: "Sample Message",
        },
        {
          wait: true,
          onComplete: function (post, response) {
            post.log("Successfully saved!");
            // console.log("added new post!", response);
            // alert("added new post!");
            // that.collection.fetch();
            console.log(post.id, post.get("title"), post.get("message"));
            that.collection.push(post);
            that.render();
            // that.setup();
            // dataGrid.updateData(
            //   ["id", "title", "message"],
            //   [post.id, post.get("title"), post.get("message")]
            // );
          },
          onFailure: function (person, error) {
            person.log(person.toJSON());
            person.log(error.responseText);
            console.log(person.toJSON());
            console.log(error.responseText);
          },
        }
      );
    },

    deleteRowInCollection() {
      console.log("in delete row");
      const that = this;
      const lastElement = that.collection.last();
      lastElement.destroy();
      that.render();
    },
  });
  return UWADatagridView;
});
