let main = document.querySelector("main");
let boxgame = document.querySelector(".boxgame");
let items = document.querySelectorAll(".boxgame span");
let circlejoke = document.querySelector(".circlejoke");
let paddle = document.querySelector(".paddle");

let checkclick = 0;
let x = 0;
let y = 85;
let speedx = 4;
let speedy = 4;
let move;
let move_tt = 0;
let move_items_tb = 0;

//mouse move;
window.addEventListener("mousemove",(event) => {
    paddle.style.left = `${event.clientX}px`;
});

//click paddle
paddle.addEventListener("click",(event) => {
    if (checkclick == 0) {
        checkclick = 1;
        let circle = document.createElement("div");
        circlejoke.style.display = "none";
        paddle.classList.add("addanimation");
        circle.style.backgroundColor = "tomato";
        circle.classList.add("addsytlec");
        circle.style.left = `${event.clientX + 85}px`;
        circle.style.bottom = `${80}px`;
        x = event.clientX + 80;
        main.appendChild(circle);

        //loop move circle
        move = setInterval(() => {
            let p_paddle = paddle.getBoundingClientRect();
            let p_circle = circle.getBoundingClientRect();

            x += speedx;
            y += speedy;

            //check circle move top to bottom
            if (y > window.innerHeight - 30) {
                paddle.classList.remove("addanimation");
                move_tt = 1;
                speedy = -speedy;
            }

            //check circle move bottom to top
            if (move_tt == 1) {
                if (p_circle.top < p_paddle.bottom && p_circle.bottom > p_paddle.top && p_circle.left < p_paddle.right && p_circle.right > p_paddle.left) {
                    paddle.classList.add("addanimation");
                    move_tt = 0;
                    move_items_tb = 0;
                    speedy = -speedy;
                }
            }

            //check circle right to left and left to right
            if (x > window.innerWidth - 50) {
                paddle.classList.remove("addanimation");
                speedx = -speedx;
            }
            else if (x < 1) {
                paddle.classList.remove("addanimation");
                speedx = -speedx;
            }

            //check circle move to items
            let p_items;
            for (let i = 0 ; i < items.length ; i++) {
                p_items = items[i].getBoundingClientRect();
                if (p_circle.top < p_items.bottom && p_circle.bottom > p_items.top && p_circle.left < p_items.right && p_circle.right > p_items.left) {
                    items[i].style.display = "none";
                    if (move_items_tb == 0) {
                        paddle.classList.remove("addanimation");
                        speedy = -speedy;
                        move_tt = 1;
                        move_items_tb = 1;
                        let reset = setTimeout(() => {
                            move_items_tb = 0;
                        },20);
                    }
                }
            }

            circle.style.left = `${x}px`;
            circle.style.bottom = `${y}px`;
        },10);
    }
});