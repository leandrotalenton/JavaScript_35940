// mejoras economicas (afectan a la recoleccion estimada de recursos por segundo), se reemplaza esta porcion por el contenido del file .json

class EcoUpgrade {
    constructor(id, resource, name, rate){
        this.id = id;
        this.resource = resource;
        this.name = name;
        this.rate = rate;
        this.img = `./Resources/${resource}${id}.webp`;
    }
}
const allEcoUpgrades = [
    new EcoUpgrade (0,`food`,`None`,0.3383),
    new EcoUpgrade (1,`food`,`Heavy Plow`,0.35),
    new EcoUpgrade (2,`food`,`Wheel Barrow`,0.39),
    new EcoUpgrade (3,`food`,`Hand Cart`,0.40),
    new EcoUpgrade (0,`wood`,`None`,0.41),
    new EcoUpgrade (1,`wood`,`Double Bit Axe`,0.49),
    new EcoUpgrade (2,`wood`,`Bow Saw`,0.59),
    new EcoUpgrade (3,`wood`,`Two Man Saw`,0.65),
    new EcoUpgrade (0,`gold`,`None`,0.38),
    new EcoUpgrade (1,`gold`,`Gold Mining`,0.44),
    new EcoUpgrade (2,`gold`,`Gold Shaft Mining`,0.50),
    new EcoUpgrade (0,`stone`,`None`,0.36),
    new EcoUpgrade (1,`stone`,`Stone Mining`,0.41),
    new EcoUpgrade (2,`stone`,`Stone Shaft Mining`,0.48),
];


/* const funcionAllEcoUpgrades = ()=>{
    fetch(`./JavaScript/all_eco_upgrades.json`)
    .then((respuesta)=>{
        //console.log(respuesta) // response basic, status 200... etc
        return respuesta.json();
    })
    .then((datos)=>{
        //console.log(datos) // contenido de mi file JSON
        allEcoUpgrades = datos */


// collection rates actuales:
const collectionRates = {
    food: 0.3383,
    wood: 0.41,
    gold: 0.38,
    stone: 0.36
}

// console.log(collectionRates[`food`])

let ecoUpgrades = [ // [recurso, mejora maxima, mejora actual]
    [`wood`,allEcoUpgrades.filter(I => I.resource === `wood`).length-1 /*3*/ ,0],
    [`food`,allEcoUpgrades.filter(I => I.resource === `food`).length-1 /*3*/ ,0],
    [`gold`,allEcoUpgrades.filter(I => I.resource === `gold`).length-1 /*2*/ ,0],
    [`stone`,allEcoUpgrades.filter(I => I.resource === `stone`).length-1 /*2*/ ,0]
]; 

for(let r of ecoUpgrades){
    const divRecurso = document.createElement(`div`);
    divRecurso.classList.add(`divRecurso-${r[0]}`, `divRecurso`);

    const imgRecursoImg = document.createElement(`img`);
    imgRecursoImg.ondragstart = function() { return false; };
    imgRecursoImg.classList.add(`divRecurso-${r[0]}-img`, `divRecurso-img`);
    imgRecursoImg.setAttribute(`src`,`./Resources/${r[0]}0.webp`)
    
    const divRecursoMejoras = document.createElement(`div`);
    divRecursoMejoras.classList.add(`divRecurso-${r[0]}-mejoras`, `divRecurso-mejoras`);

    divRecurso.appendChild(imgRecursoImg);
    divRecurso.appendChild(divRecursoMejoras);
    document.querySelector(`.ecoUpgrades`).appendChild(divRecurso);

    for(let i=0; i<r[1]; i+=1){
        const divMejora = document.createElement(`div`);
        divMejora.classList.add(`divMejora-${r[0]}`, `divMejora`);
        divMejora.setAttribute(`value`,i+1)

        document.querySelector(`.divRecurso-${r[0]}-mejoras`).appendChild(divMejora);
    }

    document.querySelector(`.divRecurso-${r[0]}`).addEventListener(`click`,()=>{
        let indiceBuscado = ecoUpgrades.indexOf(ecoUpgrades.find(i => i[0] == r[0])); //indice de la mejora estoy haciendo en esta iteracion
        (ecoUpgrades[indiceBuscado][2] == ecoUpgrades[indiceBuscado][1]) && (ecoUpgrades[indiceBuscado][2] = -1);
        ecoUpgrades[indiceBuscado][2] = ecoUpgrades[indiceBuscado][2] + 1;
        
        for(let div of document.querySelectorAll(`.divMejora-${r[0]}`)){
            if(ecoUpgrades[indiceBuscado][2] >=div.getAttribute(`value`) ){
                div.classList.add(`divMejoraActiva`);
            } else div.classList.remove(`divMejoraActiva`);
        };

        collectionRates[ecoUpgrades[indiceBuscado][0]]=allEcoUpgrades.filter(I => I.resource === ecoUpgrades[indiceBuscado][0])[ecoUpgrades[indiceBuscado][2]].rate; // cambia el valor del recurso correspondiente en el array "collectionRates" por el de la mejora activa
    
        document.querySelector(`.divRecurso-${r[0]}-img`).setAttribute(`src`,`./Resources/${r[0]}${ecoUpgrades[indiceBuscado][2]}.webp`)
        // console.log(collectionRates)
        newProductionPortfolio()
    })
};

