$(document).ready(function () {
    $("#skillset-container").html(`
<p>
    <div class="slideshow-layout">
        <div class="inner-wrapper">
            <div class="inner-wrapper-inner-rotate">
                <div class="slideshow" id="slideshow-1"></div>
                <div class="slideshow" id="slideshow-2"></div>
                <div class="slideshow" id="slideshow-3"></div>
            </div>
        </div>
    </div>
</p>
      `);

    const firstRowIcons = [
        "imgs/skill-python.png",
        "imgs/skill-html5.png",
        "imgs/skill-swift.png",
        "imgs/skill-ruby.png",
        "imgs/skill-scala.png",
        "imgs/skill-nodejs.svg",
        "imgs/skill-dotnet.png",
    ];

    const secondRowIcons = [
        "imgs/skill-react.png",
        "imgs/skill-django.webp",
        "imgs/skill-angular.png",
        "imgs/skill-docker.png",
        "imgs/skill-flutter.png",
        "imgs/skill-wordpress.png",
    ];

    const thirRowIcons = [
        "imgs/skill-aws.jpg",
        "imgs/skill-azure.jpeg",
        "imgs/skill-pg.png",
        "imgs/skill-mysql.svg",
        "imgs/skill-elastic.png",
        "imgs/skill-jenkins.png",
        "imgs/skill-semaphore.webp",
    ];

    [firstRowIcons, secondRowIcons, thirRowIcons].forEach((row, idx) => {
        const rowIconCount = row.length;
        $(`#slideshow-${idx + 1}`).html(
            `
            <div class="row mover">
                ${row.map((ele) => `<div class="appicon" style="background-image: url(${ele})"></div>`).join("")}
                ${row.map((ele) => `<div class="appicon" style="background-image: url(${ele})"></div>`).join("")}
            </div>
            `
        );
    });

    // for (let i = 0; i < iconPool.length; i++) {
    //     let idx = i;
    //     // if (i >= 4 && i < 8) {
    //     //     idx = i + 4;
    //     // }
    //     // if (i >= 8 && i < 12) {
    //     //     idx = i + 8;
    //     // }
    //     console.log(iconPool[i], idx);
    //     $(`.appicon:eq(${idx})`).css("background-image", `url(${iconPool[i]})`);
    //     $(`.appicon:eq(${idx + 4})`).css("background-image", `url(${iconPool[i]})`);
    // }
    // $(`.appicon`).on("mouseover", (e) => {
    //     console.log(e);
    // });
});
