$(document).ready(function(){

    var explosives = [];

    // function makeExplosivesArray {
    //     explosives.forEach (function(explosive) {
    //         if (explosive.) {

    //         }
    //     });
    // }

    function writeDOM(){
        var domString = "";
        for(var i=0; i<explosives.length; i++){
            domString += `<div class="col-sm-4 col-md-2">`;
            domString += `<div class="panel panel-default">`;
            domString += `<div class="panel-heading">`;
            domString += `<h3 class="panel-title">${explosives[i].name}</h3>`;
            domString += `</div></div></div>`;
        }
        $("#container").append(domString);
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

    Promise.all([categoriesJSON(), typesJSON(), productsJSON()])
        .then(function(results){
            console.log("results", results);
            results.forEach(function(ajaxCalls){
                ajaxCalls.forEach(function(info){
                    explosives.push(info);
                })
            })
            writeDOM();
        })
});