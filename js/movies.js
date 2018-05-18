/**
 * Created by ASUS-PC on 2018/5/18.
 */

var img
$.get("https://bird.ioliu.cn/v1/?url=http://m.maoyan.com/movie/list.json?type=hot&offset=0&limit=1000",function (res) {

    img = res.data.movies[0].img


    $(".movie li:eq(0)").attr("src",img)
    console.log($(".movies li"));
    p1.innerHTML =movies;
},'jsonp')
