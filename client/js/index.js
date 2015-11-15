function main(){


    //SOCKET IOCODE

    var socket = io.connect('http://ServerAddress:9001');
    //var socket = io.connect('http://sociamvm-app-001.ecs.soton.ac.uk:90
    socket.on('tweets', function (tweet) {

     var image_url = "";
     try{

        try{

                if(tweet.entities.media[0]){

                  var url = tweet.entities.media[0];
                  //console.log(url);
                  //if(url.type.indexOf(".jpg") > -1){

                        url = url.media_url;
                        image_url = url;
                        console.log(url);
                        //}
                }
        }catch(error){}
        //var image_url = tweet.user.profile_image_url;

        // images
        if (image_url && image_url != "") {
            var div = $("#collageContainer");
            var img = new Image(image_url);
            img.onload = function () {
              try{
              div.append($("<img src='"+image_url+"' height='100%'>"));
              if (div.children().length > 25000) {
                div.children()[0].remove();
              }
            }catch(err){}
            };
            img.src = image_url;
        }
        }catch(e){};
        //console.log(tweet)

    });
};




//For the MongoDB version:

socket.emit("load_data","");

socket.on('historic_data', function (databaseDump) {

    for(var i=0; i<databaseDump.length; i++){
        console.log(databaseDump[i].status)
    }
    
});
