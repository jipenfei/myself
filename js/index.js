// var oUl = document.getElementsByClassName("aside");
// var tAble = document.getElementsByClassName("table");
// var ss = tAble.getElementsByClassName("aside")
// console.log(ss)

// console.log(oImg)
//   oImg.onmouseout = function aa(){
//      for(var i=0;i<=oImg.length;i++){
//         console.log(1);
//          oImg[0].classList.remove("img-circle");
//          oImg[1].classList.add("img-circle");
//          console.log("1");
//      }
//   }
//
// 电影列表
var Mov = document.getElementsByClassName("mov_img");
console.log(Mov)


$.get("https://bird.ioliu.cn/v1/?url=http://m.maoyan.com/movie/list.json?type=hot&offset=0&limit=1000",function (res){



    // var img, star,nm;
    // var Mov=$(".movie img");
    var ims;
    // for(var i=0;i<Mov.length;i++){
    ims = res.data.movies[0].img;
    console.log(ims)
    Mov.setAttribute('src',ims);
    //     star = res.data.movies[i].star;
    //     nm = res.data.movies[i].nm;







})


// 电影列表结束


$(".aside img").on("mouseover",function() {
    $(".aside img:eq(0)").removeClass("img-circle").next().addClass("img-circle")
})
$(".aside img").on("mouseout",function() {
    $(".aside img:eq(0)").addClass("img-circle").next().removeClass("img-circle")
})
$(function(){
    $(".project li").mouseover(function(){
        $(this).find(".topLine,.bottomLine").stop().animate({"width":"447px"},"fast");
        $(this).find(".rightLine,.leftLine").stop().animate({"height":"284px"},"fast");
        $(this).find(".project-word").stop().css({"top":"23%"});
        $(this).find(".project-word2").stop().css({"top":"73%"});
        $(this).find(".box-shandow").css({"display":"block"});
        $(this).find(".box-shandow2").css({"display":"block"});
    })
    $(".project li").mouseout(function(){
        $(this).find(".topLine,.bottomLine").stop().animate({"width":"0px"},"fast");
        $(this).find(".rightLine,.leftLine").stop().animate({"height":"0px"},"fast");
        $(this).find(".project-word").stop().css({"top":"20%"})
        $(this).find(".project-word2").stop().css({"top":"70%"})
        $(this).find(".box-shandow").css({"display":"none"})
        $(this).find(".box-shandow2").css({"display":"none"});
    })
})




// 个人介绍
$("#myperson").on("click",function() {
    flag=false;
    if(flag==false){
        $(".person").css({
            "display":"block",
            "animation":"my 1s",
            "width":"150px",
        });
        flag=true;
    }
    console.log(flag);


    // if(flag==true){
    //     $(".person").css({
    //         "display":"none"
    //  });
    //  flag=false;
    // }
})
// 个人介绍



// 画布
var c=document.getElementById("myCanvas1");
aa(18,15,z="90%");
function aa(x,y) {
    var cxt=c.getContext("2d");
    cxt.moveTo(60,60);
    cxt.arc(60,60,60,x*15*Math.PI/180,y*15*Math.PI/180);
    cxt.lineTo(60,60);
    cxt.fillStyle="#ff9797";
    cxt.strokeStyle="#6c6c6c";
    cxt.lineWidth="1";
    cxt.fill();
    cxt.stroke();


    cxt.beginPath();
    for(var i=0;i<24;i++){
        cxt.moveTo(60,60);

        cxt.arc(60,60,60,i*15*Math.PI/180,(i+1)*15*Math.PI/180);
        cxt.strokeStyle="#6c6c6c";
        cxt.lineWidth="";
        cxt.stroke();

    }

    cxt.beginPath();
    cxt.arc(60,60,50,0*Math.PI,2*Math.PI);
    cxt.fillStyle="white";
    cxt.strokeStyle="#6c6c6c";
    cxt.lineWidth="2";
    cxt.fill();
    cxt.stroke();


    cxt.beginPath();

    cxt.font = 'bold 38px Arial';
    cxt.textAlign = 'left';
    cxt.textBaseline = 'top';
    cxt.fillStyle = '#6c6c6c';
    cxt.fillText(z,30,38);
    cxt.fill();
}
// 画布结束




// 画布背景开始
let max_particles    = 100;
let particles        = [];
let frequency        = 100;
let init_num         = max_particles;
let max_time         = frequency*max_particles;
let time_to_recreate = false;

