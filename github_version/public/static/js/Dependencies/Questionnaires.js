
/* questionnaires */
var questionnaire_start = {
    type: 'html-keyboard-response',
    choices: [32],
    stimulus: "<body><div>We will now ask you to complete a two short questionnaires. Please note, our research depends on you answering honestly and accurately. These questionnaires include scoring that indicates whether or not they have been filled consistently. If test scoring indicates that responses were entered inconsistently, you will not receive a bonus payment. <br /><br /> Press space to begin.</div></body>",
    post_trial_gap: 500,
}

var block_question = []

// define the questionnaire response options
q1_labels = ['Not at all', 'Somewhat', 'Moderately so', 'Very much so']

var questionairre1 = {
    type: 'survey-likert',
    preamble:   '<br><br>DIRECTIONS: A Number of statements which people have used to describe ' +
    'themselves are given below. Read each statement and then select the ' +
    'response option to the right to indicate how you feel right now, that is, ' +
    'AT THIS MOMENT. There are no right or wrong answers. Do not spend too much ' +
    'time on any one statement, but give the answer which seems to describe your ' +
    'present feelings best.',
    questions: [
        {prompt: 'I feel calm.', labels: q1_labels,required: true},
        {prompt: 'I feel secure.', labels: q1_labels,required: true},
        {prompt: 'I am tense.', labels: q1_labels,required: true},
        {prompt: 'I am strained.', labels: q1_labels,required: true},
        {prompt: 'I feel at ease.', labels: q1_labels,required: true},
        {prompt: 'I feel upset.', labels: q1_labels,required: true},
        {prompt: 'Leave this question blank.', labels: q1_labels, required: false},
        {prompt: 'I am presently worrying about possible misfortunes.', labels: q1_labels,required: true},
        {prompt: 'I feel satisfied.', labels: q1_labels,required: true},
        {prompt: 'I feel frightened.', labels: q1_labels,required: true},
        {prompt: 'I feel comfortable.', labels: q1_labels,required: true},
        {prompt: 'I feel self-confident.', labels: q1_labels,required: true},
        {prompt: 'I feel nervous.', labels: q1_labels,required: true},
        {prompt: 'I am jittery.', labels: q1_labels,required: true},
        {prompt: 'I feel indecisive.', labels: q1_labels,required: true},
        {prompt: 'I am relaxed.', labels: q1_labels,required: true},
        {prompt: 'I feel content.', labels: q1_labels,required: true},
        {prompt: 'I am worried.', labels: q1_labels,required: true},
        {prompt: 'I feel confused.', labels: q1_labels,required: true},
        {prompt: 'I feel steady.', labels: q1_labels,required: true},
        {prompt: 'I feel pleasant.', labels: q1_labels,required: true},
        // you can add more questions here!
    ], 
    on_finish: function() {
        to_save_data_question = [jsPsych.data.getLastTrialData().values()[0].responses] //ANIEK: also figure out how to get time elapsed or rt's here 
        block_question = block_question.concat(to_save_data_question)
    }
}

// define the questionnaire response options
q2_labels = ['Almost Never', 'Sometimes', 'Often', 'Almost Always']

var questionairre2 = {
    type: 'survey-likert',
    preamble:   '<br><br>DIRECTIONS: A number of statements which people have used to describe themselves are given below.  Read each statement and then mark the appropriate number to the right of the statement to indicate HOW YOU GENERALLY FEEL. There are no right or wrong answers.  Do not spend too much time on any one statement but give the answer which seems to describe how you generally feel.',
    questions: [
        {prompt: 'I feel pleasant.', labels: q2_labels,required: true},
        {prompt: 'I feel nervous and restless.', labels: q2_labels,required: true},
        {prompt: 'I feel satisfied with myself.', labels: q2_labels,required: true},
        {prompt: 'I wish I could be as happy as others seem to be.', labels: q2_labels,required: true},
        {prompt: 'I feel like a failure.', labels: q2_labels,required: true},
        {prompt: 'I feel rested.', labels: q2_labels,required: true},
        {prompt: 'I am "calm, cool, and collected".', labels: q2_labels,required: true},
        {prompt: 'I feel that difficulties are piling up so that I cannot overcome them.', labels: q2_labels,required: true},
        {prompt: 'I worry too much over something that really doesn\'t matter.', labels: q2_labels,required: true},
        {prompt: 'Leave this question blank if you are paying attention.', labels: q2_labels, required: false},
        {prompt: 'I am happy.', labels: q2_labels,required: true},
        {prompt: 'I have disturbing thoughts.', labels: q2_labels,required: true},
        {prompt: 'I lack self-confidence.', labels: q2_labels,required: true},
        {prompt: 'I feel secure.', labels: q2_labels,required: true},
        {prompt: 'I make decisions easily.', labels: q2_labels,required: true},
        {prompt: 'I feel inadequate.', labels: q2_labels,required: true},
        {prompt: 'I am content.', labels: q2_labels,required: true},
        {prompt: 'Some unimportant thought runs through my mind and bothers me.', labels: q2_labels,required: true},
        {prompt: 'I take disappointments so keenly that I can\'t put them out of my mind.', labels: q2_labels,required: true},
        {prompt: 'I am a steady person.', labels: q2_labels,required: true},
        {prompt: 'I get in a state of tension or turmoil as I think over my recent concerns and interest.', labels: q2_labels,required: true},
        // you can add more questions here!
    ],
    on_finish: function() {
        to_save_data_question = [jsPsych.data.getLastTrialData().values()[0].responses]
        block_question = block_question.concat(to_save_data_question)
        //console.log(block_question)
        db.collection("habit-short").doc('version1').collection('participants').doc(uid).update({
        'questionnaires': block_question,
        'time.questionnaires_end': new Date().toLocaleTimeString()
      });
    }
}

