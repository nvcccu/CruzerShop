$(document).ready(function () {
    var imageArray = [
      'http://cruzershop.ru/Img/Main/CJ-400 BK.png',
      'http://cruzershop.ru/Img/Main/CJ-400 GR.png',
      'http://cruzershop.ru/Img/Main/CJ-400 LH.png',
      'http://cruzershop.ru/Img/Main/CJ-420.png',
      'http://cruzershop.ru/Img/Main/CJR-600FM BK.png',
      'http://cruzershop.ru/Img/Main/CJR-600FM OR.png',
      'http://cruzershop.ru/Img/Main/CJR-600FM RD.png',
      'http://cruzershop.ru/Img/Main/LJ-550.png',
      'http://cruzershop.ru/Img/Main/LS-750 CH.png',
      'http://cruzershop.ru/Img/Main/LS-750 GL.png',
      'http://cruzershop.ru/Img/Main/RE-920.png',
      'http://cruzershop.ru/Img/Main/RV-800.png',
      'http://cruzershop.ru/Img/Main/RX-700.png',
      'http://cruzershop.ru/Img/Main/RX-720.png',
      'http://cruzershop.ru/Img/Main/ST-120 BK.png',
      'http://cruzershop.ru/Img/Main/ST-120 RD.png',
      'http://cruzershop.ru/Img/Main/ST-120 SB.png',
      'http://cruzershop.ru/Img/Main/ST-200 BK.png',
      'http://cruzershop.ru/Img/Main/ST-200 GR.png',
      'http://cruzershop.ru/Img/Main/ST-200 L-GR.png',
      'http://cruzershop.ru/Img/Main/ST-200 PN.png',
      'http://cruzershop.ru/Img/Main/ST-200 RD.png',
      'http://cruzershop.ru/Img/Main/ST-200 SB.png',
      'http://cruzershop.ru/Img/Main/TC-250 BK.png',
      'http://cruzershop.ru/Img/Main/TC-250 YE.png',
      'http://cruzershop.ru/Img/Reserve/CJ-400 BK.png',
      'http://cruzershop.ru/Img/Reserve/CJ-400 GR.png',
      'http://cruzershop.ru/Img/Reserve/CJ-400 LH.png',
      'http://cruzershop.ru/Img/Reserve/CJ-420.png',
      'http://cruzershop.ru/Img/Reserve/CJR-600FM BK.png',
      'http://cruzershop.ru/Img/Reserve/CJR-600FM OR.png',
      'http://cruzershop.ru/Img/Reserve/CJR-600FM RD.png',
      'http://cruzershop.ru/Img/Reserve/LJ-550.png',
      'http://cruzershop.ru/Img/Reserve/LS-750 CH.png',
      'http://cruzershop.ru/Img/Reserve/LS-750 GL.png',
      'http://cruzershop.ru/Img/Reserve/RE-920.png',
      'http://cruzershop.ru/Img/Reserve/RV-800.png',
      'http://cruzershop.ru/Img/Reserve/RX-700.png',
      'http://cruzershop.ru/Img/Reserve/RX-720.png',
      'http://cruzershop.ru/Img/Reserve/ST-120 BK.png',
      'http://cruzershop.ru/Img/Reserve/ST-120 RD.png',
      'http://cruzershop.ru/Img/Reserve/ST-120 SB.png',
      'http://cruzershop.ru/Img/Reserve/ST-200 BK.png',
      'http://cruzershop.ru/Img/Reserve/ST-200 GR.png',
      'http://cruzershop.ru/Img/Reserve/ST-200 L-GR.png',
      'http://cruzershop.ru/Img/Reserve/ST-200 PN.png',
      'http://cruzershop.ru/Img/Reserve/ST-200 RD.png',
      'http://cruzershop.ru/Img/Reserve/ST-200 SB.png',
      'http://cruzershop.ru/Img/Reserve/TC-250 BK.png',
      'http://cruzershop.ru/Img/Reserve/TC-250 YE.png'
    ];

    var i = 0;
    for (var q = 0; q < 5; q++) {
        setInterval(function() {
            $('.fake-img').attr('src', imageArray[i]);
            i++;
        }, 100);
    }

    var guestId = $.cookie("landing_guid");
    if (!guestId) {
        $.cookie("landing_guid", rand(1, 1000000000), { expires: 365 });
    }

    $('.guitar-offer').each(function(importScripts, e) {
        $(e).find('.description__short-description').text($(e).find('.description__full-description').text());
        $(e).find('.description__short-description').dotdotdot({
            height: 95
        });
    });

    mixpanel.track(
        "OpenLanding",
        {
            "distinct_id": $.cookie("landing_guid"),
        }
    );

    $('.description__more').on('click', function () {
        OpenPopup(this);
        mixpanel.track(
            "MoreInfoClick",
            {
                "distinct_id": $.cookie("landing_guid"),
                "Guitar": curGuitar
            }
        );
    });

    $('.guitar-img').on('click', function () {
        OpenPopup(this);
        mixpanel.track(
            "ImgClick",
            {
                "distinct_id": $.cookie("landing_guid"),
                "Guitar": curGuitar
            }
        );
    });

    $('.navigation__btn').on('click', function() {
        $('.navigation__btn').removeClass('selected');
        $(this).addClass('selected');
    });

    $('.navigation__summary').on('click', function () {
        $('.popup-right__description').removeClass('hide');
        $('.popup-right__description-tech').addClass('hide');
        mixpanel.track(
            "SummaryInfoClick",
            {
                "distinct_id": $.cookie("landing_guid"),
                "Guitar": curGuitar
            }
        );
    });

    $('.navigation__tech').on('click', function () {
        $('.popup-right__description').addClass('hide');
        $('.popup-right__description-tech').removeClass('hide');
        mixpanel.track(
            "TechInfoClick",
            {
                "distinct_id": $.cookie("landing_guid"),
                "Guitar": curGuitar
            }
        );
    });

    $('.popup-layout').on('click', function (event) {
        if (!$(event.target).closest('.popup').length > 0 && !$('.popup-layout').hasClass('hide')) {
            ClosePopup();
        }
    });

    $('.popup__exit').on('click', function (event) {
        ClosePopup();
    });

    $('.contacts__payment-way-btn').on('click', function() {
        $('.popup-layout-pay-way').removeClass('hide');
    });

    $('.contacts__order-recall-btn').on('click', function () {
        $('.popup-layout-recall').removeClass('hide');
    });

    $('.popup-pay-way__exit').on('click', function (event) {
        $('.popup-layout-pay-way').addClass('hide');
    });

    $('.popup-recall__exit').on('click', function (event) {
        $('.popup-layout-recall').addClass('hide');
    });

    $('.popup-layout-pay-way').on('click', function (event) {
        if (!$(event.target).closest('.popup-pay-way').length > 0 && !$('.popup-layout-pay-way').hasClass('hide')) {
            $('.popup-layout-pay-way').addClass('hide');
        }
    });

    $('.popup-colors__color').on('click', function () {
        var popup = $('.popup-layout');
        $('.popup-colors__color').removeClass('selected');
        $(this).addClass('selected');
        popup.find('.popup-left__img').attr('src', $(this).attr('data-img-url'));
        mixpanel.track(
            "ColorChange",
            {
                "distinct_id": $.cookie("landing_guid"),
                "Guitar": curGuitar
            }
        );
    });

    $('.order-call__phone-input').mask("+7 (999) 999-99-99");

    $('.guitar-offer .order-call__btn--discard').on('click', function () {
        $('.guitar-offer .description__buy-btn').removeClass('hide');
        $('.guitar-offer .description__order-call').addClass('hide');
        mixpanel.track(
            "DiscardOrder",
            {
                "distinct_id": $.cookie("landing_guid")
            }
        );
    });

    $('.popup .order-call__btn--discard').on('click', function () {
        $('.popup .description__buy-btn').removeClass('hide');
        $('.popup .description__order-call').addClass('hide');
        mixpanel.track(
            "DiscardOrder",
            {
                "distinct_id": $.cookie("landing_guid")
            }
        );
    });

    $('.guitar-offer .order-call__btn--submit').on('click', function () {
        var form = $(this).closest('.guitar-offer');
        if (form.find('.order-call__phone-input').val().length != 18) {
            form.find('.order-call__phone-input').focus();
            return;
        }
        mixpanel.track(
            "OrderFromMain",
            {
                "distinct_id": $.cookie("landing_guid"),
                "Guitar": curGuitar,
                "UserPhone": form.find('.order-call__phone-input').val()
            }
        );
        ShowConfirmPhonePopup();
        var orderBtn = $(this).closest('.guitar-offer').find('.description__buy-btn');
        orderBtn.text('Заказано');
        orderBtn.addClass('btn--orange-non-active');
        orderBtn.removeClass('btn--orange');
        orderBtn.off('click');
        orderBtn.css('cursor', 'text');
    });

    $('.popup .order-call__btn--submit').on('click', function () {
        var form = $(this).closest('.popup');
        if (form.find('.order-call__phone-input').val().length != 18) {
            form.find('.order-call__phone-input').focus();
            return;
        }
        mixpanel.track(
            "OrderFromPopup",
            {
                "distinct_id": $.cookie("landing_guid"),
                "Guitar": curGuitar,
                "UserPhone": form.find('.order-call__phone-input').val()
            }
        );
        ClosePopup();
        ShowConfirmPhonePopup();
        var orderBtn = $('#' + curGuitar).find('.description__buy-btn');
        orderBtn.text('Заказано');
        orderBtn.addClass('btn--orange-non-active');
        orderBtn.removeClass('btn--orange');
        orderBtn.off('click');
        orderBtn.css('cursor', 'text');
    });

    $('.popup-recall .order-call__btn--submit').on('click', function () {
        if ($('.popup-recall .order-call__phone-input').val().length != 18) {
            $('.order-call__phone-input').focus();
            return;
        }
        $('.popup-recall .description__order-call').addClass('hide');
        $('.submit-recall').removeClass('hide');
        mixpanel.track(
            "OrderRecall",
            {
                "distinct_id": $.cookie("landing_guid"),
                "UserPhone": $('.popup-recall .order-call__phone-input').val()
            }
        );
    });

    $('.popup-recall .popup-confirm__submit').on('click', function () {
        $('.popup-layout-recall').addClass('hide');
    });

    $('.popup-confirm__submit').on('click', function() {
        CloseConfirmPhonePopup();
    });

    $('.guitar-offer .description__buy-btn').on('click', function () {
        $('.guitar-offer .description__buy-btn').removeClass('hide');
        $('.guitar-offer .description__order-call').addClass('hide');

        $(this).addClass('hide');
        var form = $(this).closest('.guitar-offer');
        form.find('.description__order-call').removeClass('hide');
        form.find('.order-call__phone-input').focus();
        curGuitar = form.attr('id');
    });

    $('.popup .description__buy-btn').on('click', function () {
        $(this).addClass('hide');
        var form = $(this).closest('.popup');
        form.find('.description__order-call').removeClass('hide');
        form.find('.order-call__phone-input').focus();
    });

    $(document).keyup(function(e) {
        if (e.keyCode == 27) {
            if (!$('.popup-layout').hasClass('hide')) {
                ClosePopup();
            }
            if (!$('.popup-layout-confirm').hasClass('hide')) {
                CloseConfirmPhonePopup();
            }
        }
    });
});

