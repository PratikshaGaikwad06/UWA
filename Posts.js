define("MyProject/Collection/Posts", [
    "UWA/Class/Collection",
    "MyProject/Model/Post",
  ], function (Collection, Post) {
    

    // This example is a brief overview of some of the methods/APIs offered
    // by UWA.Class.Collection. Have a look at the detailed documentation of each API
    // if needed.

    
    // Given this model definition :
    var Posts = Collection.extend({
      url: "/posts",
      model: Post,
    });

    console.log("inside define collection");

    return Posts;
  });
