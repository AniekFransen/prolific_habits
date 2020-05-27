var is_full = {
    timeline: [{
        type: 'html-keyboard-response',
        choices: [32],
        stimulus: function(){ return "<p> The following piggy bank is now FULL: </p>" +
        full_type +
        "<p> No further coins can be deposited in this piggy bank.<br>(Press the space bar to continue)</p>";},
        timing_response: 500
    }],
}

// randomly select which coin should be devalued
var set_full = {
    timeline: [{
        type: 'call-function',
        func: function() { full_type = jsPsych.timelineVariable('coin_type', true);}
    }],
    timeline_variables: [
        {coin_type: "GOLD"},
        {coin_type: "SILVER"}
    ],
    sample: {
        type: 'with-replacement',
        size: 1, // 10 trials, with replacement
    }
}

var data_saving_devalued = {
    type: 'call-function',
    func: function() {db.collection("habit-short").doc('version1').collection('participants').doc(uid).update({
    'devalued': full_type,
    'time.finish_training': new Date().toLocaleTimeString()
    });}
}

var full_piggy = {
    timeline:[set_full, is_full, data_saving_devalued]
}