$(document).ready(function() {
  $(`#tweet-text`).on(`input`, function(){
    let textLength= $(this).val().length;
    let counter = $(this).siblings(`.counter-area`).first().find(`.counter`).text(140 - textLength);
    counter.toggleClass(`error`, textLength > 140);

  })
});