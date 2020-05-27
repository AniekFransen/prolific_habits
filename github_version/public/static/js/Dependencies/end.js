// End page slide
var endTaskSlide = {
    type: 'html-keyboard-response',
    stimulus: '<div>You are all done, thank you for participating!<br><br>' +
    'The researcher will be in touch as soon as possible about your bonus payment.<br><br>' +
    'Click <a href="https://www.google.com">here</a> to complete the study!' + //ANIEK: put in the correct link back to prolific
    '</div>',
    choices: jsPsych.NO_KEYS,
    data: {label: "all_done"},
    on_load: function(data) {
      db.collection("habit-short").doc('version1').collection('participants').doc(uid).update({
      'time_end': new Date().toLocaleTimeString(),
      })
    }
};

// timeline for one trial, combine ifnodes and fixed events
var goodbye = {
    timeline: [endTaskSlide],
};
