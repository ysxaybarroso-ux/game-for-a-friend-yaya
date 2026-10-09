let volumeMusique = 0;
let volumeSoundEffect = 0;
let game_register = false;
const start_new = document.querySelector("#start_new_btn");
const select = document.querySelector("#select_btn");
const settings = document.querySelector("#settings_btn");
const credit = document.querySelector("#credit_btn");


start_new.addEventListener('click' , ()=>{
    if (game_register){
        document.getElementById('home-page-list').style.display = "none"
        document.getElementById('start_menu').style.display = "flex";
    }
    else {
        document.getElementById('home-page-list').style.display = "none"
        document.getElementById('new_menu').style.display = "flex";
    }
});

select.addEventListener('click' , ()=>{
    document.getElementById('home-page-list').style.display = "none"
    document.getElementById('select_menu').style.display = "flex";
});

settings.addEventListener('click' , ()=>{
    document.getElementById('home-page-list').style.display = "none"
    document.getElementById('settings_menu').style.display = "flex";
});

credit.addEventListener('click' , ()=>{
    document.getElementById('home-page-list').style.display = "none"
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