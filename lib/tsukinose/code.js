(function(){
    var e = document.createElement("script");
    e.setAttribute("src","https://code.jquery.com/jquery-1.9.1.js");
    document.body.append(e);
})();
jQuery.noConflict();
(function($) {
    $(".t_b").filter(function(i,e){
        return /###code###/.test($(e).text());
    }).each(function(i,e){
        var html = $(e).html(),
            reg = /###code###(.*$)/;
        var m = html.match(reg);
        $(e).html(html.replace(reg,''));
        var flag = false;
        $("<button>").appendTo(e).text("code").on("click touchstart", function(){
            if(flag) return;
            flag = true;
            $("<code>").appendTo($("<pre>").appendTo(e)).text(m[1]).addClass("prettyprint linenums")
        });
    })
})(jQuery);
