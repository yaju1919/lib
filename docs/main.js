(function () {
    'use strict';
    try{
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
        //------------------------------------------------------------------------------------------------------
        // 型判定
        getType: function(x){ // 型を返す
            return Object.prototype.toString.call(x).replace(/\[object |\]/g,'');
            // return value sample
            // "String","Number","Boolean","Array","Object","RegExp",
            // "Function","Null","Undefined"
            // "HTMLElement","HTMLDivElement","HTMLSpanElement","HTMLUnknownElement" etc
        },
        judgeType: function(x, typeName){ // xが指定された型名ならtrueを返す
            var type = yaju1919.getType(x);
            switch(yaju1919.getType(typeName)){
                case "String":
                    return typeName === type;
                case "Array":
                    return typeName.indexOf(type) !== -1;
                default:
                    return null;
            }
        },
        setDefaultValue: function(param, default_param){ // 引数は共に連想配列, 同じキーの型が異なる場合paramの値をdefault_paramの値に上書き
            if(!yaju1919.judgeType(param,"Object")) param = {};
            for(var key in default_param){
                var default_type = yaju1919.getType(default_param[key]);
                var type = yaju1919.getType(param[key]);
                if(type !== default_type) param[key] = default_param[key];
            }
            return param;
        },
        //------------------------------------------------------------------------------------------------------
        // 闇鍋
        try: function(func){ // 失敗しても処理が止まるらないようにfuncを実行する
            try {
                func();
            }
            catch (err) {
                console.error(err);
            }
        },
        max: function(array){ // 配列から最大値を求める
            return array.reduce(function(a,b){
                return a > b ? a : b;
            });
        },
        min: function(array){ // 配列から最小値を求める
            return array.reduce(function(a,b){
                return a < b ? a : b;
            });
        },
        randInt: function(min, max){ // ランダムな整数を返す
            return Math.floor(Math.random() * Math.abs(max - min + 1)) + min;
        },
        makeArray: function(num){ // 0からn-1までの連続した数値の配列を返す
            if(isNaN(num)) return [];
            var ar = [];
            for(var i = 0; i < num; i++) ar.push(i);
            return ar;
        },
        randArray: function(array){ // 配列のランダムな要素を返す
            return array[Math.floor(Math.random()*array.length)];
        },
        repeat: function(str, num){ // strをnum回繰り返した文字列を返す
            return new Array(num + 1).join(str);
        },
        getTime: function(){ // xx:yy:zz の形式で現在時刻の文字列を返す
            return new Date().toString().match(/[0-9]{2}:[0-9]{2}:[0-9]{2}/)[0];
        },
        getBrowser: function(){ // ブラウザの名前を取得
            var ua = window.navigator.userAgent.toLowerCase();
            if(ua.indexOf("edge") !== -1 || ua.indexOf("edga") !== -1 || ua.indexOf("edgios") !== -1) {
                return "Microsoft Edge";
            }
            else if (ua.indexOf("opera") !== -1 || ua.indexOf("opr") !== -1) {
                return "Opera";
            }
            else if (ua.indexOf("samsungbrowser") !== -1) {
                return "Samsung Internet Browser";
            }
            else if (ua.indexOf("ucbrowser") !== -1) {
                return "UC Browser";
            }
            else if(ua.indexOf("chrome") !== -1 || ua.indexOf("crios") !== -1) {
                return "Google Chrome";
            }
            else if(ua.indexOf("firefox") !== -1 || ua.indexOf("fxios") !== -1) {
                return "Mozilla Firefox";
            }
            else if(ua.indexOf("safari") !== -1) {
                return "Safari";
            }
            else if (ua.indexOf("msie") !== -1 || ua.indexOf("trident") !== -1) {
                return "Internet Explorer";
            }
            return false;
        },
        getOS: function(){ // OSの名前を取得
            var ua = window.navigator.userAgent.toLowerCase();
            if(ua.indexOf("windows nt") !== -1) {
                return "Microsoft Windows";
            } else if(ua.indexOf("android") !== -1) {
                return "Android";
            } else if(ua.indexOf("iphone") !== -1 || ua.indexOf("ipad") !== -1) {
                return "iOS";
            } else if(ua.indexOf("mac os x") !== -1) {
                return "macOS";
            }
            return false;
        },
        getIP: function(callback){ // IPアドレス等の情報を取得し、callbackの引数に渡す
            var xhr = new XMLHttpRequest();
            xhr.open( 'GET', "https://ipinfo.io/?callback=a" );
            xhr.responseType = 'text';
            xhr.onload = function(){
                var m = xhr.response.match(/{.*?}/);
                if(!m) return;
                callback(JSON.parse(m[0]));
            };
            xhr.send();
        },
        //------------------------------------------------------------------------------------------------------
        // 文字列操作
        toHan: function(str){ // 全角→半角
            return str.replace(/[Ａ-Ｚａ-ｚ０-９！-～]/g, function(c){
                return String.fromCharCode(c.charCodeAt(0) - 0xFEE0);
            });
        },
        toZen: function(str){ // 半角→全角
            return str.replace(/[A-Za-z0-9!-~]/g, function(c){
                return String.fromCharCode(c.charCodeAt(0) + 0xFEE0);
            });
        },
        toHira: function(str){ // カナ→ひら
            return str.replace(/[\u30a1-\u30f6]/g, function(c){
                return String.fromCharCode(c.charCodeAt(0) - 0x60);
            });
        },
        toKana: function(str){ // ひら→カナ
            return str.replace(/[\u3041-\u3096]/g, function(c){
                return String.fromCharCode(c.charCodeAt(0) + 0x60);
            });
        },
        };
    }catch(err){
        alert(err);
    }
})();
