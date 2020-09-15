(function(){
    var e = document.createElement("script");
    e.setAttribute("src","https://code.jquery.com/jquery-1.9.1.js");
    document.body.append(e);
})();
jQuery.noConflict();
(function($) {
    if($('.valus_res').get(0) === null) return;
    $('<link>').attr({
        type: 'text/css',
        rel: 'stylesheet',
        href: 'https://yaju1919.github.io/lib/lib/valus/csshake.css'
    }).appendTo('head');
    function rnd(a){
        return a[Math.floor(Math.random() * a.length)];
    }
    function doValus() {
        $(".valus_res").addClass(rnd(["shake-chunk", "shake-chunk", "shake-chunk", "shake-opacity", "shake-crazy", "shake-hard"]));
        var copy = window.setTimeout;
        window.setTimeout = function(func,time){
            if(time !== 1000 * 15 && time !== 1000 * 30) copy(func,time);
        }
        window.$ = $;
        setTimeout(function() {
            $('html').addClass(rnd(["shake", "shake-hard", "shake-horizontal", "shake-vertical", "shake-opacity"]));
            $(".main-container").add($(".article-body-outer")).css('background', '#FFCCCC');
            $.getScript('https://yaju1919.github.io/lib/lib/valus/bomb.v3.js');
        }, 2500);
    }
    var adOffset, adSize, winH, flag;
    $(window).on('load resize',function(){
        adOffset = $('.valus_res').offset().top;
        winH = $(window).height();
    });
    $(window).scroll(function () {
        if ($(this).scrollTop() > adOffset - winH && !flag) {
            flag = true;
            doValus();
        }
    });
})(jQuery);
