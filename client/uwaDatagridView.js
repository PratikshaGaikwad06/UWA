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
    },

    postContent: function (domEvent) {
      UWA.log("I was clicked!");
    },

    // getContent: function () {
    //   console.log("inside get func");

    //   var that = this; // Store the reference to this (UWADatagridView)
    //   this.collection.fetch({
    //     reset: true,
    //     onComplete: function (posts, response, options) {
    //       // Handle the completion of the fetch operation as needed
    //       console.table(posts.toArray());
    //       console.log("oncomplete" + response);
    //        // Update the DataGrid's data with the fetched data
    //       // uwaDatagridView1.setData(JSON.parse(JSON.stringify(posts.toArray())));
    //       // Render the DataGrid
    //       // uwaDatagridView1.render();
    //       that.render(); // Use that to call the render method
    //       // console.log(that.render);
    //     },
    //     onFailure: function (posts, response, options) {
    //       // Handle fetch failure
    //       UWA.log("Oupss");
    //       console.log("onfailure");
    //     },
    //   });
    //   // this.dispatchEvent("getContent", [this.model]);
    //   // this.model.set("title","new title")
    //   // this event can be caught by the parent view to display
    //   // the doc editor in an overlay panel for example.
    // },

    setup: function () {
      var that = this;
      console.log("inside setup");
      // Call the fetchData function to fetch data during setup
      // this.collection.fetch({
      //   reset: true,
      //   onComplete: function (posts, response, options) {
      //     // Handle the completion of the fetch operation as needed
      //     console.table(posts.toArray());
      //     console.log("oncomplete" + response);
      //     that.render();
      //     console.log(that.render);
      //     // Trigger a re-render or update your view with the new data
      //   },
      //   onFailure: function (posts, response, options) {
      //     // Handle fetch failure
      //     UWA.log("Oupss");
      //     console.log("onfailure");
      //   },
      // });
      // this.getContent();
      this.fetchData();
      // this.render(); // Call the render method after fetching data
      // this.collection.fetch(); // onComplete() --> posts --> render()
      this.listenTo(this.collection, "onAdd", this.render);
      this.log("initialized!");
    },

    render: function () {
      var that = this;
      console.log("rendering");
      // console.log(this.collection.toArray());
      console.log(JSON.parse(JSON.stringify(this.collection.toArray())));

      // Create a button container div
      var buttonContainer = UWA.createElement("div", {
        class: "button-container",
      });
      require(["Post"], function (Post) {
        var post7 = new Post({
          "id" : 5,
          // title: "title7",
          // message: "message7",
        });
       

        // "Get" button
        var getButton = UWA.createElement("button", {
          class: "get-btn",
          text: "Get",
          events: {
            click: function (event) {
              // var that = this; // Store the reference to the view
              console.log(that);
              // that.fetchData();
              that.collection.fetch({
                reset: true,
                onComplete: function (posts, response, options) {
                  this.fetchData();
                  // Handle the completion of the fetch operation as needed
                  console.table(posts.toArray());
                  console.log("oncomplete" + response);
                },
                onFailure: function (posts, response, options) {
                  // Handle fetch failure
                  UWA.log("Oupss");
                  console.log("onfailure");
                },
              });
            //   // this.fetchData();
            }.bind(this),

            // click: getContent,
            // click: function (event) {
            //   // this.fetchData();
            //   // Handle the click event for the "Get" button
            //   // You can add your logic here
            // },
          },
        });
// that.collection.add(post7);
        // "Post" button
        var postButton = UWA.createElement("button", {
          class: "post-btn",
          text: "Post",
          events: {
            click: function (event) {
              console.log("post method called");
              alert(post7.isNew() + " in alert"); // alerts 'true'
              post7.save({
                onComplete: function (post7, response) {
                  
                  console.log("Successfully saved!");
                },
                onFailure: function (post7, error) {
                  post7.log(post7.toJSON());
                  post7.log(error.responseText);
                },
              });
            },
          },
        });

        // "Put" button
        var putButton = UWA.createElement("button", {
          class: "put-btn",
          text: "Put",
          events: {
            click: function (event) {
              post7.save(
                { title: "title10" },
                {
                  // wait: true,
                  onComplete: function (post7, response) {
                    console.log("Successfully updated title!");
                  },
                  onFailure: function (post7, error) {
                    console.log(post7.toJSON());
                    post7.log(error.responseText);
                  },
                }
              );
            },
          },
        });

        // Create a "Delete" button
        var deleteButton = UWA.createElement("button", {
          class: "delete-btn",
          text: "Delete",
          events: {
            click: function (event) {
              post7.destroy();
            },
          },
        });

        buttonContainer.appendChild(getButton);
        buttonContainer.appendChild(postButton);
        buttonContainer.appendChild(putButton);
        buttonContainer.appendChild(deleteButton);
      });

      this.container.appendChild(buttonContainer);

      // Create dataGrid instance
      uwaDatagridView1 = new UWA.Controls.DataGrid({
        className: "my-dataGrid",
        columns: [
          {
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
      }).inject(this.container);

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
