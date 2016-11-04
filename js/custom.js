$(function() {

    $('.drop, #dropMain').click(function(){
        console.log('click');
        $('#fileBox').trigger('click');
    });

    var addEventHandler = function(obj, evt, handler) {
        if(obj.addEventListener) {
            // W3C method
            obj.addEventListener(evt, handler, false);
        } else if(obj.attachEvent) {
            // IE method.
            obj.attachEvent('on'+evt, handler);
        } else {
            // Old school method.
            obj['on'+evt] = handler;
        }
    }

    if (window.FileReader) {
        var drop;
        addEventHandler(window, 'load', function() {
            var status = document.getElementById('status');
            drop   = document.getElementById('drop');
            var list   = document.getElementById('list');
            
            var cancel = function(e) {
                if (e.preventDefault) { 
                    e.preventDefault(); 
                }
                return false;
            }
          
            // Tells the browser that we *can* drop on this target
            addEventHandler(drop, 'dragover', cancel);
            addEventHandler(drop, 'dragenter', cancel);

            addEventHandler(drop, 'drop', function (e) {
              e = e || window.event; // get window.event if e argument missing (in IE)
              console.log("test")
              if (e.preventDefault) { e.preventDefault(); } // stops the browser from redirecting off to the image.

              var dt    = e.dataTransfer;
              var files = dt.files;
              for (var i=0; i<files.length; i++) {
                var file = files[i];
                var reader = new FileReader();
                  
                //attach event handlers here...
                console.log(file)
                reader.readAsDataURL(file);
              }
              return false;
            });            
        });

    } else { 
        document.getElementById('status').innerHTML = 'Your browser does not support the HTML5 FileReader.';
    }

});