// constructor de unidades (DATO)
class Unit {
    constructor(name, timeCost, foodCost, woodCost, goldCost, stoneCost, building){
        this.name = name;
        this.timeCost = timeCost;
        this.foodCost = foodCost;
        this.woodCost = woodCost;
        this.goldCost = goldCost;
        this.stoneCost = stoneCost;
        this.building = building;
        this.image = `./Resources/${name}.webp`;
        this.quantity = 0
    }
}

let unitsList = [
    archer = new Unit (`archer`,35,0,25,45,0,`archeryRange`),
    skirmisher = new Unit (`skirmisher`,22,25,35,0,0,`archeryRange`),
    batteringRam = new Unit (`batteringRam`,36,0,160,75,0,`siegeWorkshop`),
    bombardCannon = new Unit (`bombardCannon`,57,0,225,225,0,`siegeWorkshop`),
    camel = new Unit (`camel`,22,55,0,60,0,`stable`),
    cavalryArcher = new Unit (`cavalryArcher`,34,0,40,70,0,`archeryRange`),
    militia = new Unit (`militia`,22,60,0,20,0,`barracks`),
    eagleWarrior = new Unit (`eagleWarrior`,35,25,0,50,0,`barracks`),
    handCannoneer = new Unit (`handCannoneer`,34,45,0,50,0,`archeryRange`),
    knight = new Unit (`knight`,30,60,0,75,0,`stable`),
    scoutCavalry = new Unit (`scoutCavalry`,30,80,0,0,0,`stable`),
    mangonel = new Unit (`mangonel`,46,0,160,135,0,`siegeWorkshop`),
    monk = new Unit (`monk`,51,0,0,100,0,`monastery`),
    scorpion = new Unit (`scorpion`,30,0,75,75,0,`siegeWorkshop`),
    spearman = new Unit (`spearman`,22,35,25,0,0,`barracks`),
    trebuchet = new Unit (`trebuchet`,50,0,200,200,0,`castle`),
    petard = new Unit (`petard`,25,65,0,20,0,`castle`),
    villager = new Unit (`villager`,25,50,0,0,0,`townCenter`),
    berserk = new Unit (`berserk`,16,65,0,25,0,`castle`),
    cataphract = new Unit (`cataphract`,20,60,0,75,0,`castle`),
    chuKoNu = new Unit (`chuKoNu`,19,0,40,35,0,`castle`),
    conquistador = new Unit (`conquistador`,24,60,0,70,0,`castle`),
    huskarl = new Unit (`huskarl`,13,80,0,40,0,`castle`),
    jaguarWarrior = new Unit (`jaguarWarrior`,17,60,0,30,0,`castle`),
    janissary = new Unit (`janissary`,17,60,0,55,0,`castle`),
    longbowman = new Unit (`longbowman`,19,0,35,40,0,`castle`),
    mameluke = new Unit (`mameluke`,23,55,0,85,0,`castle`),
    mangudai = new Unit (`mangudai`,26,0,55,65,0,`castle`),
    missionary = new Unit (`missionary`,51,0,0,100,0,`castle`),
    plumedArcher = new Unit (`plumedArcher`,16,0,46,46,0,`castle`),
    samurai = new Unit (`samurai`,9,60,0,30,0,`castle`),
    tarkan = new Unit (`tarkan`,14,60,0,60,0,`castle`),
    throwingAxeman = new Unit (`throwingAxeman`,17,55,0,25,0,`castle`),
    teutonicKnight = new Unit (`teutonicKnight`,12,85,0,40,0,`castle`),
    warElephant = new Unit (`warElephant`,31,200,0,75,0,`castle`),
    warWagon = new Unit (`warWagon`,25,0,120,60,0,`castle`),
    elephant = new Unit (`elephant`,24,120,0,70,0,`stable`),
    malayElephnat = new Unit (`malayElephnat`,24,84,0,49,0,`stable`),
    woadRaider = new Unit (`woadRaider`,10,65,0,25,0,`castle`),
    siegeTower = new Unit (`siegeTower`,36,0,200,160,0,`siegeWorkshop`),
    steppeLancer = new Unit (`steppeLancer`,24,70,0,40,0,`stable`),
    castle = new Unit (`castle`,100,0,0,0,650,`townCenter`),
    guardTower = new Unit (`guardTower`,40,0,50,0,125,`townCenter`),
];

