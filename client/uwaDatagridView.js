var uwaDatagridView1;

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

    domEvents: {
      "click button.post-btn": "postContent",
      "click button.put-btn": "putContent",
      "click button.delete-btn": "deleteContent",
    },

    postContent: function () {
      var that = this;
      UWA.log("post was clicked!");
        that.collection.create({title: "Post5 title",
        message: "message 5"},{
            onComplete: function (post, response) {
              console.log(response);
              console.log("Successfully saved!");
            },
            onFailure: function (post, error) {
              console.log(post.JSON());
              post.log(error.responseText);
            },
        });
    },

    putContent: function () {
      var that = this;
      UWA.log("put was clicked!");
        that.collection.at(1).save(
          { title: "title10" },
          {
            // wait: true,
            onComplete: function (post, response) {
              console.log("Successfully updated title!");
            },
            onFailure: function (post, error) {
              console.log(post.toJSON());
              post.log(error.responseText);
            },
          }
        );
    },

    deleteContent: function () {
      var that = this;
      UWA.log("delete was clicked!");
        that.collection.at(1).destroy({
          onComplete: function (post, response) {
            console.log("Successfully deleted title!");
          },
          onFailure: function (post, error) {
            console.log(post4.toJSON());
            post.log(error.responseText);
          },
        });
    },

    
    setup: function () {
      var that = this;
      console.log("inside setup");      
      this.fetchData();
      // this.collection.fetch(); // onComplete() --> posts --> render()
      this.listenTo(this.collection, "onChange", this.render);
      this.listenTo(this.collection, "onRemove", this.render);
      this.log("initialized!");
    },


    render: function () {
      console.log("rendering");
      console.log(JSON.parse(JSON.stringify(this.collection.toArray())));

      
      // Create dataGrid instance
      uwaDatagridView1 = new UWA.Controls.DataGrid({
        className: "my-dataGrid",
        columns: [
          {
            text: "id",
            dataIndex: "id",
            // isFixed: true,
            // noSortable: true,
            // isFirst: true
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
        data: JSON.parse(JSON.stringify(this.collection.toArray())),
        sortable: widget.getBool("sortable"),
      });

      this.container.setContent([
        {
          tag: "button",
          class: "post-btn",
          text: "POST",
        },
        {
          tag: "button",
          class: "put-btn",
          text: "UPDATE",
        },
        {
          tag: "button",
          class: "delete-btn",
          text: "DELETE",
        },
      ]);

      uwaDatagridView1.inject(this.container);
      uwaDatagridView1.addScroller();

      return this;
    },

    fetchData: function () {
      var that = this;
      this.collection.fetch({
        reset: true,
        onComplete: function (posts, response, options) {
          // Handle the completion of the fetch operation as needed
          console.table(posts.toArray());
          console.log("oncomplete" + response);
          that.render(); // Call the render method after fetching data
        },
        onFailure: function (posts, response, options) {
          // Handle fetch failure
          UWA.log("Oupss");
          console.log("onfailure");
        },
      });
    },
  });

  return UWADatagridView;
});
