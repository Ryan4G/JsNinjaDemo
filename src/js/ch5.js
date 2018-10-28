chapter("5.1 理解闭包");
var outerValue = 'ninja';
function outerFunction(){
    assert(outerValue === 'ninja', 'I can see the ninja');
}

outerFunction();

outerValue = 'samurai';
var later;

function outerFunction2(){
    var innerValue = 'ninja';

    function innerFunction(){
        assert(outerValue === 'samurai', 'I can see the samurai');
        assert(innerValue === 'ninja', 'I can see the ninja');
    }

    later = innerFunction;
}

outerFunction2();

later();

chapter('5.2 使用闭包')
chapter('5.2.1 封装私有变量')

function Ninja(){
    var feints = 0;
    this.getFeints = function(){
        return feints;
    };

    this.feint = function(){
        feints++;
    };
}

var ninja1 = new Ninja();
ninja1.feint();

assert(ninja1.feints === undefined, 'The private data is inaccessible to us');
assert(ninja1.getFeints() === 1, "we're able to access the internal feint count");

var ninja2 = new Ninja();
assert(ninja2.getFeints() === 0, 'The second ninja object gets its own feints variable');

chapter('5.2.2 回调函数');

function animateIt(elementId){
    var elem = document.getElementById(elementId);
    var tick = 0;
    var timer = setInterval(function(){
        console.log("enter Interval");
        if (tick < 50){
            elem.style.height = tick + 'px';
            tick++;
        }
        else{
            clearInterval(timer);
            assert(tick === 50, "Tick accessed via a closure");
            assert(elem, "Element also accessed via a closure");
            assert(timer, "Timer reference also obtained via a closure");
        }
    }, 20);
}

// animateIt('box1');

chapter('5.5 理解javascript的变量类型');
chapter('5.5.1 变量可变性');

const firstConst = 'samurai';
assert(firstConst === 'samurai', 'firstConst is a samurai');

try{
    firstConst = 'ninja';
    fail("shouldn't be here");
}
catch(e){
    pass("an exception has occurred");
}

assert(firstConst === 'samurai', 'firstConst is still a samurai');

const secondConst = {};

secondConst.weapon = 'wakizashi';
assert(secondConst.weapon === 'wakizashi', 'we can add new properties');

const thirdConst = [];
assert(thirdConst.length === 0, 'no items in our arrray');

thirdConst.push('youshi');
assert(thirdConst.length === 1, 'the array has changed');

chapter('5.5.2 定义变量的关键字与词法环境');

var globalNinja = 'Yoshi';
function reportActivity(){
    var functionActivity = 'jumping';

    for(var i = 0; i < 3; i++){
        var forMessage = globalNinja + " " + functionActivity;
        assert(forMessage === 'Yoshi jumping', 'Yoshi is jumping within the for block');
        assert(i, 'Current loop counter:' + i);
    }

    assert(i === 3 && forMessage === 'Yoshi jumping', 'Loop variables accessible outside of the loop');
}

reportActivity();
assert(typeof functionActivity === "undefined" &&
       typeof i === "undefined" &&
       typeof forMessage === "undefined",
       "We can't see function variables outside of a function");

const GLOBAL_NINJA = "Yoshi";

function reportActivity1(){
    const functionActivity = "jumping";

    for(let i = 1; i < 3; i++){
        let forMessage = GLOBAL_NINJA + " " + functionActivity;
        assert(forMessage === "Yoshi jumping",
        "Yoshi is jumping within the for block");
        assert(i, "Current loop counter:" + i);
    }

    assert(typeof i === "undefined" && typeof forMessage === "undefined",
    "Loop variables not accessible outside the loop");
}

reportActivity1();
assert(typeof functionActivity === "undefined" &&
       typeof i === "undefined" &&
       typeof forMessage === "undefined",
       "We can't see function variables outside of a function");


chapter('5.5.3 在词法环境中注册标识符');

assert(typeof fun === "function", 
"fun is a function even though its definition isn't reached yet!");

assert(typeof myFunExp === "undefined", 
"But we cannot aceess function expressions");

assert(typeof myArrow === "undefined", 
"Nor arrow functions");

var myFunExp = function(){};
var myArrow = (x) => x;

assert(typeof fun === "function", "We acess the function");
var fun = 3;
assert(typeof fun === "number", "Now we access the number");
function fun(){}
assert(typeof fun === "number", "Still a number");

chapter('5.6 研究闭包的工作原理');
chapter('5.6.1 回顾使用闭包模拟私有变量的代码');

function Ninja(){
    var feints = 0;
    this.getFeints = function(){
        return feints;
    };
    this.feint = function(){
        feints++;
    };
}

var ninja1 = new Ninja();
assert(ninja1.feints === undefined, "And the private data is inaccessible to us");
ninja1.feint();
assert(ninja1.getFeints() === 1, "We're able to access the internal feint count");

var ninja2 = new Ninja();
assert(ninja2.getFeints() === 0, "The second ninja object gets its own feints variable");

chapter('5.6.2 私有变量的警告');
var importer = {};
importer.getFeints = ninja1.getFeints;

assert(importer.getFeints() === 1, "The imposter has access to the feints variable");



