document.addEventListener('DOMContentLoaded', () => {
    resize();   
    window.onresize = function(event) {
        resize();
    };  
});

let url = window.location.href.split('/'); 
let cover = url[0] + "//" + url[2] + "/static/" + kind + "/cover.jpeg";
let score = 0;
let flipped = 0
let flip1;
let flip2;
let snd_win = new Audio("static/" + kind + "/win.wav");
let snd_currect = new Audio("static/" + kind + "/currect.wav");
let snd_wrong = new Audio("static/" + kind + "/wrong.wav");
let window_ratio = window.innerHeight / window.innerWidth;
let timer;
let tries = 0;

function resize(){
    var x = document.getElementsByClassName("image");
    var i;
    if (window_ratio < 5 / 8){   
        for (i = 0; i < x.length; i++) {
            x[i].height = window.innerHeight / 5 - 20;
        }
    }
    else{
        for (i = 0; i < x.length; i++) {
            x[i].width = window.innerWidth  / 8 - 5;
        }
    }
}

function reset(){
    document.getElementById(flip1).src = "static/" + kind + "/cover.jpeg";
    document.getElementById(flip2).src = "static/" + kind + "/cover.jpeg";
    flipped = 0; 
}

function flip(id, i){
    if (document.getElementById(id).src == cover) {
        document.getElementById(id).src = "static/" + kind + "/" + i + ".jpeg";
        
        if (flipped == 0){
            flip1 = id;
            flipped = 1;
        }
        else if (flipped == 1){
            tries = tries + 1;
            var x = "ניקוד: " + score + " נסיונות: " + tries;
            document.querySelector('h1').innerHTML = x; 
            flip2 = id;
            flipped = 2;
            if (document.getElementById(flip1).src == document.getElementById(flip2).src){
                flipped = 0;
                score = score + 1;
                x = "ניקוד: " + score + " נסיונות: " + tries;
                document.querySelector('h1').innerHTML = x;               
                snd_currect.play();
                if (score == 20){
                    snd_win.play();
                }
            }
            else{
                snd_wrong.play();
                timer = setTimeout(reset, 2000);
            }
        }
        else{
            clearTimeout(timer);
            reset();
            flipped = 1;
            flip1 = id;
        }
    }
}
