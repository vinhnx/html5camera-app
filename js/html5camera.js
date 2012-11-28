(function() {
  if (window.navigator.appName === "Microsoft Internet Explorer") { // oh hai, MSIE!
    document.write('<div id="msg">Oh hai! Internet Explorer!<p>Try using modern ones like: <a href="//www.google.com">Google Chrome</a>, <a href="//www.mozilla.org/en-US/firefox/new/">Mozilla Firefox</a> or <a href="//www.opera.com/">Opera</a></p></div>');
  } else if(Modernizr.canvas) {
      var canvas = document.getElementById("canvas"),
        choices = document.getElementById("choices"),
        cheese = document.getElementById("cheese"),
        video = document.getElementById("video"),
        save = document.getElementById("save");

      window.addEventListener("DOMContentLoaded", function() {
        var ctx = canvas.getContext("2d"),
            video = document.getElementById("video"),
            videoObj = { "video": true }, // type = video
            errBack = function(error) {
              console.log("Error: ", error.code);
          };

        // getUserMedia :)
        if(navigator.getUserMedia) { // standard
          navigator.getUserMedia(videoObj, function(stream) {
            video.src = stream;
            video.play();
          }, errBack); // throws error!
        } else if(navigator.webkitGetUserMedia) { // webkit
          navigator.webkitGetUserMedia(videoObj, function(stream){
            video.src = window.webkitURL.createObjectURL(stream);
            video.play();
          }, errBack);
        }

        // canvas for image previewing
        cheese.addEventListener("click", function() {
            ctx.drawImage(video, 0, 0, 640, 480);
        });

        video.addEventListener("click", function() {
            ctx.drawImage(video, 0, 0, 640, 480);
        });
      }, false);

      cheese.addEventListener("click", function() {
        canvas.style.display = "block"; // show the canvas
        choices.style.display = "block"; // show the effect
      });

      video.addEventListener("click", function() {
        canvas.style.display = "block"; // show the canvas
        choices.style.display = "block"; // show the effect
      });

      save.onclick = function save() {
        window.open(canvas.toDataURL("image/png")); // open image in a new windows for previewing :)
      };

    } else {
      // if using unsupported browser
      // gently prompt it!
      document.write('<div id="msg">Oh snap! Your browser doesn\'t fully support this app!.<p>Try using modern ones like: <a href="//www.google.com">Google Chrome</a>, <a href="//www.mozilla.org/en-US/firefox/new/">Mozilla Firefox</a> or <a href="//www.opera.com/">Opera</a></p></div>');
  }
})();
