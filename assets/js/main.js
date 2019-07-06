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

dispButtons();
