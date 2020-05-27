
// curtain test code!

// curtain test instructions
var instructions10 = {
    type: "html-keyboard-response",
    choices: [32],
    stimulus: "<p>Curtain Collection! <br> <br> Next you will be invited to collect more coins by pressing the P and Q-keys.<br>The allowed actions will be again denoted by their corresponding figures.<br> <br>However, there will no longer be a triangle to signal correct responses.<br>(Press the space bar to continue)</p>",
    post_trial_gap: 500
};

var instructions11 = {
    type: "html-keyboard-response",
    choices: [32],
    stimulus: "<p>Additionally, the coin will be covered by a curtain. Nothing else has changed. Allowed actions will still be denoted by their corresponding figures. Actions are still associated with the same type of coin, and awarded coins will be deposited in their respective piggy bank (if not full). <br> <br>(Press the space bar to continue)</p>",
    post_trial_gap: 500
};

// trial that displays curtain and both stimuli
var curtain_test = {
  type: 'html-keyboard-response',
  stimulus:
      "<img src='" + invisible_triangle_img + "' align='middle' height='10%' width='10%' /> <br>" +
    "<img src='" + curtain_img + "' align='middle' height='10%' width='10%'  />" +
      "<br><img src='" + right_block_img + "' align='left' height='25%' width='25%' />" +
      "<img src='" + left_block_img + "' align='right' height='25%' width='25%' />",
  choices: [LEFT, RIGHT],
  response_ends_trial: true
};

var block_curtain = []

/* repeatedly presents curtain_test after every response until
 * CURTAINTIME has elapsed.
 */
var curtain_loop = {
    timeline: [curtain_test], // what trials are in this loop chunk
    loop_function: function(){
        var currentTime = (new Date()).getTime();
        if(currentTime-startTime > CURTAINTIME) { // 1000ms/1s x 90s
            return false; // end the loop
        } else {
            return true; // keep going
            //to_save_data_curtain = [jsPsych.data.getLastTrialData().values()[0].key_press, jsPsych.data.getLastTrialData().values()[0].rt]
            //console.log(to_save_data_curtain)
            //block_curtain = block_curtain.concat(to_save_data_curtain)
            //console.log(block_curtain)
        }
    },
    on_finish: function() {to_save_data_curtain = [jsPsych.data.getLastTrialData().values()[0].key_press, jsPsych.data.getLastTrialData().values()[0].rt]
            //console.log(to_save_data_curtain)
            block_curtain = block_curtain.concat(to_save_data_curtain)
        }
}

var data_saving_curtain_block = {
    type: 'call-function',
    func: function() {db.collection("habit-short").doc('version1').collection('participants').doc(uid).update({
    'choice_test': block_curtain,
    'time.finish_test': new Date().toLocaleTimeString()
    });}
}

var choicetest = {
    timeline: [instructions10, instructions11, get_time, curtain_loop, data_saving_curtain_block]
}