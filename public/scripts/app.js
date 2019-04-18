/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// const tweetData = {
//     "user": {
//         "name": "Newton",
//         "avatars": {
//             "small": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
//             "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
//             "large": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
//         },
//         "handle": "@SirIsaac"
//     },
//     "content": {
//         "text": "If I have seen further it is by standing on the shoulders of giants"
//     },
//     "created_at": 1461116232227
// }

// const data = [
//     {
//         "user": {
//             "name": "Newton",
//             "avatars": {
//                 "small": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
//                 "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
//                 "large": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
//             },
//             "handle": "@SirIsaac"
//         },
//         "content": {
//             "text": "If I have seen further it is by standing on the shoulders of giants"
//         },
//         "created_at": 1461116232227
//     },
//     {
//         "user": {
//             "name": "Descartes",
//             "avatars": {
//                 "small": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
//                 "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
//                 "large": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
//             },
//             "handle": "@rd"
//         },
//         "content": {
//             "text": "Je pense , donc je suis"
//         },
//         "created_at": 1461113959088
//     },
//     {
//         "user": {
//             "name": "Johann von Goethe",
//             "avatars": {
//                 "small": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
//                 "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
//                 "large": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
//             },
//             "handle": "@johann49"
//         },
//         "content": {
//             "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
//         },
//         "created_at": 1461113796368
//     }
// ];
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
    // let $text = $(".new-tweet textarea");
    // console.log('$text ', $text.val());
    // let remain = 140 - $text.val().length;
    // let target = $text.siblings().children()[1];
    // target.innerText = remain;
    // if (remain >= 0) {
    //     target.style.color = "#244751";
    // } else {
    //     target.style.color = "#FF0000";
    // }
    let input = document.querySelector(".new-tweet textarea");
    let spanText = document.querySelector(".counter");
    input.oninput = function handleInput(e) {
        let remain = 140 - e.target.value.length;
        spanText.textContent = remain;
        if (remain >= 0) {
            spanText.style.color = "#244751";
        } else {
            spanText.style.color = "red";
        }
    }
}

$(document).ready(function () {
    // $(".new-tweet textarea").on("input", charCounter);
    charCounter();
    $("form").submit(function (event) {
        event.preventDefault();

        const inputContent = $(this).serialize();

        const inputLength = $("#tweetInput").val().length;

        if (inputLength === 0) {
            alert("Please enter your tweet.");
        } else if (inputLength > 140) {
            alert("Your tweet looks a bit long. Let's make it short.");

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
    loadTweets()
    let isCollapsed = false
    let $button = $("#nav-bar > ul").get(0);
    $button.addEventListener("click", function(){
        $(".new-tweet").slideToggle();
        if(isCollapsed) {
            $("#tweetInput").focus()
        }
        isCollapsed = !isCollapsed
    })

});

