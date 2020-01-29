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
    alert("22:48");
    (function(window, undefined){
    alert("yaju1919-0");
    var yaju1919 = {
        //------------------------------------------------------------------------------------------------------
        // メタ
        hello: function(){ // このライブラリの関数の説明
            var sstr = '';
            for(var k in yaju1919) {
                var str = String(yaju1919[k]);
                var agm = str.match(/function.*?(\(.*?\))/);
                agm = agm ? agm[1] : '<not function>';
                var cmt = str.match(/\/\/.*\n/);
                cmt = cmt ? cmt[0] : '';
                sstr += [k, agm, cmt].join(' ');
            }
            return sstr;
        },
    };
        window.yaju1919 = yaju1919;
    })(window);
    alert("result");
    alert(window.yaju1919);
    //--
    yaju1919.addInputText(h,{
        title: "てすや"
    })
})();
