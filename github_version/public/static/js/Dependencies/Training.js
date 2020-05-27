/* global variables and helper functions to keep track of
 * time elapsed and number of coins collected
 */

var startTime = 0;
var count_since_last_reward_gold = 0;
var count_since_last_reward_silver = 0;
var reward = false;
var count_rewards = 0;
var block_silver = [];
var block_gold = [];

var get_time = {
    type: 'call-function',
    func: function() { startTime = (new Date()).getTime();
        return startTime;}
}

// resets count since last reward
// this is called *after every reward*
var reset_count_silver = {
    type: 'call-function',
    func: function() {count_since_last_reward_silver = 0;}
}

var reset_count_gold = {
    type: 'call-function',
    func: function() {count_since_last_reward_gold = 0;}
}

// this will reset the reward count to 0
// this should be called after every block
var reset_reward_count = {
    type: 'call-function',
    func: function() {
        count_rewards = 0;
      }
}

var unlock_reward = {
    type: 'call-function',
    func: function() { reward = true;}
}

var lock_reward = {
    type: 'call-function',
    func: function() { reward = false;}
}

var data_saving_silver_block = {
    type: 'call-function',
    func: function() {db.collection("habit-short").doc('version1').collection('participants').doc(uid).update({
    'Training.silver': block_silver
    }); } //ANIEK: check if this works across training blocks
}
var data_saving_gold_block = {
    type: 'call-function',
    func: function() {db.collection("habit-short").doc('version1').collection('participants').doc(uid).update({
    'Training.gold': block_gold
    }); }//ANIEK: check if this works across training blocks
}



// training code!

/* training_silver and training_gold present a trial with either a faded silver or
 * gold coin, respectively, and the corresponding stimulus. The trial is exited
 * when the participant presses the correct key.
 */
var training_silver = {
    type: 'html-keyboard-response',
    stimulus: 
        "<img src='" + invisible_triangle_img + "' align='middle' height='10%' width='10%' /> <br>" +
        "<img src='" + silver_coin_faded_img + "' align='middle' height='10%' width='10%'  />" +
        "<br><img src='" + left_block_img + "' align='right' height='25%' width='25%' />",
    choices: [LEFT],
    response_ends_trial: true,
    trial_duration: 1000,
    data: {trial_tag: 'action', trial_coin: 'SILVER'},
    on_finish: function(data){
        if(full_type == "GOLD"){// 70 is the numeric code for f
            data.full_bank_status = "GOLD";
        } else if (full_type == "SILVER") {
            data.full_bank_status = "SILVER";
        } else {
            data.full_bank_status = null;
        }
        if(data.key_press == LEFT){
          data.correct = true;
        } else {
          data.correct = false;
        }
        to_save_data_silver = [jsPsych.data.getLastTrialData().values()[0].key_press, jsPsych.data.getLastTrialData().values()[0].trial_coin, jsPsych.data.getLastTrialData().values()[0].rt, jsPsych.data.getLastTrialData().values()[0].trial_tag]
        block_silver = block_silver.concat(to_save_data_silver);
    }
}

var training_gold = {
    type: 'html-keyboard-response',
    stimulus:
        "<img src='" + invisible_triangle_img + "' align='middle' height='10%' width='10%' /> <br>" +
        "<img src='" + gold_coin_faded_img + "' align='middle' height='10%' width='10%'  />" +
        "<br><img src='" + right_block_img + "' align='left' height='25%' width='25%' />",
    choices: [RIGHT],
    response_ends_trial: true,
    trial_duration: 1000,
    data: {trial_tag: 'action', trial_coin: 'GOLD'},
    on_finish: function(data){
        if(full_type == "GOLD"){// 70 is the numeric code for f
            data.full_bank_status = "GOLD";
        } else if (full_type == "SILVER") {
            data.full_bank_status = "SILVER";
        } else {
            data.full_bank_status = null;
        }
        if(data.key_press == RIGHT){
          data.correct = true;
        } else {
          data.correct = false;
        }
        to_save_data_gold = [jsPsych.data.getLastTrialData().values()[0].key_press, jsPsych.data.getLastTrialData().values()[0].trial_coin, jsPsych.data.getLastTrialData().values()[0].rt, jsPsych.data.getLastTrialData().values()[0].trial_tag]
        block_gold = block_gold.concat(to_save_data_gold);
    }
}

