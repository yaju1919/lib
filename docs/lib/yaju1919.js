(function(window, undefined){
    var yaju1919 = {};
    yaju1919.baseN = function(base){ // N進数を作成するクラス,baseは重複のない文字列
        if(typeof base !== "string") return false; // error
        var len = base.length;
        if(len < 2) return false; // error
        function encode(num){ // 10進数をN進数に変換
            var str = "", v = num;
            if(!v) return base[0];
            while(v){
                v = Math.floor(v);
                str = base[v % len] + str;
                v /= len;
            }
            return str.slice(1);
        };
        function decode(str){ // N進数を10進数に変換
            return String(str).split('').reverse().map(function(v,i){
                return base.indexOf(v) * Math.pow(len, i);
            }).reduce(function(total, v){
                return total + v;
            });
        };
        return {
            encode: encode,
            decode: decode,
            base: base
        };
    };
    (function(){
        // 0~9 a~z A~V → 無変換、左端にWを追加する
        // 58進数の一桁、左端にXを追加する
        // 58進数の二桁、左端にYを追加する
        // 58進数の三桁、左端にZを追加する
        var to58 = yaju1919.baseN([ // 58進数
            '0123456789',
            'abcdefghijklmnopqrstuvwxyz',
            'ABCDEFGHIJKLMNOPQRSTUV',
        ].join(''));
        var SIGN = 'WXYZ';
        yaju1919.encode = function(str){ // 文字列をエンコード
            if(typeof str !== "string") return false; // error
            return str.split('').map(function(v){
                if(to58.base.indexOf(v) !== -1) return SIGN[0] + v + SIGN[0];
                else {
                    var str = to58.encode(v.charCodeAt(0));
                    if(str.length > 3) return ''; // 58**3以上のユニコードは空文字
                    var len = str.length;
                    return SIGN[len] + (yaju1919.repeat('0',len) + str).slice(-len) + SIGN[len];
                }
            }).join('').replace(/(W|X|Y|Z)\1/g,'').replace(/(W|X|Y|Z)(?=(W|X|Y|Z))/g,'').slice(0,-1);
        };
        yaju1919.decode = function(str){ // エンコードされた文字列をデコード
            if(typeof str !== "string") return false; // error
            return str.replace(/(W|X|Y|Z)[^WXYZ]*/g, function(v){
                var s = v.slice(1);
                var idx = SIGN.indexOf(v[0]);
                if(!idx) return s;
                return s.replace(new RegExp(".{" + idx + "}", 'g'), function(n){
                    return String.fromCharCode(to58.decode(n));
                });
            });
        };
    })();
    //------------------------------------------------------------------------------------------------------
    //------------------------------------------------------------------------------------------------------
    window.yaju1919 = yaju1919;
})(window);
