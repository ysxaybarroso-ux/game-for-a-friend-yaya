let volumeMusique = 0;
let volumeSoundEffect = 0;
numberOfLevelDiscovered = 1;
let game_register = false;
const start_new = document.querySelector("#start_new_btn");
const select = document.querySelector("#select_btn");
const settings = document.querySelector("#settings_btn");
const credit = document.querySelector("#credit_btn");

UpdateListOfLevelDiscovered(numberOfLevelDiscovered);
function UpdateListOfLevelDiscovered(newNumberOfLevelDiscovered) {
    const select_list = document.getElementById('select_list');
    for (let i = 1; i <= numberOfLevelDiscovered; i++) {
        const level = document.createElement('div');
        level.classList.add('list_level');
         level.textContent = `Level ${i}`;
        select_list.appendChild(level);
}}
start_new.addEventListener('click' , ()=>{
    if (game_register){
        document.getElementById('start_menu').style.display = "flex";
    }
    else {
        document.getElementById('new_menu').style.display = "flex";
    }
});


select.addEventListener('click' , ()=>{
    document.getElementById('select_menu').style.display = "flex";
});

settings.addEventListener('click' , ()=>{
    document.getElementById('settings_menu').style.display = "flex";
});

credit.addEventListener('click' , ()=>{
    document.getElementById('credit_menu').style.display = "flex";
});


document.getElementById('game_settings_btn').addEventListener('click' , ()=>{
    divSound = document.getElementById('sound_settings');
    divSound.style.display = "none";
    document.getElementById('sound_settings_btn').innerHTML = "<img src='../../images/sound_btn.png ' width = '50' height='50' alt='setting sound btn'></img>";
    document.getElementById('game_settings').style.display = "flex";
});

document.getElementById('sound_settings_btn').addEventListener('click' , ()=>{
    divSound = document.getElementById('sound_settings');
    divSound.style.display = "flex";
    document.getElementById('sound_settings_btn').innerHTML = "<img src='../../images/sound_btn_pressed.png ' width = '50' height='50' alt='setting sound btn'></img>";
    document.getElementById('game_settings').style.display = "none";
});

document.getElementById('music_slider').addEventListener('input', function() {
    volumeMusique = this.value / 100;
    document.getElementById('labelMusique').textContent = this.value + '%';
});
document.getElementById('sound_effect_slider').addEventListener('input', function() {
    volumeSoundEffect = this.value /100;
    document.getElementById('labelSon').textContent = this.value +'%'; 
});

const backButtons = document.querySelectorAll( ".quit_button");
backButtons.forEach(button => {
    button.addEventListener('click', () => {
        document.getElementById('credit_menu').style.display = "none";
        document.getElementById('settings_menu').style.display = "none";
        document.getElementById('select_menu').style.display = "none";
        document.getElementById('start_menu').style.display = "none";
        document.getElementById('new_menu').style.display = "none";
    })});

document.getElementById('create_new').addEventListener('click' , ()=>{ 
    game_register = true;
    const nameInput = document.getElementById('new_name');
    let worldName = nameInput.value;
    document.getElementById('run_title').textContent = worldName;
    document.getElementById('new_menu').style.display = "none";
    document.getElementById('start_menu').style.display = "flex";
});

document.getElementById('delete_run').addEventListener('click' , ()=>{
    game_register = false;
    document.getElementById('start_menu').style.display = "none";
});