var xs = null;                                                          //  x co-ordinate of drag start
var xe = null;                                                          //  x co-ordinate of drag end
var ys = null;                                                          //  y co-ordinate of drag start
var ye = null;                                                          //  y co-ordinate of drag end
var clock = null;                                                       // clock that sets time period of between shifts(right or left)

function shift() {                                                      // shift right function
    var carousel = document.getElementById("carousel");
    var items = [];
    var length = carousel.childElementCount;

    if (typeof shift.counters == 'undefined') {
        shift.counters = [];
        for (var i = 1; i <= length; i++)
            shift.counters[i] = i;
    }

    for (var i = length; i >= 1; i--) {
        items[i] = document.getElementById(i);

        if (items[i].className) {                                       // changes the css class of each item to realize the right shift
            var oldClass = items[i].className;
            var reg = new RegExp('(^|\\s+)' + oldClass + '(?=\\s|$)');
            items[i].className = items[i].className.replace(reg, '');
            items[i].className = "item" + shift.counters[i];
        }

        shift.counters[i]++;                                            //circle the item to the left if it reaches the right most position   
        if (shift.counters[i] > length)
            shift.counters[i] = 0;
    }
}


function shiftl() {                                                      // shift left function
    var carousel = document.getElementById("carousel");
    var items = [];
    var length = carousel.childElementCount;

    if (typeof shiftl.counters == 'undefined') {
        shiftl.counters = [];
        for (var i = 1; i <= length; i++)
            shiftl.counters[i] = length - i + 1;
    }

    for (var i = 1; i <= length; i++) {
        items[i] = document.getElementById(i);

        if (items[i].className) {                                       // changes the css class of each item to realize the left shift
            var oldClass = items[i].className;
            var reg = new RegExp('(^|\\s+)' + oldClass + '(?=\\s|$)');
            items[i].className = items[i].className.replace(reg, '');
            items[i].className = "item" + shiftl.counters[i];
        }

        shiftl.counters[i]--;                                            //circle the item to the right if it reaches the left most position   
        if (shiftl.counters[i] < 0)
            shiftl.counters[i] = length;
    }
}

function dragStart(ev) {                                                //capture co-ordinates of drag start
    xs = ev.x;
    ys = ev.y;

    if (typeof ev.mozMovementX != 'undefined') {                        // temp fix(if condition) since mozilla does not seem supporting dragend event
        clearInterval(clock);
        clock = null;
        if (ev.mozMovementX > 680)                                      // can be removed when testing on chrome                                             
            clock = setInterval(function () {
                shiftl();
            }, 1000);
        else
            clock = setInterval(function () {
                shift();
            }, 1000);
    }
}

function dragEnd(ev) {                                                  //capture co-ordinates of drag end and decide to call shift right or left
    xe = ev.x;
    ye = ev.y;
    var lr = parseInt(xe - xs);

    clearInterval(clock);
    clock = null;

    if (lr > 200)
        clock = setInterval(function () {
            shift();
        }, 1000);
    else
        clock = setInterval(function () {
            shiftl();
        }, 1000);
}

function stop(ev) {                                                     //stop the carousel shift when user clicks(onclick event)
    clearInterval(clock);
    clock = null;
}

