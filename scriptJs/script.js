
/* const btn = document.querySelector('.btn');
let timerId,
    i = 0;

function myAnimation() {
    const elem = document.querySelector('.box');
    let pos = 0;
    
    const id = setInterval(frame, 10);
    function frame() {
        if (pos == 300) {
            clearInterval(id);
        } else {
            pos++;
            elem.style.top = pos + "px";
            elem.style.left = pos + "px";
        }
    }
}
btn.addEventListener('click', myAnimation);




function logger() {
   if (i == 3) {
       clearInterval(timerId);
   }
   console.log('heloooo');
   i++;
}

let id = setTimeout(function log(){
   console.log('hello');
   id = setTimeout(log, 500);
}, 500);
 */

/* const now = new Date('2021-11-22');
new Date.parse('2021-11-22');

console.log(now.setHours(40));
console.log(now);



console.log(now.getFullYear());
console.log(now.getMonth());
console.log(now.getDate());
console.log(now.getDay());
console.log(now.getUTCHours());

console.log(now.getTimezoneOffset());
console.log(now.getTime());

let start = new Date();

for (let i = 0; i < 1000000; i++) {
    let some = i ** 3;
}

let end = new Date();

alert(`Cickle work ${end - start} milisecond`); */

/* function user(name, id) {
    this.name = name;
    this.id = id;
    this.human = true;
    this.hello = function() {
        console.log(`Hello${this.name}`);
    };
}

user.prototype.exit = function() {
    console.log(`User ${this.name} out`);
};



 const ivan = new user('Ivan', 28); */
// const alex = new user('Alex', 20);
// ivan.hello();
// alex.hello();
//ivan.exit();

class User {
    constructor(){
        
    }
}