// objeto para almacenar requisitos de recursos por segundo
let resourcesRquiredPerSecond = {
    food: 0,
    wood: 0,
    gold: 0,
    stone: 0,
    calculateResourcesRquiredPerSecond: function(){
        resourcesRquiredPerSecond.food = 0;
        resourcesRquiredPerSecond.wood = 0;
        resourcesRquiredPerSecond.gold = 0;
        resourcesRquiredPerSecond.stone = 0;
        for(const unit of unitsList){
            resourcesRquiredPerSecond.food += unit.quantity*(unit.foodCost / unit.timeCost);
            resourcesRquiredPerSecond.wood += unit.quantity*(unit.woodCost / unit.timeCost);
            resourcesRquiredPerSecond.gold += unit.quantity*(unit.goldCost / unit.timeCost);
            resourcesRquiredPerSecond.stone += unit.quantity*(unit.stoneCost / unit.timeCost);
        }
    }
}

// declaro variables que voy a utilizar en la funcion
let villagerDistribution = {
    food: 0,
    wood: 0,
    gold: 0,
    stone: 0,
    calularCantidadDeAldeanos: function() {
        villagerDistribution.food = Math.ceil(resourcesRquiredPerSecond.food / collectionRates.food);
        villagerDistribution.wood = Math.ceil(resourcesRquiredPerSecond.wood  / collectionRates.wood);
        villagerDistribution.gold = Math.ceil(resourcesRquiredPerSecond.gold  / collectionRates.gold);
        villagerDistribution.stone = Math.ceil(resourcesRquiredPerSecond.stone  / collectionRates.stone);
    },
    mostrarCantidadDeAldeanos: function() {
        document.querySelector(`.recursos__food--text`).innerHTML = (`${villagerDistribution.food}`);
        document.querySelector(`.recursos__wood--text`).innerHTML = (`${villagerDistribution.wood}`);
        document.querySelector(`.recursos__gold--text`).innerHTML = (`${villagerDistribution.gold}`);
        document.querySelector(`.recursos__stone--text`).innerHTML = (`${villagerDistribution.stone}`);
        document.querySelector(`.recursos__totales--text`).innerHTML = (`${villagerDistribution.food+villagerDistribution.wood+villagerDistribution.gold+villagerDistribution.stone}`);
    }
}

//funcion que actualiza el calculo de aldeanos y lo refleja en el HTML
newProductionPortfolio = function(){
    for(unit of unitsList){
        try{
        let Q = document.querySelector(`.unidades__${unit.name}-q`);
        (Q.value === "" || parseInt(Q.value) < 0) && (Q.value = 0); //arregla campos vacios o con Q <0
        parseInt(Q.value) != 0 //por defecto las imagenes estan oscuras, si Q es >0, se iluminan
            ?document.querySelector(`.unidades__${unit.name}-imagen`).classList.add(`activeImg`)
            :document.querySelector(`.unidades__${unit.name}-imagen`).classList.remove(`activeImg`);
        unit.quantity = parseInt(Q.value);
        } catch {continue};
    }
    resourcesRquiredPerSecond.calculateResourcesRquiredPerSecond();
    villagerDistribution.calularCantidadDeAldeanos();
    villagerDistribution.mostrarCantidadDeAldeanos();
    newProductionQueue()
}

let displayBuildings = {
    townCenter: true,
    barracks: true,
    archeryRange: true,
    siegeWorkshop: true,
    stable: true,
    monastery: true,
    castle: true,
};

