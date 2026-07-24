let timer = 0;
let minute = 0;
let seconde = 0; //ordre logique de déclaration inversé car chuis différent enft heheheheehehhahahaha --> jdeviens fou #kingerMySheylla
let niveauDiff = 8;
//tourelle upgrades
let anglePreview = 0;
let actualTourelle = null;
let pTourelleXP = 10000000;
//grenades
let effetZone = 150; 
let grenadesMaxTaille = 150;

//boss
let powerCountdown = 0;
let countdownSecondBoss = 30;
let spawnBoss1Fait = false;
let spawnBoss2Fait = false;
let deathBoss1 = true;
let deathBoss2 = true ;

//les orbess ouaisssss
let orbesAngle = 0;

let spawnCountdown = 0;
let spawnBossCountdown = 0;

let upgradeEnCours = false;
let imagesChargees = 0;
const totalImages = 18; //  total upgrades

const canvas= document.getElementById("gamecanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let canvasPreview;
let ctxPreview;

const keys = {};
document.addEventListener('keyup', e => keys[e.key] = false);

// ================================sound generation et system==========================
// state sytem (evite les if car yen a marre)
let gameState = 'Jeu';

const playlistJeu = [
    '../../sound/gameplay.mp3',
    '../../sound/gameplay1.mp3',
    '../../sound/gameplay2.mp3',
    '../../sound/gameplay3.mp3'
];

let indexMusique = 0;
const musiqueJeu = new Audio();

function lancerMusiqueJeu() {
    musiqueJeu.src = playlistJeu[indexMusique];
    musiqueJeu.volume = volumeMusique;
    musiqueJeu.play();
}

musiqueJeu.addEventListener('ended', () => {
    indexMusique++;

    if (indexMusique >= playlistJeu.length) {
        indexMusique = 0; // recommence la playlist h   hahhah
    }

    lancerMusiqueJeu();
});

// musique 
const musiqueMenu = new Audio('../../sound/menu.mp3');
musiqueMenu.loop = true;   // on recemence 
musiqueMenu.volume = 0.5;

//sound effect
const sonTir = new Audio('../../sound/tir.mp3');
const sonMort = new Audio('../../sound/death.mp3');
const sonGrenade = new Audio('../../sound/grenade.mp3');
const sonCasino = new Audio('../../sound/casino.wav');
const sonBoutton1 = new Audio('../../sound/sonBoutton1.mp3');
const sonError = new Audio('../../sound/error.mp3');

//pour etre changeable par le joueur
let volumeMusique = 0.5;
let volumeSoundEffect = 0.5;

//=====================================================================================================================

// =========================== chargement des image je sais je fait de la mis een page chelou chepa comment on fait======================================
function onImageChargee() {
    imagesChargees++;
    if (imagesChargees === totalImages) {
        document.getElementById('btnPause').style.display = 'block';
        canvasPreview = document.getElementById("tourellePreview");
        ctxPreview = canvasPreview.getContext("2d");
        GameLoop(); // on lance le jeu seulement quand tout est chargé
    }
}

const imgSpeed = new Image();
imgSpeed.src = "../../images/so.png";
imgSpeed.onload = onImageChargee;
imgSpeed.onerror = onImageChargee;

const imgDPS = new Image();
imgDPS.src = "../../images/degat.png";
imgDPS.onload = onImageChargee;
imgDPS.onerror = onImageChargee;

const imgCadence = new Image();
imgCadence.src = "../../images/cadence.png";
imgCadence.onload = onImageChargee;
imgCadence.onerror = onImageChargee;

const imgTirMultiple = new Image();
imgTirMultiple.src = "../../images/tir_multiple.png";
imgTirMultiple.onload = onImageChargee;
imgTirMultiple.onerror = onImageChargee;

const imgTourelle = new Image();
imgTourelle.src = "../../images/tourelle.png";
imgTourelle.onload = onImageChargee;
imgTourelle.onerror = onImageChargee;

const imgGrenade = new Image();
imgGrenade.src = "../../images/gre.png";
imgGrenade.onload = onImageChargee;
imgGrenade.onerror = onImageChargee;

const imgSoin = new Image();
imgSoin.src = "../../images/soin.png";
imgSoin.onload = onImageChargee;
imgSoin.onerror = onImageChargee;

const imgHpMax = new Image();
imgHpMax.src = "../../images/hp_max.png";
imgHpMax.onload = onImageChargee;
imgHpMax.onerror = onImageChargee;

const imgPerforant = new Image();
imgPerforant.src = "../../images/tir_perforant.png";
imgPerforant.onload = onImageChargee;
imgPerforant.onerror = onImageChargee;

const imgSlower = new Image();
imgSlower.src = "../../images/gel.png";
imgSlower.onload = onImageChargee;
imgSlower.onerror = onImageChargee;

const imgRicochet = new Image();
imgRicochet.src = "../../images/ricochet.png";
imgRicochet.onload = onImageChargee;
imgRicochet.onerror = onImageChargee;

const imgOrbies= new Image();
imgOrbies.src = "../../images/orbies.png";
imgOrbies.onload = onImageChargee;
imgOrbies.onerror = onImageChargee;

const imgZoom = new Image();
imgZoom.src = "../../images/zoom.png";
imgZoom.onload = onImageChargee;
imgZoom.onerror = onImageChargee;

const imgPlayer = new Image();
imgPlayer.src = "../../images/Maxpeur.png";
imgPlayer.onload = onImageChargee;
imgPlayer.onerror = onImageChargee;

const imgMenu = new Image();
imgMenu.src = "../../images/chill.jpeg";
imgMenu.onload = onImageChargee;
imgMenu.onerror = onImageChargee;

const imgLoose = new Image();
imgLoose.src = "../../images/nulos.png";
imgLoose.onload = onImageChargee;
imgLoose.onerror = onImageChargee;

const imgBig = new Image();
imgBig.src = "../../images/Maxbruh.png";
imgBig.onload = onImageChargee;
imgBig.onerror = onImageChargee;

const imgBoss = new Image();
imgBoss.src = "../../images/MaxBoss.png";
imgBoss.onload = onImageChargee;
imgBoss.onerror = onImageChargee;

const imgBoss2 = new Image();
imgBoss2.src = "../../images/MaxDictadorBoss.png";
imgBoss2.onload = onImageChargee;
imgBoss2.onerror = onImageChargee;

//===========================enfin finis rolalalal jai peur que ça ralentise la page hiiii kinger prie pour moi bro =================================

const pBullets = [];
const bBullets = []
const boss = [];
const pGrenades = [];
const pRalentisseur = [];
const pTourelles = [];
const explosion= [];
const enemis = [];
const casinoAnimation = {
    rotateSpeed : 0,
    isAnimating : false,
    upgradeReady : 0,
    actualUpgrade : 0,
    selection : [],
    ActualUpgradeFrameCount : 0,
};
const player = {
        x : canvas.width /2,
        y : canvas.height / 2,
        size :30,
        angle : 0,
        speed : 3,
        rotSpeed : 0.075,
    
        shootCountdown : 0,
        grenadeCountdown : 0,
    
        shootRate : 20,
        grenadeRate : 350,
        
        hp : 10,
        hpMax : 10,
    
        gameOver : false,
    
        degats: 1,
        ballesSoliditee : 1,
        bulletSize : 11,
        ricochetLevel : 0,
    
        orbes : 2,
        tourelle : 1,
    
        ralentiseur : 0,
        ralentiseurMax : 0,
    
        invincibleCountdown : 0,
        
        xp : 0,
    
        grenade : 0,
        grenadeMax : 0,
    
        xpRequis : 100,
        niveau : 1, 
    
        balleMultiplicateur :1,
      };
const secondBoss = {
    bulletSize: 12,
}
const poolUpgrade = [
    {
        nom: 'les bottes à sonic',
        icone: imgSpeed,
        description :'il me semble que sonic a perdu les chaussures qui courent vite',
        rarete : "commun",
        effet : () => { player.speed += 0.6 ;player.rotSpeed +=0.005; }
        
    },
    {
        nom: 'balles puissantes',
        icone: imgDPS,
        description :'vous faites plus de dégats (prêt à faire les mêmes dégradés que ton coiffeur?)',
        rarete : "rare",
        effet : () => { player.degats++; player.bulletSize *= 1.3;}
        
    },
    {
        nom: 'espèce de spameur!',
        icone: imgCadence,
        description :'le delay entre TOUT types de tir sont reduits (je voit quelle personne tu es, ta raison tu vas aimer)',
        rarete : "rare",
        effet : () => { player.shootRate = Math.max(5,player.shootRate - 2); if (player.grenadeRate >200) player.grenadeRate -=20; }
        
    },
    {
        nom: 'kamikazeland',
        icone: imgGrenade,
        description :'tu peut lancer des grenades avec un delai, cree une zone de dégats (tant que tu te fait pas sauter avec!)',
        rarete : "commun",
        effet : () => { player.grenade++; player.grenadeMax++; grenadesMaxTaille += 15; effetZone += 20;  }
        
    },
    {
        nom: ' gang potion!',
        icone: imgSoin,
        description :'restaure la moitie de tes pv (on a tout, blue-bul, manster, ciao-ener... nan pas lui chuis pas squezzie)',
        rarete : "rare",
        effet : () => { player.hp = Math.min(player.hpMax, player.hp + Math.floor(player.hpMax / 2)); }
        
    },
    {
        nom: 'tank diff',
        icone: imgHpMax,
        description :'tu augmente ta santée max de 1 et tu gagne 1 coeur en passant (tu est à present un main tank)',
        rarete : "rare",
        effet : () => { player.hpMax++; player.hp++; }
        
    },
    {
        nom: 'tir générationel',
        icone: imgPerforant,
        description :' tes balles transpercent tes ennemis +1 à chaque fois (tu endettes les gens sur des generation, merci l ursaf!)',
        rarete : "rare",
        effet : () => { player.ballesSoliditee++; }
        
    },
    {
        nom: 'balaiette laser',
        icone: imgSlower,
        description :'donne objet que tu peut poser(G) crée un ralentisement (si même en slow motion tu les tue pas ya un bleme)',
        rarete : "epique",
        effet : () => { player.ralentiseur++; player.ralentiseurMax++; }
        
    },
    {
        nom: 'fiouu ziouu OUPS!',
        icone: imgRicochet,
        description :' tes balles ricoches sur les murs (au moins avec un peu de chance tu feras ton 1er kill)',
        rarete : "epique",
        effet : () => { player.ricochetLevel++; }
        
    },
    {
        nom: 'des moustique!',
        icone: imgOrbies,
        description :' te donne 2 orbes qui tournent autour de toi et fond des dégats (jaime pas les moustique, comme cette amélioration)',
        rarete : "epique",
        effet : () => { player.orbes +=2; }
        
    },
    {
        nom: 'la truelle',
        icone: imgTourelle,
        description :' te donne une tourelle à déployer(X), peut être ameliore avex l xp (tu est maintenant dans un jeu idle)',
        rarete : "legendaire",
        effet : () => { player.tourelle++; }
        
    },
    {
        nom: '3ème bras (1er deg)',
        icone: imgTirMultiple,
        description :' tu tire maintenant une balle de plus à chaque tir (trop de radiation pour aujourd hui je crois)',
        rarete : "legendaire",
        effet : () => { player.balleMultiplicateur++; }
        
    },
];


document.addEventListener('keydown', e => {
    keys[e.key] = true;
    if (e.key === 'r' && player.gameOver) {
        RestartGame();
    }
    if (e.key === 'a' && player.grenade > 0 )
    {
        pGrenades.push({x: player.x, y: player.y , angle: player.angle, speed: 8, size: 10, z : 0, vz : 4,soliditee : 1000, ToJ:0});
        player.grenadeCountdown = player.grenadeRate; //intervalle de grenade
        player.grenade--;
    }
    if (e.key === 'g' && player.ralentiseur > 0 )
    {
        pRalentisseur.push({x :player.x, y: player.y , angle:player.angle , size:100, force: 0.6 + niveauDiff*0.05 });
        player.ralentiseur--;
    }
    if (e.key === 'x' && player.tourelle > 0 )
    {
        pTourelles.push({ x: player.x, y: player.y , size: 20 , porteeMax : 200, angle : 0,degats: 1, shootRate: 50, shootCountdown: 0, niveauCadence: 1,niveauPortee: 1,niveauDegats: 1,coutCadence: 75,coutPortee: 100,coutDegats: 125,});
        player.tourelle--; 
    }
});
//gestion pause unpause ehehe
document.getElementById('btnPause').addEventListener('click' ,() => {
    gameState = "Menu";
    document.getElementById('btnPause').textContent = '▶';
    document.getElementById('menuPause').style.display = 'block';
    changerMusique('Menu');
});
document.getElementById('btnReprendre').addEventListener('click' , () => {
    gameState = "Jeu";
    document.getElementById('btnPause').textContent = '⏸';
    document.getElementById('menuPause').style.display = 'none';
    changerMusique('Jeu');
});
// gere les slider de musique
document.getElementById('sliderMusique').addEventListener('input', function() {
    volumeMusique = this.value / 100;
    musiqueJeu.volume = volumeMusique;
    musiqueMenu.volume = volumeMusique;
    
    document.getElementById('labelMusique').textContent = this.value + '%';
});
document.getElementById('sliderSon').addEventListener('input', function() {
    volumeSoundEffect = this.value /100;
    document.getElementById('labelSon').textContent = this.value +'%'; 
});
//gere fermer lemenu tourelle
document.getElementById('btnFermer').addEventListener('click' ,() =>{
    tourelleFermerMenu();
});
//click la tourelle
document.addEventListener( 'click', function(e){ if (pTourelles.length < 1) return;
    for (let i = pTourelles.length - 1; i>=0 ; i--){
        const tempClient = {x: e.clientX, y:e.clientY};
        const dist =CalculateDistance(pTourelles[i],tempClient);
        if (dist< pTourelles[i].size +12)
            {
                tourelleOuvrirMenu(pTourelles[i]);
                return;
            }
    }
});

//click upgrade cadence portee et degat
document.getElementById('btnCadence').addEventListener('click' ,() =>{
        if(actualTourelle.niveauCadence < 15){
            const s = sonBoutton1.cloneNode();
            s.volume = volumeSoundEffect;
            s.play();
        }
        else{
            const s = sonError.cloneNode();
            s.volume = volumeSoundEffect;
            s.play();
        }
        if (pTourelleXP >= actualTourelle.coutCadence){
            pTourelleXP -=actualTourelle.coutCadence;
            actualTourelle.niveauCadence +=1;
            actualTourelle.shootRate = Math.max(12, actualTourelle.shootRate * 0.9);
            if (actualTourelle.niveauCadence< 15){
                actualTourelle.coutCadence = Math.floor(1.5 * actualTourelle.coutCadence);
            }
            else {
                actualTourelle.coutCadence ="MAX";   
            }
            tourelleOuvrirMenu(actualTourelle);
        }
});
document.getElementById('btnPortee').addEventListener('click' ,() =>{
    if(actualTourelle.niveauPortee < 9){
            const s = sonBoutton1.cloneNode();
            s.volume = volumeSoundEffect;
            s.play();
        }
        else{
            const s = sonError.cloneNode();
            s.volume = volumeSoundEffect;
            s.play();
        }
    if (pTourelleXP >= actualTourelle.coutPortee){
        pTourelleXP -=actualTourelle.coutPortee;
        actualTourelle.niveauPortee +=1;
        actualTourelle.porteeMax += 37 + (actualTourelle.niveauPortee *4);
        if(actualTourelle.niveauPortee < 9){
            actualTourelle.coutPortee = Math.floor(1.4 * actualTourelle.coutPortee);
        }
        else{
            actualTourelle.coutPortee = "MAX";
        }
        tourelleOuvrirMenu(actualTourelle);
    }
    
});
document.getElementById('btnDegats').addEventListener('click' ,() =>{
        if (pTourelleXP >= actualTourelle.coutDegats){
            const s = sonBoutton1.cloneNode();
            s.volume = volumeSoundEffect;
            s.play();
            pTourelleXP -=actualTourelle.coutDegats;
            actualTourelle.niveauDegats +=1;
            actualTourelle.degats +=2;
            actualTourelle.coutDegats = Math.floor(1.4 * actualTourelle.coutDegats);
            tourelleOuvrirMenu(actualTourelle);
        }
    
});

function changerMusique(nouvelle){
    musiqueMenu.pause();
    musiqueMenu.currentTime = 0;
    
    musiqueJeu.pause();
    musiqueJeu.currentTime = 0;
    
    if (nouvelle === 'Jeu'){
        lancerMusiqueJeu();
    }
    if ( nouvelle === 'Menu'){
        musiqueMenu.volume = volumeMusique;
        musiqueMenu.play();
    }
    
}

function xpRequis(niveau) {
    return Math.floor(100 * Math.pow(niveau, 1.2));
}
function RestartGame(){
    player.x = canvas.width /2;
    player.y = canvas.height / 2;
    player.angle = 0;
    player.hp = 8;
    player.hpMax = 8;
    player.gameOver = false;
    player.ballesSoliditee = 1;
    player.balleMultiplicateur = 1;
    player.ricochetLevel =0;
    player.grenade = 0;
    player.grenadeMax = 0;
    player.shootRate = 20;
    player.speed = 3;
    
    pRalentisseur.length = 0;
    pGrenades.length = 0;
    explosion.length = 0;
    pTourelles.length = 0;
    boss.length = 0;

    spawnBossFait = false;

    player.ralentiseur = 0;
    player.ralentiseurMax = 0;

    player.tourelle = 1;
    player.tourelleXp = 0;

    player.orbes = 0;
    player.invincibleCountdown = 0;
    player.xp = 0;
    player.bulletSize = 10;
    pBullets.length = 0;
    enemis.length = 0;
    player.niveau = 1;
    player.degats = 1;
    timer = 0;
    seconde = 0;
    minute = 0;
    niveauDiff = 1;
    
    
}

function DrawTexteMultiLigne(texte, x, y, largeurMax){
    const mots = texte.split(' ');
    let ligneCourante = '';
    let yActuel = y;
    
    for (let mot of mots){
        const ligneTest = ligneCourante + mot + ' ';
        if (ctx.measureText(ligneTest).width > largeurMax)
            {
                ctx.fillText(ligneCourante, x, yActuel);
                yActuel += 22;
                ligneCourante = mot +' ' ;
            }
        else ligneCourante = ligneTest;
            }
    ctx.fillText(ligneCourante,x,yActuel); //snn comme elle dépasse pas la last ligne n'est pas écrite
}
function CalculateColision(killer,killed, killerSize){
        for (let i = killer.length -1; i >=0; i--)
        {
            for (let j = killed.length - 1; j>=0; j--)
                {
                    if (!killer[i]) break;// verifie présence encore de la balle
                    const dx = killer[i].x - killed[j].x; // distance projectile ennemi
                    const dy = killer[i].y - killed[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    
                    if (dist < killerSize + killed[j].size) //killer size car dif entre taille objet et explosion parfois
                        {
                            let startHP = killed[j].hp;
                            if (killer[i].ToJ === 0) killed[j].hp -= player.degats; // perd vies car touché (grosse merde bahaha)
                            if (killer[i].ToJ === 1) killed[j].hp -= killer[i].degats; //perd vie par une tourelle
                            killer[i].soliditee-- ;
                            
                            if (killed[j].hp <= 0){
                                killed.splice(j,1); //meurt si 0 vies (LOSERRRR)
                                if (killer[i].ToJ ===0) player.xp +=10 + startHP * 10;
                                if (killer[i].ToJ === 1) pTourelleXP += 20 + startHP *20;
                                if (killer[i].deathTracker === 1) deathBoss1 = true
                                if (killer[i].deathTracker === 2) deathBoss2  = true
                            }
                            
                            if (killer[i] && killer[i].soliditee <= 0){ // vérifie que la balle existe encore
                                killer.splice(i, 1);
                                break;
                        }   
                    }
                }
        }
} //fonction pour le grenades balles orbes et blabla
function CalculateDistance(object1, object2){ //me permet de calculer la distance sans tout le temps le réecrire 
    const dx = object1.x - object2.x;
    const dy = object1.y - object2.y;
    const dist =Math.sqrt(dx * dx + dy * dy);
    return dist ;
} //utile

function tourelleOuvrirMenu(t){
    actualTourelle = t;
    gameState = "MenuTourelle";
    document.getElementById("menuTourelle").style.display = "block";
    document.getElementById("tourelleNiveau").textContent = "NIVEAU :" + " "+ Math.floor((t.niveauCadence + t.niveauDegats + t.niveauPortee) /3);
    document.getElementById("tourelleXP").textContent = "XP: " + " " + pTourelleXP;
    document.getElementById("bonusPortee").textContent = "+" + (37 + (actualTourelle.niveauPortee * 3)) + "m de portée max";
    document.getElementById("bonusCadence").textContent =" shoot rate -10%";
    document.getElementById("bonusDegats").textContent = "+2 hp de dégats en plus sur chaque tir";
    document.getElementById("btnCadence").textContent = actualTourelle.coutCadence + " XP";
    document.getElementById("btnPortee").textContent = actualTourelle.coutPortee + " XP";
    document.getElementById("btnDegats").textContent = actualTourelle.coutDegats + " XP";   
}
function tourelleFermerMenu(){
    actualTourelle = null;
    gameState = "Jeu";
    document.getElementById("menuTourelle").style.display = "none";
}

function Boss_second_Spawner(){
    if(!spawnBoss2Fait){
        spawnBoss2Fait = true;
        const hp = 100;
        const bossSize =  hp * 1;
        const x = canvas.width/ 2;
        const y = 0;
        deathBoss2 = false;
        boss.push({x, y, hp, size: bossSize, speed: 1, hpMax: hp, speedBase :1, invincibleCountdown: 5, diff:2, angle:0 , deathTracker: 1
        });
    }
}
function Update_second_Boss(){
    for(let b of boss){
        const offset = 200;
        const  offsetFuite = 75;
        const dx = player.x - b.x;
        const dy = player.y - b.y;
        const dist =Math.sqrt(dx * dx + dy * dy);// calcul pour normaliser la distance pas de sprint (merci claude)
            if(dist > player.size + b.size + offset ){
                b.y += (dy/dist) * b.speed;
                b.x += (dx/dist) * b.speed;
            }
            else if (countdownSecondBoss <= 0 & dist > player.size + b.size + offsetFuite ) {
                const bulletsAngle = Math.atan2(dy , dx);
                bBullets.push({size: secondBoss.bulletSize,
                soliditee: 1,
                x: b.x  , 
                y: b.y + b.size,
                degats:1, //car c une tourelle donc on se refere a ses upgrade a elle
                vx : Math.cos(bulletsAngle)*6,
                vy : Math.sin(bulletsAngle) * 6,
                rebonds : 0,ToJ:1});
                countdownSecondBoss = 45;
            }
            else{
                b.y -= (dy/dist) * b.speed;
                b.x -= (dx/dist) * b.speed;
            }
        MoveBullets(bBullets);
    }
    countdownSecondBoss--;
}


function Boss_first_Spawner(){
    if(!spawnBoss1Fait){
        spawnBoss1Fait = true;
        const hp = 50;
        const bossSize = 15 + hp * 1.6;
        const x = canvas.width/ 2;
        const y = 0;
        deathBoss1 = false;
        boss.push({x, y, hp, size: bossSize, speed: 1.2, hpMax: hp, speedBase :1.2, invincibleCountdown: 5, diff: 1, deathTracker: 1});
    }
    
}

function BossEnemisSpawner(){
    const spawnRate = Math.max(1500,3000);
    
    if (spawnBossCountdown > 0){
        spawnBossCountdown--;
        return;
    }
    
    spawnBossCountdown = spawnRate;
    
    const hp = Math.floor(Math.random() * niveauDiff) +1;
    const size = 15 + hp * 2;

    const bossHp = 100;
    const bossSize = 15 + bossHp * 2;
    
    
    let x , y;
    const bord = Math.floor(Math.random()* 4);
    if (bord === 0) { x = Math.random() * canvas.width; y = 0;}
    else if (bord === 1){x = Math.random() * canvas.width; y= canvas.height;}
    else if (bord ===2){x = 0; y = Math.random() * canvas.height;}
    else {x = canvas.width; y = Math.random() * canvas.height;}
    
    enemis.push({x, y, hp, size: size, speed: 1 + niveauDiff*0.05, hpMax: hp, speedBase :1 + niveauDiff * 0.05 , rImg : Math.random()}); //le deuxième speed c'est pour évoter que quand il rentre dans le ralentisseur il s'arrete petit à petit
    
}
function Update_first_Boss(){
    for(let b of boss)
        { 
            const dx = player.x - b.x;
            const dy = player.y - b.y;
            const dist =Math.sqrt(dx * dx + dy * dy);
                b.y += (dy/dist) * b.speed;
                b.x += (dx/dist) * b.speed;

            let powerRate = 300;
            
            if (b.invincibleCountdown > 0) b.invincibleCountdown--;
            if (powerCountdown >0)powerCountdown--;
            else{
                powerCountdown = powerRate;

                explosion.push({x:b.x , y:b.y, tailleMax:260, taille:b.size, timer: 0, duree: 40})
                const dist = CalculateDistance(b,player);
                if (dist < 240){
                    player.hp -=2;
                    if(player.hp <=0){
                    player.gameOver = true
                    sonMort.volume = volumeSoundEffect;
                    sonMort.play();
                }
                }
            }
        }
}
function EnemisSpawner(){
    const spawnRate = niveauDiff >= 8 ? 120 : Math.max(30, 120 - niveauDiff * 11);
    
    if (spawnCountdown > 0){
        spawnCountdown--;
        return;
    }
    
    spawnCountdown = spawnRate;
    
    const hp = Math.floor(Math.random() * niveauDiff) +2;
    const size = 15 + hp * 2;
    
    let x , y;
    const bord = Math.floor(Math.random()* 4);
    if (bord === 0) { x = Math.random() * canvas.width; y = 0;}
    else if (bord === 1){x = Math.random() * canvas.width; y= canvas.height;}
    else if (bord ===2){x = 0; y = Math.random() * canvas.height;}
    else {x = canvas.width; y = Math.random() * canvas.height;}
    
    enemis.push({x, y, hp, size: size, speed: 1 + niveauDiff*0.05, hpMax: hp, speedBase :1 + niveauDiff * 0.05 , rImg : Math.random(), countdown : 0}); //le deuxième speed c'est pour évoter que quand il rentre dans le ralentisseur il s'arrete petit à petit
}
function EnemisUpdate(){
    for(let e of enemis)
        {
            const dx = player.x - e.x;
            const dy = player.y - e.y;
            const dist = Math.sqrt(dx * dx + dy * dy); // calcul pour normaliser la distance pas de sprint (merci claude)
            e.y += (dy/dist) * e.speed;
            e.x += (dx/dist) * e.speed;

            if(e.countdown > 0){
                e.countdown--;
            }
        }
}

function UpdatePlayer(){
    const left = keys.ArrowLeft || keys.q;
    const right = keys.ArrowRight || keys.d;
    const up = keys.ArrowUp || keys.z;
    const down = keys.ArrowDown || keys.s;
    const shoot = keys[' '];
    //max tourne
    if (left) 
        player.angle -= player.rotSpeed;
    if (right) 
        player.angle += player.rotSpeed;
    
    //max avance ou recule hehe
    if (up){
        player.y -= Math.cos(player.angle) * player.speed;
        player.x += Math.sin(player.angle) * player.speed; }
    if (down){
         player.y += Math.cos(player.angle) * player.speed;
        player.x -= Math.sin(player.angle) * player.speed; }
    
    if (player.shootCountdown > 0) player.shootCountdown--;
    
    if (player.grenadeCountdown > 0)
    {
        player.grenadeCountdown--;
        if (player.grenadeCountdown === 0 && player.grenade < player.grenadeMax){
            player.grenade++; 
            if (player.grenade < player.grenadeMax)
                player.grenadeCountdown = player.grenadeRate;
        }
    }
    

    
    if (shoot && player.shootCountdown === 0){
        for ( let i = 0; i<player.balleMultiplicateur; i++ ){
            const bulletsAngle = player.angle + ( i -( player.balleMultiplicateur -1)/2) * 0.15;
            pBullets.push({x: player.x, y: player.y, vx: Math.sin(bulletsAngle)*5 , vy: -Math.cos(bulletsAngle)*5 , size: player.bulletSize, soliditee : player.ballesSoliditee, rebonds: player.ricochetLevel, ToJ:0,});
        }
        const s = sonTir.cloneNode();
        s.volume = volumeSoundEffect;
        s.play();
        player.shootCountdown = player.shootRate; // intervale de tir 
        
    } 
    MoveBullets(pBullets);
    
    //bound the player dans le canvas hee oui
    if (player.y > canvas.height) player.y = canvas.height;
    if (player.y < 0) player.y = 0;
    if (player.x > canvas.width) player.x = canvas.width;
    if (player.x < 0) player.x =    0;

}
function UpdateTourelle(){
    for (let t of pTourelles){
        
        let cible = null;
        let distMin = t.porteeMax;
        
        for( let e of enemis){
            const dist = CalculateDistance(t,e);
            if (dist < distMin){
                distMin = dist;
                cible = e;
            }
        }
        for( let b of boss){
            const dist = CalculateDistance(t,b);
            if (dist < distMin){
                distMin = dist;
                cible = b;
            }
        }
        if(cible){
            const dx = cible.x - t.x;
            const dy = cible.y - t.y;
            t.angle = Math.atan2(dy , dx);
            
            if (t.shootCountdown >0) {
                t.shootCountdown--;
            } else {
                pBullets.push({
                size: player.bulletSize,
                soliditee: 1,
                x: t.x , 
                y: t.y,
                degats:t.degats, //car c une tourelle donc on se refere a ses upgrade a elle
                vx : Math.cos(t.angle)*6,
                vy : Math.sin(t.angle) * 6,
                rebonds : 0,ToJ:1}); // ToJ c'est pour s'avoir si il s'agit d'un balle tourelle ou joueur car chacun on des degats séparé ou autre parmètres
                t.shootCountdown = t.shootRate;
            }
        }
        
    }
}

function MoveBullets(Bullets){
    for (let i = Bullets.length - 1; i >= 0; i--){
        Bullets[i].y += Bullets[i].vy;
        Bullets[i].x += Bullets[i].vx; 
        
        if (Bullets[i].rebonds > 0 && (Bullets[i].x >= canvas.width || Bullets[i].x <= 0)){
            Bullets[i].vx *= -1;
            Bullets[i].rebonds--;
        }
        if (Bullets[i].rebonds > 0 && (Bullets[i].y >= canvas.height || Bullets[i].y <= 0 )){
            Bullets[i].vy *= -1;
            Bullets[i].rebonds--;
        }
    }
}
function MoveGrenades(){
    for (let i = pGrenades.length - 1; i>= 0 ; i--){
        let g = pGrenades[i];
        g.y -= Math.cos(g.angle) * g.speed;
        g.x += Math.sin(g.angle) * g.speed; 
        g.speed *= 0.97;
        
        g.vz -=0.3; // le grav
        g.z += g.vz;
       
        if (g.z <= 0){
            g.z = 0;
            GrenadeExplode(i);
        }
    }
}

function GrenadeExplode(i){
    const s = sonGrenade.cloneNode();
    s.volume = volumeSoundEffect;
    s.play();
    const grenadeTemp = [pGrenades[i]];
    CalculateColision(grenadeTemp,enemis,effetZone); //effet zone car dif entre taille objet et explosion parfois
    CalculateColision(grenadeTemp,boss,effetZone);
    explosion.push({ //anim 
        x : pGrenades[i].x,
        y : pGrenades[i].y,
        taille : 70,
        tailleMax : grenadesMaxTaille,
        timer : 0,
        duree : 20,
    });
    pGrenades.splice(i,1);
}
function UpdateExplosion(){
    for (let i = explosion.length - 1; i>= 0; i--){
        explosion[i].timer++;  
        explosion[i].taille = (explosion[i].timer/ explosion[i].duree) * explosion[i].tailleMax; //taille qui augmente
        
        if (explosion[i].timer >= explosion[i].duree){
            explosion.splice(i,1); //fin anim
        }
    }
}

function collisionRalentiseur(){
    if (pRalentisseur.length === 0) return; // on evite les crash avec ça askip c si jamais yen a pas on fait r
    for (let i = pRalentisseur.length -1; i>= 0; i--){
        for (let j = enemis.length-1; j>= 0; j--){
            const dist = CalculateDistance(pRalentisseur[i],enemis[j]);
            if (dist < enemis[j].size + pRalentisseur[i].size){
                enemis[j].speed = enemis[j].speedBase * pRalentisseur[i].force;
            }
            else enemis[j].speed = enemis[j].speedBase;
        }
        for (let k = boss.length-1; k>= 0; k--){
            const dist = CalculateDistance(pRalentisseur[i],boss[k]);
            if (dist < boss[k].size + pRalentisseur[i].size){
                boss[k].speed = boss[k].speedBase * pRalentisseur[i].force;
            }
            else boss[k].speed = boss[k].speedBase;
        }
    }

    
}
function CollisionBullet(){
    CalculateColision(pBullets,enemis,player.bulletSize); //pBullets.size ne marche pas car c un tableau dcp 10 car dif entre taille objet et explosion parfois
    CalculateColision(pBullets,boss,player.bulletSize);
    const tempList = [player]
    CalculateColision(bBullets,tempList,secondBoss.bulletSize);
}
function CollisionEnemis(){
    if(player.invincibleCountdown > 0){
        player.invincibleCountdown--; 
        return;
    }
    
    for (let i = enemis.length -1; i >= 0; i--)
        {
            const dist = CalculateDistance(player,enemis[i]);
            console.log(dist);
            if (dist < enemis[i].size + (player.size ) && player.invincibleCountdown <= 0){ 
                player.hp--;
                player.invincibleCountdown = 50;
                if (player.hp <= 0){
                    player.gameOver = true;
                    sonMort.volume = volumeSoundEffect;
                    sonMort.play();
                }
            
            } 
            
        }
}
function Collision_first_Boss(){
    if(player.invincibleCountdown > 0){
        player.invincibleCountdown--; 
        return;
        }
    
    for (let i = boss.length -1; i >= 0; i--)
        {
            const dist = CalculateDistance(player, boss[i]);
            if (dist < boss[i].size + (player.size ) && player.invincibleCountdown <= 0){ 
                player.hp--;
                player.invincibleCountdown = 50;
                if (player.hp <= 0){
                    player.gameOver = true;
                    sonMort.volume = volumeSoundEffect;
                    sonMort.play();
                }
            
            } 
            
        }
}
function DrawHPBar(e){
    const hpBarSize = e.hp / e.hpMax * (e.size *2);
            ctx.beginPath();
            ctx.fillStyle = 'grey';
            ctx.fillRect(e.x - e.size, e.y - (e.size +20) , e.size * 2 , e.size * 0.5);
            ctx.fillStyle = 'green';
            ctx.fillRect(e.x - e.size, e.y - (e.size + 20), hpBarSize, e.size * 0.5);
}
//dessine max 
function DrawPlayer(){ 
    ctx.save();
    ctx.translate(player.x, player.y);
    ctx.rotate(player.angle);
    
    ctx.fillStyle = "red";
    ctx.beginPath();
    
   
    ctx.drawImage(imgPlayer, - player.size, - player.size, player.size * 2, player.size * 2);
    ctx.restore();
    
    DrawHPBar(player);
    
    for (let pB of pBullets){
        ctx.beginPath();
        ctx.arc( pB.x, pB.y , pB.size, 0,Math.PI *2 );
        ctx.fillStyle = "orange";
        ctx.fill();
        
    } 
    
}

function DrawGrenade(){
    for (let g of pGrenades)
        {
            const tailleVisu = g.size + g.z * 0.3;
            ctx.beginPath();
            ctx.arc(g.x, g.y,tailleVisu , 0, Math.PI* 2);
            ctx.fillStyle = "coral";
            ctx.fill();
        }
}
function DrawExplosion(){
    for (let e of explosion){
        const progress = e.timer / e.duree; // donc compris entre 0 et 1
        const alpha = 1 - progress; // pour l'opacité
        
        ctx.beginPath();
        ctx.arc(e.x, e.y , e.taille, 0 ,Math.PI * 2); //taille signifie le rayon
        ctx.fillStyle = `rgba(255, 120, 0, ${alpha})`;
        ctx.fill();
        
        ctx.beginPath();
        ctx.arc(e.x, e.y, e.taille * 0.5, 0, Math.PI *2); //taille = rayon ceci et les cercle du centre de l'explosion donc tu la réduit (memo pour yaya)
        ctx.fillStyle = `rgba(255, 255, 100, ${alpha})`;
        ctx.fill();
        
        
    }
}
function DrawRalentiseur(){
    if (pRalentisseur.length > 0){
        for (let i = pRalentisseur.length - 1; i>= 0; i--)
            {
                ctx.beginPath();
                ctx.fillStyle = 'cadetblue';
                ctx.arc(pRalentisseur[i].x, pRalentisseur[i].y, pRalentisseur[i].size, 0, Math.PI * 2);
                ctx.fill();
            }
    }
}
function Orbes(){
    for ( let i = 0 ; i < player.orbes ; i ++){
        const angle = orbesAngle + (i * Math.PI*2/ player.orbes);
        const rayon = 10;
        const x = player.x + Math.cos(angle) * (rayon * 10);
        const y = player.y + Math.sin(angle) * (rayon * 10);
        //dessin pas besoin de 2 function pour elles 
        ctx.beginPath();
        ctx.fillStyle = "darkorchid";
        ctx.arc(x,y,rayon,0,Math.PI*2);
        ctx.fill();
        
        for (let j = enemis.length - 1; j>= 0; j--){
            const orbesTemp = {x:x , y:y};
            const dist = CalculateDistance(orbesTemp,enemis[j]);
            if (dist < rayon + enemis[j].size){
                let startHp = enemis[j].hp;
                if( enemis[j].countdown <= 0){
                    enemis[j].hp -= player.degats;
                    enemis[j].countdown = 50;
                }
                if (enemis[j].hp <= 0){
                    enemis.splice(j,1);
                    player.xp += 8 + startHp * 6;
                    
                }
            }
            
        }
        for (let k = boss.length - 1; k>= 0; k--){
            const orbesTemp = {x:x , y:y};
            const dist = CalculateDistance(orbesTemp,boss[k]);
            if (dist < rayon + boss[k].size && boss[k].invincibleCountdown <= 0){
                let startHp = boss[k].hp;
                boss[k].hp -= player.degats ;
                boss[k].invincibleCountdown = 50;
                if (boss[k].hp <= 0){
                    player.xp += 8 + startHp * 9;
                    boss.splice(k,1);
                }
            }
            
        }

    }
}

function DrawEnemis(){
    for (let e of enemis)
        {
            ctx.shadowColor = "lime";
            ctx.shadowBlur = 20;
            
            ctx.beginPath();
            ctx.arc(e.x, e.y, e.size, 0,Math.PI*2);
            ctx.fillStyle = 'aqua';
            ctx.fill();
            
            ctx.shadowBlur = 0;
            if (e.rImg < 0.45) ctx.drawImage(imgZoom , e.x -e.size , e.y -e.size, e.size*2 , e.size*2);
            else ctx.drawImage(imgBig , e.x -e.size , e.y -e.size, e.size*2 , e.size*2);
            
            DrawHPBar(e);
        }
}
function DrawBoss(){
    for (let b of boss){
        if (b.diff ===1){
        ctx.shadowColor = "crimson";
        ctx.shadowBlur = 40;
        ctx.beginPath();
        ctx.fillStyle = "red"
        ctx.arc(b.x,b.y,b.size,0,Math.PI*2);
        ctx.fill();
        ctx.drawImage(imgBoss, b.x -b.size +10 ,b.y -b.size +10 , b.size*1.8,b.size*1.8);

        DrawHPBar(b);
        }
    }
    for (let b of boss){
        if (b.diff ===2){
            

        ctx.save();
        ctx.translate(b.x,b.y);
        ctx.rotate(b.angle);

        ctx.shadowColor = "green";
        ctx.shadowBlur = 40;
        ctx.beginPath();

        ctx.fillStyle = "darkgreen";
        ctx.arc(0,0,b.size,0,Math.PI*2);
        ctx.fill();
        ctx.drawImage(imgBoss2, -b.size + 20, -b.size, b.size*1.6, b.size*1.6);

        ctx.restore(); // on annule la translation/rotation

        DrawHPBar(b); // utilise coordonnées b.x/b.y 

        for (let pB of bBullets){
            ctx.beginPath();
            ctx.arc( pB.x, pB.y , pB.size, 0,Math.PI *2 );
            ctx.fillStyle = "red";
            ctx.fill();
        } 
        
        } 
    }
}


function DrawTourelle(){
    for (let t of pTourelles){
        ctx.beginPath();
        ctx.arc(t.x,t.y,t.porteeMax,0,Math.PI*2);
        ctx.strokeStyle = 'rgba(255, 255, 0, 0.26)';
        ctx.stroke();
        
        ctx.save();
        ctx.translate(t.x,t.y);
        ctx.rotate(t.angle);
        
        ctx.beginPath();
        ctx.arc(0,0,t.size,0,Math.PI*2);
        ctx.fillStyle = "gold";
        ctx.fill();
        
        ctx.beginPath();
        ctx.moveTo(t.size +12 , 0);
        ctx.lineTo(-t.size, - t.size);
        ctx.lineTo(-t.size, t.size);
        ctx.closePath();
        ctx.fillStyle = 'darkgoldenrod';
        ctx.fill();
        
        ctx.restore();
    }
}
function DrawTourellePreview(){
        ctxPreview.beginPath();
        ctxPreview.arc(50,50,40,0,Math.PI*2);
        ctxPreview.strokeStyle = 'rgba(255, 255, 0, 0.26)';
        ctxPreview.stroke();
        
        ctxPreview.save();
        ctxPreview.translate(50,50);
        ctxPreview.rotate(anglePreview);
        
        ctxPreview.beginPath();
        ctxPreview.arc(0,0,20,0,Math.PI*2);
        ctxPreview.fillStyle = "gold";
        ctxPreview.fill();
        
        ctxPreview.beginPath();
        ctxPreview.moveTo(20 +12 , 0);
        ctxPreview.lineTo(-20, - 20);
        ctxPreview.lineTo(-20, 20);
        ctxPreview.closePath();
        ctxPreview.fillStyle = 'darkgoldenrod';
        ctxPreview.fill();
        
        ctxPreview.restore();
    anglePreview +=0.02;
}

function DrawGameOver(){
    ctx.drawImage(imgLoose, 0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgba(255, 0, 0, 0.4)";
    ctx.fillRect(0,0,canvas.width, canvas.height);
    
    ctx.fillStyle = 'orange';
    ctx.font = "60px '04b'";
    ctx.textAlign = "center";
    ctx.fillText("GAME OVER(looser behhh)", canvas.width/2 , canvas.height / 2);
    
    ctx.font = "20px '04b'";
    ctx.fillText("Appuie sur R pour rejouer(nulos! <3)", canvas.width/2 , canvas.height / 2 + 60);
}
function DrawPowerUp(){
    if (player.grenadeMax >0){
        ctx.beginPath();
        ctx.fillStyle = 'coral';
        ctx.arc(canvas.width - 230, 40,30,0,Math.PI*2);
        ctx.fill();
        ctx.drawImage(imgGrenade, canvas.width -257,10,55,40);
        ctx.font = "20px '04b'";
        ctx.fillStyle = "black";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(player.grenade,canvas.width-230,45);
        
    }
    if (player.ralentiseurMax >0){
        ctx.beginPath();
        ctx.fillStyle = 'cadetblue';
        ctx.arc(canvas.width - 165, 40,30,0,Math.PI*2);
        ctx.fill();
        ctx.drawImage(imgSlower, canvas.width -198,10,55,35);
        ctx.font = "20px '04b'";
        ctx.fillStyle = "black";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(player.ralentiseur,canvas.width- 165 ,45);
        
    }
    if (player.tourelle > 0){
        ctx.beginPath();
        ctx.fillStyle ="gold";
        ctx.arc(canvas.width - 80 ,40,30,0,Math.PI*2);
        ctx.fill();
        ctx.drawImage(imgTourelle, canvas.width-97,10,35,35);
        ctx.font = "20px '04b'";
        ctx.fillStyle = "black"
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(player.tourelle,canvas.width -80, 45);
    }
}
function DrawHUD(){
    ctx.shadowColor = "pink";
    ctx.font = "40px '04b'";
    ctx.fillStyle = "violet";
    ctx.textAlign = "center";
    ctx.fillText("MAXIME LE SURVIVANT", canvas.width / 2, 50);
    
    
    ctx.font = "20px '04b'";
    ctx.fillStyle = "violet";
    ctx.textAlign = "left";
    ctx.shadowBlur = 0; // reset le glow des ennemis
    
    // vies
    ctx.fillText("HP : " + player.hp, 20, 30);
    
    // temps
    const min = String(minute).padStart(2, '0');
    const sec = String(seconde).padStart(2, '0');
    ctx.fillText("Temps : " + min + ":" + sec, 20, 60);
    
    // niveau
    ctx.fillText("Niveau : " + niveauDiff, 20, 90);
    
    const xpBarSize = (player.xp / xpRequis(player.niveau)) * canvas.width ;
    ctx.beginPath();
    ctx.fillStyle = 'grey';
    ctx.fillRect(0, canvas.height- 20, canvas.width, 20);
    ctx.fillStyle = 'aqua';
    ctx.fillRect(0, canvas.height - 20, xpBarSize, 20);
}
    
function LevelUp(){
    player.xp -= xpRequis(player.niveau);
    player.niveau++;
    upgradeEnCours = true;
    casinoAnimation.isAnimating = true;
    casinoAnimation.rotateSpeed = 5;
    casinoAnimation.selection = TirerUpgrade();
    
    sonCasino.volume = volumeSoundEffect;
    sonCasino.currentTime = 0;
    sonCasino.play();
    
}
    
function CasinoUpdate(){
    casinoAnimation.rotateSpeed += 0.2;
    casinoAnimation.ActualUpgradeFrameCount++;
    if (casinoAnimation.ActualUpgradeFrameCount >= casinoAnimation.rotateSpeed)
        {
            casinoAnimation.ActualUpgradeFrameCount = 0;
            casinoAnimation.actualUpgrade = (casinoAnimation.actualUpgrade + 1) % poolUpgrade.length;
        }
    if (casinoAnimation.rotateSpeed >= 40){
        casinoAnimation.isAnimating = false;
    }
    
}
function CasinoDraw(){
    if (casinoAnimation.isAnimating){
            const x = canvas.width / 2 ;
            const y = canvas.height / 2;
            const upgrade = poolUpgrade[casinoAnimation.actualUpgrade]; //au moins c'est moin long apr
            DrawCarte(upgrade,x ,y);
            
    }
    else {
        for (let i = 0 ; i < 3; i++)
        {
            const x = canvas.width / 3 * i + canvas.width / 6;
            const y = canvas.height / 2;
            const upgrade = casinoAnimation.selection[i]; //au moins c'est moin long apr
            DrawCarte(upgrade , x , y);
            
        }
    }
}
function DrawCarte(upgrade,x ,y){
    ctx.shadowBlur = 0;
    ctx.shadowColor = "transparent";
    let color;
    const carteH = canvas.height * 0.7;
    const carteW = canvas.width / 6;
    if (upgrade.rarete === "commun")
            {
                color = "yellowgreen";
            }
            else if (upgrade.rarete === "rare")
            {
                color = "skyblue";
            }
            else if (upgrade.rarete === "epique")
            {
                color = "purple";
            }
            else color = "coral";
            ctx.fillStyle = color;
            
            ctx.fillRect(x - carteW/2,y - carteH/2, carteW, carteH);
            ctx.drawImage(upgrade.icone,x - carteW/2 +10,y - carteH/2 +10,carteW -20, carteH*0.5);
            ctx.font= "20px  '04b'";
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            DrawTexteMultiLigne(upgrade.nom, x, y - carteH/2 + 10  + carteH*0.5 + 30,carteW - 20); //je détaille pour men souvenir
            
            ctx.font ="14px 'Desp'";
            ctx.fillStyle = "black";
            DrawTexteMultiLigne("détails : " + upgrade.description, x, y - carteH/2 + 10 + carteH*0.5 + 70, carteW - 20); // tjr plus long hehe
}
document.addEventListener( 'click', function(e){ if( !upgradeEnCours || casinoAnimation.isAnimating) return; // que si les cartes sont là
    const carteW = canvas.width/ 6;
    const carteH = canvas.height / 2;
                                                
    for (let i = 0 ; i< 3 ;i++){
        const x = canvas.width / 3 * i + canvas.width/ 6;
        const y = canvas.height /2;
                                                    
        if (e.clientX > x - carteW/2 && 
            e.clientX < x + carteW/2 && 
            e.clientY > y - carteH/2 &&  
            e.clientY < y + carteH/2)
        {
            casinoAnimation.selection[i].effet();
            upgradeEnCours = false;
            ResetCasino();    
        }
    }
});
function ResetCasino(){
    casinoAnimation.rotateSpeed = 3;
    casinoAnimation.actualUpgrade = 0;
    casinoAnimation.ActualUpgradeFrameCount = 0;
    casinoAnimation.selection = [];
}
    
function TirerUpgrade(){
    function TirerRarete() {
        const roll = Math.random() * 100;
        if (roll < 39) return "commun";
        if (roll < 74) return "rare";
        if (roll< 90) return "epique";
        return "legendaire";
    }
    
    const selection = [];
    for (let i = 0; i < 3; i++){
        const rarete = TirerRarete();
        const disponible = poolUpgrade.filter(u => u.rarete === rarete);
        
        if ( disponible.length ===0){
            const fallBack = poolUpgrade.filter(u => u.rarete === "commun");
            selection.push(fallBack[ Math.floor(Math.random() * fallBack.lenght)]);
        }
        else {
            selection.push(disponible[Math.floor(Math.random() * disponible.length)]);
        }
    }
    return selection;
}

function GameLoop(){
    ctx.clearRect(0,0,canvas.width, canvas.height);
    
    if (gameState === "Menu"){
        
        ctx.drawImage(imgMenu, 0, 0, canvas.width, canvas.height);
        requestAnimationFrame(GameLoop);
        return;
    }
    if (gameState ==="MenuTourelle"){
        ctxPreview.clearRect(0, 0, 100, 100);
        DrawTourellePreview();
        requestAnimationFrame(GameLoop);
        return;
    }
    
    if (player.gameOver){
        DrawGameOver();
        requestAnimationFrame(GameLoop);
        return;
    }
    if (upgradeEnCours){
        
        CasinoUpdate();
        CasinoDraw();
        requestAnimationFrame(GameLoop);
        return;
    }
    if (niveauDiff === 4 || !deathBoss1) {
        // code boss uniquement ici
        Collision_first_Boss();
        BossEnemisSpawner();
        Boss_first_Spawner();
        Update_first_Boss();
        DrawBoss();
    }
    if (niveauDiff === 8 || !deathBoss2){
        
            Collision_first_Boss();
            BossEnemisSpawner();
            Boss_second_Spawner();
            Update_second_Boss();
            DrawBoss();
    }
    
    UpdatePlayer();
    
    MoveGrenades();
    
    UpdateExplosion();
    
    UpdateTourelle();
    
    CollisionEnemis();
    CollisionBullet();
    collisionRalentiseur();
    
    EnemisSpawner();
    EnemisUpdate();
    
    
    DrawRalentiseur(); // ici l'ordre est super important pour les superpotion des élément genre pas que le ralentiseur recouvre les enemis
    DrawExplosion();
    DrawTourelle();
    Orbes();
    DrawPlayer();
    DrawEnemis();
        
    
    DrawGrenade();
        
    //orbes
    orbesAngle += 0.015;
    if (player.xp >= xpRequis(player.niveau)) {
    LevelUp();
    }
    
        timer++;
        if (timer === 50){ //50 car ça tourne 50 fois par seconde ehheeheheheh merci claude de m'avoir expliqué <3
            seconde++;
            timer = 0;
            player.xp += 10;
        }
        if (seconde === 60){
            minute++;
            niveauDiff++;
            seconde = 0;
            player.xp += 75;
        }
        if (timer === 0 && minute === 0 && seconde === 20){
            niveauDiff++;
        }
    
        DrawHUD();
        DrawPowerUp();
        requestAnimationFrame(GameLoop);// update 
    
}