$(document).ready(function () {
    // $('ol').html(localStorage.getItem("content"))
    updateContent() // Initialize the content
    
    function updatePrice(){
        var price = $("#week_rent").val()
        $("#month_rent").html( (price / 7 * 365 / 12 / 2).toFixed(2) )
        $("#month_rent_total").html( (price / 7 * 365 / 12).toFixed(2) )
    }

    function formatItem(element) {
        var formatted = "<div class='prop_item' >" +
        "<div contenteditable='true' class='prop_address single-line'>"+element.address+"</div>" +
        "<div contenteditable='true' class='prop_price single-line'>$"+element.price+" PW</div>" +
        "<div contenteditable='true' class='prop_date single-line'>"+element.date+"</div>" +
        "<div contenteditable='true' class='prop_url'>" +
        "<a href='"+element.link+"' target='_blank'>"+element.link+"</a></div>" +
        "<div class='prop_btn'>VISITED</div>" +
        "</div>"
        return formatted
    }

    function updateContent(){
        $.getJSON("./content.json", function(content){
            console.log(content)
            content.forEach(function(element) {
                $('#prop_list').html(formatItem(element))
            }, this);
        })
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
    
    $("#week_rent")
    .on("keyup paste", function () {updatePrice()})
    .on("change", function () {updatePrice()});
    
    $('#button').click(function () {
        var d = new Date();
        var newItem = {
            "address": "",
            "date": d.getFullYear() + "-" + (d.getMonth()+1) + "-" + d.getDate() ,
            "price": "",
            "link": ""
        }
        $('#prop_list').append(formatItem(newItem))
    });
    
    $('input').focus(function () {
        $(this).val('');
    });
    
})