/* reaffirm_silver and reaffirm_gold are displayed after training_silver or training_gold ends.
 * this trial shows the faded coin and stimulus, as well as a red triangle reaffirming the
 * participant's correct action
 */
var reaffirm_silver = {
    type: 'html-keyboard-response',
    stimulus: function(){
      var last_trial_correct = jsPsych.data.get().last(1).values()[0].correct;
      if (last_trial_correct) {
        return "<img src='" + triangle_img + "' align='middle' height='10%' width='10%' /> <br>" +
        "<img src='" + silver_coin_faded_img + "' align='middle' height='10%' width='10%'  />" +
        "<br><img src='" + left_block_img + "' align='right' height='25%' width='25%' />"
      } else {
        return "<img src='" + invisible_triangle_img + "' align='middle' height='10%' width='10%' /> <br>" +
        "<img src='" + silver_coin_faded_img + "' align='middle' height='10%' width='10%'  />" +
        "<br><img src='" + left_block_img + "' align='right' height='25%' width='25%' />"}
    },
    choices: [LEFT],
    response_ends_trial: false,
    trial_duration: function(){
      var last_trial_correct = jsPsych.data.get().last(1).values()[0].correct;
      if (last_trial_correct) {return 200;}
      else {return 0;}
    },
    on_finish: function() {
        var last_trial_correct = jsPsych.data.get().last(1).values()[0].correct;
        if (last_trial_correct) {
            count_since_last_reward_silver = count_since_last_reward_silver + 1;
        }

    }
}

var reaffirm_gold = {
    type: 'html-keyboard-response',
    stimulus: function(){
      var last_trial_correct = jsPsych.data.get().last(1).values()[0].correct;
      if (last_trial_correct) {
        return "<img src='" + triangle_img + "' align='middle' height='10%' width='10%' /> <br>" +
        "<img src='" + gold_coin_faded_img + "' align='middle' height='10%' width='10%'  />" +
        "<br><img src='" + right_block_img + "' align='left' height='25%' width='25%' />"
      } else {
        return "<img src='" + invisible_triangle_img + "' align='middle' height='10%' width='10%' /> <br>" +
        "<img src='" + gold_coin_faded_img + "' align='middle' height='10%' width='10%'  />" +
        "<br><img src='" + right_block_img + "' align='left' height='25%' width='25%' />"}
    },
    choices: [LEFT],
    response_ends_trial: false,
    trial_duration: function(){
      var last_trial_correct = jsPsych.data.get().last(1).values()[0].correct;
      if (last_trial_correct) {return 200;}
      else {return 0;}
    },
    on_finish: function() {
        var last_trial_correct = jsPsych.data.get().last(1).values()[0].correct;
        if (last_trial_correct) {
            count_since_last_reward_gold = count_since_last_reward_gold + 1;
        }
    }
}


/* reward_silver and reward_gold are displayed after reaffirm_silver or reaffirm_gold ends,
 * only on after a portion of these trials randomly determined with probability RPROB.
 * This trial shows the un-faded coin, stimulus, and red triangle.
 */