// q3_labels = ['Not at all', 'A little', 'Moderately', 'A lot','Extremely']

// var questionairre3 = {
//     type: 'survey-likert',
//     preamble: '<br><br>DIRECTIONS: The following statements refer to experiences that many people have in their everyday lives. Select the option that best describes<br><b>HOW MUCH that experience has DISTRESSED or BOTHERED you during the PAST MONTH.',
//     questions: [
//     {prompt: "I have saved up so many things that they get in the way.", labels: q3_labels, required: false},
//     {prompt: "I check things more often than necessary.", labels: q3_labels, required: false},
//     {prompt: "I get upset if objects are not arranged properly.", labels: q3_labels, required: false},
//     {prompt: "I feel compelled to count while I am doing things.", labels: q3_labels, required: false},
//     {prompt: "I find it difficult to touch an object when I know it has been touched by strangers or certain people.", labels: q3_labels, required: false},
//     {prompt: "I find it difficult to control my own thoughts.", labels: q3_labels, required: false},
//     {prompt: "I collect things I don’t need.", labels: q3_labels, required: false},
//     {prompt: "I repeatedly check doors, windows, drawers, etc.", labels: q3_labels, required: false},
//     {prompt: "I get upset if others change the way I have arranged things.", labels: q3_labels, required: false},
//     {prompt: "I feel I have to repeat certain numbers.", labels: q3_labels, required: false},
//     {prompt: "I sometimes have to wash or clean myself simply because I feel contaminated.", labels: q3_labels, required: false},
//     {prompt: "I am upset by unpleasant thoughts that come into my mind against my will.", labels: q3_labels, required: false},
//     {prompt: "I avoid throwing things away because I am afraid I might need them later.", labels: q3_labels, required: false},
//     {prompt: "I repeatedly check gas and water taps and light switches after turning them off.", labels: q3_labels, required: false},
//     {prompt: "I need things to be arranged in a particular order.", labels: q3_labels, required: false},
//     {prompt: "I feel that there are good and bad numbers.", labels: q3_labels, required: false},
//     {prompt: "I wash my hands more often and longer than necessary.", labels: q3_labels, required: false},
//     {prompt: "I frequently get nasty thoughts and have difficulty in getting rid of them.", labels: q3_labels, required: false}
//     ]
// }

