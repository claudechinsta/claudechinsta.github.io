/** Flip to true to show a section again. */
export const visible = {
  projects: false,
};

export const profile = {
  name: "Claude Chen",
  nickname: "Claude",
  email: "claudechinsta@gmail.com",
  roles: ["Full-Stack Software Engineer", "Technology Enthusiast", "Music Producer / Beatmaker"],
  location: "Melbourne, Australia",
  origin: "Chongqing, China",
  statement:
    "Born and raised in Chongqing, China. Now building things on the web from Melbourne. I care about clean systems, thoughtful interfaces, and the small details that make software feel alive.",
  github: "https://github.com/claudechinsta",
};

export type Skill = { name: string; img: string };

export const skillRows: Skill[][] = [
  [
    { name: "Python", img: "/imgs/skill-python.png" },
    { name: "HTML5", img: "/imgs/skill-html5.png" },
    { name: "Swift", img: "/imgs/skill-swift.png" },
    { name: "Ruby", img: "/imgs/skill-ruby.png" },
    { name: "Scala", img: "/imgs/skill-scala.png" },
    { name: "Node.js", img: "/imgs/skill-nodejs.svg" },
    { name: ".NET", img: "/imgs/skill-dotnet.png" },
  ],
  [
    { name: "React", img: "/imgs/skill-react.png" },
    { name: "Django", img: "/imgs/skill-django.webp" },
    { name: "Angular", img: "/imgs/skill-angular.png" },
    { name: "Docker", img: "/imgs/skill-docker.png" },
    { name: "Flutter", img: "/imgs/skill-flutter.png" },
    { name: "WordPress", img: "/imgs/skill-wordpress.png" },
  ],
  [
    { name: "AWS", img: "/imgs/skill-aws.jpg" },
    { name: "Azure", img: "/imgs/skill-azure.jpeg" },
    { name: "PostgreSQL", img: "/imgs/skill-pg.png" },
    { name: "MySQL", img: "/imgs/skill-mysql.svg" },
    { name: "Elasticsearch", img: "/imgs/skill-elastic.png" },
    { name: "Jenkins", img: "/imgs/skill-jenkins.png" },
    { name: "Semaphore", img: "/imgs/skill-semaphore.webp" },
  ],
];

export const projects = [
  {
    name: "Australian City Analytics",
    nameCN: "澳大利亚推特大数据平台",
    year: 2017,
    img: "/imgs/proj_1.png",
    href: "/proj_australian_city_analysis/aca_sa2.html",
  },
  {
    name: "Wikipedia Text Classifier",
    nameCN: "基于Wikipedia的文本分类及数据可视化",
    year: 2017,
    img: "/imgs/proj_2.png",
    href: "/proj_wiki_text_clf/",
  },
  {
    name: "100 Days Earthquake",
    nameCN: "100日地震",
    year: 2017,
    img: "/imgs/earth.png",
    href: "/earthquake_map/",
  },
];

export const music = {
  blurb:
    "Producing hip-hop since 2012, I've released a handful of albums and EPs, each one shaped by the music I keep coming back to: jazz, hip-hop, and ambient. Nujabes is the clearest influence on how I build a track, with its warmth, its patience, and its way of making samples feel like they belong together. I'm also drawn to the independent musicians who take risks outside the mainstream, and their work keeps pushing mine in new directions. One love.",
  links: [
    { name: "Spotify", href: "https://play.spotify.com/artist/5xuhSWFgY8VIzptSR69QTf" },
    { name: "网易云音乐", href: "http://music.163.com/#/artist?id=818622" },
    { name: "Bandcamp", href: "http://chinsta.bandcamp.com" },
    { name: "SoundCloud", href: "https://soundcloud.com/chinstamusic" },
  ],
  embed:
    "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/860149099&color=%2368A6EE&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=false",
};

export const albums = [
  { src: "/albums/01.jpg", title: "FIW", year: 2013 },
  { src: "/albums/02.jpg", title: "My Life", year: 2014 },
  { src: "/albums/03.jpg", title: "SMEP", year: 2016 },
  { src: "/albums/04.jpg", title: "Balla con me", year: 2017 },
  { src: "/albums/05.jpg", title: "Miss Night", year: 2017 },
  { src: "/albums/06.jpg", title: "Ne pars pas", year: 2019 },
  { src: "/albums/07.jpg", title: "Fragrance", year: 2020 },
  { src: "/albums/08.jpg", title: "Rethink", year: 2020 },
  { src: "/albums/09.jpg", title: "Light Blue", year: 2021 },
];

/** Anonymised previous work. Set `media` to a file in /public/work (gif, mp4 or webm) once you have it. */
export const work = [
  {
    title: "Quant Analytics Platform",
    summary: "Quantitative analytics platform for turning raw data into models, dashboards and insights.",
    media: "/work/quant-analytics.mp4",
  },
  {
    title: "Intelligent Aquaculture Platform",
    summary: "Monitoring and analytics for fish farm operations, combining sensor data with automated alerts.",
    media: "/work/aquaculture.mp4",
  },
  {
    title: "GIS Analytics Platform",
    summary: "Spatial data platform for mapping, layer analysis and interactive visualisation.",
    media: "/work/gis.mp4",
  },
  {
    title: "Website Development",
    summary: "Marketing and product websites, designed and built end to end.",
    media: "/work/web-dev.mp4",
  },
];