var reward_silver = {
    type: 'html-keyboard-response',
    stimulus: function(){
        var last_trial_correct = jsPsych.data.get().last(2).values()[0].correct;
        if (reward) {
            return "<img src='" + triangle_img + "' align='middle' height='10%' width='10%' /> <br>" +
            "<img src='" + silver_coin_img + "' align='middle' height='10%' width='10%'  />" +
            "<br><img src='" + left_block_img + "' align='right' height='25%' width='25%' />";
        } else if (last_trial_correct) {
            return "<img src='" + triangle_img + "' align='middle' height='10%' width='10%' /> <br>" +
            "<img src='" + silver_coin_faded_img + "' align='middle' height='10%' width='10%'  />" +
            "<br><img src='" + left_block_img + "' align='right' height='25%' width='25%' />";
        } else {
          return "<img src='" + invisible_triangle_img + "' align='middle' height='10%' width='10%' /> <br>" +
            "<img src='" + silver_coin_faded_img + "' align='middle' height='10%' width='10%'  />" +
            "<br><img src='" + left_block_img + "' align='right' height='25%' width='25%' />";
        }
    },
    response_ends_trial: false,
    trial_duration: 500,
    data: {trial_tag: 'reward', trial_coin: 'SILVER'},
    on_finish: function(data){
        if(full_type == "GOLD"){// 70 is the numeric code for f
            data.full_bank_status = "GOLD";
        } else if (full_type == "SILVER") {
            data.full_bank_status = "SILVER";
        } else {
            data.full_bank_status = null;
        }
        if (reward) { count_rewards = count_rewards + 1;
            to_save_data_reward_silver = [jsPsych.data.getLastTrialData().values()[0].key_press, jsPsych.data.getLastTrialData().values()[0].trial_coin, jsPsych.data.getLastTrialData().values()[0].rt, jsPsych.data.getLastTrialData().values()[0].trial_tag]
            to_save_data_time = (new Date().getTime()) - startTime
            block_silver = block_silver.concat(to_save_data_reward_silver);
            block_silver = block_silver.concat(to_save_data_time);
            //console.log(block_silver) //gives back values - exept full_bank_status
        }
    }
}

var reward_gold = {
    type: 'html-keyboard-response',
    stimulus: function() {
        var last_trial_correct = jsPsych.data.get().last(2).values()[0].correct;
        if (reward) {
            return "<img src='" + triangle_img + "' align='middle' height='10%' width='10%' /> <br>" +
            "<img src='" + gold_coin_img + "' align='middle' height='10%' width='10%'  />" +
            "<br><img src='" + right_block_img + "' align='left' height='25%' width='25%' />";
        } else if (last_trial_correct) {
            return "<img src='" + triangle_img + "' align='middle' height='10%' width='10%' /> <br>" +
            "<img src='" + gold_coin_faded_img + "' align='middle' height='10%' width='10%'  />" +
            "<br><img src='" + right_block_img + "' align='left' height='25%' width='25%' />";
        } else {
          return "<img src='" + invisible_triangle_img + "' align='middle' height='10%' width='10%' /> <br>" +
            "<img src='" + gold_coin_faded_img + "' align='middle' height='10%' width='10%'  />" +
            "<br><img src='" + right_block_img + "' align='left' height='25%' width='25%' />";
        }
    },
    response_ends_trial: false,
    trial_duration: 500,
    data: {trial_tag: 'reward', trial_coin: 'GOLD'},
    on_finish: function(data){
        if(full_type == "GOLD"){// 70 is the numeric code for f
            data.full_bank_status = "GOLD";
        } else if (full_type == "SILVER") {
            data.full_bank_status = "SILVER";
        } else {
            data.full_bank_status = null;
        }
        if (reward) { count_rewards = count_rewards + 1;
            to_save_data_reward_gold = [jsPsych.data.getLastTrialData().values()[0].key_press, jsPsych.data.getLastTrialData().values()[0].trial_coin, jsPsych.data.getLastTrialData().values()[0].rt, jsPsych.data.getLastTrialData().values()[0].trial_tag]
            to_save_data_time = (new Date().getTime()) - startTime
            block_gold = block_gold.concat(to_save_data_reward_gold);
            block_gold = block_gold.concat(to_save_data_time);}
    }
}


/* silver_procedure and gold_procedure loop through training and reaffirming trials
 * until either 1) the number of count_rewards exceeds the REWARDS_ALLOWED, 2) it's been at least 2 * RPROB
 * trials since the last reward was given, or 3) the participant has been randomly assigned
 * a reward this trial
 */
