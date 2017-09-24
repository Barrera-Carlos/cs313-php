/*jquwey functions need to be inside a document ready event
so the hquery code does not run before the document if fininidhed
loading*/
$(document).ready(function(){
    $("img").mouseover(function(){
        $("#face").attr("src", "imgP/fFace.jpg");
    });
    $("img").mouseout(function(){
        $("#face").attr("src", "imgP/sFace.jpg");
    });
});