for(let bu in displayBuildings){
    const buildingImg = document.createElement(`img`);
    buildingImg.classList.add(`building__${bu}`,`building__img` ,`sidebar-menu__item` ,`building__img-active` );
    buildingImg.src = `./Resources/${bu}.webp`;
    buildingImg.ondragstart = function() { return false; };
    buildingImg.value = bu;
    buildingImg.addEventListener(`click`,function(){
        buildingImg.classList.toggle(`building__img-active`);
        displayBuildings[buildingImg.value] === true
        ? displayBuildings[buildingImg.value] = false
        : displayBuildings[buildingImg.value] = true;
    })
    buildingImg.addEventListener(`click`,displayUnits)
    document.querySelector(`.sidebar-menu`).appendChild(buildingImg)
}

// creacion del HTML con sus eventos
function displayUnits(){
    document.querySelector(`.unidades`).innerHTML = "";
    for(let bu in displayBuildings){
        if(displayBuildings[bu]){
            let buildingUnits = unitsList.filter((unit)=>unit.building === bu);
            for(const unit of buildingUnits){
                const unitDiv = document.createElement(`div`); // crea un div por unidad
                unitDiv.classList.add(`unidades__${unit.name}`, `unidades__div`);
                
                const unitAmount = document.createElement(`input`); // crea un input por unidad
                unitAmount.type = `number`
                unitAmount.placeholder = `Insert amount`
                unitAmount.classList.add(`unidades__${unit.name}-q`)
                unitAmount.value = unit.quantity
                unitAmount.addEventListener("change", ()=> {
                    newProductionPortfolio()
                    guardar()
                }) // si cambio el valor, se ejecuta un newProductionPortfolio
                
                const unitImg = document.createElement(`img`); // crea un img por unidad
                unitImg.classList.add(`unidades__${unit.name}-imagen`, `unidades__div-imagen`, parseInt(unit.quantity)>0 && `activeImg`);
                unitImg.src = unit.image; // le pone el source que figura como propiedad del objeto
                unitImg.ondragstart = function() { return false; };
                unitImg.setAttribute(`title`,`${unit.name}`)
                unitImg.onclick = ()=>{ // si clickeo en la imagen se aumenta en 1 al valor del input
                    unitAmount.value = parseInt(unitAmount.value) + 1;
                    newProductionPortfolio()
                    guardar()
                };
                
                unitDiv.appendChild(unitImg); // agrego la image
                unitDiv.appendChild(unitAmount);
                
                document.querySelector(`.unidades`).appendChild(unitDiv); // agrego las cosas creadas dinamicamente al div existende de mi HTML
            }
        }
    }
}

displayUnits()

// creacion del HTML con sus eventos
/* function displayUnits(){
    for(const unit of unitsList){
        const unitDiv = document.createElement(`div`); // crea un div por unidad
        unitDiv.classList.add(`unidades__${unit.name}`, `unidades__div`);

        const unitAmount = document.createElement(`input`); // crea un input por unidad
        unitAmount.type = `number`
        unitAmount.placeholder = `Insert amount`
        unitAmount.classList.add(`unidades__${unit.name}-q`)
        unitAmount.value = unit.quantity
        unitAmount.addEventListener("change", newProductionPortfolio) // si cambio el valor, se ejecuta un newProductionPortfolio

        const unitImg = document.createElement(`img`); // crea un img por unidad
        unitImg.classList.add(`unidades__${unit.name}-imagen`, `unidades__div-imagen`);
        unitImg.src = unit.image; // le pone el source que figura como propiedad del objeto
        unitImg.ondragstart = function() { return false; };
        unitImg.setAttribute(`title`,`${unit.name}`)
        unitImg.onclick = ()=>{ // si clickeo en la imagen se aumenta en 1 al valor del input
            unitAmount.value = parseInt(unitAmount.value) + 1;
            newProductionPortfolio()
        };

        unitDiv.appendChild(unitImg); // agrego la image
        unitDiv.appendChild(unitAmount);

        document.querySelector(`.unidades`).appendChild(unitDiv); // agrego las cosas creadas dinamicamente al div existende de mi HTML
    }
}

displayUnits() */

// document.addEventListener(`DOMContentLoaded` , newProductionPortfolio)