// Enable repopolate
setTimeout(function(){
    time_to_recreate = true;
}.bind(this), max_time)

// Popolate particles
popolate(max_particles);

var tela = document.getElementById('bigcanvas');
tela.width = $(window).width();
tela.height = $(window).height()*0.8;
$(".title").append(tela);

var canvas = tela.getContext('2d');

class Particle{
    constructor(canvas, options){
        let colors = ["#feea00","#a9df85","#5dc0ad", "#ff9a00","#fa3f20"]
        let types  = ["full","fill","empty"]
        this.random = Math.random()
        this.canvas = canvas;
        this.progress = 0;

        this.x = ($(window).width()/2)  + (Math.random()*200 - Math.random()*200)
        this.y =  ($(window).height()*0.8) + (Math.random()*200 - Math.random()*200)
        this.w = $(window).width()
        this.h =  $(window).height()*0.8
        this.radius = 1 + (8*this.random)
        this.type  = types[this.randomIntFromInterval(0,types.length-1)];
        this.color = colors[this.randomIntFromInterval(0,colors.length-1)];
        this.a = 0
        this.s = (this.radius + (Math.random() * 1))/10;
        //this.s = 12 //Math.random() * 1;
    }

    getCoordinates(){
        return {
            x: this.x,
            y: this.y
        }
    }

    randomIntFromInterval(min,max){
        return Math.floor(Math.random()*(max-min+1)+min);
    }

    render(){
        // Create arc
        let lineWidth = 0.2 + (2.8*this.random);
        let color = this.color;
        switch(this.type){
            case "full":
                this.createArcFill(this.radius, color)
                this.createArcEmpty(this.radius+lineWidth, lineWidth/2, color)
                break;
            case "fill":
                this.createArcFill(this.radius, color)
                break;
            case "empty":
                this.createArcEmpty(this.radius, lineWidth, color)
                break;
        }
    }

    createArcFill(radius, color){
        this.canvas.beginPath();
        this.canvas.arc(this.x, this.y, radius, 0, 2 * Math.PI);
        this.canvas.fillStyle = color;
        this.canvas.fill();
        this.canvas.closePath();
    }

    createArcEmpty(radius, lineWidth, color){
        this.canvas.beginPath();
        this.canvas.arc(this.x, this.y, radius,0, 2 * Math.PI);
        this.canvas.lineWidth = lineWidth;
        this.canvas.strokeStyle = color;
        this.canvas.stroke();
        this.canvas.closePath();
    }

    move(){

        this.x += Math.cos(this.a) * this.s;
        this.y += Math.sin(this.a) * this.s;
        this.a += Math.random() * 0.4 - 0.2;

        if(this.x < 0 || this.x > this.w - this.radius){
            return false
        }

        if(this.y < 0 || this.y > this.h - this.radius){
            return false
        }
        this.render()
        return true
    }

    calculateDistance(v1, v2){
        let x = Math.abs(v1.x - v2.x);
        let y = Math.abs(v1.y - v2.y);
        return Math.sqrt((x * x) + (y * y));
    }
}

/*
 * Function to clear layer canvas
 * @num:number number of particles
 */
function popolate(num){
    for (var i = 0; i < num; i++) {
        setTimeout(
            function(x){
                return function(){
                    // Add particle
                    particles.push(new Particle(canvas))
                };
            }(i)
            ,frequency*i);
    }
    return particles.length
}

function clear(){
    // canvas.globalAlpha=0.04;
    canvas.fillStyle='#fff';
    canvas.fillRect(0, 0, tela.width, tela.height);
    // canvas.globalAlpha=1;
}

function connection(){
    let old_element = null
    $.each(particles, function(i, element){
        if(i>0){
            let box1 = old_element.getCoordinates()
            let box2 = element.getCoordinates()
            canvas.beginPath();
            canvas.moveTo(box1.x,box1.y);
            canvas.lineTo(box2.x,box2.y);
            canvas.lineWidth = 0.45;
            canvas.strokeStyle="black";
            canvas.stroke();
            canvas.closePath();
        }

        old_element = element
    })
}

/*
 * Function to update particles in canvas
 */
function update(){
    clear();
    connection()
    particles = particles.filter(function(p) { return p.move() })
    // Recreate particles
    if(time_to_recreate){
        if(particles.length < init_num){ popolate(1);}
    }
    requestAnimationFrame(update.bind(this))
}

update()
// 画布背景结束