$(document).ready(function () {
  $("#skillset-container").html(`
<h1>Skill Set</h1>
<article>
<p>
<div class="slideshow-layout">
<div class="inner-wrapper">
<div class="inner-wrapper-inner-rotate">
<div class="slideshow">
<div class="row mover">
<div class="appicon"></div>
<div class="appicon"></div>
<div class="appicon"></div>
<div class="appicon"></div>
<div class="appicon"></div>
<div class="appicon"></div>
<div class="appicon"></div>
<div class="appicon"></div>
</div>
</div>
<div class="slideshow">
<div class="row mover">
<div class="appicon"></div>
<div class="appicon"></div>
<div class="appicon"></div>
<div class="appicon"></div>
<div class="appicon"></div>
<div class="appicon"></div>
<div class="appicon"></div>
<div class="appicon"></div>
</div>
</div>
<div class="slideshow">
<div class="row mover">
<div class="appicon"></div>
<div class="appicon"></div>
<div class="appicon"></div>
<div class="appicon"></div>
<div class="appicon"></div>
<div class="appicon"></div>
<div class="appicon"></div>
<div class="appicon"></div>
</div>
</div>
</div>
</div>
</div>

</p>
</article>
      `);

  const iconPool = [
    "imgs/skill-react.png",
    "imgs/skill-aws.jpg",
    "imgs/skill-django.webp",
    "imgs/skill-docker.png",
    "imgs/skill-flutter.png",
    "imgs/skill-html5.png",
    "imgs/skill-pg.png",
    "imgs/skill-python.png",
    "imgs/skill-swift.png",
    "imgs/skill-wordpress.png",
    "imgs/skill-angular.png",
    "imgs/skill-jenkins.png",
  ];

  for (let i = 0; i < iconPool.length; i++) {
    let idx = i;
    if (i >= 4 && i < 8) {
      idx = i + 4;
    }
    if (i >= 8 && i < 12) {
      idx = i + 8;
    }
    $(`.appicon:eq(${idx})`).css("background-image", `url(${iconPool[i]})`);
    $(`.appicon:eq(${idx + 4})`).css("background-image", `url(${iconPool[i]})`);
  }
});
