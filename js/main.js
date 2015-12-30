var data = {
    player1: 20,
    player2: 20
};

$(document).ready(function() {
    $(".menu-button a").bigSlide();

    $(".player-one-plus").click(function() {
        data.player1++;
        $(".player-one .odometer").html(data.player1);
    });

    $(".player-one-minus").click(function() {
        data.player1--;
        $(".player-one .odometer").html(data.player1);
    });

    $(".player-two-plus").click(function() {
        data.player2++;
        $(".player-two .odometer").html(data.player2);
    });

    $(".player-two-minus").click(function() {
        data.player2--;
        $(".player-two .odometer").html(data.player2);
    });
});
