$(function() {

    //credit for this function call goes to Rob Gravelle
    $('#dropMain, .drop').on({
        'dragover dragenter': function(e) {
            e.preventDefault();
            e.stopPropagation();
        },
        'drop': function(e) {
            var dropArea = this;
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
                        $fileList.append(img);
                    }, this, file, $(dropArea));
                    reader.readAsDataURL(file);
                });
            }
        }
    });

});