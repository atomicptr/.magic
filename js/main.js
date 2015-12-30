function init() {
    if(!exists("player-one") && !exists("player-two")) {
        reset();
    }

    set("player-one", get("player-one"));
    set("player-two", get("player-two"));

    if(!exists("rotated")) {
        set("rotated", "1");
    }
}

function reset() {
    set("player-one", "20");
    set("player-two", "20");
}

function exists(name) {
    return Boolean(localStorage.getItem(name));
}

function set(name, value) {
    localStorage.setItem(name, "" + value);
    $("." + name + " .odometer").html(value);
}

function get(name) {
    return Number(localStorage.getItem(name));
}

function add(name) {
    var val = get(name);
    set(name, ++val);
}

function sub(name) {
    var val = get(name);
    set(name, --val);
}

$(document).ready(function() {
    init();

    if(get("rotated")) {
        $(".player-one").addClass("rotate");
    } else {
        $(".player-one").removeClass("rotate");
    }

    var menuButton = $(".menu-button a").bigSlide({
        easyClose: true
    });

    Origami.fastclick(document.body);

    // done "loading"
    $(".loading-overlay-p1").fadeOut(1000);
    $(".loading-overlay-p2").fadeOut(1000);

    // set up +/- buttons
    $(".player-one-plus").click(function() {
        add("player-one");
    });

    $(".player-one-minus").click(function() {
        sub("player-one");
    });

    $(".player-two-plus").click(function() {
        add("player-two");
    });

    $(".player-two-minus").click(function() {
        sub("player-two");
    });

    // setup menu buttons
    $("#reset-button").click(function() {
        reset();
        $(menuButton).click();
    })

    $("#rotate-button").click(function() {
        $(".loading-overlay-p1").fadeIn(0);
        $(".player-one").toggleClass("rotate");
        $(".loading-overlay-p1").fadeOut(1000);

        if(get("rotated")) {
            set("rotated", "0");
        } else {
            set("rotated", "1");
        }

        $(menuButton).click();
    });

    $("#dice-button").click(function() {
        $(".dice-roll").fadeIn(500);
        setTimeout(function() {
            var dices = [1, 2, 3, 4, 5, 6];
            var diceIndex = 0;

            var counter = 0;

            var nextDice = function() {
                $("#dice" + dices[diceIndex]).fadeOut(50);
                $("#dice" + dices[(diceIndex + 1) % 6]).fadeIn(50);

                diceIndex = (diceIndex + 1) % 6;

                counter++;

                if(counter >= 20) {
                    $("#dice" + dices[diceIndex]).fadeOut(50);

                    var rand = rollDice();

                    $("#dice" + rand).fadeIn(50);

                    setTimeout(function() {
                        $(".dice-roll").fadeOut(500);

                        setTimeout(function() {
                            $("#dice" + rand).hide();
                            $("#dice1").show();

                            $(menuButton).click();
                        }, 550)
                    }, 3000); // wait for 3s before closing
                } else {
                    setTimeout(nextDice, 100);
                }
            }

            nextDice();
        }, 1000);
    })
});

function rollDice() {
    return 1 + Math.floor(Math.random() * 6);
}