var curGuitar = undefined;

ClosePopup = function () {
    $('.popup-colors__color').addClass('hide');
    $('.popup-layout').addClass('hide');
    $('.popup-right__description').removeClass('hide');
    $('.popup-right__description-tech').addClass('hide');
    var photoSrc = $('#' + curGuitar).find('.left__img__main').filter('[data-color-id="' + $('.popup-colors__color.selected').attr('data-color-id') + '"]').val();
    $('#' + curGuitar).find('.guitar-img').attr('src', photoSrc);
    $('#' + curGuitar).find('.guitar-img').attr('data-color-id', $('.popup-colors__color.selected').attr('data-color-id'));
    $('.navigation__summary').addClass('selected');
    $('.navigation__tech').removeClass('selected');
    $('.popup .description__order-call').addClass('hide');
    $('.popup .description__buy-btn').removeClass('hide');
    $('body').css('overflow-y', 'auto');
};

ShowDetail = function (name, colorId, colors, price, description, tech) {
    var popup = $('.popup-layout');
    popup.find('.popup__name').text(name);
    popup.find('.popup-right__price').text(price);
    popup.find('.popup-right__description').html(description);
    popup.find('.popup-right__description-tech').html(tech);
    popup.removeClass('hide');
    $('.popup-left__img').addClass('hide');
    colors.each(function (i, e) {
        var color = popup.find('.popup-colors__color[data-color-id="' + $(e).attr('data-color-id') + '"]');
        color.removeClass('hide');
        color.attr('data-img-url', $(e).val());
        if ($(this).attr('data-color-id') == colorId) {
            $('.popup-colors__color').filter('[data-color-id="' + colorId + '"]').trigger('click');
        }
    });
    $('.popup-left__img').removeClass('hide');
};

OpenPopup = function (e) {
    $('body').css('overflow-y', 'hidden');
    var form = $(e).closest('.guitar-offer');
    curGuitar = form.attr('id');
    ShowDetail(
        form.find('.description__name').text(),
        form.find('.guitar-img').attr('data-color-id'),
        form.find('.left__img__reserve'),
        form.find('.description__price').text(),
        form.find('.description__full-description').html(),
        form.find('.description__tech-description').html()
    );

};

ShowConfirmPhonePopup = function () {
    var form = $('#' + curGuitar);
    form.find('.galka').removeClass('hide');
    var popup = $('.popup-layout-confirm');
    popup.removeClass('hide');
    form.find('.description__order-call').addClass('hide');
    form.find('.description__buy-btn').removeClass('hide');
};

CloseConfirmPhonePopup = function() {
    $('.popup-layout-confirm').addClass('hide');
};

function rand(min, max) {
    return parseInt(Math.random() * (max - min) + min, 10);
}