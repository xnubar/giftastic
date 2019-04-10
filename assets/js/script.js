var arr = [
    { "animal": ["dog", "cat", "frog", "turtle", "goldfish", "bird"] },
    { "film": ["memento", "coco"] },
    { "series": ["breaking bad", "sherlock holmes", "friends", "stranger things", "the 100", "black mirror"] }
];
var failedPorcess = {
    text: "Your input already exists in container, try another...",
    img: "./assets/imgs/sad.png"
}
var emptyString = {
    text: "Input can't be empty!",
    img: "./assets/imgs/angry.jpg"
}

var selectCategory = {
    text: "You must choose category!",
    img: "./assets/imgs/angry.jpg"
}

var category;

var arrOfCategories = [];


//                  FUNCTIONS
function load() {
    $(".gif-buttons-container").empty();

    arrOfCategories.forEach(function (value, index) {
        let btn = $("<button>");
        $(btn).addClass("gif-button");
        $(btn).html
            (value);
        $(btn).data("name", value);

        $(".gif-buttons-container").append(btn);
    })

}

function addNewAnimal(animalName) {
    if (arrOfCategories.indexOf(animalName.toLowerCase()) != -1) {
        return false;
    } else {
        arrOfCategories.push(animalName);
        return true;
    }
}

function showPopup(text, img) {
    $(".text").html(text);
    $(".result-img").attr("src", img);
    $(".overlay").css({
        "opacity": 1,
        "visibility": "visible"
    });
}


function loadGifs(images) {
    $(".gif-images-container").empty();

    images.forEach(function (value, index) {
        let div = $("<div>")
        $(div).addClass("gif-image");
        $(div).addClass("col-lg-4");
        $(div).addClass("col-md-4");
        $(div).addClass("col-sm-6");
        $(div).addClass("col-xs-6");

        let h4 = $("<h4>");
        $(h4).addClass("gif-image-title");
        $(h4).html("Rating: " + value.rating)

        let img = $("<img>");
        $(img).addClass("gif-img");
        $(img).addClass("img-thumbnail");
        $(img).attr("src", value.images.original_still.url)
        $(img).data("url", value.images.original.url)

        $(div).append(h4);
        $(div).append(img);

        $(".gif-images-container").append(div);
    })


}





//                  EVENTS
$(document).ready(function () {
    load();
})

var queryUrl = "https://api.giphy.com/v1/gifs/search";
var api_key = "1ERwBbvHtfZhf2nkn1WwIjavf2AXdQn2";
var limit = 10;
$(document).on("click", ".gif-button", function () {

    let animal = $(this).data('name');
    $.ajax({
        url: queryUrl,
        method: 'GET',
        data: {
            q: animal,
            api_key,
            limit
        }
    }).done(function (response) {
        loadGifs(response.data)
    })

})
$(document).on("change", ".choices", function () {
    category = $(this).val();
})


$(document).on("click", "#go", function () {
    if ($(".choices").find(":selected").text().length > 0) {
        for (let i = 0; i < arr.length; i++) {
            for(let j in arr[i]){
                if(j===category){
                    arrOfCategories=[];
                    arr[i][j].forEach(function(value,index){
                        arrOfCategories.push(value);
                    })
                    $("#add-sth-new").attr("placeholder", "Add "+category);
                    $(".index-container").hide();
                    $(".home-container").show();
                    load();
                }
            }
        }
    } else {
        showPopup(selectCategory.text, selectCategory.img);
    }
})


$("form").on("submit", function (event) {
    event.preventDefault();
    let newAnimal = $("#add-sth-new").val();
    if (newAnimal.length > 0) {
        let animalIsAdded = addNewAnimal(newAnimal);
        if (animalIsAdded) {
            $("#add-sth-new").val("");
            load();
        } else {
            showPopup(failedPorcess.text, failedPorcess.img);

        }
    } else {
        showPopup(emptyString.text, emptyString.img);
    }

})

$(document).on("click", ".close", function () {
    $(".overlay").css({
        "visibility": "hidden",
        "opacity": 0
    })
})


$(document).on("click", ".gif-img", function () {
    let original = $(this).attr("src");
    $(this).attr("src", $(this).data("url"));
    $(this).data("url", original);
})