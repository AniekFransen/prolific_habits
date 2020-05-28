// we initiate the block we will be filling with instruction question data below 
var data_instruct = []

// list of instruction pages at beginning of experiment
var start_instructions = {
  timeline: [
    {
      type: "html-keyboard-response",
      choices: [32],
          stimulus: jsPsych.timelineVariable('instruction'),
          post_trial_gap: 500
    }
  ],
  // you can add more instruction pages by adding to this list
  timeline_variables: [
    {instruction: "Welcome to the coin collecter experiment. Please make sure your computers sound is turned off." +
      "<br>(Press the space bar to continue)"},
    {instruction: "In this experiment, you have the chance to collect coins. You can collect gold and silver coins. Both gold and silver coins are worth 40 credits." +
      "<div>" +
          "<img src='" + silver_coin_img + "' height='15%' width='15%' hspace='3%'>" +
          "<img src='" + gold_coin_img + "' height='15%' width='15%' hspace='3%'>" +
      "</div>" +
      "<br>(Press the space bar to continue)" },
    {instruction: "Sometimes you might also encounter green coins. However, these coins have a value of 0 credits." +
      "<div>" +
          "<img src='" + green_coin_img + "' height='15%' width='15%' hspace='3%'>" +
      "</div>" +
      "<br>(Press the space bar to continue)" },
    {instruction: "The number of credits you have at the end of the experiment will be used to calculate your monetary bonus. This bonus will be added to what you are paid at the end of the experiment." +
      "<br>(Press the space bar to continue)" },
    {instruction: "There are two piggy banks:" +
      "<div>" +
        "<img src='" + silver_pig_img + "' height='30%' width='30%' hspace='5%' />" +
        "<img src='" + gold_pig_img + "' height='30%' width='30%' hspace='5%' />" +
      "</div>" +
      "Collected coins are stored in their corresponding piggy banks, provided it is not full.<br>(Press the space bar to continue)"},
    {instruction: "Coins can be collected by responding to the images below." +
      "<div>" +
        "<img src='" + right_block_img + "' height='15%' width='15%' hspace='5%' />" +
        "<img src='" + left_block_img + "' height='15%' width='15%' hspace='5%' />" +
      "</div>" +
      "(Press the space bar to continue)</p>"},
    {instruction: "Each of the previously shown images is associated with either the P-key or Q-key: " +
      "<div>" +
        "<img src='" + qkey_img +"' height='30%' width='30%' hspace='5%' />" +
        "<img src='" + pkey_img +"' height='30%' width='30%' hspace='5%' />" +
      "</div>" +
      "(Press the space bar to continue)</p>"},
    {instruction: "Please always press Q with your left index finger. And please press P with your right index finger." +
      "<div>" +
        "<img src='" + qkey_img + "' height='30%' width='30%' hspace='5%' />" +
        "<img src='" + pkey_img + "' height='30%' width='30%' hspace='5%' />" +
      "</div>" +
      "(Press the space bar to continue)</p>"},
    {instruction: "The correct response to the following image is Q: " +
      "<div>" +
        "<img src='" + left_block_img + "' height='30%' width='30%' hspace='5%' />" +
        "<img src='" + qkey_img + "' height='20%' width='20%' hspace='5%' />" +
      "</div>" +
      "(Press the space bar to continue)</p>"},
    {instruction: "The correct response to the following image is P: " +
      "<div>" +
        "<img src='" + right_block_img + "' height='30%' width='30%' hspace='5%' />" +
        "<img src='" + pkey_img + "' height='20%' width='20%' hspace='5%' />" +
      "</div>" +
      "(Press the space bar to continue)</p>"},
    {instruction: "You can respond as often as you want. Each response costs you 1 credit. <br>(Press the space bar to continue)"},
    {instruction: "If you respond correctly, you will see this triangle pop up on the screen: <p class='aligncenter'><img src='" + triangle_img + "' height='30%' width='30%' /><p>(Press the space bar to continue)</p>"},
    {instruction: "You may not be awarded a coin for every action, even if it is correct. <br>(Press the space bar to continue)"},
    {instruction: "If you are awarded a coin, it will light up: <p class='aligncenter'><img src='" + coin_light_img + "' height='30%' width='30%' /><p>(Press the space bar to continue)</p>"},
    {instruction: "Each action corresponds with one type of coin (gold or silver). Please try to remember which action leads to which type of coin. <br>(Press the space bar to continue)"},
    {instruction: "Please answer the following questions about the instructions to ensure your understanding.<p>(Press the space bar to continue)</p>"}
  ]
}

/* instructions-check blocks: each pair of check_instructionsx and feedbackx
 * define a true/false question to ask about the instructions and give feedback
 * on the correct answer
 */
var check_instructions1 = {
    type: 'html-button-response',
	stimulus: "<p>While you see the figure shown below, you should press Q.<p class='aligncenter'><img src='" + right_block_img + "' height='30%' width='30%' hspace='5%' /></p>",
    choices: ['True', 'False'],
	data: {
        stimulus_type: 'question1',
	    correct_answer: 1
	},
	on_finish: function(data){
	  	//data.correct = true;
	    if (data.button_pressed == data.correct_answer){// 70 is the numeric code for f
            data.correct = true; // can add property correct by modify data object directly
	    } else {
            data.correct = false;
	    }
        to_save_data_instruct = [jsPsych.data.get().last(1).values()[0].correct]
        data_instruct = data_instruct.concat(to_save_data_instruct);
	}
}

