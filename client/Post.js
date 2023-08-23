define("Post", [
    "UWA/Class/Model",
    "UWA/Class/Debug"
  ], function (Model, Debug) {
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
