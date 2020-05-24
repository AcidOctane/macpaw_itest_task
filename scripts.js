//global var for storing selected category
var categoryName = "animal";

function randomFact() {
    // We call the Web Service via AJAX
    var xmlhttp = new XMLHttpRequest();
    var url = "https://api.chucknorris.io/jokes/random";
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var json = JSON.parse(this.responseText);
            // We parse the JSON response
            parseJson(json);
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

//parsing category of the joke
function searchCategory() {
    var xmlhttp = new XMLHttpRequest();  
    var url = `https://api.chucknorris.io/jokes/random?category=${categoryName}`;
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var json = JSON.parse(this.responseText);
            // We parse the JSON response
            parseJson(json);
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
};

function jokeBySearch() {
    var xmlhttp = new XMLHttpRequest();  
    var query = document.getElementById("search").value;
    var url = `https://api.chucknorris.io/jokes/search?query=${query}`;
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var json = JSON.parse(this.responseText);
            // We parse the JSON response
            parseJson(json);
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function parseJson(json) {
    var fact = "<b>" + json["value"] + "</b>";
    document.getElementById("data").innerHTML = fact;

    var fact_id = "<b>ID:" + json["id"] + "</b>";
    document.getElementById("jokeid").innerHTML = fact_id;

    var cat = `<b>Category: ${json["categories"]}</b>`;
    if (cat.length > 17) {
        document.getElementById("category").innerHTML = cat;
    } else {
        document.getElementById("category").innerHTML = "No category";
    };

    var date = new Date(json["updated_at"]);
    var today = new Date();
    var update = `<b>Last updated ${Math.round((today - date) / (1000 * 3600))} hours ago</b>`;
    document.getElementById("update").innerHTML = update;
}

function getCategories() {
    // We call the Web Service via AJAX
    var xmlhttp = new XMLHttpRequest();
    var url = "https://api.chucknorris.io/jokes/categories";
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var categories = this.responseText;
            // We parse the JSON response
            parseCats(categories);
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}
//get the list of categories and create buttons with category names
function parseCats(categories) {
    var categoryList = JSON.parse(categories);
    var UL = document.getElementById("all_categories");
    for (var i = 0; i < categoryList.length; i++ ) {
        var item = document.createElement("button");
        item.innerHTML = categoryList[i];
        var link = `https://api.chucknorris.io/jokes/random?category={${categoryList[i]}}`
        var idname = `btn${i}`;
        var classBtn = "catButtons";
        item.setAttribute("href", link);
        item.setAttribute("id", idname);
        item.setAttribute("class", classBtn);
        item.setAttribute("onClick","reply_click()")
        UL.appendChild(item);
    };
    
}

// Finally we add a click event listener on the logo of Chuck Norris
// to load a new random fact when the user will click on it
document.getElementById("btn").addEventListener("click", function () {
    
    if (document.getElementById("choise-jokes-random").checked == true) {    
        randomFact();
    } else if (document.getElementById("choise-jokes-category").checked == true) {
        searchCategory();
    } else {
        jokeBySearch();
    }

});

//Function to make div visible if corresponding radio is active
var FormStuff = {
  
    init: function() {
      this.applyConditionalRequired();
      this.bindUIActions();
    },
    
    bindUIActions: function() {
      $("input[type='radio']").on("change", this.applyConditionalRequired);
    },
    
    applyConditionalRequired: function() {
      
      $(".require-if-active").each(function() {
        var el = $(this);
        if ($(el.data("require-pair")).is(":checked")) {
          el.prop("required", true);
        } else {
          el.prop("required", false);
        }
      });
      
    }
    
};

//save clicked category to global categoryName var
function reply_click()
{
    var btn = document.getElementById(event.srcElement.id);
    categoryName = btn.textContent;

};

getCategories();
randomFact();
FormStuff.init();