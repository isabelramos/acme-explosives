$(document).ready(function(){

    var categories = [];
    var types = [];
    var products = [];

    function makeDropdownLinks () {
        var dropdownString = "";

        for (var i=0; i < categories.length; i++) {
            dropdownString += `<li><a href="#" id="category-${categories[i].id}" class="category">${categories[i].name}</a></li>`;
        }
        $("#choose-category").append(dropdownString);
    }


    $("#choose-category").on("click", ".category", function() {
        var categoryId = $(this)[0].id;
        var categoryIdNumber = categoryId.split("category-")[1];

        for (var i=0; i < types.length; i++) {
            if (categoryIdNumber === types[i].category) {
                console.log(categoryIdNumber);
            }   
        }
        writeDOM();
    });


    function writeDOM () {
        var domString = "";

        for (var i=0; i < types.length; i++) {
            domString += `<div class="col-sm-4 col-md-2">`;
            domString += `<div class="panel panel-default">`;
            domString += `<div class="panel-heading">`;
            domString += `<h3 class="panel-title">${types[i].name}</h3>`;
            products.forEach (function(product) {
                domString += `<h5>${product.name}</h5>`;
            })
            domString += `</div></div></div>`;
        }
        $("#container").html(domString);
    }

    var categoriesJSON = function(){
        return new Promise(function(resolve, reject){
            $.ajax("./db/categories.json").done(function(data1){
                resolve(data1.categories);
            }).fail(function(error1){
                reject(error1);
            })
        })
    };

    var typesJSON = function(){
        return new Promise(function(resolve, reject){
            $.ajax("./db/types.json").done(function(data2){
                resolve(data2.types);
            }).fail(function(error2){
                reject(error2);
            })
        })
    };

    var productsJSON = function(){
        return new Promise(function(resolve, reject){
            $.ajax("./db/products.json").done(function(data3){
                resolve(data3.products);
            }).fail(function(error3){
                reject(error3);
            })
        })
    };

    categoriesJSON().then(function(jsonData1){
        categories = jsonData1;
        return typesJSON();
    }).then(function(jsonData2){
        types = jsonData2;
        types.push();
        return productsJSON();
    }).then(function(jsonData3){
        products = jsonData3;
        products.push();
        makeDropdownLinks();
    });


});