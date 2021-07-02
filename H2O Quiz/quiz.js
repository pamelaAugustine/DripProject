// nav bar info
$(document).ready(function () {
  $('[data-toggle="tooltip"]').tooltip();
});

// this is for the nav bar

/* Open when someone clicks on the span element */
function openNav() {
  document.getElementById("myNav").style.width = "100%";
}

/* Close when someone clicks on the "x" symbol inside the overlay */
function closeNav() {
  document.getElementById("myNav").style.width = "0%";
}


$(document).ready(function () {
  $('[data-toggle="tooltip"]').tooltip();
});


// end of nav bar


(function () {

  // this code was worked on by Developer Bruner and James


  document.getElementById("submit").onclick = function () {
    event.preventDefault();
    //    outputBoxs.getElementById("outputBoxs");
    console.log("clicked");

    // call response div
    let outputBoxs = document.getElementById("outputBoxs");

    // document.forms - (The forms read-only property of the Document interface returns an HTMLCollection listing all the <form> elements contained in the document.)
    // NOW WE WILL CALL THE HTML DOM FOR THE QUESTIONS AND THE VALUES

    let q1 = parseInt(document.forms["h2oQuiz"]["q1"].value, 10);
    let q2 = parseInt(document.forms["h2oQuiz"]["q2"].value, 10);
    let q3 = parseInt(document.forms["h2oQuiz"]["q3"].value, 10);
    let q4 = parseInt(document.forms["h2oQuiz"]["q4"].value, 10);
    let q5 = parseInt(document.forms["h2oQuiz"]["q5"].value, 10);
    let q6 = parseInt(document.forms["h2oQuiz"]["q6"].value, 10);
    let q7 = parseInt(document.forms["h2oQuiz"]["q7"].value, 10);
    let q8 = parseInt(document.forms["h2oQuiz"]["q8"].value, 10);
    let q9 = parseInt(document.forms["h2oQuiz"]["q9"].value, 10);
    let q10 = parseInt(document.forms["h2oQuiz"]["q10"].value, 10);

    // WE NEED TO STORE THE ABOVE QUESTIONS INTO A SINGLE ARRAY
    let answerArr = [q1, q2, q3, q4, q5, q6, q7, q8, q9, q10];

    let output = document.getElementById("outputBoxs");


    // WE NEED TO CREATE A VARIABLE FOR COUNT
    let count = 0;


    // WE NEED TO CREATE A LOOP TO ITERATE THROUGH THE ANSWER ARRAY
    for (let i = 0; i < answerArr.length; i++) {
      count += answerArr[i];
    }
    // console.log("This is the count " + count);
    //images for the quiz 
    let lowImage = 'images/testlowscore.png'
    let medImage = 'images/testmediumscore.png'
    let highImage = 'images/testhighscore.png'

    // WE WILL NOW SET THE CONDITIONS FOR THE COUNT BASED ON THE END USERS REPONSES TO THE QUESTIONAIRE
    if (count >= 0 && count < 4) {

      console.log("Low H2O IQ Score");

      // returns a sentence with information
      $('#result-image').attr('src', lowImage)
      output.innerHTML += "<div>" + "Thank you for taking the H2O IQ Quiz! Your score was low. Looks like you need some help to raise your H20 IQ. Click 'More Info' below to learn how. </div>";

    } else if (count >= 4 && count < 6) {
      $('#result-image').attr('src', medImage)
      console.log("Medium H2O IQ Score");
      // returns a sentence box with information
      output.innerHTML += "<div>" + "Thank you for taking the H2O IQ Quiz! You're score was ok, but we can always learn additional ways to save water. Click 'More Info' below to learn how!</div>";
    } else {
      $('#result-image').attr('src', highImage)
      console.log("High H2O IQ Score");
      // returns a sentence with information
      output.innerHTML += "<div>" + "Thank you for taking the H2O IQ Quiz! Great job! You received a high score! To see additional ways to conserve water, click 'More Info' below.</div>";


    }

    // console.log("This is the count " + count);

  }


})();
