define("MyProject/Model/Post", [
    "UWA/Class/Model",
    "UWA/Class/Debug",
    "UWA/String",
  ], function (Model, Debug, UWAString) {
    "use strict";

    console.log("inside define model");
    var Post = Model.extend(Debug, {
      urlRoot: "/posts",

      defaults: {
        title: "json-server",
        message: "Scheherazade",
      },

      setup: function () {
        var that = this;
        that.log("Welcome to this post");
      },

      // Validate data before you set or save it :
      validate: function (attributes) {
        // Add validation logic here if needed
      },
    });

    return Post;
  });
