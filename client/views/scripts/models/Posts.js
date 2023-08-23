define("scripts/models/Posts", [
    "UWA/Class/Collection",
    "scripts/models/Post",
  ], function (Collection, Post) {
    
    // Given this model definition :
    var Posts = Collection.extend({
      url: "/posts",
      model: Post,
      // parse: function (response) {
      //     return response._attributes;
      // }
    });

    console.log("inside define collection");

    return Posts; 
  });
