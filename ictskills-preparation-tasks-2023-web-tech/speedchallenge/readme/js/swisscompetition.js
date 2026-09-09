/*global jQuery, window, competitorInformation */

if ("undefined" === typeof competitorInformation) {
    var competitorInformation = [];
}

(function ($, window, competitorInformation) {
    'use strict';

    function setMark(obj, change) {
        var id    = $(".masthead .nav-pills .active a").text() + "-" + obj.parents(".row").index() + "-" + obj.parent().index() + "-" + obj.index(),
            badge = obj.find('.badge'),
            value = '';

        if (undefined === id) {
            return;
        }

        value = $.parseJSON(window.sessionStorage.getItem(id));

        if (true === change) {
            if (true === value) {
                window.sessionStorage.removeItem(id);
                value = false;
            } else {
                window.sessionStorage.setItem(id, true);
                value = true;
            }
        }

        if (true === value) {
            badge.addClass('badge-success');
        } else {
            badge.removeClass('badge-success');
        }
    }

    $('#colorSchemes a:last').tab('show');

    $('.marking .list-group-item').click(function () {
        setMark($(this), true);
    });
}(jQuery, window, competitorInformation));