var feedback1 = {
    type: 'html-keyboard-response',
    choices: [32],
    stimulus: function(){
	    var last_trial_correct = jsPsych.data.get().last(1).values()[0].correct;
	    if (last_trial_correct){
            return "<p>Correct!</p><p>(Press the space bar to continue)</p>";
	    } else {
            return "<p>The correct answer is false. While this figure is shown, you may earn a type of coin by pressing P. You may press P any time and as many times as you want. While the other figure is shown, you may earn a type of coin by pressing Q. You may press Q any time and as many times as you want.</p><p>(Press the space bar to continue)</p>"
	    }
    }
}

var check_instructions2 = {
    type: 'html-button-response',
    stimulus: '<p>You can earn both silver and gold coins but they are worth the same number of credits.</p>',
    choices: ['True', 'False'],
    data: {
        stimulus_type: 'question1',
        correct_answer: 0
    },
    on_finish: function(data){
        if (data.button_pressed == data.correct_answer){// 70 is the numeric code for f
            data.correct = true; // can add property correct by modify data object directly
        } else {
            data.correct = false;
        }
        to_save_data_instruct = [jsPsych.data.get().last(1).values()[0].correct]
        data_instruct = data_instruct.concat(to_save_data_instruct);
    }
}

var feedback2 = {
    type: 'html-keyboard-response',
    choices: [32],
    stimulus: function(){
        var last_trial_correct = jsPsych.data.get().last(1).values()[0].correct;
        if (last_trial_correct){
            return "<p>Correct!</p><p>(Press the space bar to continue)</p>";
        } else {
            return "<p>The correct answer is true. Both the silver and gold coins you have collected in the two piggybanks will be counted towards your bonus at the end of the experiment. Both silver and gold coins are worth 40 credits.</p><p>(Press the space bar to continue)</p>"
        }
    }
}

var check_instructions3 = {
    type: 'html-button-response',
    stimulus: '<p>Every time you push Q or P you are earning a coin.</p>',
    choices: ['True', 'False'],
    data: {
        stimulus_type: 'question1',
        correct_answer: 1
    },
    on_finish: function(data){
    	//data.correct = true;
        if (data.button_pressed == data.correct_answer){// 70 is the numeric code for f
            data.correct = true; // can add property correct by modify data object directly
        } else {
            data.correct = false;
        }
        to_save_data_instruct = [jsPsych.data.get().last(1).values()[0].correct]
        data_instruct = data_instruct.concat(to_save_data_instruct);
    }
}

var feedback3 = {
    type: 'html-keyboard-response',
    choices: [32],
    stimulus: function(){
        var last_trial_correct = jsPsych.data.get().last(1).values()[0].correct;
        if (last_trial_correct){
            return "<p>Correct!</p><p>(Press the space bar to continue)</p>";
        } else {
            return "<p>The correct answer is false. Not every time you press either Q or P you will earn a coin. Occasionally though, you will earn the coin and it is up to you to figure out what is the best way to press Q and/or P to earn as many coins as possible.</p><p>(Press the space bar to continue)</p>"
        }
    }
}

var check_instructions4 = {
    type: 'html-button-response',
    stimulus: '<p>Silver and gold coins are collected in one piggybank.</p>',
    choices: ['True', 'False'],
    data: {
        stimulus_type: 'question1',
        correct_answer: 1
    },
    on_finish: function(data){
        if (data.button_pressed == data.correct_answer){// 70 is the numeric code for f
            data.correct = true; // can add property correct by modify data object directly
        } else {
            data.correct = false;
        }
        to_save_data_instruct = [jsPsych.data.get().last(1).values()[0].correct]
        data_instruct = data_instruct.concat(to_save_data_instruct);
    }
}

var feedback4 = {
    type: 'html-keyboard-response',
    choices: [32],
    stimulus: function(){
        var last_trial_correct = jsPsych.data.get().last(1).values()[0].correct;
        if (last_trial_correct){
            return "<p>Correct!</p><p>(Press the space bar to continue)</p>";
        } else {
            return "<p>The correct answer is false. The coins are collected in two separate piggybanks. One for gold coins and one for silver coins.</p><p>(Press the space bar to continue)</p>"
        }
    }
}

var check_instructions5 = {
    type: 'html-button-response',
    stimulus: '<p>By pressing P, I will earn the same type of coin (either silver or gold) throughout the whole experiment.</p>',
    choices: ['True', 'False'],
    data: {
        stimulus_type: 'question1',
        correct_answer: 0
    },
    on_finish: function(data){
        if (data.button_pressed == data.correct_answer){// 70 is the numeric code for f
            data.correct = true; // can add property correct by modify data object directly
        } else {
            data.correct = false;
        }
        to_save_data_instruct = [jsPsych.data.get().last(1).values()[0].correct]
        data_instruct = data_instruct.concat(to_save_data_instruct);
        //console.log(block_instruct)
        db.collection("habit-short").doc('version1').collection('participants').doc(uid).update({
          'instruct': data_instruct,
          'time.training_start': new Date().toLocaleTimeString()
        });
    }
}

var feedback5 = {
    type: 'html-keyboard-response',
    choices: [32],
    stimulus: function(){
    var last_trial_correct = jsPsych.data.get().last(1).values()[0].correct;
        if (last_trial_correct){
            return "<p>Correct!</p><p>(Press the space bar to continue)</p>";
        } else {
            return "<p>The correct answer is true. Pressing P will get you the same type of coin throughout the whole experiment. Pressing Q will get you the other coin throughout the whole experiment.</p><p>(Press the space bar to continue)</p>"
        }
    }
}

// transition trial between instructions and training
var lets_begin = {
type: 'html-keyboard-response',
    choices: [32],
    stimulus: "<p>Let's Begin!</p><p>(Press the space bar to continue)</p>"
}


var instructions = {
    timeline: [start_instructions, check_instructions1, feedback1, check_instructions2, feedback2, check_instructions3, feedback3, check_instructions4, feedback4, check_instructions5, feedback5, lets_begin],
};
