$(document).ready(function(){
    $("#week_rent").on("keyup paste", function(){
        console.log($("#week_rent").val())
        var price = $("#week_rent").val()
        $("#month_rent").html(price/7*365/12)
    })
})
