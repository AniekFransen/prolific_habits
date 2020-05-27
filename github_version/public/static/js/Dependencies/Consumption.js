

// consumption test code!
var block_consumption = [];
// consumption test instructions
var instructions_pre_consumption = {
    type: "html-keyboard-response",
    choices: [32],
    stimulus: "<p>Free Coin Collection!<br> <br>We invite you to collect coins by clicking on them with the mouse, completely free of charge! <br>We will deposit the coins you collect in their respective piggy banks, if the given piggy bank is not already full.<br>You will have up to 15 seconds to collect up to 10 coins.<br>(Press the space bar to continue)</p>",
    post_trial_gap: 500
};

// list of all coins to present in consumption test
// currently lists 10 silver and 10 gold coins.
var consumption_stimuli = [];
for (var i = 1; i <= 10; i++) {
    consumption_stimuli.push(gold_coin_img);
    consumption_stimuli.push(silver_coin_img);
    consumption_stimuli.push(green_coin_img);                
}

/* main consumption test code. Depends of modified version
 * of jspsych's free-sort plugin at:
 * static/js/jspsych-6.0.5/plugins/jspsych-free-sort.js
 * Coin cap code is included in this file as well.
 * Trial ends when the coin cap is hit or when CONSTIME
 * has elapsed, whichever happens first.
 */
var consumption_test = {
    type: "free-sort",
    stimuli: consumption_stimuli,
    sort_area_height: screen.height-screen.height/10,
    sort_area_width: screen.width-screen.width/10,
    trial_duration: CONSTIME,
    data: {trial_tag: 'consumption'},
    on_finish: function(data){
        if(full_type == "GOLD"){// 70 is the numeric code for f
            data.full_bank_status = "GOLD";
        } else if (full_type == "SILVER") {
            data.full_bank_status = "SILVER";
        } else {
            data.full_bank_status = null;
        }
        to_save_data_consumption = [jsPsych.data.getLastTrialData().values()[0].final_locations, jsPsych.data.getLastTrialData().values()[0].full_bank_status]
        block_consumption = block_consumption.concat(to_save_data_consumption);
        //console.log(jsPsych.data.getLastTrialData().values()[0].full_bank_status)
        db.collection("habit-short").doc('version1').collection('participants').doc(uid).update({
        'consumption': block_consumption
        });
    }
}

// instructions after consumption test
var instructions_post_consumption1 = {
    type: "html-keyboard-response",
    choices: [32],
    stimulus: "<p>Great!<br>(Press the space bar to continue)</p>",
    post_trial_gap: 500
};

var instructions_post_consumption2 = {
    type: "html-keyboard-response",
    choices: [32],
    stimulus: "<p>OK, we will deposit these coins into their respective piggy banks.<br>(Press the space bar to continue)</p>",
    post_trial_gap: 500
};

// all components of consumption test put together
var consumption_set = {
    timeline: [instructions_pre_consumption, consumption_test, instructions_post_consumption1, instructions_post_consumption2]
}
