(function ($) {
    $.fn.droptxt = function (url, field, target) {
        var selector = this.selector;
        this.attr('autocomplete', 'Off');
        var txt = this;
        this.on('keyup', function () {
            var args = {};
            args[field] = txt.val();
            if (args[field] == null)
                args[field] = "";
            $('.codecomb-droptxt-outer').remove();
            $.getJSON(url, args, function (data) {
                var html = '<div class="codecomb-droptxt-outer" data-parent="' + selector + '">';
                for (var i = 0; i < data.length; i++) {
                    html += '<div class="codecomb-droptxt-item" onclick="$(\'' + target + '\').val(\''+ data[i].Value +'\'); $(\''+ selector +'\').val(\'' + data[i].Display + '\'); $(\'.codecomb-droptxt-outer\').remove()">' + data[i].Display + '</div>'
                }
                html += '</div>';
                var dom = $(html);
                if ($(".codecomb-droptxt-outer").length > 0 && $(".codecomb-droptxt-outer").attr("data-parent") == selector)
                    $(".codecomb-droptxt-outer[data-parent='" + selector + "']").remove();
                $('body').prepend(dom);
                dom.css('top', (txt.offset().top + txt.outerHeight()) + 'px');
                dom.css('left', txt.offset().left);
                dom.outerWidth(txt.outerWidth());
            });
        });
        $(document).on('click', function (e) {
            if ($(e).hasClass('codecomb-droptxt-outer')) return;
            if ($(e).parent('.codecomb-droptxt-outer').length > 0) return;
            $('div[data-parent="' + selector + '"]').slideUp(200);
            setTimeout(function () {
                $('div[data-parent="' + selector + '"]').remove();
            }, 300);
        });
    }
})(jQuery)
