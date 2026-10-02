var words={
    "en":["album", "song", "artist", "playlist", "block", "refresh", "start typing...", "albums", "songs", "artists", "playlists"],
    "es":[],
    "fr":[],
    "de":[],
    "it":[],
    "pt":[],
}
var navLang;
var mI;
window.onload = function(){
    mI = document.querySelector('#mainInp');
    navLang = navigator.language.split('-')[0];
    mI.setAttribute('placeholder',words[navLang][6]);
}
var currentChips;
function shorten(text){
    if(text.length > 10){
        return(text.slice(0,10)+'...')
    }else{
        return text;
    }
}
var searches = [];
async function searchWiki(value){
    currentChips={album:[], playlist:[],song:[],artist:[]}
    var endpointTop = 'https://invidious.f5.si/api/v1/search?q='+value+" provided to youtube by";
    var levels2 = ['playlist','channel','video'];
    var levels3 = ['album','artist','song']
    var boole = false;
     await fetch(endpointTop).then((response) => {
        if(response.ok){
           response.text().then((toBeHandled) => {
    for(var i in levels2){
        console.log(endpointTop+levels2[i])
       
            console.log(toBeHandled);
            searches.push(toBeHandled);
            var ntoBeHandled = toBeHandled.split('{"type":"');
            ntoBeHandled.shift();
            console.log(ntoBeHandled)
            for(var j of ntoBeHandled){
                console.log(j)
                var tempArray = [];
                if(j.startsWith(levels2[i])){
                    console.log(j)
                    tempArray.push(j.split('Id":"')[1].split('"')[0])
                    tempArray.push(j.split(['title','author','title'][i]+'":"')[1].split('"')[0]);
                    currentChips[levels3[i]].push(tempArray);
                }
                
            }
            if(!boole){
                boole=true;
           
            }
        }
        })
        }
    })
    await fetch('https://invidious.f5.si/api/v1/search?q='+value).then((response) => {
        if(response.ok){
           response.text().then((toBeHandled) => {
            console.log(toBeHandled);
            searches.push(toBeHandled);
            var ntoBeHandled = toBeHandled.split('{"type":"');
            ntoBeHandled.shift();
            console.log(ntoBeHandled)
            for(var j of ntoBeHandled){
                console.log(j)
                var tempArray = [];
                if(j.startsWith('playlist')){
                    console.log(j)
                    tempArray.push(j.split('Id":"')[1].split('"')[0])
                    tempArray.push(j.split(['title','title','author','title'][0]+'":"')[1].split('"')[0]);
                    currentChips['playlist'].push(tempArray);
                }
                
            }
            boole = false;
            if(!boole){
                boole=true;
            generateChips();
            }
        
        })
        }
    }
    )
}
async function mainInput1(e){
    if(mI.getAttribute('state') == 0){
        mI.setAttribute('state',1);
    }
    if(e.keyCode==13){
        await searchWiki(mI.value);
    }
}
function generateChips(){
    var intt = 0;
    for(var i of Object.keys(currentChips)){
        console.log(Object.keys(currentChips))
        if(currentChips[i].length>0){
        generateChip(i,currentChips[i],intt);
        intt++;
        }
    }
    setTimeout(function(){
        var intt3 = 0;
         var intt2 = 0;
         for(var k of document.querySelectorAll('.chipContainer')){  
            console.log([...currentChips[Object.keys(currentChips)[[words[navLang][7],words[navLang][8],words[navLang][9],words[navLang][10]].indexOf(k.querySelector('span').innerText.split(' - ')[1].trim())]]]);
         var newValues = [...fisherYatesShuffle([...currentChips[Object.keys(currentChips)[[words[navLang][7],words[navLang][8],words[navLang][10],words[navLang][9]].indexOf(k.querySelector('span').innerText.split(' - ')[1].trim())]]])].slice(0,3);
        for(var j of newValues){
            intt2++;
            bounceIn(k,j,intt2);
        }
        intt3++;
    }
    },Object.keys(currentChips).length*1000)
}
function fisherYatesShuffle(array){
  let currentIndex = array.length;
  if(currentIndex > 3){
  while (currentIndex != 0) {
    // Pick a random index from the remaining elements
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    // Swap the current element with the random element
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]
    ];
  }
  return array;
}else{
    return array;
}

}
function generateChip(type, values, number){
    setTimeout(function(){
    var home = document.querySelector("#chipHouse");
    var chip = document.createElement("div");
    chip.style.marginLeft = "100vw";
    chip.style.top = "calc(4em + " + (6*number)+"em)";
    var blockHolder = document.createElement("div");
    var blockText = document.createElement("div")
    var blockInner = document.createElement('span');
    var blockTitle = document.createElement("span");
    chip.setAttribute('class','chipContainer');
    blockHolder.setAttribute('class','blockHolder');
    blockText.setAttribute('class','blockText');
    blockInner.setAttribute('class','blockInner '+['left','right'][Math.floor(Math.random()*1.9)])
    blockTitle.innerText = shorten(mI.value)+" - "+ words[navLang][words['en'].indexOf(type) + 7];
    chip.append(blockTitle);
    chip.append(blockHolder);
    
    blockText.append(blockInner);
    chip.append(blockText);

    if("album song".includes(type)){
        blockInner.innerText = words[navLang][4];
    }else{
        blockInner.innerText = words[navLang][5];
    }
    home.append(chip);
    setTimeout(function(){
    chip.style.marginLeft = "0";
    var itt = [...document.querySelectorAll('.chipContainer')];
    itt.pop();
    for(var i of itt){
      
        screenShake(i);
        
        
    }
    
}, 50);
    
},1000*number)
}
function screenShake(element){
    if(element.querySelector('.blockInner').getAttribute('class').includes('left')){
            element.querySelector('.blockInner').setAttribute('class',element.querySelector('.blockInner').getAttribute('class').replace('left','right'))
        }
        if(element.querySelector('.blockInner').getAttribute('class').includes('right')){
             element.querySelector('.blockInner').setAttribute('class',element.querySelector('.blockInner').getAttribute('class').replace('right','left'))
        }
    setTimeout(function(){
        element.style.transform = "translateX("+Math.random()*2+"em)";
        setTimeout(function(){
            element.style.transform = "translateX(-"+Math.random()*2+"em)"
            setTimeout(function(){
                element.style.transform = "translateX("+Math.random()*3+"em)";
                setTimeout(function(){
                    element.style.transform = "translateX(0em)"
                },Math.round(Math.random()*250))
            },Math.round(Math.random()*250))
        },Math.round(Math.random()*250))
    },Math.round(Math.random()*250))

}
function bounceIn(element,j,intt2){
    setTimeout(function(){
    var eb = element.getBoundingClientRect();
    var tempDiv = document.createElement('div');
    tempDiv.style.zIndex=2;
    tempDiv.style.backgroundColor = "var(--accent)";
    tempDiv.style.height = eb.height+"px";
    tempDiv.style.width = "2em";
    tempDiv.style.borderRadius = "5px";
    tempDiv.style.left = "1em";
    tempDiv.style.top = eb.y+"px";
    tempDiv.style.position = "absolute";
    tempDiv.style.transition = "0.5s";
    element.style.borderRadius = "5px 0 0 5px";
    tempDiv.style.borderRadius = "0 5px 5px 0";
    setTimeout(function(){tempDiv.style.left = (eb.x+eb.width)+"px";},50)
    document.body.append(tempDiv);
    setTimeout(function(){
        tempDiv.style.left = "calc("+(eb.x+eb.width)+"px + " + "1em)";
        var tempDiv2 = tempDiv.cloneNode();
        tempDiv2.style.zIndex=4;
        tempDiv2.style.left = (eb.x+eb.width)+"px";
        tempDiv2.style.width = "1em";
        tempDiv2.style.borderRadius="0"
        document.body.append(tempDiv2);
        setTimeout(function(){
            var getPlace = document.createElement('div');
            getPlace.setAttribute('class','option');
            getPlace.style.opacity = 0;
            getPlace.innerText = shorten(j[1].toLowerCase());
            if(getPlace.innerText.includes('-')){
                getPlace.innerText = shorten(j[1].toLowerCase()).split('-')[1];
            }
                getPlace.setAttribute('link',j[0]);
            
            element.querySelector('.blockHolder').append(getPlace);
            var gpb = getPlace.getBoundingClientRect();
            tempDiv2.style.backgroundColor = "var(--second)";
            tempDiv2.style.height = gpb.height+"px"
            tempDiv2.style.top = gpb.y+"px"
            tempDiv2.style.width = gpb.width+"px"
            tempDiv2.style.left = gpb.x+"px";
            tempDiv2.style.borderRadius="5px"
            setTimeout(function(){
                getPlace.style.opacity = "1";
                tempDiv2.style.opacity = "0";
                 tempDiv.style.left = "3em";
                  tempDiv.style.opacity = 0;
               setTimeout(function(){
                    tempDiv.remove();
                    tempDiv2.remove();
                },550)
            },1050)
        },550)
    },550);
},2050*intt2)
}