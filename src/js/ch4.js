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
