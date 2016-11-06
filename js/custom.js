$(function() {

    var reader;
    var drop;
    
    $('#dropMain, .drop').on({
        'click': function(e) {
            $('#fileBox').click();
            drop = this;
            reader = new FileReader();
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
                    reader = new FileReader();
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


    $("#fileBox").change(function() {
        if (this.files && this.files[0]) {
            reader.onload = function (e) {
                $(drop).empty().append($("<img>").attr("src", reader.result));
            }
            reader.readAsDataURL(this.files[0]);
        }
    });


});