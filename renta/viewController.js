$(document).ready(function () {
    // $('ol').html(localStorage.getItem("content"))
    localStorage.setItem("content", "") 

    function updatePrice(){
        console.log($("#week_rent").val())
        var price = $("#week_rent").val()
        $("#month_rent").html( (price / 7 * 365 / 12 / 2).toFixed(2) )
        $("#month_rent_total").html( (price / 7 * 365 / 12).toFixed(2) )
    }

    function updateContent(){
        localStorage.setItem("content", $('ol').html())
    }
    
    $("#week_rent")
        .on("keyup paste", function () {updatePrice()})
        .on("change", function () {updatePrice()});

    $('#button').click(function () {
        var toAdd = $('input[name=ListItem]').val();
        if (toAdd != "") {
            $('ol').append('<li>' + toAdd + '</li>');
            updateContent()
        }
    });

    // $("input[name=ListItem]").keyup(function(event) {
    //     console.log(event.keyCode)
    //     if (event.keyCode == 13) {
    //         $("#button").click();
    //     }
    // });

    $(document).on('dblclick', 'li', function () {
        $(this).toggleClass('strike').fadeOut('slow');
        updateContent()
    });

    $('input').focus(function () {
        $(this).val('');
    });

})
