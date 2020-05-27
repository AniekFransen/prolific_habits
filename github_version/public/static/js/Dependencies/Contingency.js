//contingency questions code. 
var contingency_notification = {
    type: 'html-keyboard-response',
    choices: [32],
    stimulus: "Please answer the following questions.<br>(Press the space bar to continue)",
    response_ends_trial: true
}

//    var contingency_test_stim_coin1 = {
//        type: 'html-keyboard-response',
//        choices: [71, 83],
//        stimulus: "Please indicate which coin was associated with the stimuli below." +
//            "Press 'g' for gold or 's' for silver.<br>" +
//            "<img src='" + right_block_img + "' height='15%' width='15%' hspace='5%' />",
//        response_ends_trial: true
//    }

//    var contingency_test_stim_coin2 = {
//        type: 'html-keyboard-response',
//        choices: [71, 83],
//        stimulus: "Please indicate which coin was associated with the stimuli below." +
//            "Press 'g' for gold or 's' for silver.<br>" +
//            "<img src='" + left_block_img + "' height='15%' width='15%' hspace='5%' />",
//        response_ends_trial: true
//    }

// we create the array we will be filling with contingency data below
var block_contigency = []

var contingency_test_coin_key1 = {
    type: 'html-keyboard-response',
    choices: [LEFT, RIGHT],
    stimulus: "Please indicate which action was associated with the coin below.<br>" +
        "Press 'q' or 'p' as before.<br>" +
        "<img src='" + silver_coin_img + "' height='15%' width='15%' hspace='5%' />",
    response_ends_trial: true,
    on_finish: function () {
        to_save_data_contigency = [jsPsych.data.getLastTrialData().values()[0].key_press]
        block_contigency = block_contigency.concat(to_save_data_contigency)
        }
}

var contingency_test_coin_key2 = {
    type: 'html-keyboard-response',
    choices: [LEFT, RIGHT],
    stimulus: "Please indicate which action was associated with the coin below.<br>" +
        "Press 'q' or 'p' as before.<br>" +
        "<img src='" + gold_coin_img + "' height='15%' width='15%' hspace='5%' />",
    response_ends_trial: true,
    on_finish: function () {
        to_save_data_contigency = [jsPsych.data.getLastTrialData().values()[0].key_press]
        block_contigency = block_contigency.concat(to_save_data_contigency)
        }
}

var contingency_test_stim_response1 = {
    type: 'html-keyboard-response',
    choices: [LEFT, RIGHT],
    stimulus: "Please indicate which action was associated with the stimuli below.<br>" +
        "Press 'q' or 'p' as before.<br>" +
        "<img src='" + right_block_img + "' height='15%' width='15%' hspace='5%' />",
    response_ends_trial: true,
    on_finish: function () {
        to_save_data_contigency = [jsPsych.data.getLastTrialData().values()[0].key_press]
        block_contigency = block_contigency.concat(to_save_data_contigency)
        }
}

var contingency_test_stim_response2 = {
    type: 'html-keyboard-response',
    choices: [LEFT, RIGHT],
    stimulus: "Please indicate which action was associated with the stimuli below.<br>" +
        "Press 'q' or 'p' as before.<br>" +
        "<img src='" + left_block_img + "' height='15%' width='15%' hspace='5%' />",
    response_ends_trial: true,
    on_finish: function () {
        to_save_data_contigency = [jsPsych.data.getLastTrialData().values()[0].key_press]
        block_contigency = block_contigency.concat(to_save_data_contigency)
        }
}

var data_saving_contingency_block = {
    type: 'call-function',
    func: function() {db.collection("habit-short").doc('version1').collection('participants').doc(uid).update({
    'contigency_data': block_contigency
    });}
}



/* agreement questions */
var instructions13 = {
    type: 'html-keyboard-response',
    choices: [32],
    stimulus: "<p>Please rate how much you agree with the following statements along the sliding scale.<br>(Press the space bar to continue)</p>",
    post_trial_gap: 500,
}

// we create an empty array that will be filled with data below
var block_agreements = []

var agreements = {
    timeline: [
        {
        type: 'html-slider-response',
        stimulus: jsPsych.timelineVariable('statement'),
        labels: ["Completely Disagree", "Completely Agree"]
        }
        ],
        timeline_variables: [
        {statement: "The more I responded with the correct action, the more coins I won, and viceversa"},
        {statement: "I won more when I left a long gap between each actions"},
        {statement: "I won more when I left a short gap between actions"},
        {statement: "The less I responded with the correct action, the more coins I won, and viceversa"},
        // more statements can be added here!
    ],
    on_finish: function(){
        to_save_data_agreements = [jsPsych.data.getLastTrialData().values()[0].response]
        block_agreements = block_agreements.concat(to_save_data_agreements)
    }
}

var data_saving_agreements_block = {
    type: 'call-function',
    func: function() {db.collection("habit-short").doc('version1').collection('participants').doc(uid).update({
    'agreements_data': block_agreements,
    'time.questionnaire_start': new Date().toLocaleTimeString()
    });}
}

var contingency = {
    timeline: [contingency_notification, contingency_test_coin_key2, contingency_test_coin_key1, contingency_test_stim_response1, contingency_test_stim_response2, data_saving_contingency_block, instructions13, agreements, data_saving_agreements_block ]
}

