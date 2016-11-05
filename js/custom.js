$(function() {
    
    $('#dropMain, .drop').on({
        'click': function(e) {
            $('#fileBox').click();

            $("#fileBox").change(function() {
                previewImage(this, e.target);
            });

        },
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
                            ? $("<img>").attr('src', event.target.result) : "";
                        $fileList.empty().append(img);
                    }, this, file, $(dropArea));
                    reader.readAsDataURL(file);
                });
            }
        }
    });


    var previewImage = function(input, destination) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                console.log(destination)
                $(destination).empty().append($("<img>").attr('src', e.target.result));
            }
            reader.readAsDataURL(input.files[0]);
        }
    }


});