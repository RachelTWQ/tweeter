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

//from stack overflow
function timeDifference(current, previous) {

    let msPerMinute = 60 * 1000;
    let msPerHour = msPerMinute * 60;
    let msPerDay = msPerHour * 24;
    let msPerMonth = msPerDay * 30;
    let msPerYear = msPerDay * 365;

    let elapsed = current - previous;

    if (elapsed < msPerMinute) {
        return Math.round(elapsed / 1000) + ' seconds ago';
    }

    else if (elapsed < msPerHour) {
        return Math.round(elapsed / msPerMinute) + ' minutes ago';
    }

    else if (elapsed < msPerDay) {
        return Math.round(elapsed / msPerHour) + ' hours ago';
    }

    else if (elapsed < msPerMonth) {
        return Math.round(elapsed / msPerDay) + ' days ago';
    }

    else if (elapsed < msPerYear) {
        return Math.round(elapsed / msPerMonth) + ' months ago';
    }

    else {
        return Math.round(elapsed / msPerYear) + ' years ago';
    }
}

function createTweetElement(data) {
    // let $tweet = $('<article>').addClass('tweet');
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
    let time = timeDifference(Date.now(), data["created_at"]);
    $element.find("footer").append($("<p>").text(time));
    $element.find("footer").append("<ul>");
    $element.find("ul").append("<li><i class='fas fa-flag'></i></li>");
    $element.find("ul").append("<li><i class='fas fa-retweet'></i></li>");
    $element.find("ul").append("<li><i class='fas fa-heart'></i></li>");
    return $element;
}

function renderTweets(tweets) {
    $("#tweet-container").empty();
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

$(document).ready(function () {
    

    $( "form" ).submit(function( event ) {
        event.preventDefault();
        let inputContent = $(this).serialize();
        $( "textarea", this).val("")
        console.log($(this).serialize());

        $.ajax({
            type: "POST",
            url: "/tweets",
            data: inputContent,
            dataType: "string",
            complete: () => {
                console.log("finished")
                loadTweets()
            }
        });
});

loadTweets()


});

