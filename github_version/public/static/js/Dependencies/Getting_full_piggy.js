// transition pages to let the participant know about how full the piggy banks are
var getting_full = {
    type: "html-keyboard-response",
    choices: [32],
    stimulus: "<p>The piggy banks are getting full!<br> (Press the space bar to continue)</p>",
    post_trial_gap: 500,
};
