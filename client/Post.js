define("Post", [
    "UWA/Class/Model",
    "UWA/Class/Debug",
    "UWA/String",
  ], function (Model, Debug, UWAString) {
    "use strict";

    console.log("inside define model");
    var Post = Model.extend(Debug, {
      urlRoot: "/posts",

      defaults: {
        title: "defaulttitle",
        message: "defaultmessage",
      },

      setup: function () {
        var that = this;
        that.log("Welcome to this post");
      },
    });

    return Post;
  });
