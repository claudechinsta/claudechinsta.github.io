$(document).ready(function () {
    // $('ol').html(localStorage.getItem("content"))
    localStorage.setItem("content", "")

    $("#week_rent").on("keyup paste", function () {
        console.log($("#week_rent").val())
        var price = $("#week_rent").val()
        $("#month_rent").html( (price / 7 * 365 / 12 / 2).toFixed(2) )
        $("#month_rent_total").html( (price / 7 * 365 / 12).toFixed(2) )
    });

    $('#button').click(function () {
        var toAdd = $('input[name=ListItem]').val();
        if (toAdd != "") {
            $('ol').append('<li>' + toAdd + '</li>');
            localStorage.setItem("content", $('ol').html())
        }
    });

    $("input[name=ListItem]").keyup(function(event) {
        if (event.keyCode == 13) {
            $("#button").click();
        }
    });

    $(document).on('dblclick', 'li', function () {
        $(this).toggleClass('strike').fadeOut('slow');
        localStorage.setItem("content", $('ol').html())
    });

    $('input').focus(function () {
        $(this).val('');
    });

})
