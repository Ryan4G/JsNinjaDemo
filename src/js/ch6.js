chapter("6.2 使用生产器函数");
chapter("6.2.1 通过迭代器对象控制生成器");

function* WeaponGenerator(){
    yield "Katana";
    yield "Wakizashi";
}

const weponsIterator = WeaponGenerator();

const result1 = weponsIterator.next();
assert(typeof result1 === 'object' &&
    result1.value === "Katana" &&
    !result1.done, "Katana received");

const result2 = weponsIterator.next();
assert(typeof result2 === 'object' &&
    result2.value === "Wakizashi" &&
    !result2.done, "Wakizashi received");

const result3 = weponsIterator.next();
assert(typeof result3 === 'object' &&
    result3.value === undefined &&
    result3.done, "There is no more results");

let item;
const weponsIterator2 = WeaponGenerator();
while(!(item = weponsIterator2.next()).done){
    assert(item !== null, item.value);
}

function* WarriorGenerator2(){
    yield "Sun Tzu";
    yield *NinjaGenerator();
    yield "Genghis Khan";
}

function* NinjaGenerator(){
    yield "Hattori";
    yield "Yoshi";
}

for(let warrior of WarriorGenerator2()){
    assert(warrior !== null, warrior);
}

chapter("6.2.2 使用生成器");
function* IdGenerator(){
    let id = 0;
    while(true){
        yield ++id;
    }
}

const idIterator = IdGenerator();

const ninja1 = {id: idIterator.next().value};
const ninja2 = {id: idIterator.next().value};
const ninja3 = {id: idIterator.next().value};

assert(ninja1.id === 1, 'First ninja has id 1');
assert(ninja2.id === 2, 'Second ninja has id 2');
assert(ninja3.id === 3, 'Third ninja has id 3');

function traverseDOM(element, callback){
    callback(element);
    element = element.firstElementChild;
    while(element){
        traverseDOM(element, callback);
        element = element.nextElementSibling;
    }
}

const subTree = document.getElementById("subTree");
traverseDOM(subTree, function(element){
    assert(element !== null, element.nodeName.toLowerCase());
});

function* DomTraversal(element){
    yield element;
    element = element.firstElementChild;
    while(element){
        yield* DomTraversal(element);
        element = element.nextElementSibling;
    }
}

for(let ele of DomTraversal(subTree)){
    assert(ele !== null, ele.nodeName.toLowerCase());
}

chapter("6.2.3 与生成器交互");

function *NinjaGenerator2(action){
    const imposter = yield ('Hattori ' + action);

    assert(imposter == 'Hanzo', 'The generator has been infiltrated');
    yield ("Yoshi (" + imposter + ") " + action);
}

const ninjaIterator = NinjaGenerator2('skulk');
const result4 = ninjaIterator.next();
assert(result4.value === 'Hattori skulk', 'Hattori is skulking');

const result5 = ninjaIterator.next('Hanzo');
assert(result5.value === 'Yoshi (Hanzo) skulk', 'We have an imposter');

function* NinjaGenerator3(){
    try{
        yield "Hattori";
        fail("The expected exception didn't occur");
    }
    catch(e){
        assert(e === 'Catch this!', "Aha! We caught an exception");
    }
}

const ninjaIterator1 = NinjaGenerator3();
const result6 = ninjaIterator1.next();
assert(result6.value === 'Hattori', "We got Hattori");
ninjaIterator1.throw("Catch this!");

chapter('6.3 使用promise');