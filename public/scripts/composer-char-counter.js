$(document).ready(function() {
    // let input = document.querySelector(".new-tweet textarea");
    // let spanText = document.querySelector(".counter");
    // input.oninput = function handleInput(e) {
    //     let remain = 140 - e.target.value.length;
    //     spanText.textContent = remain;
    //     if (remain >= 0){
    //         spanText.style.color = "#244751";
    //     } else {
    //         spanText.style.color = "red";
    //     }
    // }

    $(".new-tweet textarea").on("input", function(){
        let remain = 140 - $(this).val().length;
        let target = $(this).siblings().children()[1];
        target.innerText = remain;
        if (remain >= 0) {
            target.style.color = "#244751";
        } else {
            target.style.color = "#FF0000";
        }
    })
  });