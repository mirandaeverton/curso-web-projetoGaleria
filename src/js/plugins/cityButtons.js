import $ from 'jquery'

const duration = 300

function filterByCity(city) {
    $('[wm-city]').each(function (index, element) {
        const isTarget = $(this).attr('wm-city') === city || city === null
        if(isTarget) {
            $(this).parent().removeClass('d-none')
            $(this).fadeIn(duration)
        }else {
            $(this).parent().addClass('d-none')
            $(this).fadeOut(duration)
        }
    })
}

$.fn.cityButtons = function () {
    const cities = new Set
    $('[wm-city]').each(function (index, element) {
        cities.add($(element).attr('wm-city'))
    })

    const buttons = Array.from(cities).map(city => {
        const button = $('<button>').addClass(['bnt', 'btn-info']).html(city)
        button.on('click', filterByCity(city))
        return button
    })

    const buttonAll = $('<button>').addClass(['btn', 'btn-info', 'active']).html('Todas')
    buttonAll.on('click', filterByCity(null))
    buttons.push(buttonAll)

    const buttonGroup = $('<div>').addClass('btn-group')
    buttonGroup.append(buttons)

    $(this).html(buttonGroup)
    return this
}

$('[wm-city-buttons]').cityButtons()