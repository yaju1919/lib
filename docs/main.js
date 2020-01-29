(function () {
    'use strict';
    var h = $("<div>").appendTo(document.body);
    $("<h1>",{text:"お使いの端末でどのライブラリが使え無いのかチェック"}).appendTo(h);
    [
        "jQuery",
        "TinySegmenter",
        "readBigTextForEachLine",
        "WA_KA_CHI_GA_KI",
        "getRoman",
        "yaju1919",
    ].map(function(v){
        var a = window[v];
        $("<div>").text(v + ':' + (a ? "OK" : "Error")).appendTo(h);
    });
    h.append("<br>");
    h.append("<br>");
    $("<h2>").text("JSエディタ").appendTo(h);
    function console_log(x,color){
        var str = '';
        switch(typeof x){
            case "object":
                str = '{' + Object.keys(x).map(function(k){
                    return k + ':' + String(x[k])
                }).join(',') + '}';
                break;
            default:
                str = String(x);
                break;
        }
        $("<div>").text(str).css({backgroundColor:color}).appendTo(output);
    };
    if(!window.console) window.console = {};
    console.log = function(x){ console_log(x,"gray") };
    console.error = function(x){ console_log(x,"pink") };
    console.warn = function(x){ console_log(x,"yellow") };
    console.info = function(x){ console_log(x,"lightblue") };
    $("<button>").text("JSの実行").appendTo(h).click(function(){
        output.empty();
        var v = input();
        try {
            console.log((0, eval)(v));
        }
        catch (e) {
            console.error(e);
        }
    });
    var input = $("<textarea>").appendTo(h);
    var output = $("<div>").appendTo(h);
})();
