import $ from 'jquery'

const loadHtmlSuccessCallbacks = []

export function onLoadSuccess(callback) {
    if(!loadHtmlSuccessCallbacks.includes(callback)) {
        loadHtmlSuccessCallbacks.push(callback)
    }
}

function loadIncludes(parentElement = 'body') {
    $(parentElement).find('[wm-include]').each(function(index, element) {
        const url = $(element).attr('wm-include')
        $.ajax({
            url,
            success(data) {
                $(element).html(data)
                $(element).removeAttr('wm-include')

                loadHtmlSuccessCallbacks.forEach(callback => callback(data))
                loadIncludes(element)
            }
        })
    })
}

loadIncludes()