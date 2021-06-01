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
    "https://play-lh.googleusercontent.com/85WnuKkqDY4gf6tndeL4_Ng5vgRk7PTfmpI4vHMIosyq6XQ7ZGDXNtYG2s0b09kJMw",
    "https://pbs.twimg.com/profile_images/1052324554171764736/LQoMp4Xr_400x400.jpg",
    "https://cdn.changelog.com/uploads/icons/topics/qw/icon_large.png?v=63684173534",
    "https://s.w.org/style/images/about/WordPress-logotype-wmark.png",
    "https://dashboard.snapcraft.io/site_media/appmedia/2020/03/app_icon_512.png",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbAmafdPNr9fd0KC0Z98WYEC7Wl1wYlPVf-A&usqp=CAU",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Angular_full_color_logo.svg/1200px-Angular_full_color_logo.svg.png",
    "https://cdn3.iconfinder.com/data/icons/logos-and-brands-adobe/512/267_Python-512.png",
    "https://cdn4.iconfinder.com/data/icons/logos-3/504/Swift-2-512.png",
    "https://cdn2.hubspot.net/hubfs/3885898/django.png",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTM6sTWbPNUzyTMvc40YYP8N8CCB2u0jCnC2g&usqp=CAU",
    "https://pbs.twimg.com/profile_images/1283438385781108736/wvISADbt_400x400.jpg",
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
