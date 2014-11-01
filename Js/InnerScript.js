function rand(min, max) {
    return parseInt(Math.random() * (max - min) + min, 10);
}

$(document).ready(function() {
//        var p = $('.description__text-block__description');
//        var divh = $('.text').first().height();
//        while ($(p).outerHeight() > divh) {
//            $(p).text(function (index, text) {
//                return text.replace(/\W*\s(\S)*$/, '...');
//            });
    //        }

    $(".description__text-block__description").dotdotdot({
        height: 270
    });

    var guestId = $.cookie("landing_guid");
    if (!guestId) {
        $.cookie("landing_guid", rand(1, 1000000000), { expires: 365 });
    }
});


var curGuitar = undefined;

ShowDetail = function(name, colorId, colors, price, description, tech) {
    var popup = $('.popup-layout');
    popup.find('.popup__name').text(name);
    colors.each(function(i, e) {
        var color = popup.find('.popup-colors__color[data-color-id="' + $(e).attr('data-color-id') + '"]');
        color.removeClass('hide');
        color.attr('data-img-url', $(e).val());
        if ($(this).attr('data-color-id') == colorId) {
            $('.popup-colors__color').filter('[data-color-id="' + colorId + '"]').trigger('click');
        }
    });
    popup.find('#PopupPrice').text(price);
    popup.find('.popup-right__description').text(description);
    popup.find('.popup-right__description-tech').html(tech);
    popup.removeClass('hide');
};

OpenPopup = function(e) {
    var form = $(e).closest('.guitar-offer');
    curGuitar = form.attr('id');
    ShowDetail(
        form.find('.guitar-offer__name').text(),
        form.find('.guitar-img').attr('data-color-id'),
        form.find('.left__img__reserve'),
        form.find('.contacts__price').text(),
        form.find('.description__text-block__description__full').text(),
        form.find('.description__text-block__tech-description').html()
    );
};

$('.right__more').on('click', function () {
    OpenPopup(this);
    mixpanel.track(
        "MoreInfoClick",
        {
            "distinct_id": $.cookie("landing_guid"),
            "Guitar": curGuitar
        }
    );
});

$('.guitar-offer__description__img').on('click', function () {
    OpenPopup(this);
    mixpanel.track(
        "ImgClick",
        {
            "distinct_id": $.cookie("landing_guid"),
            "Guitar": curGuitar
        }
    );
});

$('.pay-way').on('click', function () {
    mixpanel.track(
        "PaymentWays",
        {
            "distinct_id": $.cookie("landing_guid"),
        }
    );
});

$('.navigation__summary').on('click', function() {
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

$('.navigation__tech').on('click', function() {
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

$('.popup-layout').on('click', function(event) {
    if (!$(event.target).closest('.popup').length > 0 && !$('.popup-layout').hasClass('hide')) {
        $('.popup-colors__color').addClass('hide');
        $('.popup-layout').addClass('hide');
        var photoSrc = $('#' + curGuitar).find('.left__img__main').filter('[data-color-id="' + $('.popup-colors__color.selected').attr('data-color-id') + '"]').val();
        $('#' + curGuitar).find('.guitar-img').attr('src', photoSrc);
        $('#' + curGuitar).find('.guitar-img').attr('data-color-id', $('.popup-colors__color.selected').attr('data-color-id'));
    }
});

$('.right__order').on('click', function (event) {
    $('.right__order__contacts').addClass('hide');
    $('.right__order').removeClass('hide');
    $(this).parent().find('.right__order__contacts').removeClass('hide');
    $(this).addClass('hide');
});

$('.popup-colors__color').on('click', function() {
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

SubmitPhone = function(jThis) {
    jThis.closest('.contacts__order').find('.right__order__contacts').addClass('hide');
    jThis.closest('.contacts__order').find('.right__order').removeClass('hide');
    mixpanel.track(
        "OrderBackCall",
        {
            "distinct_id": $.cookie("landing_guid"),
            "phone": jThis.closest('.contacts__order').find('.phone').val()
        }
    );
};

$('.header__order-recall').on('click', function() {
    $('.header__recall__order').addClass('hide');
    $('.header__recall__phone').removeClass('hide');
});