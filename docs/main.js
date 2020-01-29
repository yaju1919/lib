(function () {
    'use strict';
    var h = $("<div>").appendTo(document.body);
    $("<h1>",{text:"test"}).appendTo(h);
    [
        "jQuery",
        "TinySegmenter",
        "readBigTextForEachLine",
        "WA_KA_CHI_GA_KI",
        "getRoman",
        "yaju1919",
    ].map(function(v){
        var a = window[v];
        $("<div>").text(v + ':' + (a ? "OK" : "Error")).appendTo(document.body);
    });
    //--
    alert("23:42");
    var list = ['a' , 'b', ]; // →　要素３個のarrayが生成される。
    alert(list);
    var obj = { a : 1, b : 2, }; // → 文法エラー
    alert(obj);
    //--
    yaju1919.addInputText(h,{
        title: "てすや"
    })
})();
