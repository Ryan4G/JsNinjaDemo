chapter("4.1 使用隐式函数参数");
chapter("4.1.1 arguments 参数");

function whatever(a, b ,c){
    assert(a === 1, "The value of a is 1");
    assert(b === 2, "The value of b is 2");
    assert(c === 3, "The value of c is 3");

    assert(arguments.length === 5, 'We\'ve passed in 5 parameters');
    assert(arguments[0] === a, 'The first argument is assigned to a');
    assert(arguments[1] === b, 'The second argument is assigned to b');
    assert(arguments[2] === c, 'The third argument is assigned to c');
    assert(arguments[3] === 4, 'We can access the fourth argument');
    assert(arguments[4] === 5, 'We can access the fifth argument');
}

whatever(1,2,3,4,5);

function sum(){
    var sum = 0;
    for (var i = 0; i < arguments.length; i++){
        sum += arguments[i];
    }
    return sum;
}

function sum_rest(...restArgs){
    var sum = 0;
    for (var i = 0; i < restArgs.length; i++){
        sum += restArgs[i];
    }
    return sum;
}

assert(sum(1, 2) === 3, 'We can add two numbers');
assert(sum(1, 2, 3) === 6, 'We can add three numbers');
assert(sum(1, 2, 3, 4) === 10, 'We can add four numbers');
assert(sum_rest(1, 2, 3, 4) === 10, 'We can add four numbers using rest parameter');

function infiltrate(person){
	'use strict';

	assert(person === 'gardener', 'The person is a gardener');
	assert(arguments[0] === 'gardener', 'The first argument is a gardener');

	arguments[0] = 'ninja';

	assert(person === 'ninja', 'The person is a ninja');
	assert(arguments[0] === 'ninja', 'The first argument is a ninja');

	person = 'gardener';
	assert(person === 'gardener', 'The person is a gardener once more');
	assert(arguments[0] === 'gardener', 'The first argument is a gardener again');
}

infiltrate('gardener');

chapter("4.2 函数调用");

function skulk(name){}
function Ninja(name){}

// 作为函数调用
skulk('Hattori');
(function(who){return who;})('Hattori');

var ninja = {
	skulk: function(){}
};

// 作为一个方法调用
ninja.skulk('Hattori');

// 作为构造函数调用
ninja = new Ninja('Hattori');
// 通过call方法调用
skulk.call(ninja, 'Hattori');
// 通过apply方法调用
skulk.apply(ninja, ['Hattori']);

chapter("4.2.1 作为函数直接被调用");

function ninja_func(){
    return this;
}

function samurai(){
    'use strict';
    return this;
}

assert(ninja_func() === window, "In a 'nonstrict' ninja function, " + 
"this context is the global window object");

assert(samurai() === undefined, "In a 'strict' samurai function, " + 
"this context is undefined");

chapter("4.2.2 作为方法被调用");

function whatsMyContext(){
    return this;
}

assert(whatsMyContext() === window, "Function call on window");

var getMyThis = whatsMyContext;
assert(getMyThis() === window, "Another function call in window");

var ninja1 = {
    getMyThis: whatsMyContext
};
assert(ninja1.getMyThis() === ninja1, "Working with 1st ninja");

var ninja2 = {
    getMyThis: whatsMyContext
}
assert(ninja2.getMyThis() === ninja2, "Working with 2nd ninja");

chapter("4.2.3 作为构造函数调用");

function Ninja(){
    this.skula = function(){
        return true;
    };

    return 1;
}
assert(Ninja() === 1, "Return value honored when not called as a constructor");

var ninja = new Ninja();
assert(typeof ninja === "object", "Object returned when called as a constructor");
assert(typeof ninja.skula === "function", "ninja object has a skulk method");

var puppet = {
    rules: false
};

function Emperor(){
    this.rules = true;
    return puppet;
}

var emperor = new Emperor();

assert(emperor === puppet, "The emperor is merely a puppet!");
assert(emperor.rules === false, "The puppet does not know how to rule!");

chapter("4.2.4 使用apply和call方法调用");

function juggle(){
    var result = 0;
    for(var n = 0; n < arguments.length; n++){
        result += arguments[n];
    }

    this.result = result;
}

var ninja_1 = {};
var ninja_2 = {};

juggle.apply(ninja_1, [1,2,3,4]);
juggle.call(ninja_2, 1,2,3,4,5);

assert(ninja1.result === 10, "juggled via apply");
assert(ninja1.result === 15, "juggled via call");

function forEach(list, callback){
    for (var n = 0; n < list.length; n++){
        callback.call(list[n], n);
    }
}

var weapons = [{type: 'shuriken'},{type: 'katana'},{type: 'nunchucks'} ];
forEach(weapons, function(index){
    assert(this === weapons[index], "Got the expected value of " + weapons[index].type);
});

chapter("4.3 解决函数上下文的问题");
chapter("4.3.1 使用箭头函数绕过函数上下文");

function Button(){
    this.clicked = false;
    this.click = ()=>{
        this.clicked = true;
        assert(button.clicked, "The button has been clicked");
    };
}

var button = new Button();
button.click();

var button_arrow = {
    clicked: false,
    click: () => {
        assert(button_arrow.clicked, "The button has been clicked");
        assert(this === window, "In arrow function this === window");
        assert(window.clicked, "clicked is stored in window");
    }
}
button_arrow.click();

chapter("4.3.2 使用bind方法");

var button_bind = {
    clicked : false,
    click : function(){
        this.clicked = true;
        assert(button.clicked, "The button has been clicked");
    }
};

var boundFunction = button_bind.click.bind(button_bind);
assert(boundFunction != button.click, "Calling bind creates a completly new function");