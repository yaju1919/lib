(function(window, undefined){
    "use strict";
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
        //------------------------------------------------------------------------------------------------------
        // URL関連
        makeArrayURL: function(str){ // 与えられた文字列からURL文字列を探し、配列を返す
            var m = str.match(/(https?|ftp)(:\/\/[-_.!~*\'()a-zA-Z0-9;\/?:\@&=+\$,%#]+)/g);
            return m ? m : [];
        },
        // 以下2つとも引数の指定が無ければ現在閲覧しているサイトのURLが入る
        getDomein: function(url){ // URLのドメインを配列にして返す
            var a = url || location.href;
            return a.replace(/^.+?\/\/|\/.*$/g,'').split('.');
        },
        getParam: function(url){ // URLのクエリパラメータを連想配列形式で取得
            var a = url || location.href,
                p = {};
            var q = a.split('?');
            if(q.length === 1) return {};
            q[1].split('&').map(function(v){
                var ar = v.split('=');
                if(ar.length !== 2) return;
                p[ar[0]] = ar[1];
            });
            return p;
        },
        //------------------------------------------------------------------------------------------------------
        // ブラウザによって仕様が変わりやすいデリケートな操作
        copy: function(str){ // 文字列をクリップボードにコピー
            var e = document.createElement("textarea");
            e.textContent = str;
            document.body.appendChild(e);
            e.select();
            document.execCommand('copy');
            document.body.removeChild(e);
            return true;
        },
        download: function(str, title){ // 文字列をテキストファイル形式で保存
            if(!yaju1919.judgeType(str,"String") || str === '') return false; // 失敗
            if(!yaju1919.judgeType(title,"String") || title === '') return false; // 失敗
            var strText = str.replace(/\n/g,'\r\n'); // 改行を置換
            var bom = new Uint8Array([0xEF, 0xBB, 0xBF]);// 文字化け対策
            var blob = new Blob([bom, strText], {type: "text/plain"});
            var a = document.createElement("a");
            a.href = URL.createObjectURL(blob);
            a.target = '_blank';
            a.download = title + '.txt';
            a.click();
            return true; // 成功
        },
        //------------------------------------------------------------------------------------------------------
        // データの保存
        makeSaveKey: function(key){ // URLごとに保存する領域を分けるためのキーを作成
            if(!yaju1919.judgeType(key,"String") || key === '') return false;
            var thisURL = location.href.split('?')[0] + '|'; // クエリを除く
            return thisURL + key;
        },
        getSaveKeys: function(){ // 保存されているキーを配列で取得
            var ar = [], i = 0;
            var thisURL = location.href.split('?')[0] + '|';
            if(window.localStorage){
                while(true){
                    var key = window.localStorage.key(i++);
                    if(!key) break;
                    if(!key.indexOf(thisURL)) ar.push(key.replace(thisURL,''));
                }
            }
            else {
                document.cookie.split(';').map(function(v){
                    var key = yaju1919.decode(v.split('=')[0]);
                    if(!key.indexOf(thisURL)) ar.push(key.replace(thisURL,''));
                });
            }
            return ar;
        },
        removeSaveData: function(key){ // 指定されたキーのデータを削除
            var SaveKey = yaju1919.makeSaveKey(key);
            if(!SaveKey) return false;
            if(window.localStorage) window.localStorage.removeItem(SaveKey);
            else document.cookie = yaju1919.encode(SaveKey) + "=; max-age=0";
            return true;
        },
        save: function(key, value){ // 文字列を保存
            var SaveKey = yaju1919.makeSaveKey(key);
            if(!SaveKey) return false;
            if(window.localStorage) window.localStorage.setItem(SaveKey, value);
            else document.cookie = yaju1919.encode(SaveKey) + '=' + yaju1919.encode(value);
            return true;
        },
        load: function(key, callback){ // 保存した文字列の読み込み(callbackの引数に渡される)
            var SaveKey = yaju1919.makeSaveKey(key);
            if(!SaveKey) return false;
            var data = null;
            if(window.localStorage){
                data = window.localStorage.getItem(SaveKey);
                if(data === null) return false;
            }
            else {
                var key2 = yaju1919.encode(SaveKey);
                var idx = document.cookie.indexOf(key2 + '=') + key2.length + 1;
                if(idx === -1) return false;
                data = yaju1919.decode(document.cookie.slice(idx).split(';')[0]);
            }
            callback(data);
            return true;
        },
        //------------------------------------------------------------------------------------------------------
        // DOM操作
        getCSS: function(elm){ // elmのCSSの値を取得する
            var e = $(elm || document.body).get(0);
            return e.currentStyle || document.defaultView.getComputedStyle(e, '');
        },
        getFontSize: function(elm){ // elmのフォントサイズを取得する
            var size = yaju1919.getCSS(elm).fontSize;
            return Number(size.slice(0,-2)) + 1;
        },
        getRGB: function(color){ // color文字列をRGBの配列にして返す。
            var elm = $("<div>").appendTo(document.body).css("color",color);
            var m = yaju1919.getCSS(elm).color.match(/[0-9]+/g).map(function(n){
                return Number(n);
            });
            elm.remove();
            return m;
        },
        setBgImage: (function(){
            var cover;
            return function(url,opt){ // 背景画像を設定する。
                var p = yaju1919.setDefaultValue(opt,{
                    color: "white",
                    opacity: 0.9 // 透過度
                });
                $("body").css({
                    "background-image": 'url("' + url + '")',
                    "background-attachment": "fixed", // コンテンツの高さが画像の高さより大きい時、動かないように固定
                    "background-position": "center center",// 画像を常に天地左右の中央に配置
                    "background-size": "cover", // 表示するコンテナの大きさに基づいて、背景画像を調整
                    "background-repeat": "no-repeat", // 画像をタイル状に繰り返し表示しない
                });
                if(cover) cover.remove();
                cover = $("<div>").appendTo($("body")).css({
                    zIndex: -114514,
                    background: "rgba(" + yaju1919.getRGB(p.color).join(',') + "," + p.opacity + ")",
                    position: "fixed",
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0
                });
                return true;
            };
        })(),
        // HTML要素を追加する
        // これより下の関数の返り値は、入力値を返す関数
        addInputText: function(parentNode, param){ // 文字列入力欄を追加
            var p = yaju1919.setDefaultValue(param,{
                id: '', // HTML
                class: '', // HTML
                title: '', // タイトル
                placeholder: '', // 説明文
                value: '', // 初期値
                change: function(){}, // 値が変更されたとき実行する関数
                enter: function(){}, // Enterキーで実行する関数
                save: '', // 変更された値を保存する領域
                hankaku: true, // trueなら自動で半角化
                max: Infinity, // 入力可能な最大長
                textarea: false, // trueならtextarea要素になる
                width: '', // widthがこの値で固定
                height: '', // heightがこの値で固定(textareaの時のみ有効)
                readonly: false, // trueならユーザーは編集不可&クリック時全選択&コピー
            });
            var h = $("<div>").appendTo(parentNode);
            if(p.title !== '') h.text(p.title + ':');
            var i = $(p.textarea ? "<textarea>" : "<input>").appendTo(h)
            .attr('placeholder',p.placeholder)
            .css({
                maxWidth: "95%",
                minWidth: yaju1919.getFontSize() * 5,
                "vertical-align": "middle"
            })
            .keypress(function(e){
                if(e.key === 'Enter') p.enter();
            })
            .keyup(resizeHeight).click(resizeHeight)
            .keyup(resize).click(resize)
            .change(change).val(p.value);
            if(p.id !== '') i.attr('id', p.id);
            if(p.class !== '') i.addClass(p.class);
            if(p.readonly) {
                i.attr("readonly", true).click(function(){
                    yaju1919.copy(i.val());
                    i.select();
                }).css({
                    backgroundColor: "#e9e9e9",
                    tabIndex: -1,
                    cursor: "pointer"
                });
            }
            yaju1919.load(p.save, function(v){
                i.val(v);
            });
            function resizeHeight(){
                if(!p.textarea) return;
                if(p.height !== '') return i.height(p.height);
                var line = i.val().split('\n').length;
                var line_p = p.placeholder.split('\n').length;
                if(line < line_p) line = line_p;
                // If the string length is too long
                var fontSize = yaju1919.getFontSize(),
                    width = $(parentNode).width();
                i.val().split('\n').forEach(function(v){
                    line += Math.floor((v.length * fontSize) / width);
                });
                i.height(line + "em");
            }
            resizeHeight();
            function mostLongLine(str){ // 文字列の中で最も長い行の文字数
                return yaju1919.max(str.split('\n').map(function (v){
                    return v.length;
                }));
            }
            function resize(){
                if(p.width !== '') return i.width(p.width);
                var maxWidth = $(parentNode).width(),
                    fontSize = yaju1919.getFontSize();
                if(p.title !== '') maxWidth -= fontSize * (p.title.length + 1);
                var width = fontSize * mostLongLine(i.val());
                if(p.placeholder !== '') {
                    var phWidth = fontSize * mostLongLine(p.placeholder);
                    if(phWidth > width) width = phWidth;
                }
                if(width > maxWidth) width = maxWidth;
                i.width(width);
            }
            resize();
            $(window).resize(resize);
            function change(){
                var v = i.val().trim();
                if(p.hankaku) v = yaju1919.toHan(v);
                if(v.length > p.max) v = v.slice(0, p.max);
                var re = p.change(v);
                if(yaju1919.judgeType(re,"String")) v = re;
                i.val(v);
                yaju1919.save(p.save, v);
            }
            yaju1919.try(change);
            return function(){
                return i.val();
            };
        },
        addInputNumber: function(parentNode, param){ // 数値入力欄を追加
            var p = yaju1919.setDefaultValue(param,{
                id: '', // HTML
                class: '', // HTML
                title: '', // タイトル
                placeholder: '', // 説明文
                value: 0, // 初期値
                change: function(){}, // 値が変更されたとき実行する関数
                enter: function(){}, // Enterキーで実行する関数
                save: '', // 変更された値を保存する領域
                min: 0, // 入力可能な最小値
                max: Infinity, // 入力可能な最大値
                int: false, // trueなら自動で整数化
                width: '', // widthがこの値で固定
                readonly: false, // trueならユーザーは編集不可&クリック時全選択&コピー
            });
            var lastInput, h = $("<div>").appendTo(parentNode);
            if(p.title !== '') h.text(p.title + ':');
            var i = $("<input>").appendTo(h)
            .attr('placeholder',p.placeholder)
            .css({
                maxWidth: "95%",
                minWidth: yaju1919.getFontSize() * 5
            })
            .keypress(function(e){
                if(e.key === 'Enter') p.enter();
            })
            .keyup(resize).click(resize)
            .change(change).val(p.value);
            if(p.id !== '') i.attr('id', p.id);
            if(p.class !== '') i.addClass(p.class);
            if(p.readonly) {
                i.attr("readonly", true).click(function(){
                    yaju1919.copy(i.val());
                    i.select();
                }).css({
                    backgroundColor: "#e9e9e9",
                    tabIndex: -1,
                    cursor: "pointer"
                });
            }
            yaju1919.load(p.save, function(v){
                i.val(v);
            });
            function mostLongLine(str){ // 文字列の中で最も長い行の文字数
                return yaju1919.max(str.split('\n').map(function (v){
                    return v.length;
                }));
            }
            function resize(){
                if(p.width !== '') return i.width(p.width);
                var maxWidth = $(parentNode).width(),
                    fontSize = yaju1919.getFontSize();
                if(p.title !== '') maxWidth -= fontSize * (p.title.length + 1);
                var width = fontSize * mostLongLine(i.val());
                if(p.placeholder !== '') {
                    var phWidth = fontSize * mostLongLine(p.placeholder);
                    if(phWidth > width) width = phWidth;
                }
                if(width > maxWidth) width = maxWidth;
                i.width(width);
            }
            resize();
            $(window).resize(resize);
            function change(){
                var n = Number(yaju1919.toHan(i.val().trim()).replace(/[^0-9\.\-\+]/g,""));
                i.css({backgroundColor: "white"});
                if(isNaN(n)) {
                    i.val(lastInput || p.value || '');
                    i.css({backgroundColor: "pink"});
                    return;
                }
                else if(n < p.min) n = p.min;
                else if(n > p.max) n = p.max;
                if(p.int) n = Math.floor(n);
                var re = p.change(n);
                if(yaju1919.judgeType(re,"Number")) n = re;
                var v = String(n);
                i.val(v);
                lastInput = v;
                yaju1919.save(p.save, v);
            }
            yaju1919.try(change);
            return function(){
                return Number(i.val());
            };
        },
        addInputBool: function(parentNode, param){ // ON OFFボタンを追加
            var p = yaju1919.setDefaultValue(param,{
                id: '', // HTML(button)
                class: '', // HTML(button)
                title: '', // タイトル
                value: false, // 初期値
                change: function(){}, // 値が変更されたとき実行する関数
                save: '', // 変更された値を保存する領域
                width: '', // widthの設定
            });
            var flag = p.value;
            var btn = $("<button>").appendTo(parentNode)
            .css({
                maxWidth: "95%",
                minWidth: yaju1919.getFontSize() * 5
            })
            .text(p.title).click(function(){
                flag = !flag;
                change();
            });
            if(p.id !== '') btn.attr('id', p.id);
            if(p.class !== '') btn.addClass(p.class);
            var check = $("<input>",{type:"checkbox"}).prependTo(btn);
            yaju1919.load(p.save, function(v){
                flag = (v === '1');
            });
            function change(){
                var re = p.change(flag);
                if(yaju1919.judgeType(re,"Boolean")) flag = re;
                btn.css("background-color", flag ? "orange" : "gray");
                check.prop("checked", flag);
                yaju1919.save(p.save, flag ? '1' : '0');
            }
            yaju1919.try(change);
            if(p.width !== '') return btn.width(p.width);
            return function(){
                return flag;
            };
        },
        addSelect: function(parentNode, param){ // 選択肢を追加
            var p = yaju1919.setDefaultValue(param,{
                id: '', // HTML(select)
                class: '', // HTML(select)
                title: '', // タイトル
                placeholder: '', // 説明文
                value: '', // 初期値
                change: function(){}, // 値が変更されたとき実行する関数
                save: '', // 変更された値を保存する領域
                list: {}, // 選択肢の連想配列
                width: '', // widthがこの値で固定
            });
            var h = $("<div>").appendTo(parentNode);
            if(p.title !== '') h.text(p.title + ':');
            var i = $("<select>").appendTo(h)
            .css({
                maxWidth: "95%",
                minWidth: yaju1919.getFontSize() * 5
            })
            .hover(updateSelect)
            .on('updateSelect', updateSelect) // 'updateSelect'イベントをtoggleなどで発火させると更新
            .keyup(resize).click(resize)
            .change(change);
            function getValue(){
                return i.val() || '';
            }
            if(p.id !== '') i.attr('id', p.id);
            if(p.class !== '') i.addClass(p.class);
            function updateSelect(){
                var v = getValue();
                i.empty();
                if(p.placeholder !== '') $("<option>",{text:p.placeholder}).val('').hide().appendTo(i);
                for(var k in p.list) $("<option>",{text:k}).val(p.list[k]).appendTo(i);
                if(v) i.val(v);
            }
            updateSelect();
            i.val(p.value);
            yaju1919.load(p.save, function(v){
                i.val(v);
            });
            function mostLongLine(str){ // 文字列の中で最も長い行の文字数
                return yaju1919.max(str.split('\n').map(function (v){
                    return v.length;
                }));
            }
            function resize(){
                if(p.width !== '') return i.width(p.width);
                var maxWidth = $(parentNode).width(),
                    fontSize = yaju1919.getFontSize();
                if(p.title !== '') maxWidth -= fontSize * (p.title.length + 1);
                var width = fontSize * mostLongLine(getValue());
                if(p.placeholder !== '') {
                    var phWidth = fontSize * mostLongLine(p.placeholder);
                    if(phWidth > width) width = phWidth;
                }
                if(width > maxWidth) width = maxWidth;
                i.width(width);
            }
            resize();
            $(window).resize(resize);
            function change(){
                var v = getValue();
                var re = p.change(v);
                if(yaju1919.judgeType(re,"String")) v = re;
                i.val(v);
                yaju1919.save(p.save, v);
            }
            yaju1919.try(change);
            return getValue;
        },
        addHideArea: function(parentNode, param){ // ボタンで表示を切り替えられる非表示エリアを追加
            var p = yaju1919.setDefaultValue(param,{ // addInputBool参照
                id2: '', // HTML(div) 非表示エリアのdiv要素
                class2: '', // HTML(div)
                speed: 300, // 表示するスピード[秒]
            });
            var front = $("<span>").appendTo(parentNode);
            var area = $("<div>").appendTo(parentNode);
            p.change = function(flag){ // changeはこの関数が使うので設定しても反映されない
                area[flag ? "show" : "hide"](p.speed);
            }
            if(p.id2 !== '') area.attr('id', p.id2);
            if(p.class2 !== '') area.addClass(p.class2);
            return yaju1919.addInputBool(front, p);
        }
        //------------------------------------------------------------------------------------------------------
    };
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