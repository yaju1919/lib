var yaju1919_library = {
    win: window.unsafeWindow || window,
    //------------------------------------------------------------------------------------------------------
    rand: function(array){ // ランダムな要素を返す
        return array[Math.floor(Math.random()*array.length)];
    },
    getTime: function(){ // xx:yy:zz の形式で現在時刻の文字列を返す
        return new Date().toString().match(/[0-9]{2}:[0-9]{2}:[0-9]{2}/)[0];
    },
    getType: function(a){ // 型を返す
        return Object.prototype.toString.call(a).replace(/\[object |\]/g,"");
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
    getDomein: function(url){ // URLのドメインを抽出し、逆順の配列にして返す
        return url.replace(/^.+?\/\/|\/.*$/g,'').split('.').reverse();
    },
    //------------------------------------------------------------------------------------------------------
    copy: function(str){ // クリップボードにコピーする
        var e = document.createElement("textarea");
        e.textContent = str;
        document.body.appendChild(e);
        e.select();
        document.execCommand('copy');
        document.body.removeChild(e);
        return true;
    },
    // テキストファイル形式で保存
    download: function(data, title){ // str: 保存する文字列, title: ファイルの名前
        if([data, title].some(function(v){
            if(yaju1919_library.getType(v) !== "String") return true;
            return v.length === 0;
        })) return false; // 失敗
        const strText = data.replace(/\n/g,'\r\n'); // 改行を置換
        const bom = new Uint8Array([0xEF, 0xBB, 0xBF]);// 文字化け対策
        const blob = new Blob([bom, strText], {type: "text/plain"});
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.target = '_blank';
        a.download = title + '.txt';
        a.click();
        return true; // 成功
    },
    //------------------------------------------------------------------------------------------------------
    save: function(key, value){ // 文字列の保存
        localStorage.setItem(key, value);
    },
    load: function(key, callback){ // 保存した文字列の読み込み
        var data = localStorage.getItem(key);
        if(data === null) return;
        callback(data);
    },
    //------------------------------------------------------------------------------------------------------
    _analysisParam: function(param, default_param){ // param: 不定, default_param: 受け取るパラメータの設定&初期値
        var p = param, result = {};
        if(yaju1919_library.getType(p) !== "Object") p = {};
        for(var key in default_param){
            var default_type = yaju1919_library.getType(default_param[key]);
            var type = yaju1919_library.getType(p[key]);
            result[key] = type === default_type ? p[key] : default_param[key];
        }
        return result;
    },
    // 文字列入力欄を追加
    addInputText: function(parentNode, param){
        var p = yaju1919_library._analysisParam(param,{
            title: '', // タイトル
            placeholder: '', // 説明文
            value: '', // 初期値
            change: function(){}, // 値が変更されたとき実行する関数
            enter: function(){}, // Enterキーで実行する関数
            save: '', // 変更された値を保存する領域
            width: '90%', // 入力欄の幅
            hankaku: true, // trueなら自動で半角化
            max: Infinity, // 入力可能な最大長
            textarea: false, // trueならtextarea要素になる
        });
        var h = $("<span>").appendTo(parent);
        if(p.title) h.append(p.title + "：");
        function resize(){
            if(!p.textarea) return;
            i.height((i.val().split('\n').length + 2) + "em");
        }
        function change(){
            var v = i.val().trim();
            if(p.hankaku) v = yaju1919_library.toHan(v);
            if(v.length > p.max) v = v.slice(0, p.max);
            i.val(v);
            p.change(v);
            if(p.save) yaju1919_library.save(p.save, v);
        }
        var i = $(p.textarea ? "<textarea>" : "<input>").appendTo(h)
        .attr('placeholder',p.placeholder)
        .change(change).val(String(p.value))
        .keyup(resize).click(resize)
        .keypress(function(e){
            if(e.key === 'Enter') p.enter();
        }).css({
            maxWidth: p.width,
            minWidth: p.width
        });
        if(p.save) {
            yaju1919_library.load(p.save, function(v){
                i.val(v);
                change();
            });
        }
        return function(){
            return i.val();
        };
    },
    // 数字入力欄を追加
    addInputNumber: function(parentNode, param){
        var p = yaju1919_library._analysisParam(param,{
            title: '', // タイトル
            placeholder: '', // 説明文
            value: '', // 初期値
            change: function(){}, // 値が変更されたとき実行する関数
            enter: function(){}, // Enterキーで実行する関数
            save: '', // 変更された値を保存する領域
            width: '90%', // 入力欄の幅
            min: 0, // 入力可能な最小値
            max: Infinity, // 入力可能な最大値
            int: false, // trueなら自動で整数化
        });
        var h = $("<span>").appendTo(parent);
        if(p.title) h.append(p.title + "：");
        function change(){
            var n = Number(yaju1919_library.toHan(i.val()).replace(/[^0-9e\.\-\+]/g,""));
            i.css({backgroundColor: "white"});
            if(isNaN(n)) {
                n = '';
                i.css({backgroundColor: "pink"});
            }
            else if(n < p.min) n = p.min;
            else if(n > p.max) n = p.max;
            if(p.int) n = Math.floor(n);
            var v = String(n);
            i.val(v);
            p.change(n);
            if(p.save) yaju1919_library.save(p.save, v);
        }
        var i = $("<input>").appendTo(h)
        .attr('placeholder',p.placeholder)
        .change(change).val(String(p.value))
        .keypress(function(e){
            if(e.key === 'Enter') p.enter();
        }).css({
            maxWidth: p.width,
            minWidth: p.width
        });
        if(p.save) {
            yaju1919_library.load(p.save, function(v){
                i.val(v);
                change();
            });
        }
        return function(){
            return Number(i.val());
        };
    },
    // 数字入力欄を追加
    addInputBool: function(parentNode, param){
        var p = yaju1919_library._analysisParam(param,{
            title: '', // タイトル
            value: false, // 初期値
            change: function(){}, // 値が変更されたとき実行する関数
            save: '', // 変更された値を保存する領域
        });
        function change(){
            btn.css("background-color", flag ? "orange" : "gray");
            check.prop("checked", flag);
            if(change) change(flag);
            if(p.save) yaju1919_library.save(p.save, flag);
        }
        var flag = p.value;
        var btn = $("<button>").appendTo(parent).text(p.title).click(function(){
            flag = !flag;
            change();
        });
        var check = $("<input>",{type:"checkbox"}).prependTo(btn);
        if(p.save) {
            yaju1919_library.load(p.save, function(v){
                if(v !== "true") return;
                flag = v;
                change();
            });
        }
        return function(){
            return flag;
        };
    },
    // 選択肢を追加
    addSelect: function(parentNode, param){
        var p = yaju1919_library._analysisParam(param,{
            title: '', // タイトル
            value: false, // 初期値
            change: function(){}, // 値が変更されたとき実行する関数
            save: '', // 変更された値を保存する領域
            width: '90%', // 入力欄の幅
            list: {}, // 選択肢の連想配列
        });
        var h = $("<span>").appendTo(parent);
        if(p.title) h.append(p.title + "：");
        function update(){
            var v = s.val();
            s.empty();
            for(const k in p.list) $("<option>",{text:k}).val(p.list[k]).appendTo(s);
            if(v) s.val(v);
        }
        function change(){
            var v = s.val();
            p.change(v);
            if(p.save) yaju1919_library.save(p.save, v);
        }
        var s = $("<select>").appendTo(h)
        .change(change).val(String(p.value))
        .click(update).on('update', update)
        .css({
            maxWidth: p.width,
            minWidth: p.width
        });
        update();
        if(p.save) {
            yaju1919_library.load(p.save, function(v){
                s.val(v);
                change();
            });
        }
        return function(){
            return s.val();
        };
    },
};
