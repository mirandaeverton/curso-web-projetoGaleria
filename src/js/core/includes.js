import $ from 'jquery'

function loadIncludes(parentElement = 'body') {
    $(parentElement).find('[wm-include]').each(function(index, element) {
        const url = $(element).attr('wm-include')
        $.ajax({
            url,
            success(data) {
                $(element).html(data)
                $(element).removeAttr('wm-include')

                loadIncludes(element)
            }
        })
    })
}

loadIncludes()