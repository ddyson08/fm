var words={
    "en":["album", "song", "artist", "playlist", "block", "refresh", "start typing...", "albums", "songs", "artists", "playlists", "react", "reaction"],
    "es":[],
    "fr":[],
    "de":[],
    "it":[],
    "pt":[],
}
/*function jumpLogo(){
  var logo = document.querySelector("#titleBar");
  for(var i of logo.children){
    i.style.display="none";
  }
  logo.style.transition = "0.5s";
  logo.style.transitionTimingFunction= "ease-in";
  var l = logo.style.top;
  logo.style.top = "20vh";
  setTimeout(function(l){ logo.style.transform = "rotate(360deg)";},400,l);
    setTimeout(function () {
        logo.style.transitionTimingFunction = "ease-out";
        logo.style.top = l;
        
        for (let j = 0; j < 4; j++) {
            setTimeout(function () {
                var ll = logo.getBoundingClientRect().width;
                var x = logo.children[0].children[j];
                x.style.transition = "0.5s"
                x.style.display = "";
                x.style.opacity = 0;
                logo.style.width = ll + "px";
                setTimeout(function () {
                    x.style.opacity = 1;
                    logo.style.width = "max-content";
                }, 50 * j);
            }, 100 * j);
        }
    }, 900);
    setTimeout(function () {
        logo.style.transition = "1s";
        logo.style.top = 0;
        logo.style.transition = "1s";
        var ll = logo.getBoundingClientRect().width;
        logo.style.width = ll + "px";
        //document.querySelector("#textEnter").style.left = "4em";
        setTimeout(function () {
            logo.style.left = 0;
            setTimeout(function () {
                logo.style.width = "100vw";
            },500)
        }, 1000)
    }, 2600)

}*/
//jumpLogo();
var navLang;
var mI;
window.onload = function(){
    mI = document.querySelector('#mainInp');
    navLang = navigator.language.split('-')[0];
    mI.setAttribute('placeholder',words[navLang][6]);
}
var currentChips;
function shorten(text){
    if(false){
        return(text.slice(0,10)+'...')
    }else{
        return text;
    }
}
var searches = [];
var nowSearch;

