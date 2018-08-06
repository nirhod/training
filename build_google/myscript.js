//
function main() {
    $('.search-button').hover(
        function () {
            $(this).addClass('search-button-highlight').removeClass('search-button-no-highlight');
        },
        function () {
            $(this).addClass('search-button-no-highlight').removeClass('search-button-highlight');
        }
    );
}

$(document).ready(main);