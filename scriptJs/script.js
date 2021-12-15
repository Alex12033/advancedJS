'use strict';

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

/* class User {
    constructor(){
        
    }
} */

//1 simple function: this = window but if use strict mode - undefined
/* function showThis() {
    console.log(this);
}
showThis(); */
// function showThis(a, b) {
//     console.log(this);
//     function sum() {
//         console.log(this);
//         return a + b;
//     }
//     console.log(sum());
// }
// showThis(4, 5);

//2 if we use this in context method of object this return us object
// const obj = {
//     a: 20,
//     b:15,
//     sum: function() {
//         console.log(this);
//     }
// };
// obj.sum();

//3 this in constructor and classes - this is new instance(exemplar) of object
/* function User(name, id) {
    this.name = name;
    this.id = id;
    this.human = true;
    this.hello = function() {
        console.log("Hello ", this.name);
    };
}
let ivan = new User('Ivan', 23);
 */
 
//4 handlle to bind this context: call, apply, bind
// function sayName(surname) {
//     console.log(this);
//     console.log(this.name + surname);
// }

// const user = {
//     name: 'john'
// };

// sayName.call(user, 'Smith');
// sayName.apply(user, ['Smith']);

// function count(num) {
//     return this*num;
// }
// const double = count.bind(2);
// console.log(double(3));
// console.log(double(13));

//5 
/* const btn = document.querySelector('button');

btn.addEventListener('click', function(){
    this.style.backgroundColor = 'red';
});

let obj = {
    num: 5,
    sayNamber: function() {
        const say = () => {
            console.log(this);
        };
        say();
    }
};
obj.sayNamber(); */

//const calc = (a) => a * 2;
//console.log(calc(2));


/* class Rectangle {
    constructor(height, width) {
        this.height = height;
        this.width = width;
    }

    calcArea() {
        return this.height * this.width;
    }
}

class ColoredRectangleWithText extends Rectangle {
    constructor(height, width, text, bgColor) {
        super(height, width);
        this.text = text;
        this.bgColor = bgColor;
    }
    
    showMyProps() {
        console.log(`Text: ${this.text}, color ${this.bgColor}`);
    }
}

const div = new ColoredRectangleWithText(25, 10, 'Hello World', 'red');
 div.showMyProps();
 console.log(div.calcArea(20, 20)); */

//  const log = function(a, b, ...rest) {
//     console.log(a, b, rest);
//  };
//  log('basic', 'rest', 'operaotr', 'usage');

//  function calcODrDouble(number, basis = 2) {
//     console.log(number * basis);
//  }
// calcODrDouble(2);


