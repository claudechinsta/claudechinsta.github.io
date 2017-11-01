$(document).ready(function() {
    let offsetValue = 50;
    // Add smooth scrolling to all links
    $("#btn_index").on('click', function(event) {
        $("html, body").animate({
            scrollTop: 0
        }, 300);
    });
    $("#btn_music").on('click', function(event) {
        $("html, body").animate({
            scrollTop: $("#content-music").offset().top - offsetValue
        }, 300);
    });
    $("#btn_design").on('click', function(event) {
        $("html, body").animate({
            scrollTop: $("#content-design").offset().top - offsetValue
        }, 300);
    });
    $("#btn_project").on('click', function(event) {
        $("html, body").animate({
            scrollTop: $("#content-project").offset().top - offsetValue
        }, 300);
    });
    
    var projects = [{
        "projName": "Australian City Analytics",
        "projNameCN": "澳大利亚推特大数据平台",
        "projYear": 2017,
        "imgSrc": "imgs/proj_1*2.png",
        "projSrc": "./proj_australian_city_analysis/aca_sa2.html"
    },
    {
        "projName": "Wikipedia Text Classifier",
        "projNameCN": "基于Wikipedia的文本分类及数据可视化",
        "projYear": 2017,
        "imgSrc": "imgs/proj_2*2.png",
        "projSrc": "./proj_wiki_text_clf"
    },
    {
        "projName": "Quicker - Currency Exchange Rates",
        "projNameCN": "Quicker - 汇率快查Chrome扩展应用",
        "projYear": 2017,
        "imgSrc": "imgs/quicker.jpg",
        "projSrc": "https://chrome.google.com/webstore/detail/ogmmijheaeigiheggkpjnnkfkkheiefh"
    },
    {
        "projName": "100 Days Earthquake (Demo)",
        "projNameCN": "100日地震",
        "projYear": 2017,
        "imgSrc": "imgs/earth.png",
        "projSrc": "./earthquake_map"
    }
];

var desc = "Below is the project showcase with links to demo websites."

$("#proj-container").html("<h1>IT Projects</h1><h4>IT 项目</h4><article><p>" + desc + "</p></article>");
projects.forEach(projItem => {
    htmlContent =
    '<div class="content-inner-proj">' +
    '<a href="' + projItem.projSrc + '" target="_blank"><img class="thumbnail_proj" src="' +
    projItem.imgSrc + '" alt="City" width="200"></a>' +
    '<div class="thumbnail_proj_label"><b>' + projItem.projName + '</b></div>' +
    '<div class="thumbnail_proj_label">' + projItem.projNameCN + '</div>' +
    '<div class="thumbnail_proj_label">' + projItem.projYear + '</div>' + '</div>';
    $("#proj-container").append(htmlContent);
    
})
});