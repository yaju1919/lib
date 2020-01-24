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
    rand: function(array){ // ランダムな要素を返す
        return array[Math.floor(Math.random()*array.length)];
    },
    randInt: function(min, max){ // ランダムな整数を返す
        return Math.floor(Math.random() * Math.abs(max - min + 1)) + min;
    },
    getTime: function(){ // xx:yy:zz の形式で現在時刻の文字列を返す
        return new Date().toString().match(/[0-9]{2}:[0-9]{2}:[0-9]{2}/)[0];
    },
    getIP: function(callback){ // IPアドレス等の情報を取得し、callbackの引数に渡す
        var xhr = new XMLHttpRequest();
        xhr.open( 'GET', "https://ipinfo.io/?callback=a" );
        xhr.responseType = 'text';
        xhr.onload = function() {
            if (xhr.status !== 200) return;
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
    toZan: function(str){ // 半角→全角
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
    getDomein: function(url){ // URLのドメインを抽出し、逆順の配列にして返す
        var a = url || location.href;
        return a.replace(/^.+?\/\/|\/.*$/g,'').split('.').reverse();
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
        return location.href.split('?')[0] + '|' + key; // クエリを除く
    },
    save: function(key, value){ // 文字列を保存
        var SaveKey = yaju1919.makeSaveKey(key);
        if(!SaveKey) return false;
        localStorage.setItem(SaveKey, value);
        return true;
    },
    load: function(key, callback){ // 保存した文字列の読み込み(callbackの引数に渡される)
        var SaveKey = yaju1919.makeSaveKey(key);
        if(!SaveKey) return false;
        var data = localStorage.getItem(SaveKey);
        if(data === null) return false;
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
        return Number(size.replace("px",'')) + 1;
    },
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
        });
        var h = $("<div>").appendTo($(parentNode));
        if(p.title !== '') h.append(p.title + ':');
        var i = $(p.textarea ? "<textarea>" : "<input>").appendTo(h)
        .attr('placeholder',p.placeholder)
        .css({
            maxWidth: "100%",
            minWidth: yaju1919.getFontSize(parentNode) * 5,
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
        yaju1919.load(p.save, function(v){
            i.val(v);
        });
        function resizeHeight(){
            if(!p.textarea) return;
            var line = i.val().split('\n').length;
            var line_p = p.placeholder.split('\n').length;
            if(line < line_p) line = line_p;
            // If the string length is too long
            var fontSize = yaju1919.getFontSize(parentNode),
                width = $(parentNode).width();
            i.val().split('\n').forEach(function(v){
                line += Math.floor((v.length * fontSize) / width);
            });
            i.height(line + "em");
        }
        resizeHeight();
        function resize(){
            var maxWidth = $(parentNode).width(),
                fontSize = yaju1919.getFontSize(parentNode);
            if(p.title !== '') maxWidth -= fontSize * (p.title.length + 1);
            var width = fontSize * i.val().length;
            if(p.placeholder !== '') {
                var placeholderWidth = fontSize * p.placeholder.length;
                if(placeholderWidth > width) width = placeholderWidth;
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
        change();
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
        });
        var lastInput, h = $("<div>").appendTo($(parentNode));
        if(p.title !== '') h.append(p.title + ':');
        var i = $("<input>").appendTo(h)
        .attr('placeholder',p.placeholder)
        .css({
            maxWidth: "100%",
            minWidth: yaju1919.getFontSize(parentNode) * 5
        })
        .keypress(function(e){
            if(e.key === 'Enter') p.enter();
        })
        .keyup(resize).click(resize)
        .change(change).val(p.value);
        if(p.id !== '') i.attr('id', p.id);
        if(p.class !== '') i.addClass(p.class);
        yaju1919.load(p.save, function(v){
            i.val(v);
        });
        function resize(){
            var maxWidth = $(parentNode).width(),
                fontSize = yaju1919.getFontSize(parentNode);
            if(p.title !== '') maxWidth -= fontSize * (p.title.length + 1);
            var width = fontSize * i.val().length;
            if(p.placeholder !== '') {
                var placeholderWidth = fontSize * p.placeholder.length;
                if(placeholderWidth > width) width = placeholderWidth;
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
        change();
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
        });
        var flag = p.value;
        var btn = $("<button>").appendTo($(parentNode))
        .css({
            maxWidth: "100%",
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
        change();
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
        });
        var h = $("<div>").appendTo($(parentNode));
        if(p.title !== '') h.append(p.title + ':');
        var s = $("<select>").appendTo(h)
        .css({
            maxWidth: "100%",
            minWidth: yaju1919.getFontSize(parentNode) * 5
        })
        .hover(updateSelect)
        .on('updateSelect', updateSelect) // 'updateSelect'イベントをtoggleなどで発火させると更新
        .keyup(resize).click(resize)
        .change(change);
        if(p.id !== '') s.attr('id', p.id);
        if(p.class !== '') s.addClass(p.class);
        function updateSelect(){
            var v = s.val();
            s.empty();
            if(p.placeholder !== '') $("<option>",{text:p.placeholder}).val('').hide().appendTo(s);
            for(var k in p.list) $("<option>",{text:k}).val(p.list[k]).appendTo(s);
            if(v) s.val(v);
        }
        updateSelect();
        s.val(p.value);
        yaju1919.load(p.save, function(v){
            s.val(v);
        });
        function resize(){
            var maxWidth = $(parentNode).width(),
                fontSize = yaju1919.getFontSize(parentNode);
            if(p.title !== '') maxWidth -= fontSize * (p.title.length + 1);
            var width = fontSize * i.val().length;
            if(p.placeholder !== '') {
                var placeholderWidth = fontSize * p.placeholder.length;
                if(placeholderWidth > width) width = placeholderWidth;
            }
            if(width > maxWidth) width = maxWidth;
            s.width(width);
        }
        resize();
        $(window).resize(resize);
        function change(){
            var v = s.val();
            var re = p.change(v);
            if(yaju1919.judgeType(re,"String")) v = re;
            s.val(v);
            yaju1919.save(p.save, v);
        }
        change();
        return function(){
            return s.val();
        };
    },
    addHideArea: function(parentNode, param){ // ボタンで表示を切り替えられる非表示エリアを追加
        var p = yaju1919.setDefaultValue(param,{ // addInputBool参照
            id2: '', // HTML(div) 非表示エリアのdiv要素
            class2: '', // HTML(div)
            speed: 300, // 表示するスピード[秒]
        });
        var front = $("<span>").appendTo($(parentNode));
        var area = $("<div>").appendTo($(parentNode));
        p.change = function(flag){ // changeはこの関数が使うので設定しても反映されない
            area[flag ? "show" : "hide"](p.speed);
        }
        if(p.id2 !== '') area.attr('id', p.id2);
        if(p.class2 !== '') area.addClass(p.class2);
        return yaju1919.addInputBool(front, p);
    }
    //------------------------------------------------------------------------------------------------------
};
