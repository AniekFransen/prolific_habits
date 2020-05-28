
// keep track of piggy-bank fullness
var full_type = "NONE";

// create timeline
var timeline = [];

// define left and right key codes
LEFT = 81; // Q key
RIGHT = 80; // P key

// test mode global variables to speed up testing
var BLOCKTIME = 1000 * 300; // about 5 min
var CONSTIME = 1000 * 50;
var CURTAINTIME = 1000 * 15;
var RPROB = 5;
var REWARDS_ALLOWED = 5;

// actual global variables
// var BLOCKTIME = 1000 * 600; //time is in miliseconds -  ~ 5 min is the longest block time this far: max block lenght set to 10 min
// var CONSTIME = 1000 * 15;
// var CURTAINTIME = 1000 * 90;
// var RPROB = 20; //RR20 schedule
// var REWARDS_ALLOWED = 16; //17 rewards can be collected in each block - 2*2*2 blocks * 17 rewards = 136 rewards total

// Name and load in the images
var imageD = "static/images/";
var silver_coin_img = [imageD + "silver_coin.png"];
var gold_coin_img = [imageD + "gold_coin.png"];
var silver_pig_img = [imageD + "silver_pig.jpg"];
var gold_pig_img = [imageD + "gold_pig.jpg"];
var right_block_img = [imageD + "right_resp_img.png"];
var left_block_img = [imageD + "left_resp_img.png"];
var qkey_img = [imageD + "qkey.png"];
var pkey_img = [imageD + "pkey.png"];
var triangle_img = [imageD + "triangle_img.png"];
var coin_light_img = [imageD + "coin_transformation.png"];
var gold_coin_faded_img = [imageD + "gold_coin_faded.png"];
var silver_coin_faded_img = [imageD + "silver_coin_faded.png"];
var invisible_triangle_img = [imageD + "invisible_triangle_img.png"];
var curtain_img = [imageD + "curtain.jpg"];
var green_coin_img = [imageD + "green_coin.png"];

jsPsych.pluginAPI.preloadImages(silver_coin_img)
jsPsych.pluginAPI.preloadImages(gold_coin_img)
jsPsych.pluginAPI.preloadImages(silver_pig_img)
jsPsych.pluginAPI.preloadImages(gold_pig_img)
jsPsych.pluginAPI.preloadImages(right_block_img)
jsPsych.pluginAPI.preloadImages(left_block_img)
jsPsych.pluginAPI.preloadImages(qkey_img)
jsPsych.pluginAPI.preloadImages(pkey_img)
jsPsych.pluginAPI.preloadImages(triangle_img)
jsPsych.pluginAPI.preloadImages(coin_light_img)
jsPsych.pluginAPI.preloadImages(gold_coin_faded_img)
jsPsych.pluginAPI.preloadImages(silver_coin_faded_img)
jsPsych.pluginAPI.preloadImages(invisible_triangle_img)
jsPsych.pluginAPI.preloadImages(green_coin_img)
jsPsych.pluginAPI.preloadImages(curtain_img)

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    // both min and max are inclusive
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
