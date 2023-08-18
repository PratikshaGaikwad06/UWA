define("Posts", [
    "UWA/Class/Collection",
    "Post",
  ], function (Collection, Post) {
    
    // Given this model definition :
    var Posts = Collection.extend({
      url: "/posts",
      model: Post,
    });

    console.log("inside define collection");

    return Posts;
  });
