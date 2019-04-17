/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const tweetData = {
    "user": {
        "name": "Newton",
        "avatars": {
            "small": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
            "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
            "large": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
        },
        "handle": "@SirIsaac"
    },
    "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
}

const data = [
    {
        "user": {
            "name": "Newton",
            "avatars": {
                "small": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
                "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
                "large": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
            },
            "handle": "@SirIsaac"
        },
        "content": {
            "text": "If I have seen further it is by standing on the shoulders of giants"
        },
        "created_at": 1461116232227
    },
    {
        "user": {
            "name": "Descartes",
            "avatars": {
                "small": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
                "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
                "large": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
            },
            "handle": "@rd"
        },
        "content": {
            "text": "Je pense , donc je suis"
        },
        "created_at": 1461113959088
    },
    {
        "user": {
            "name": "Johann von Goethe",
            "avatars": {
                "small": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
                "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
                "large": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
            },
            "handle": "@johann49"
        },
        "content": {
            "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
        },
        "created_at": 1461113796368
    }
];

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
    $element.find("header").append(`<img src=${data["user"]["avatars"]["small"]}></img>`);
    $element.find("header").append("<div>");
    $element.find("div").addClass("header-container");
    $element.find("div").append(`<h2>${data["user"]["name"]}</h2>`);
    $element.find("div").append(`<span>${data["user"]["handle"]}</span>`);
    $element.append("<main>");
    $element.find("main").addClass("tweet-content");
    $element.find("main").append(`<p>${data["content"]["text"]}</p>`);
    $element.append("<footer>");
    let time = timeDifference(Date.now(), data["created_at"]);
    $element.find("footer").append(`<p>${time}</p><ul><li><i class="fas fa-flag"></i></li><li><i class="fas fa-retweet"></i></li><li><i class="fas fa-heart"></i></li></ul>`)

    return $element;
}

function renderTweets(tweets) {
    for (let info of tweets) {
        $("#tweet-container").append(createTweetElement(info));
    }
}

$(document).ready(function () {
    renderTweets(data);

    $( "form" ).submit(function( event ) {
        event.preventDefault();
        let inputContent =`text=${$( "textarea" ).val()}`;
        console.log($(this).serialize());
        // if ( $( "textarea" ).val() === "correct" ) {
        //   $( "span" ).text( "Validated..." ).show();
        //   return;
        // }

        $.ajax({
            type: "POST",
            url: "/tweets",
            data: inputContent,
          
        });
});



});

