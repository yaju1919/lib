// ひらがなからローマ字への変換可能パターンを列挙するプログラムをつくった
// https://www.pandanoir.info/entry/2017/09/28/190000
(function(window, undefined) {
    "use strict";
    function isAlphabet(char) {
        return char !== '' && 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789- ,:(){}.・!&%'.indexOf(char) !== -1;
    }; // romanTableには通常の規則性で対応できない文字のみを入れている。
    var romanTable = {
        'を': ['wo'],
        'うぁ': ['uxa', 'wha'],
        'うぃ': ['wi', 'uxi', 'whi'],
        'うぇ': ['we', 'uxe', 'whe'],
        'うぉ': ['uxo', 'who'],
        'ゔぁ': ['va', 'vuxa'],
        'ゔぃ': ['vi', 'vuxi'],
        'ゔ': ['vu'],
        'ゔぇ': ['ve', 'vuxe'],
        'ゔぉ': ['vo', 'vuxo'],
        'くぁ': ['kwa', 'kuxa'],
        'くぃ': ['kwi', 'kuxi'],
        'くぅ': ['kwu', 'kuxu'],
        'くぇ': ['kwe', 'kuxe'],
        'くぉ': ['kwo', 'kuxo'],
        'ぐぁ': ['gwa', 'guxa'],
        'ぐぃ': ['gwi', 'guxi'],
        'ぐぅ': ['gwu', 'guxu'],
        'ぐぇ': ['gwe', 'guxe'],
        'ぐぉ': ['gwo', 'guxo'],
        'しゃ': ['sya', 'sha', 'sixya', 'shixya'],
        'しぃ': ['syi', 'sixi', 'shixi'],
        'しゅ': ['syu', 'shu', 'sixyu', 'shixyu'],
        'しぇ': ['sye', 'she', 'sixe', 'shixe'],
        'しょ': ['syo', 'sho', 'sixyo', 'shixyo'],
        'じゃ': ['ja', 'jya', 'zya', 'jixya', 'zixya'],
        'じゅ': ['ju', 'jyu', 'zyu', 'jixyu', 'zixyu'],
        'じぇ': ['je', 'jye', 'zye', 'jixe', 'zixe'],
        'じょ': ['jo', 'jyo', 'zyo', 'jixyo', 'zixyo'],
        'ちゃ': ['tya', 'cha', 'tixya', 'chixya'],
        'ちぃ': ['tyi', 'tixi', 'chixi'],
        'ちゅ': ['tyu', 'chu', 'tixyu', 'chixyu'],
        'ちぇ': ['tye', 'che', 'tixe', 'chixe'],
        'ちょ': ['tyo', 'cho', 'tixyo', 'chixyo'],
        'つぁ': ['tsa', 'tuxa', 'tsuxa'],
        'つぃ': ['tsi', 'tuxi', 'tsuxi'],
        'つぇ': ['tse', 'tuxe', 'tsuxe'],
        'つぉ': ['tso', 'tuxo', 'tsuxo'],
        'でぃ': ['dhi', 'dexi'],
        'でゅ': ['dhu', 'dexyu'],
        'どぅ': ['dwu', 'doxu'],
        'てぃ': ['thi', 'texi'],
        'てぇ': ['the', 'texe'],
        'とぁ': ['twa', 'toxa'],
        'とぃ': ['twi', 'toxi'],
        'とぅ': ['twu', 'toxu'],
        'とぇ': ['twe', 'toxe'],
        'とぉ': ['two', 'toxo'],
        'ふぁ': ['fa', 'fuxa', 'huxa'],
        'ふぃ': ['fi', 'fuxi', 'huxi'],
        'ふぇ': ['fe', 'fuxe', 'huxe'],
        'ふぉ': ['fo', 'fuxo', 'huxo'],
        'ゐ': ['wyi'],
        'ゑ': ['wye'],
        'ー': ['-'],
        '。': ['.']
    };
    romanTable['ヴぁ'] = romanTable['ゔぁ'];
    romanTable['ヴぃ'] = romanTable['ゔぃ'];
    romanTable['ヴ'] = romanTable['ゔ'];
    romanTable['ヴぇ'] = romanTable['ゔぇ'];
    romanTable['ヴぉ'] = romanTable['ゔぉ'];
    var consonant = {
        'し': 's,sh',
        'ち': 't,ch',
        'つ': 't,ts',
        'ふ': 'h,f',
        'じ': 'z,j'
    }; // 基本的なローマ字表を構築する

    for (var _i2 = 0, _arr = [
        ['あいうえお', ''],
        ['かきくけこ', 'k'],
        ['さしすせそ', 's'],
        ['たちつてと', 't'],
        ['なにぬねの', 'n'],
        ['はひふへほ', 'h'],
        ['まみむめも', 'm'],
        ['やゆよ', 'y'],
        ['らりるれろ', 'r'],
        ['わ', 'w'],
        ['がぎぐげご', 'g'],
        ['ざじずぜぞ', 'z'],
        ['だぢづでど', 'd'],
        ['ばびぶべぼ', 'b'],
        ['ぱぴぷぺぽ', 'p']
    ]; _i2 < _arr.length; _i2++) {
        var _arr$_i = _arr[_i2],
            hiraganas = _arr$_i[0],
            cons = _arr$_i[1];

        function _loop2(i, _i) {
            if (!consonant[hiraganas[i]]) consonant[hiraganas[i]] = cons;
            romanTable[hiraganas[i]] = consonant[hiraganas[i]].split(',').map(function(cons) {
                return cons + 'aiueo' [i];
            });
        };

        for (var i = 0, _i = hiraganas.length; i < _i; i++) {
            _loop2(i, _i);
        }
    }

    romanTable['ゆ'] = ['yu'];
    romanTable['よ'] = ['yo'];
    romanTable['ぁ'] = ['xa'];
    romanTable['ぃ'] = ['xi'];
    romanTable['ぅ'] = ['xu'];
    romanTable['ぇ'] = ['xe'];
    romanTable['ぉ'] = ['xo'];
    romanTable['ゃ'] = ['xya'];
    romanTable['ゅ'] = ['xyu'];
    romanTable['ょ'] = ['xyo'];
    romanTable['ヵ'] = romanTable['ゕ'] = ['xka'];
    romanTable['ヶ'] = romanTable['ゖ'] = ['xke'];
    romanTable['ゎ'] = romanTable['ヮ'] = ['xwa'];

    function xaToLa(romanArr) {
        return romanArr.filter(function(item) {
            return /x(?:[aiueo]|y[auo]|k[ae]|wa)/.test(item);
        }).map(function(roman) {
            return roman.replace(/x([aiueo]|y[auo]|k[ae]|wa)/g, 'l$1');
        });
    };

    var hiraganaToRoman = function() {
        var baseRomanTable = romanTable;
        return function(hiragana) {
            // hiraganaToRoman('しゃ') == [['sya', 'sha', 'sixya', 'shixya'], 2]
            // hiraganaToRoman('っぷ') == [['ppu', 'xtupu', 'xtsupu'], 2]
            if (hiragana === '') return [[''], 0];
            var first = [].concat(hiragana)[0] || '',
                second = [].concat(hiragana)[1] || '';

            if (second !== '' && 'ぁぃぅぇぉゃゅょ'.indexOf(second) !== -1) {
                if (romanTable[first + second]) return [romanTable[first + second].concat(), 2]; // キャッシュがない場合の処理

                var romanOfSmallChar = {
                    'ぁ': ['ya', 'ixa'],
                    'ぅ': ['yu', 'ixu'],
                    'ぉ': ['yo', 'ixo'],
                    'ぃ': ['yi', 'ixi'],
                    'ぇ': ['ye', 'ixe'],
                    'ゃ': ['ya', 'ixya'],
                    'ゅ': ['yu', 'ixyu'],
                    'ょ': ['yo', 'ixyo']
                } [second];
                var romans = [];

                var _loop = function _loop() {
                    if (_isArray) {
                        if (_i3 >= _iterator.length) return "break";
                        _ref = _iterator[_i3++];
                    } else {
                        _i3 = _iterator.next();
                        if (_i3.done) return "break";
                        _ref = _i3.value;
                    }

                    var cons = _ref;
                    romans.push.apply(romans, romanOfSmallChar.map(function(roman) {
                        return "" + cons + roman;
                    }));
                };

                for (var _iterator = consonant[first].split(','), _isArray = Array.isArray(_iterator), _i3 = 0;;) {
                    //_iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();
                    var _ref;

                    var _ret = _loop();

                    if (_ret === "break") break;
                }

                romanTable[first + second] = romans.concat(); // キャッシュする

                return [romans, 2];
            }

            if (first !== '' && 'ぁぃぅぇぉゃゅょ'.indexOf(first) !== -1) return [romanTable[first].concat(), 1];

            if (first === 'ん') {
                // 今の文字が「ん」の場合
                // 最低限入力しなければならない文字数のみ返す
                // 余分なもの("あんこ"に対するan'n'ko)は後ろの文字にくっつける(nkoと解釈する)
                if (isAlphabet(second)) return [['n'], 1];
                if (second === '') return [['nn'], 1];
                if ('ny'.indexOf(consonant[second]) !== -1) { // consonant[second] === ''も含む
                    return [
                        ['nn'], 1
                    ]; // 「んな」「んや」「んあ」のとき
                }

                return [
                    ['n'], 1
                ];
            }

            if (first === 'っ') {
                // 「女神さまっ」や「女神さまっ2」のように、後ろが存在しないか記号のケース
                if (second === '' || isAlphabet(second)) return [['xtu', 'xtsu'], 1];

                var _hiraganaToRoman = hiraganaToRoman(hiragana.slice(1)),
                    nextCharRoman = _hiraganaToRoman[0],
                    count = _hiraganaToRoman[1];

                return [
                    [].concat(nextCharRoman.map(function(item) {
                        return "" + item.charAt(0) + item;
                    }), nextCharRoman.map(function(roman) {
                        return "xtu" + roman;
                    }), nextCharRoman.map(function(roman) {
                        return "xtsu" + roman;
                    })), count + 1
                ];
            }

            if (romanTable[first] == null) console.error('unknown character was given');
            return [romanTable[first].concat(), 1]; // 普通のとき
        };
    }();

    function getRoman(furigana, targetPos) {
        // ローマ字の取得
        // furiganaのtargetPosの位置を取得
        // 結果は配列の形式で返す
        // [[ローマ字], 変換対象となる文字数]
        var nowChar = furigana.charAt(targetPos);
        if (furigana === '') return [[''], 0];
        if (isAlphabet(nowChar)) return [[nowChar], 1];
        if (targetPos < 0 || targetPos >= furigana.length) console.error('range out of the string selected');

        var _hiraganaToRoman2 = hiraganaToRoman(furigana.slice(targetPos)),
            roman = _hiraganaToRoman2[0],
            targetHiraganaLength = _hiraganaToRoman2[1]; // 「あんこ」をankoでもannkoでも打てるようにする処理
        // 「こが'ko'でも'nko'でも良い」と解釈している

        if (furigana.charAt(targetPos - 1) === 'ん' && 'ny'.indexOf(consonant[nowChar]) === -1) {
            return [roman.concat(roman.map(function(roman) {
                return "n" + roman;
            })), targetHiraganaLength];
        }
        return [roman, targetHiraganaLength];
    };

    function toRoman(furigana) {
        var index = 0;
        var romans = [];

        while (furigana.length > index) {
            var _getRoman = getRoman(furigana, index),
                roman = _getRoman[0],
                targetHiraganaLength = _getRoman[1];

            index += targetHiraganaLength;
            romans.push(roman);
        }

        return romans;
    };
    window.getRoman = getRoman;
})(window);