async function searchWiki(value){
    nowSearch = value;
    var exclusionString = "";
    if(!(nowSearch.toLowerCase().includes(words[navLang][11]) || nowSearch.toLowerCase().includes(words[navLang][12]) || nowSearch.toLowerCase().includes(words.en[11]) || nowSearch.toLowerCase().includes(words.en[11]))){
exclusionString = "-"+words[navLang][11] + " -"+words[navLang][12]+ " -"+words.en[11]+" -"+words.en[12]
    }
    var x = new Date();
    var x2 = x.getDate().toString().padStart(2,'0') + x.getMonth().toString().padStart(2,'0');
    var y = localStorage.getItem(x2+'_fm_'+value);
    if(y){
        currentChips = JSON.parse(y);
        generateChips();
    }else{
    currentChips={album:[], playlist:[],song:[],artist:[]}
    //var endpointTop = 'https://invidious.f5.si/api/v1/search?q='+value+" provided to youtube by";
     await fetch('https://invidious.f5.si/api/v1/search?q='+value+' song provided to youtube by ' + exclusionString).then((response) => {
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
                if(j.startsWith('video')){
                    console.log(j)
                    tempArray.push(j.split('Id":"')[1].split('"')[0])
                    tempArray.push(j.split(['title','title','author','title'][0]+'":"')[1].split('"')[0]);
                    if(!(nowSearch.toLowerCase().includes(words[navLang][11]) || nowSearch.toLowerCase().includes(words[navLang][12]) || nowSearch.toLowerCase().includes(words.en[11]) || nowSearch.toLowerCase().includes(words.en[11])) && tempArray[1].includes(words[navLang][11]) || tempArray[1].includes(words[navLang][12]) || tempArray[1].includes(words.en[11]) || tempArray[1].includes(words.en[12])){
                        break;
                    }
                    try{
                    tempArray.push(j.split('authorThumbnails')[1].split('l":"')[1].split('"')[0])
                    }catch(e){}
                    currentChips['song'].push(tempArray);
                }
                
            }
           
        
        })
        }
    }
    )
     await fetch('https://invidious.f5.si/api/v1/search?q='+value+' provided to youtube by ' + exclusionString).then((response) => {
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
                if(j.startsWith('video')){
                    console.log(j)
                    tempArray.push(j.split('Id":"')[1].split('"')[0])
                    tempArray.push(j.split(['title','title','author','title'][0]+'":"')[1].split('"')[0]);
                    if(!(nowSearch.toLowerCase().includes(words[navLang][11]) || nowSearch.toLowerCase().includes(words[navLang][12]) || nowSearch.toLowerCase().includes(words.en[11]) || nowSearch.toLowerCase().includes(words.en[11])) && tempArray[1].includes(words[navLang][11]) || tempArray[1].includes(words[navLang][12]) || tempArray[1].includes(words.en[11]) || tempArray[1].includes(words.en[12])){
                        break;
                    }
                    try{
                    tempArray.push(j.split('authorThumbnails')[1].split('l":"')[1].split('"')[0])
                    }catch(e){}
                    currentChips['song'].push(tempArray);
                }
                
            }
           
        
        })
        }
    }
    )
    await fetch('https://invidious.f5.si/api/v1/search?q='+value+' album provided to youtube by ' + exclusionString).then((response) => {
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
                    tempArray.push(j.split(['title','title','author','title'][1]+'":"')[1].split('"')[0]);
                    if(!(nowSearch.toLowerCase().includes(words[navLang][11]) || nowSearch.toLowerCase().includes(words[navLang][12]) || nowSearch.toLowerCase().includes(words.en[11]) || nowSearch.toLowerCase().includes(words.en[11])) && tempArray[1].includes(words[navLang][11]) || tempArray[1].includes(words[navLang][12]) || tempArray[1].includes(words.en[11]) || tempArray[1].includes(words.en[12])){
                        break;
                    }
                    try{
                    tempArray.push(j.split('authorThumbnails')[1].split('l":"')[1].split('"')[0])
                    }catch(e){}
                    currentChips['album'].push(tempArray);
                }
                
            }
          
        
        })
        }
    }
    )
    await fetch('https://invidious.f5.si/api/v1/search?q='+value+' artist provided to youtube by ' + exclusionString).then((response) => {
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
                if(j.startsWith('channel')){
                    console.log(j)
                    tempArray.push(j.split('Id":"')[1].split('"')[0])
                    tempArray.push(j.split(['title','title','author','title'][2]+'":"')[1].split('"')[0]);
                    if(!(nowSearch.toLowerCase().includes(words[navLang][11]) || nowSearch.toLowerCase().includes(words[navLang][12]) || nowSearch.toLowerCase().includes(words.en[11]) || nowSearch.toLowerCase().includes(words.en[11])) && tempArray[1].includes(words[navLang][11]) || tempArray[1].includes(words[navLang][12]) || tempArray[1].includes(words.en[11]) || tempArray[1].includes(words.en[12])){
                        break;
                    }
                    try{
                    tempArray.push(j.split('authorThumbnails')[1].split('l":"')[1].split('"')[0])
                    }
                    catch(e){}
                    currentChips['artist'].push(tempArray);
                }
                
            }
           
        })
        }
    }
    )
    await fetch('https://invidious.f5.si/api/v1/search?q='+value+' ' + exclusionString).then((response) => {
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
                    tempArray.push(j.split('Id":"')[1].split('"')[3])
                    tempArray.push(j.split(['title','title','author','title'][0]+'":"')[1].split('"')[0]);
                    if(!(nowSearch.toLowerCase().includes(words[navLang][11]) || nowSearch.toLowerCase().includes(words[navLang][12]) || nowSearch.toLowerCase().includes(words.en[11]) || nowSearch.toLowerCase().includes(words.en[11])) && tempArray[1].includes(words[navLang][11]) || tempArray[1].includes(words[navLang][12]) || tempArray[1].includes(words.en[11]) || tempArray[1].includes(words.en[12])){
                        break;
                    }
                    try{
                    tempArray.push(j.split('authorThumbnails')[1].split('l":"')[1].split('"')[0])
                    }catch(e){}
                    currentChips['playlist'].push(tempArray);
                }
                
            }
           
        
        })
        }
    }
    )
    localStorage.setItem(x2+'_fm_'+value,JSON.stringify(currentChips));
    generateChips();
    }
}
var hasEntered = false;
var inanimation = false;
async function mainInput1(e){
    if(mI.getAttribute('state') == 0){
        if(!hasEntered && !inanimation){
        mI.setAttribute('state',1);
        }else{
            
        }
    }
    if(mI.getAttribute('state') == 1 && hasEntered){
        number = 0;
       
        currentNewChips={song:[],artist:[],playlist:[],album:[],songN:0,artistN:0,playlistN:0,albumN:0};
    currentNewChips = {};
    intt11 = 0;
    nowSearch = "";
    for(var i of document.querySelectorAll('option')){
        moveMr(i);
    }
    inanimation = true;
    setTimeout(function(){for(var j of document.querySelectorAll('.chipContainer')){moveMr(j); setTimeout(function(){mI.setAttribute('state',0);  hasEntered = false; setTimeout(function(){ mI.setAttribute('state',1);  inanimation = false;},1000)},500)}},500);
    
    }
    if(e.keyCode==13){
         hasEntered = true;
        await searchWiki(mI.value);
       
    }
}
function smartArrangeSongs(newValues){
    var nv = [];
     console.log('var newValues = '+newValues);
     var contenders = [];
         var shiftBool = true;
         for(var n in newValues){
            shiftBool = true;
            if(shiftBool && (newValues[n][1].toLowerCase().replace(/ /g,'').includes(nowSearch.toLowerCase().replace(/ /g,'')) || nowSearch.toLowerCase().replace(/ /g,'').includes(newValues[n][1].toLowerCase().replace(/ /g,'')))){
                contenders.push([newValues[n],0]);
              //  newValues.splice(n,1);
                shiftBool = false;
            }else{
                if(shiftBool){
                var number = 0;
                for(var nn of newValues[n][1].toLowerCase().split(' ')){
                    if(nowSearch.toLowerCase().includes([nn,0])){
                        number++;
                    }
                }
                for(var nnn of nowSearch.toLowerCase().split(' ')){
                    if(newValues[n][1].toLowerCase().includes([nnn,0])){
                        number++;
                    }
                }
                if(number>0.6*newValues[n][1].toLowerCase().split(' ').length){
                    contenders.push([n,0]);
                 //   newValues.splice(n,1);
                    shiftBool = false;
                }
                if(shiftBool){
                    number = 0;
                    var str = newValues[n][1].toLowerCase().match(/[A-Z][a-z]*/g) || []
                     for(var nm of str){
                    if(nowSearch.toLowerCase().includes([nm,0])){
                        number++;
                    }
                }
                if(number>0.6*str.length){
                    contenders.push(nm);
                  //  newValues.splice(n,1);
                    shiftBool = false;
                }
                }else{
                    if(shiftBool){
                        number = 0;
                    var str1 = newValues[n][1].toLowerCase().split('.');
                     for(var mn of str1){
                    if(nowSearch.toLowerCase().includes([mn,0])){
                        number++;
                    }
                }
                if(number>0.6*str1.length){
                    contenders.push([mn,0]);
                   // newValues.splice(n,1);
                    shiftBool = false;
                }
            }
                }
            }
                
            }
         }
        
         for(var contender of contenders){
            var distance = nowSearch.toLowerCase().replace(/ /g,'').replace(/\./g,'').replace(/\_/g,'')
            for(var item of contender[0][1].toLowerCase().replace(/\./g,'').replace(/\_/g,'').split(' ')){
                distance = distance.replace(item,'');
            }
            distance = distance.replace(/ /g,'')
            contender[1] = distance.length;
        
            /*var distance2 = contender[0][1].toLowerCase().replace(/ /g,'').replace(/\./g,'').replace(/\_/g,'')
            for(var item of nowSearch.toLowerCase().replace(/ /g,'').replace(/\./g,'').replace(/\_/g,'').split(' ')){
                distance2 = distance2.replace(item,'');
            }
            if(distance2.length < contender[1]){
            contender[1] = distance2.length;
            }
            */
         }
         contenders = contenders.sort((a,b) => a[1] - b[1]);
        // newValues.shift(contenders);
         console.log('contenders '+contenders.toString())
         for(var zeh of contenders){
            nv.push(zeh[0])
         }
         nv = nv.concat(newValues);
         return nv;
}
function handleChips(intt,k){
 setTimeout(function(){
        var intt3 = 0;
         var intt2 = 0;
         var newValues=[];
            var typeofmusic = Object.keys(currentChips)[[words[navLang][7],words[navLang][10],words[navLang][8],words[navLang][9]].indexOf(k.querySelector('span').innerText.split(' - ')[1].trim())];
            console.log([...currentChips[typeofmusic]]);
         var newValues = smartArrangeSongs([...fisherYatesShuffle([...currentChips[typeofmusic]])]);
       currentNewChips[typeofmusic] = newValues;
       newValues = newValues.slice(0,3);
       currentNewChips[typeofmusic+'N']=0;
         for(var j of newValues){
            bounceIn(k,j,intt2);
            intt2++;
        }
        intt3++;
    
},1000*(intt11+1))
}
 var intt11 = 0;
