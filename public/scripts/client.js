/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Fake data taken from initial-tweets.json
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
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
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
];

$(function() {


  const createTweetElement = function(tweet) {

    let $tweet =   $(`

    <article class="tweet">
    <header>
    <img class="image" src="${tweet.user.avatars}"/>
    <span class="name">${tweet.user.name}</span>
    <span class="handle">${tweet.user.handle}</span>
    </header>
    <div class="textFromUser"></div>
    <footer><span>${timeago.format(tweet.created_at)}</span><i class="fas fa-heart"></i><i class="fas fa-retweet"></i><i class="fas fa-flag"></i></footer>
  </article>
  `);
    $tweet.find('.textFromUser').text(tweet.content.text);
    return $tweet;

  };


  const renderTweets = function(tweets) {

    // loop through the tweets
    for (const tweet of tweets) {
      let $tweet = createTweetElement(tweet);
      $('.tweets-list').prepend($tweet);
    }
  };

  //new tweet post function
  $('.new-tweet form').submit(function(event) {
    event.preventDefault();
    let $tweetText = $("#tweet-text");
    if ($tweetText.val() === null || $tweetText.val() === "") {
      displayMessage(`⚠ Error: Empty tweet field ⚠`);
      return;
    } else if ($tweetText.val().length > 140) {
      displayMessage(`⚠ Your tweet has too many characters ⚠`);
      return;
    }

    let tweetForm =  $(this).serialize();
  
    $.ajax("/tweets",{
      method: "POST",
      data: tweetForm
    })
      .done(function(data) {
        $tweetText.val("").trigger('input');
        loadTweets();
      });
  });

  //error message function
  const $errorMessage = $(".error-message");

  const displayMessage = function (message) {
    $errorMessage.text(message).show(300);
      setTimeout(function(){
        $errorMessage.hide(700);
      }, 4000);
  }

  //load tweets from db
  const loadTweets = function() {
    $.ajax("/tweets", {
      method: "GET",
      dataType: "json"
    })
      .then(function(tweets) {
        $(`.tweets-list`).empty();
        renderTweets(tweets);
      });

  };
  
  loadTweets();

});