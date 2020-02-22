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
                if(x.message){
                    str = String(x);
                    break;
                }
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
    function addBtn(title, func){
        return $("<button>").text(title).appendTo(h).click(func);
    };
    addBtn("JSの実行",function(){
        output.empty();
        var v = input.val();
        try {
            console.log((0, eval)(v));
        }
        catch (e) {
            console.error(e);
        }
    });
    addBtn("pageのソースコードを取得",function(){
        $.get("https://raw.githubusercontent.com/yaju1919/page/master/main.js",function(r){
            $("#input").val(r);
        })
    });
    addBtn("yaju1919.jsのソースコードを取得",function(){
        $.get("https://yaju1919.github.io/lib/lib/yaju1919.js",function(r){
            $("#input").val(r);
        })
    });
    var input = $("<textarea>").appendTo(h).attr("id","input");
    var output = $("<div>").appendTo(h);
})();
