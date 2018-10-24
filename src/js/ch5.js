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

animateIt('box1');

chapter('5.3 通过执行上下文来跟踪代码')