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
        addEventHandler(window, 'load', function() {
            var status = document.getElementById('status');
            var drop   = document.getElementById('drop');
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
        });

    } else { 
        document.getElementById('status').innerHTML = 'Your browser does not support the HTML5 FileReader.';
    }

});