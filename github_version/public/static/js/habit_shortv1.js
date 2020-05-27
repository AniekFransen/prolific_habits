/*
 * Aniek Fransen
 * Prolific habit experiment
 * May 2020
*/

//version that gives 17*4*2 = 136 rewards

//Consent form check & ID retrieval/generation & run the task timeline
var check_consent = function (elem) {
  if (document.getElementById('consent_yes').checked == true && document.getElementById('consent_no').checked == false) {
      //get subject ID from prolific or generate one
      if (window.location.search.indexOf('PROLIFIC_PID') > -1) {
        var ID = getQueryVariable('PROLIFIC_PID');
      }
      else {
        var ID = getRandomIntInclusive(0,2000000); // if no prolific ID, generate random ID (for testing)
      }
      //create reference to the data base & subject document
      db.collection("habit-short").doc('version1').collection('participants').doc(uid).set({ 
        ID: ID,  // this refers to the subject's ID from prolific
        date: new Date().toLocaleDateString(),
        time_start: new Date().toLocaleTimeString(),
        consent: {
          yes_box: document.getElementById('consent_yes').checked,
          no_box: document.getElementById('consent_no').checked
        }
      })

      // first enter fullscreen mode
      timeline.push({
        type: 'fullscreen',
        fullscreen_mode: true
      });

      // now add all trials to the timeline

      // initial instructions and instruction-comprehension questions
      timeline.push(demographic_questions);
      timeline.push(instructions);
      timeline.push(training);
      timeline.push(getting_full);
      timeline.push(consumption_set);
      timeline.push(training);
      timeline.push(full_piggy);
      timeline.push(consumption_set);
      timeline.push(choicetest);
      timeline.push(contingency);
      timeline.push(questionnaires);
      timeline.push(goodbye)

      jsPsych.init({
          timeline: timeline,
          //preload_images: unique(preloadImages),
          on_finish: function () {
              jsPsych.data.displayData(); //can be commented out later on
              console.log('Done!')
          },
      });
  }
  else {
    alert("Unfortunately you will not be unable to participate in this research study if you do " +
        "not consent to the above. Thank you for your time.");
    return false;
  }
};

// window settings?
function getQueryVariable(variable)
{
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i=0;i<vars.length;i++) {
        var pair = vars[i].split("=");
        if(pair[0] == variable){return pair[1];}
    }
    return(false);
}

// consent form
document.getElementById('header_title').innerHTML = "Welcome! We need your consent to proceed.";
document.getElementById('consent').innerHTML = "<p>\n" +
    "You are invited to participate in a brief experiment that will be conducted online\n" +
    "from the California Institute of Technology in the laboratory of Prof. John O’Doherty.\n" +
    "</p>\n" +
    "<p>\n" +
    "This study has been evaluated by the California Institute of Technology, Institutional Review Board\n" +
    "(IRB) and had been deemed exempt.\n" +
    "This task is a game where you can collect coins, followed by a few questionnaires.\n" +
    "</p>\n" +
    "<p>\n" +
    "We expect that the task will take approximately 30 minutes of your time to complete.\n" +
    "To compensate you for your time, we will provide you with reimbursement of $3.50 upon completion of the task.\n" +
    "</p>\n" +
    "<p>\n" +
    "Furthermore, during the game you will earn coins that will be traded for real money at the end of the task,\n" +
    "and you will receive a performance bonus of up to $1.50 on top of your base reimbursement.\n" +
    "This performance bonus WILL depend on your performance in the task, as well as paying attention during the\n" +
    "instruction, practice, and questionnaire phases of the task.\n" +
    "</p>\n" +
    "<p>\n" +
    "The data you provide will be collected through Prolific's secure online system.\n" +
    "The collected data will be fully anonymized and confidentiality will be maintained. We may report\n" +
    "the data in scientific publications and the data may ultimately be stored in online repositories so\n" +
    "that other researchers can utilize this information in future research. However, any such data will\n" +
    "be completely anonymized and you will not in any way be identifiable from the data stored online or\n" +
    "reported in publications.\n" +
    "</p>\n" +
    "<p>\n" +
    "Your participation in this research study is voluntary. You are free to terminate your participation\n" +
    "and forgo the $3.50 compensation at any time. If you have any questions or concerns, feel free to\n" +
    "contact MS. Aniek Fransen at olab[at]caltech.edu or afransen[at]caltech.edu.\n" +
    "</p>\n" +
    "<p>\n" +
    "Please click below, to provide your consent to participate in this online survey or to decline to\n" +
    "participate:\n" +
    "</p>\n" +
    "<button type=\"button\" class=\"btn btn-default btn-sm\" onClick=\"window.print();\">\n" +
        "<span class=\"glyphicon glyphicon-print\"></span> Print a copy of this\n" +
    "</button>\n" +
    "<hr/>\n" +
    "<h4>Do you understand and consent to these terms?</h4>\n" +
    "\n" +
    "<label class=\"container\">I agree.\n" +
        "<input type=\"checkbox\" id=\"consent_yes\">\n" +
    "</label>\n" +
    "\n" +
    "<label class=\"container\">No thanks, I do not want to do this task.\n" +
        "<input type=\"checkbox\" id=\"consent_no\">\n" +
    "</label>\n" +
    "<p>\n" +
    "<h3> It will take a moment to load the next page. Please be patient.</h3>\n" +
    "</p>\n" +
    "<br><br>\n" +
    "<button type=\"button\" id=\"start\" class=\"submit_button\">continue</button>\n" +
    "<br><br>";

/*******************
 * Run Task
 ******************/
document.getElementById("start").onclick = check_consent;

if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    alert("Sorry, this experiment does not work on mobile devices");
    document.getElementById('consent').innerHTML = "";
}