// var question1_options = ["I do not feel sad.","I feel sad much of the time.", "I feel sad all the time.","I am so sad or unhappy that I can't stand it."]
// var question2_options = ["I am not discouraged about my future.","I feel more discouraged about my future than I used to be.", "I do not expect things to work out for me.", "I feel my future is hopeless and will only get worse."]
// var question3_options = ["I do not feel like a failure.", "I have failed more than I should have.", "As I look back, I see a lot of failures.","I feel I am a total failure as a person."]
// var question4_options = ["I get as much pleasure as I ever did from the things I enjoy.", "I don't enjoy things as much as I used to.", "I get very little pleasure from the things I used to enjoy.", "I can't get any pleasure from the things I used to enjoy."]
// var question5_options = ["I don't feel particularly guilty.", "I feel guilty over many things I have done or should have done.", "I feel quite guilty most of the time.", "I feel guilty all of the time."]
// var question6_options = ["I don't feel I am being punished.", " I feel I may be punished.", "I expect to be punished.", "I feel like I am being punished."]
// var question7_options = ["I feel the same about myself as ever.", "I have lost confidence in myself.", "I am disappointed in myself.", "I dislike myself."]
// var question8_options = ["I don't criticize or blame myself more than usual.", "I am more critical of myself than I used to be.", "I criticize myself for all my faults.", "I blame myself for everything bad that happens."]
// var question9_options = ["I don't have any thoughts of killing myself.", "I have thoughts of killing myself, but I would not carry them out.", "I would like to kill myself.", "I would kill myself if I had the chance."]
// var question10_options = ["I don't cry anymore than I used to.", "I cry more than I used to.", " I cry over every little thing.", "I feel like crying, but I can't."]
// var question11_options = ["I am no more restless or wound up than usual.", "I feel more restless or wound up than usual.", "I am so restless or agitated that it's hard to stay still.", "I am so restless or agitated that I have to keep moving or doing something."]
// var question12_options = ["I have not lost interest in other people or activities.", " I am less interested in other people or things than before.", "I have lost most of my interest in other people or things.", "It's hard to get interested in anything."]
// var question13_options = ["I make decisions about as well as ever.", "I find it more difficult to make decisions than usual.", "I have much greater difficulty in making decisions than I used to.", "I have trouble making any decisions."]
// var question14_options = ["I do not feel I am worthless.", "I don't consider myself as worthwhile and useful as I used to.", "I feel more worthless as compared to other people.", "I feel utterly worhtless."]
// var question15_options = ["I have as much energy as ever.", "I have less energy than I used to have.", "I don't have enough energy to do very much.", "I don't have enough energy to do anything."]
// var question16_options = ["I hae not experienced any change in my sleeping pattern.", "I sleep somewhat more than usual.", "I sleep somewhat less than usual.", "I sleep a lot  more than usual.", "I sleep a lot less than usual.", "I sleep most of the day.", "I wake up 1-2 hours early and can't get back to sleep."]
// var question17_options = ["I am no more irratible than usual.", "I am more irratible than usual.", "I am much more irratible than usual.", "I am irratible all the time."]
// var question18_options = ["I have not experienced any change in my appetite.", "My appetite is somewhat less than usual.", "My appetite is somewhat greater than usual.", "My appetite is much less than before.", "My appetite is much greater than usual.", "I have no appetite at all.", "I crave food all the time."]
// var question19_options = ["I can concentrate as well as ever.", "I can't concentrate as well as usual.", "It's hard to keep my mind on anything for very long.", "I find I can't concetrate on anything."]
// var question20_options = ["I am no more tired or fatigued than usual.", "I get more tired or fatigued more easily than usual.", "I am too tired or fatigued to do a lot fo the things I used to do."]
// var question21_options = ["I have not noticed any recent changes in my interst in sex.", "I am less interested in sex than I used to be.", "I am much less interested in sex now.", "I have lost interest in sex completely."]

// var multi_choice_questionairre = {
//     type:'survey-multi-choice',
//     preamble: '<br><br>DIRECTIONS: Please read each group of statements carefully, and then pick out the one statement in each group that best describes the way you have been feeling during the PAST TWO WEEKS. If several statements in the group seem to apply equally well, pick the one furthest down.',
//     questions: [
//     {prompt: "Please pick the statement that describes the way you have been feeling best.", options: question1_options, required: false},
//     {prompt: "Please pick the statement that describes the way you have been feeling best.", options: question2_options, required: false},
//     {prompt: "Please pick the statement that describes the way you have been feeling best.", options: question3_options, required: false},
//     {prompt: "Please pick the statement that describes the way you have been feeling best.", options: question4_options, required: false},
//     {prompt: "Please pick the statement that describes the way you have been feeling best.", options: question5_options, required: false},
//     {prompt: "Please pick the statement that describes the way you have been feeling best.", options: question6_options, required: false},
//     {prompt: "Please pick the statement that describes the way you have been feeling best.", options: question7_options, required: false},
//     {prompt: "Please pick the statement that describes the way you have been feeling best.", options: question8_options, required: false},
//     {prompt: "Please pick the statement that describes the way you have been feeling best.", options: question9_options, required: false},
//     {prompt: "Please pick the statement that describes the way you have been feeling best.", options: question10_options, required: false},
//     {prompt: "Please pick the statement that describes the way you have been feeling best.", options: question11_options, required: false},
//     {prompt: "Please pick the statement that describes the way you have been feeling best.", options: question12_options, required: false},
//     {prompt: "Please pick the statement that describes the way you have been feeling best.", options: question13_options, required: false},
//     {prompt: "Please pick the statement that describes the way you have been feeling best.", options: question14_options, required: false},
//     {prompt: "Please pick the statement that describes the way you have been feeling best.", options: question15_options, required: false},
//     {prompt: "Please pick the statement that describes the way you have been feeling best.", options: question16_options, required: false},
//     {prompt: "Please pick the statement that describes the way you have been feeling best.", options: question17_options, required: false},
//     {prompt: "Please pick the statement that describes the way you have been feeling best.", options: question18_options, required: false},
//     {prompt: "Please pick the statement that describes the way you have been feeling best.", options: question19_options, required: false},
//     {prompt: "Please pick the statement that describes the way you have been feeling best.", options: question20_options, required: false},
//     {prompt: "Please pick the statement that describes the way you have been feeling best.", options: question21_options, required: false}
//     ]
// }

var questionnaires = {
    timeline: [questionnaire_start, questionairre1, questionairre2]
}