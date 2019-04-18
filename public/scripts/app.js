/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const date = moment();

function createTweetElement(data) {
    let $element = $("<article>").addClass("tweet");
    $element.append("<header>");
    $element.find("header").append($('<img>').attr('src', data["user"]["avatars"]["small"]));
    $element.find("header").append("<div>");
    $element.find("div").addClass("header-container");
    $element.find("div").append($("<h2>").text(data["user"]["name"]));
    $element.find("div").append($("<span>").text(data["user"]["handle"]));
    $element.append("<main>");
    $element.find("main").addClass("tweet-content");
    $element.find("main").append($("<p>").text(data["content"]["text"]));
    $element.append("<footer>");
    let time = moment(data["created_at"]).fromNow();
    $element.find("footer").append(`<p>${time}</p>`);
    $element.find("footer").append("<ul>");
    $element.find("ul").append("<li><i class='fas fa-flag'></i></li>");
    $element.find("ul").append("<li><i class='fas fa-retweet'></i></li>");
    $element.find("ul").append("<li><i class='fas fa-heart'></i></li>");
    return $element;
}

function renderTweets(tweets) {
    $("#tweet-container").empty(); //empty the dummy tweet from html;
    for (let info of tweets) {
        $("#tweet-container").prepend(createTweetElement(info));
    }
}

function loadTweets() {
    $.ajax({
        type: "GET",
        url: "/tweets",
        dataType: "JSON",
        success: (response => {
            renderTweets(response);
        })
    });
}

function charCounter() {
    let $text = $(".new-tweet textarea");
    let remain = 140 - $text.val().length;
    let target = $(".counter").get(0);
    target.innerText = remain;
    if (remain >= 0) {
        target.style.color = "#244751";
    } else {
        target.style.color = "#FF0000";
    }
}

$(document).ready(function () {
    $(".new-tweet textarea").on("input", charCounter);

    $("form").submit(function (event) {
        event.preventDefault();
        $(".isa_error").slideUp(1);
        $(".error_msg").remove();
        $(".isa_error > i").remove();

        const inputContent = $(this).serialize();

        const inputLength = $("#tweetInput").val().length;

        if (inputLength === 0) {
            $(".isa_error").append("<i class='fas fa-exclamation-circle'></i><p class ='error_msg'>Please enter a tweet.</p>").slideDown(100);

        } else if (inputLength > 140) {
            $(".isa_error").append("<i class='fas fa-exclamation-circle'></i><p class ='error_msg'>Your tweet looks a bit long. Let's make it short.</p>").slideDown(100);

        } else {
            $.ajax({
                type: "POST",
                url: "/tweets",
                data: inputContent,
                dataType: "string",
                complete: () => {
                    $("textarea", this).val("");
                    charCounter();
                    loadTweets();
                }
            });
        }
    });
    loadTweets();
    
    let isCollapsed = true;
    let $button = $("#nav-bar > ul").get(0);
    $button.addEventListener("click", function(){
        $(".new-tweet").slideToggle();
        if(isCollapsed) {
            $("#tweetInput").focus();
        }
        isCollapsed = !isCollapsed;
    })

});

