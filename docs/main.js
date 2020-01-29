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
    (function(window,undefined){
    var type_reg = new RegExp((function(){
        var array = [
            'ぁ-ん',
            'ァ-ヴーｱ-ﾝﾞｰ',
            '一-龠々〆ヵヶ',
            'a-zA-Zａ-ｚＡ-Ｚ',
            '0-9０-９',
            '・、。,\\.？\\?！「」!',
            '　 ',
            '\n'
        ];
        return 1;
        /*
        array.push('^' + array.join(''));
        return array.map(str => "[" + str + "]+").join('|');*/
    })(), 'g');
    function main(_str, _num){
        if(typeof _str !== "string") return null;
        if (0 < Number(_num) && !isNaN(_num)) {
            var reg = new RegExp('(.|\n){1,' + _num + '}', 'g');
            return _str.match(reg) || null;
        }
        return _str.match(type_reg) || null;
    }
    window.WA_KA_CHI_GA_KI = main;
})(window);
    alert("22:37");
    alert(!!window.WA_KA_CHI_GA_KI)
    //--
    yaju1919.addInputText(h,{
        title: "てすや"
    })
})();
