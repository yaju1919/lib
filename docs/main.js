(function () {
    'use strict';
    var h = $("<div>").appendTo(document.body);
    $("<h1>",{text:"test"}).appendTo(h);
    alert(typeof TinySegmenter + typeof getRoman + typeof $);
    var func1 = (function(){
        function func2(){}
        return func2;
    })();
    alert(func1);
    var func3 = (function(){
        function func3(){}
        return func3;
    })();
    alert(func3);
    alert("おわり");
    yaju1919.addInputText(h,{
        title: "てすや"
    })
})();