var silver_procedure = {
    timeline: [training_silver, reaffirm_silver],
    loop_function: function(){
        var currentTime = (new Date()).getTime();
        var data = jsPsych.data.get().last(2).values()[0];
        if ((Math.random() <= 1/RPROB && data.key_press == LEFT)) {// Math.random samples from uniform(0,1)
            return false;
        } else if (count_since_last_reward_silver > 2*RPROB) {
            return false;
        } else if (count_rewards > REWARDS_ALLOWED) { // received all the rewards for this block
            reward = false; // don't reward just because we're exiting training
            return false;
        } else if (currentTime-startTime > BLOCKTIME) { //  timed our with the max blocktime
            reward = false; // don't reward just because we're exiting training
            return false;            
        } else {
            //count_since_last_reward_silver = count_since_last_reward_silver + 1;
            return true;
        }
    }
}

var gold_procedure = {
    timeline: [training_gold, reaffirm_gold],
    loop_function: function(){
        var currentTime = (new Date()).getTime();
        var data = jsPsych.data.get().last(2).values()[0];
        // data.count_rewards = count_rewards;
        if ((Math.random() <= 1/RPROB && data.key_press == RIGHT)) {// Math.random samples from uniform(0,1)
            return false;
        } else if (count_since_last_reward_gold > 2*RPROB) {
            return false;
        } else if (count_rewards > REWARDS_ALLOWED) { // received all the rewards for this block 
            reward = false; // don't reward just because we're exiting training
            return false;
        } else if (currentTime-startTime > BLOCKTIME) { // timed our with the max blocktime
            reward = false; // don't reward just because we're exiting training
            return false;
        } else {
           // count_since_last_reward_gold = count_since_last_reward_gold + 1;
            return true;
        }
    }
}

/* silver_training_block and gold_training_block loop through silver_procedure and silver_reward
 * or gold_procedure and gold_reward until the amount of rewards collected is the REWARDS_ALLOWED.
 */
var silver_training_block = {
    timeline: [unlock_reward, reset_count_silver, silver_procedure, reward_silver], // what trials are in this loop chunk
    loop_function: function(){
        var currentTime = (new Date()).getTime();
        if(count_rewards > REWARDS_ALLOWED) { // 250 rewards per block - there are two if's now that check the count_rewards to exit, do we need both?
            return false; // end the loop
        }
        else if (currentTime-startTime > BLOCKTIME) {
            return false; // end the loop
        }
        else {
            return true; // keep going
        }
       
    },
    on_finish: function() {
        //to_save_data_time = (new Date().getTime()) - startTime
        //block_silver = block_silver.concat(to_save_data_time);
        //to_save_data_time = [] //don't know if this is 100% necessary but this resets the array
    }
}


var gold_training_block = {
    timeline: [unlock_reward, reset_count_gold, gold_procedure, reward_gold], // what trials are in this loop chunk
    loop_function: function(){
        var currentTime = (new Date()).getTime();
        if(count_rewards > REWARDS_ALLOWED) { // 250 rewards per block
            return false; // end the loop
        } 
        else if (currentTime-startTime > BLOCKTIME) {
            return false; // end the loop
        }
        else {
            return true; // keep going
        }
    },
    on_finish: function() {
        //to_save_data_time = (new Date().getTime()) - startTime
        //block_gold = block_gold.concat(to_save_data_time); 
        //to_save_data_time = [] 
    }
}

/* training_loop alternates between silver_training_block and gold_training_block.
 * If you want more/less training blocks, vary the number of
 * "get_time, silver_training_block, get_time, gold_training_block" phrases.
 */
var training = {
    timeline: [reset_reward_count, get_time, silver_training_block, data_saving_silver_block, reset_reward_count, get_time,  gold_training_block, data_saving_gold_block,
                reset_reward_count, get_time, silver_training_block, data_saving_silver_block, reset_reward_count, get_time,  gold_training_block, data_saving_gold_block]
                 // what trials are in this loop chunk
}