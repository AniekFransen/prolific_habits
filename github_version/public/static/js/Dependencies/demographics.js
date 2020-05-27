//Demographics questions:
var demographicsInstruct = {
    type: "html-keyboard-response",
    stimulus: "<body><div>Before we begin, please answer a few questions about yourself. <br /><br /> Press space to begin.</div></body>",
    choices: ['space'],
    trial_duration: null,
    response_ends_trial: true,
    data: {label: "demographicStart"},
};

var age = {
    type: 'survey-text',
    questions: [
        {prompt: "Age (in years): ", required: req, rows: 1, columns: 3}
    ],
    data: {label: "questionnaire", questionnaire: "age"},
    on_load: function () {
        let form = document.querySelector("#jspsych-content");
        form.appendChild(document.createElement('br'));
        form.appendChild(document.createElement('br'));
        let questions = document.getElementsByClassName("jspsych-survey-text");
        for (i = 0; i < questions.length; i++) questions[i].className += " M";
    }
};

var dob = {
    type: 'survey-text',
    questions: [
        {prompt: "Date of Birth: ", placeholder: "MM/DD/YYYY", required: req, rows: 1, columns: 10}
    ],
    data: {label: "questionnaire", questionnaire: "dob"},
    on_load: function () {
        let form = document.querySelector("#jspsych-content");
        form.appendChild(document.createElement('br'));
        form.appendChild(document.createElement('br'));
        let questions = document.getElementsByClassName("jspsych-survey-text");
        for (i = 0; i < questions.length; i++) questions[i].className += " M";
    }
};

var gender = {
    type: 'survey-multi-choice',
    questions: [
        {prompt: "Gender", options: [" Female", " Male", " Non-specific"], required: req,},
    ],
    data: {label: "questionnaire", questionnaire: "gender"},
    on_load: function() {
        let form = document.querySelector("#jspsych-survey-multi-choice-form");
        form.appendChild(document.createElement('br'));
        form.appendChild(document.createElement('br'));
        let options = document.getElementsByClassName("jspsych-survey-multi-choice-option");
        for (i=0; i<options.length; i++) options[i].className += " S";
        let questions = document.getElementsByClassName("survey-multi-choice");
        for (i=0; i<questions.length; i++) questions[i].className += " M";
    }
};

var race = {
    type: 'survey-multi-select',
    questions: [
        {prompt: "Race (select those with which you identify):",
            options: ["American Indian or Alaska Native", "Asian", "Black or African-American", "Native Hawaiian or Other Pacific Islander", "White", "More than one race", "Unknown or not reported"], required: req},
    ],
    data: {label: "questionnaire", questionnaire: "race"},
    on_load: function() {
        let form = document.querySelector("#jspsych-survey-multi-select-form");
        form.appendChild(document.createElement('br'));
        form.appendChild(document.createElement('br'));
        let options = document.getElementsByClassName("survey-multi-select");
        for (i=0; i<options.length; i++) options[i].className += " M";
        let questions = document.getElementsByClassName("survey-multi-select-option");
        for (i=0; i<questions.length; i++) questions[i].className += " S";
    }
};

var ethnicity = {
    type: 'survey-multi-choice',
    questions: [
        {prompt: "Ethnicity: ", options: [" Hispanic or Latino", " Not Hispanic or Latino", " Unknown or not reported"], required: req},
    ],
    data: {label: "questionnaire", questionnaire: "ethnicity"},
    on_load: function() {
        let form = document.querySelector("#jspsych-survey-multi-choice-form");
        form.appendChild(document.createElement('br'));
        form.appendChild(document.createElement('br'));
        let options = document.getElementsByClassName("jspsych-survey-multi-choice-option");
        for (i=0; i<options.length; i++) options[i].className += " S";
        let questions = document.getElementsByClassName("survey-multi-choice");
        for (i=0; i<questions.length; i++) questions[i].className += " M";
    }
};

var demographicEnd = {
    type: "html-keyboard-response",
    stimulus: "<body><div>Thank you! <br /><br /> Press space when you are ready to begin the game instructions. <br /><br />  Good luck!</div></body>",
    choices: ['space'],
    trial_duration: null,
    response_ends_trial: true,
    data: {label: "demographicEnd"},
    on_finish: function (data) {
      db.collection("habit-short").doc('version1').collection('participants').doc(uid).update({
        'demographic.start.rt': jsPsych.data.get().filter({label: "demographicStart"}).values()[0].rt,
        'demographic.start.time_elapsed': jsPsych.data.get().filter({label: "demographicStart"}).values()[0].time_elapsed,
        'demographic.gender.response': jsPsych.data.get().filter({questionnaire: "gender"}).values()[0].responses,
        'demographic.gender.rt': jsPsych.data.get().filter({questionnaire: "gender"}).values()[0].rt,
        'demographic.age.response': jsPsych.data.get().filter({questionnaire: "age"}).values()[0].responses,
        'demographic.age.rt': jsPsych.data.get().filter({questionnaire: "age"}).values()[0].rt,
        'demographic.dob.response': jsPsych.data.get().filter({questionnaire: "dob"}).values()[0].responses,
        'demographic.dob.rt': jsPsych.data.get().filter({questionnaire: "dob"}).values()[0].rt,
        'demographic.race.response': jsPsych.data.get().filter({questionnaire: "race"}).values()[0].responses,
        'demographic.race.rt': jsPsych.data.get().filter({questionnaire: "race"}).values()[0].rt,
        'demographic.ethnicity.response': jsPsych.data.get().filter({questionnaire: "ethnicity"}).values()[0].responses,
        'demographic.ethnicity.rt': jsPsych.data.get().filter({questionnaire: "ethnicity"}).values()[0].rt,
        'demographic.end.rt': data.rt,
        'demographic.end.time_elapsed': data.time_elapsed,
      });
    }
};

var demographic_questions = {
    timeline: [demographicsInstruct, gender, age, demographicEnd]
};