// se agregan las funcionalidades del localstorage (por ahora son de compromiso para entregar algo)
function guardar(){
    let stringUnitsList = JSON.stringify(unitsList);
    localStorage.setItem(`stringUnitsList`, stringUnitsList)
    Toastify({
        text: "Seleccion de unidades guardada",
        duration: 500,
        gravity: "bottom",
        style: {background: "rgb(0, 76, 111)",},
    }).showToast();
}

function cargar(){
    JSON.parse(localStorage.getItem(`stringUnitsList`)) === null
    ? guardar()
    :unitsList = JSON.parse(localStorage.getItem(`stringUnitsList`)) ;
    for(unit of unitsList){
        try{document.querySelector(`.unidades__${unit.name}-q`).value = unit.quantity;}catch{continue};
    }
    newProductionPortfolio()
    Toastify({
        text: "Seleccion de unidades cargada",
        duration: 500,
        gravity: "bottom",
        style: {background: "rgb(0, 76, 111)",},
    }).showToast();
}

function borrar(){
    for(unit of unitsList){
        unit.quantity = 0
        try{document.querySelector(`.unidades__${unit.name}-q`).value = 0}catch{continue}
    }
    newProductionPortfolio();
    localStorage.clear()
    Toastify({
        text: "Seleccion de unidades borrada",
        duration: 500,
        gravity: "bottom",
        style: {background: "rgb(0, 76, 111)",},
    }).showToast();
}
document.querySelector(`.botonBorrar`).addEventListener(`click`, borrar);

/*     })
    .catch((err)=>{
        console.log(err) // <-- si algo sale muuy mal se va por aca.
    })
}  

funcionAllEcoUpgrades()*/

document.querySelector(`.span-general`).setAttribute(`title`,`
Primera fila:
    Cantidad mínima de aldeanos destinados a 
    cada recurso, con el objetivo de mantener 
    la producción constante de las unidades 
    seleccionadas
Segunda fila:
    Cantidad de unidades producidas por minuto
`)
document.querySelector(`.span-economia`).setAttribute(`title`,`
Mejoras económicas que aceleran la velocidad 
de recolección de recursos de los aldeanos
`)
document.querySelector(`.span-unidades`).setAttribute(`title`,`
Seleccione el tipo y cantidad de 
unidades de las que se desea mantener 
producción constante
Puede filtrar las unidades visibles 
desde el menu desplegable
`)
document.querySelector(`#toggle`).setAttribute(`title`,`
Filtro de unidades visible 
según edificio de producción
`)

document.getElementById("toggle").addEventListener("click", () => {
    const sidebarEl = document.getElementsByClassName("sidebar")[0];
    sidebarEl.classList.toggle("sidebar--isHidden");

    document.getElementById("toggle").innerHTML = sidebarEl.classList.contains("sidebar--isHidden")
        ? "> "
        : "< ";
});

cargar()

function newProductionQueue(){
    document.querySelector(`.productionQueue`).innerHTML = "";
    for(unidad of unitsList){
        if(unidad.quantity > 0){
            let unitQueue = document.createElement(`div`);
            unitQueue.classList.add(`${unidad.name}`, `productionQueue__unitCard`);
            
            let unitQueueImg = document.createElement(`div`);
            unitQueueImg.ondragstart = function() { return false; };
            unitQueueImg.classList.add(`${unidad.name}`, `productionQueue__unitCard-img`);
            unitQueueImg.setAttribute("style", `background-image: url("./Resources/${unidad.name}.webp");`)

            let unitQueueImgQuantity = document.createElement(`div`);
            unitQueueImgQuantity.ondragstart = function() { return false; };
            unitQueueImgQuantity.classList.add(`${unidad.name}`, `productionQueue__unitCard-img-quantity`);
            unitQueueImgQuantity.innerText = `${parseInt((60 / unidad.timeCost)*unidad.quantity*1.7*10)/10}`
            
            let unitQueueImgAnimation = document.createElement(`div`);
            unitQueueImgAnimation.ondragstart = function() { return false; };
            unitQueueImgAnimation.classList.add(`${unidad.name}`, `productionQueue__unitCard-img-animation`);
            unitQueueImgAnimation.setAttribute("style", `animation: progres ${unidad.timeCost / 1.7}s linear infinite;`)
            


            unitQueueImg.appendChild(unitQueueImgAnimation)
            unitQueueImg.appendChild(unitQueueImgQuantity)
            unitQueue.appendChild(unitQueueImg)
            document.querySelector(`.productionQueue`).appendChild(unitQueue)
        }
    }
}