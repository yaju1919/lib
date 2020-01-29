(function () {
    'use strict';
    var h = $("<div>").appendTo(document.body);
    $("<h1>",{text:"test"}).appendTo(h);
    alert(typeof TinySegmenter + typeof getRoman + typeof $);
    var unk = (function(){
return "うんこ";
})();
    alert(unk);
    alert("おわり");
    yaju1919.addInputText(h,{
        title: "てすや"
    })
})();
