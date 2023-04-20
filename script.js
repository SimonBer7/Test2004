class Fact {
    constructor(popis) {
        this.popis = popis;
    }


}


class Vtip {
    constructor(joke) {
        this.joke = joke;
    }
}

let tmp = [];

class Evidence {
    constructor() {
        this.facts = [];
        
    }

    addFact(fact) {
        this.facts.push(fact);
    }

    getJokeFromWeb() {

        var joke = new Vtip();
        $.ajax({
            url: "https://v2.jokeapi.dev/joke/any?type=single",
            dataType: "json",
            success: function (data) {

                joke.joke = data.joke;
                currentJoke = joke.joke;
                AddJokeToTable();
                 

            },
            error: function () { // error callback 
                alert('Error with connection to website');
            }
        });


    }


    getFactFromWeb() {


        let fact = new Fact();
        $.ajax({
            url: "https://dog-api.kinduff.com/api/facts?number=1",
            dataType: "json",
            success: function (data) {

                fact.popis = data.facts[0];
                currentFact = fact.popis;
                AddFactToTable();
                
            },
            error: function () { // error callback 
                alert('Error with connection to website');
            }
        });


    }

}



let currentFact;
let currentJoke;
let html;

function AddFactToTable() {
    
    html += `<tr><td> ${currentFact}</td ></tr >`;
    document.getElementById("table").innerHTML = html;

}

function AddJokeToTable() {
    html += `<tr><td> ${currentJoke}</td ></tr >`;
    document.getElementById("table").innerHTML = html;

}

function saveToLocalStorage(array) {
    localStorage.setItem("facts", array);
}

function deleteLocalStorage() {
    localStorage.clear();
}


$(document).ready(function () {

    let e = new Evidence();
    
    $("#generate").click(function () {
        for (var i = 0; i < 5; i++) {
            e.getJokeFromWeb();
            e.getFactFromWeb();

        }
        console.log(e.facts);
        $("#generate").hide();
        $("#table").fadeIn();
    });


    $("#reset").click(function () {
        location.reload();
    });

    $("#delete").click(function () {
        deleteLocalStorage();
    });
   

});





