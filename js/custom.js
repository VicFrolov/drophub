$(function() {

    //credit for this function call goes to Rob Gravelle
    $('#dropMain').on({
        'dragover dragenter': function(e) {
            e.preventDefault();
            e.stopPropagation();
        },
        'drop': function(e) {
            //console.log(e.originalEvent instanceof DragEvent);
            var dataTransfer =  e.originalEvent.dataTransfer;
            if (dataTransfer && dataTransfer.files.length) {
                e.preventDefault();
                e.stopPropagation();
                $.each(dataTransfer.files, function(i, file) { 
                    var reader = new FileReader();
                    reader.onload = $.proxy(function(file, $fileList, event) {
                        var img = file.type.match('image.*') 
                            ? "<img src='" + event.target.result + "' /> " 
                            : "";
                        $fileList.prepend($("<div>").append(img));
                    }, this, file, $("#dropMain"));
                    reader.readAsDataURL(file);
                });
            }
        }
    });

});