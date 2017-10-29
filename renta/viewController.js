$(document).ready(function () {
    // $('ol').html(localStorage.getItem("content"))
    localStorage.setItem("content", "") 
    
    function updatePrice(){
        console.log($("#week_rent").val())
        var price = $("#week_rent").val()
        $("#month_rent").html( (price / 7 * 365 / 12 / 2).toFixed(2) )
        $("#month_rent_total").html( (price / 7 * 365 / 12).toFixed(2) )
    }
    
    $('.prop_item').on('click', '.prop_btn', function(){
        
        var greyColor = "rgb(180, 180, 180)"
        console.log($(this).parent().css("background-color"))
        if($(this).parent().css("background-color")!=greyColor){
            $(this).parent().css("background", greyColor)
        }else{
            $(this).parent().css("background", "rgb(114, 117, 161)")
        }
    })
    
    function updateContent(){
        localStorage.setItem("content", $('ol').html())
    }
    
    $("#week_rent")
    .on("keyup paste", function () {updatePrice()})
    .on("change", function () {updatePrice()});
    
    $('#button').click(function () {
        $('#prop_list').append("<div class='prop_item' >" +
        "<div class='prop_address'>405/69 Victoria Street, Fitzroy, Vic 3065</div>" +
        "<div class='prop_date'>2017-10-29</div>" +
        "<div class='prop_url'>" +
        "<a href='https://www.realestate.com.au/rent/in-fitzroy,+vic+3065/list-1' target='_blank'>https://www.realestate.com.au/rent/in-fitzroy,+vic+3065/list-1</a></div>" +
        "<div class='prop_btn'>VISITED</div>" +
        "</div>")
    });
    
    $('input').focus(function () {
        $(this).val('');
    });
    
})
