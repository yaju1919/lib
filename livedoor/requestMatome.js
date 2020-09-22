(function(){
    var e = document.createElement("script");
    e.setAttribute("src","https://code.jquery.com/jquery-1.9.1.js");
    document.body.append(e);
})();
jQuery.noConflict();
(function($) {
    var h = $("#form");
    var inputUrl = yaju1919.addInputText(h,{
        id: "inputUrl",
        title: "スレッドURL",
        width: "70%",
        change: function(s){
            var m = s.match(/https?:\/\/[\w\/:%#\$&amp;\?\(\)~\.=\+\-]+/);
            $("#inputUrl").css({backgroundColor:m?"white":"pink"});
            return m ? m[1] : '';
        },
    });
    h.append("<br>");
    $("<div>").appendTo(h).text("どんな感じにまとめてほしいのか");
    var inputText = yaju1919.addInputText(h,{
        title: "要望",
        textarea: true,
        width: "90%",
        height: "5em"
    });
    h.append("<br>");
    $("<button>").appendTo(h).text("この内容で送信する").on("click touchstart",function(){
        var url = inputUrl(),
            text = inputText();
        if(!url) return msg.text("※スレッドURLの入力は必須です。");
        send(["◆スレッドURL",url,"◆要望",text].join('\n'));
        $("<div>").appendTo($("#form").empty()).text("まとめ依頼を受け付けました。");
    });
    var msg = $("<div>").appendTo(h);
    function send(content){
        var data = {
            "username": '',
            "avatar_url": '',
            content: "<@&757839033748422668>\n" + content,
            tts: false
        };
        var xhr = new XMLHttpRequest();
        xhr.open( 'POST', "https://discord.com/api/webhooks/757837889668251718/q9jHzeG2IIK28HFmZAKTM5wyLRi6Mx8R6ilefgUVQyi2bmwAVdsa3-cbat-5QMiqYwkA" );
        xhr.setRequestHeader( "content-type", "application/json" );
        xhr.send(JSON.stringify(data));
    }
})(jQuery);
