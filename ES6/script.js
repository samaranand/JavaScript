/*
const years = [1993,1978,1992,2001,1988,1998];

var ar = years.map(el=> 2020-el);




const box6 = {
    color: 'green',
    pos: 1,
    clickMe: function(){
        document.querySelector('.green').addEventListener('click', f => {
            const str = `I am color ${this.color} and my pos is ${this.pos}`;
            alert(str);
        });
    }
}

box6.clickMe();


function Person(name){
    this.name = name;
};

Person.prototype.addFriend = function(arr){
    var myFriend = arr.map(el => {
        return this.name + ' is friend of ' + el;
    });
    console.log(myFriend);
};


var sam = new Person('Samar Anand');

var arr = ['sak','pok','plp'];
sam.addFriend(arr);


const obj = {
    first: 'Samar',
    last: 'Anand'
}

console.log(obj);

const {first: a, last: b } = obj;

const [a,b] = [obj.first , obj.last];

console.log(a, b);

const box = document.querySelectorAll('.box');

console.log(box);

let ar = Array.from(box);

console.log(ar);

ar.forEach(el => el.style.backgroundColor = 'dodgerblue');

var ages = ['sam',1,2,4];

function sum4(a,b,c,d){
    return a+b+c+d;
}

let s1 = sum4(2,3,4,5);
console.log(s1);

console.log(sum4(...ages));


const famliy1 = ['ram', 'mohan','shyam','gita'];

const family2 = ['shiv', 'rakesh', 'seeta'];

const full = [...famliy1, ...family2];

console.log(full);


function prtArr(){
    console.log(arguments);
    var arr = Array.prototype.slice.call(arguments,2,-2);
    console.log(arr);
    arr.forEach(el => console.log(el + ' i am the el'));
}


prtArr(1,2,3,4,5,7);


var person = function(name,age){
    this.name = name;
    this.age = age;
};

person.prototype.dob = function() {
    console.log( this.name + ' birthyear is ' + (2020 - this.age));
};


var athelete = function(name, age, type){
    person.call(this, name, age);
    this.type = type;
}

athelete.prototype = Object.create(person.prototype);

athelete.prototype.view = function(){
    console.log(this.name + ' is a type of ' + this.type);
}


var arav = new athelete('arav', 19, 'shooter');

arav.dob();

arav.view();

class Person {
    constructor(name,a,y){
        this.name = name;
        this.age = a;
        this.year = y;
    }
    calculateAge(){
        let age = 2020 - this.year;
        console.log(`my age is ${this.age}`);
        
    }
}


class athelete extends Person {
    constructor(n,a,y,medals){
        super(n,a,y);
        this.medals = medals;
    }
    show(){
        console.log(`my name is ${this.name} and i won ${this.medals} medals`);
    }
}

const arav = new athelete('arav', 22, 1983, 10);

arav.calculateAge();
arav.show();
*/

class Structures {
    constructor(name, buildYear){
        this.name = name;
        this.buildYear = buildYear;
        this.age = this.calculateAge();
    }

    // calculate age function
    calculateAge(){
        var age = (new Date()).getFullYear() - this.buildYear;
        return age;
    }
}



// sub class of park
class Park extends Structures{

    constructor(name, buildYear, numOfTree, area){
        super(name, buildYear);
        this.numOfTree = numOfTree;
        this.area = area;
    }

    treeDensity(){
        console.log(`The average tree density of the park ${this.name} is ${this.numOfTree / this.area}.`);
    }
    
}


// sub class of street

class Street extends Structures {
    // constructor
    constructor(name, buildYear, length, size='normal'){
        super(name, buildYear);
        this.length = length;
        this.size = size;
    }
}

function avgAge(name, ...arr){
    let sum = 0;
    arr.forEach(el => sum += el.age);
    console.log(`the average age of ${name} is ${sum / arr.length}.`);
}