function generateChips(){
   
    for(var i of Object.keys(currentChips)){
        console.log(Object.keys(currentChips))
        if(currentChips[i].length>0){
        generateChip(i,currentChips[i],intt11);
        
        }
    }
   
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
function moveMr(i){
    i.style.transition = "0.5s";
    i.style.marginLeft = "calc(100vw - 20em)";
    i.style.opacity = 0;
    i.style.color = "var(--accent)"
    i.style.textDecorationColor = "var(--accent)"
    setTimeout(function(){i.remove();},500);
}
var currentNewChips={song:[],artist:[],playlist:[],album:[],songN:0,artistN:0,playlistN:0,albumN:0}
function refreshMe(t){
    var mainArr = t.parentNode.querySelector('.blockHolder').children;
    for(var i of mainArr){
        moveMr(i);
    }
     var intt3 = 0;
         var intt2 = 0;
         var typeofmusic = Object.keys(currentChips)[[words[navLang][7],words[navLang][10],words[navLang][8],words[navLang][9]].indexOf(t.parentNode.querySelector('span').innerText.split(' - ')[1].trim())];
            console.log([...currentChips[typeofmusic]]);
            currentNewChips[typeofmusic+'N']=currentNewChips[typeofmusic+'N']+3; 
            if(currentNewChips[typeofmusic].length >= currentNewChips[typeofmusic+'N']+3){
         var newValues = [currentNewChips[typeofmusic][currentNewChips[typeofmusic+'N']],currentNewChips[typeofmusic][currentNewChips[typeofmusic+'N']+1],currentNewChips[typeofmusic][currentNewChips[typeofmusic+'N']+2]]
            
        }else{
                currentNewChips[typeofmusic]=fisherYatesShuffle(currentChips[typeofmusic]);
                 currentNewChips[typeofmusic+'N']=0;
                 var newValues = [currentNewChips[typeofmusic][currentNewChips[typeofmusic+'N']],currentNewChips[typeofmusic][currentNewChips[typeofmusic+'N']+1],currentNewChips[typeofmusic][currentNewChips[typeofmusic+'N']+2]]
         
            }
       setTimeout(function(){
         for(var j of newValues){
            intt2++;
            if(j){
            bounceIn(t.parentNode,j,intt2);
            }
        }
    },600)
        intt3++;

}
function generateChip(type, values, number){
    setTimeout(function(){
    var home = document.querySelector("#chipHouse");
    var chip = document.createElement("div");
    chip.setAttribute('id',words[navLang][words['en'].indexOf(type) + 7]);
    chip.style.marginLeft = "100vw";
    var qs = document.querySelectorAll('.chipContainer');
    if(qs.length>0){
       chip.style.top = "calc("+qs[qs.length-1].getBoundingClientRect().bottom+"px + 2em)";
    }else{
    chip.style.top = "calc(4em + " + (6*number)+"em)";
    }
    var blockHolder = document.createElement("div");
    var blockText = document.createElement("div")
    var blockInner = document.createElement('span');
    var blockTitle = document.createElement("span");
    blockText.setAttribute('onclick','refreshMe(this)')
    chip.setAttribute('class','chipContainer');
    blockHolder.setAttribute('class','blockHolder');
    blockText.setAttribute('class','blockText');
    blockInner.setAttribute('class','blockInner '+['left','right'][Math.floor(Math.random()*1.9)])
    blockTitle.innerText = shorten(mI.value)+" - "+ words[navLang][words['en'].indexOf(type) + 7];
    blockTitle.setAttribute('class','blockTitle');
    chip.append(blockTitle);
    chip.append(blockHolder);
    
    blockText.append(blockInner);
    chip.append(blockText);

    
        blockInner.innerText = words[navLang][5];
    
    home.append(chip);
    setTimeout(function(){
    chip.style.marginLeft = "0";
    var itt = [...document.querySelectorAll('.chipContainer')];
    itt.pop();
    for(var i of itt){
      
        screenShake(i);
        
        
    }
    
}, 50);
     var k = document.querySelectorAll('.chipContainer');
        k=k[k.length-1];
        handleChips(intt11,k);
        intt11++;
},1000*number)
}
function screenShake(element){
    if(element.querySelector('.blockInner').getAttribute('class').includes('left')){
            element.querySelector('.blockInner').style.left = "0em";
            element.querySelector('.blockInner').getAttribute('class','right')
        }
        if(element.querySelector('.blockInner').getAttribute('class').includes('right')){
            element.querySelector('.blockInner').style.left = "calc(100% - 3em - " + element.querySelector('.blockInner').getBoundingClientRect().width+"px)";
            element.querySelector('.blockInner').getAttribute('class','left')
        }
    /*setTimeout(function(){
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
    },Math.round(Math.random()*250))*/

}
function getCorrectSongName(name,tru){
    console.log(name, tru)
    var tbr=name;
    if(false){
            var splittedJ = name.toLowerCase().split('-');
            splittedJ[0] = splittedJ[0];
            if(splittedJ.length > 1){
                splittedJ[1] = splittedJ[1];
            
            if(tbr.includes('-')){
                if(splittedJ[1].toLowerCase().includes(nowSearch.toLowerCase())){
                tbr = shorten(splittedJ[0])
                if(currentChips.artist.toString().includes(splittedJ[0])){
                    tbr = shorten(splittedJ[1])
                }
                }else{
                    tbr = shorten(splittedJ[1]);
                    if(currentChips.artist.toString().includes(splittedJ[1])){
                    tbr = shorten(splittedJ[0])
                }
                }
            }
        }
    }
            return tbr;
}
function addHTTP(link){
    if(link){
    if(!link.startsWith('https:')){
        return('https:'+link)
    }else{
        return(link)
    }
}else{
    return('NO PICTURE');
}
}
function bounceIn(element,j,intt2){
    setTimeout(function(){
    var eb = element.getBoundingClientRect();
    var tempDiv = document.createElement('div');
    var tf = (element.querySelector('span').innerText.includes(words[navLang][7])||element.querySelector('span').innerText.includes(words[navLang][8]))
    tempDiv.style.zIndex=2;
    tempDiv.style.backgroundColor = "var(--accent)";
    tempDiv.style.height = eb.height+"px";
    tempDiv.style.width = "2em";
    tempDiv.style.borderRadius = "5px";
    tempDiv.style.left = "2em";
    tempDiv.style.top = eb.y+"px";
    tempDiv.style.position = "absolute";
    tempDiv.style.transition = "0.1s";
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
            console.log([element, tf]) 
            var getPlace = document.createElement('div');
            getPlace.setAttribute('class','option');
            getPlace.style.opacity = 0;
            console.log(j[1])
            var img = document.createElement('img');
            img.setAttribute('class','coverArt');
            img.setAttribute('src',addHTTP(j[2]));
            getPlace.append(img);
             if(img.getAttribute('src') == "NO PICTURE"){
                img.remove();
            }
            var spann = document.createElement('span');
            spann.innerText = shorten(getCorrectSongName(j[1], tf));
            getPlace.append(spann);
            element.querySelector('.blockHolder').append(getPlace);
             var gpb = getPlace.getBoundingClientRect();
            tempDiv2.style.backgroundColor = "var(--second)"; 
            tempDiv2.style.borderRadius = "5px";
            setTimeout(function(){
                 tempDiv2.style.height = gpb.height+"px";
            tempDiv2.style.top = gpb.y+"px"
        setTimeout(function(){
           // getPlace.innerText = shorten(getCorrectSongName(j[1], tf));
            
                getPlace.setAttribute('link',j[0]);
            tempDiv2.style.backgroundColor = "var(--second)";
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
                     element.style.borderRadius = "5px";
                },400)
            },400)
        },200)
        },100)
    },100)
    },200);
}, 1500*(intt2-1))
}
function generateEasyClicks(level, element){
    switch(level){
        case 0: 
        var aa = document.querySelectorAll('.blockTitle')
            for(var a in aa){
                animateEasyClicks(aa[a],a,"generateEasyClick(1,'#'+this.innerText.split('-')[1].trim())");
            }
            break;
        case 1:
            var bb = document.querySelector(element).querySelectorAll('.option');
            for(var b in bb){
                animateEasyClicks(bb[b],b);

            }
            break;
    }
}
function removeEasyClick(p){
    p.style.left = "100vw";
    setTimeout(function(){
        p.remove();
    },1000)
}
function animateEasyClicks(element,n, func){
    try{
    for(var p of document.querySelector('.easyClickButton')){
       removeEasyClick(p);
    }
}
catch(e){
    console.log(e)
}
    var newElement = document.createElement('div');
    newElement.style.backgroundColor = element.style.backgroundColor;
    newElement.style.fontSize = element.style.fontSize;
    newElement.innerText = element.innerText;
    newElement.style.borderRadius = "5px";
    newElement.style.position = "absolute";
    newElement.style.padding = element.style.padding;
    newElement.style.transition = "1s";
    newElement.setAttribute('class','easyClickButton');
    var eb = element.getBoundingClientRect();
    newElement.style.left = eb.x+"px";
    newElement.style.top = eb.w+"px";
    newElement.style.width = eb.width+"px";
    newElement.style.height = eb.height+"px";
    newElement.style.zIndex = "5";
    document.body.append(newElement);
    setTimeout(function(){
        newElement.style.left = "1em";
        newElement.style.top = "calc(50vh - "+n*Math.round(Math.random()*20)/10+"em)";
        newElement.style.width = "calc(100vw - 1em)";
        newElement.style.borderRadius = "0";
        setTimeout(function(){
            newElement.style.left = ((2*n)+2) + "em";
            newElement.style.top = "calc(100vw - 1.5em)";
            newElement.style.width = "max-content";
            newElement.style.borderRadius = "5px";
            newElement.style.backgroundColor = "var(--second);"
            newElement.setAttribute('onclick',func)
        },1000)
    },500)
}