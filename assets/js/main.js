let topics = ["excited", "sad", "tired", "frustrated", "confused", "bored", "hungry", "angry", "awkward", "drunk"];

function dispButtons() {
    $("#disp-btns").empty();

    for (let i = 0; i < topics.length; i++) {
        let t = $("<button>");
        t.addClass("emo-btn");
        t.attr("emo-name", topics[i]);
        t.text(topics[i]);
        $("#disp-btns").append(t);
    }
}

function dispGifs() {
    let emotion = $(this).attr("emo-name");
    let queryURL = "https://api.giphy.com/v1/gifs/search?q="+ emotion +"&api_key=lisr1iKG3zVF4Rv8GnH70wMpOhwT2rIl&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function(response) {
        $("#gifs-disp").empty();
        let clickData = response.data;
        console.log(response.data);
        for (let i = 0; i < clickData.length; i++) {
            let gifDiv = $("<div class='gifs'>");
            let rating = $(`<p> Rating: ${clickData[i].rating} </p>`); 
            gifDiv.append(rating);
            let gifStill = clickData[i].images.fixed_height_still.url;
            let gifPlay = clickData[i].images.fixed_height.url;
            let gifImage = $("<img>").addClass("each-gif");
            gifImage.attr("src", gifStill);
            gifImage.attr("data-play", gifPlay);
            gifImage.attr("data-stop", gifStill);
            gifDiv.append(gifImage);
            $("#gifs-disp").prepend(gifDiv);
        }
    });
}

$(document).on("click", ".each-gif", function(){
    let gifStatus = $(this).attr("data-state");

    if(gifStatus === "stop") {
        $(this).attr("src", ($(this).data("stop")));
        $(this).attr("data-state", "play");
    } else {
        $(this).attr("src", ($(this).data("play")));
        $(this).attr("data-state", "stop");
    }
});


$("#add-emo").on("click", function(event){
    event.preventDefault();
    let newGif = $("#emo-input").val().trim();
    topics.push(newGif);
    dispButtons();
});

$(document).on("click", ".emo-btn", dispGifs);

dispButtons();
