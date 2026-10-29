var words={
    "en":["album", "song", "artist", "playlist", "block", "refresh", "start typing...", "albums", "songs", "artists", "playlists", "react", "reaction","play","next","last","radio","🔄️", "discover","familiar","mixed"],
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
function shorten(text,level){
switch(level){
case 1:
if(text.length>20){
        return(text.slice(0,20)+'...')
}
return text;
break;
case 2:
if(text.length>10){
        return(text.slice(0,10)+'...')
}
return text;
break;
}
    
}
function unShorten(text){
return text.replace('...','');
}

var searches = [];
var nowSearch;
var googleLink = 'https://script.google.com/macros/s/AKfycbydja1EfaFhX6KBBMocCgwiHLvol-qOk4L9KD7GQMjtW5F7ThlTPRTS-pC-o-FLUxIKaQ/exec?query=';
async function searchWiki(value){
    nowSearch = value;
    var exclusionString = "";
   // if(!(nowSearch.toLowerCase().includes(words[navLang][11]) || nowSearch.toLowerCase().includes(words[navLang][12]) || nowSearch.toLowerCase().includes(words.en[11]) || nowSearch.toLowerCase().includes(words.en[11]))){
//exclusionString = "-"+words[navLang][11] + " -"+words[navLang][12]+ " -"+words.en[11]+" -"+words.en[12]
   // }
    var x = new Date();
    var x2 = x.getDate().toString().padStart(2,'0') + x.getMonth().toString().padStart(2,'0');
    var y = localStorage.getItem(x2+'_fm_'+value);
    if(y){
        currentChips = JSON.parse(y);
        generateChips();
		
    }else{
    currentChips={album:[], playlist:[],song:[],artist:[]}
    //var endpointTop = 'https://invidious.f5.si/api/v1/search?q='+value+" provided to youtube by";
     await fetch(googleLink+value+' song' + exclusionString+"&pty=1&at=title&va=stream").then((response) => {
        if(response.ok){
           response.text().then((toBeHandled) => {
            currentChips['song'] = JSON.parse(toBeHandled)
 fetch(googleLink+value+' playlist ' + exclusionString+"&pty=1&at=name&va=playlist").then((response) => {
       if(response.ok){
           response.text().then((toBeHandled) => {
            currentChips['playlist'] = JSON.parse(toBeHandled)
 fetch(googleLink+value+' album ' + exclusionString+"&pty=0&at=name&va=playlist").then((response) => {
        if(response.ok){
           response.text().then((toBeHandled) => {
            currentChips['album'] = JSON.parse(toBeHandled)
 fetch(googleLink+value+' channel ' + exclusionString +"&pty=0&at=name&va=channel").then((response) => {
        if(response.ok){
            response.text().then((toBeHandled) => {
            currentChips['artist'] = JSON.parse(toBeHandled)
var allX=0;
	 localStorage.setItem(x2+'_fm_'+value,JSON.stringify(currentChips));
     reloadMusic(currentL);
   generateChips();
        })
        }else{
 localStorage.setItem(x2+'_fm_'+value,JSON.stringify(currentChips));
     reloadMusic(currentL);
   generateChips();

}
    }
    )
        })
        }else{
 localStorage.setItem(x2+'_fm_'+value,JSON.stringify(currentChips));
     reloadMusic(currentL);
   generateChips();

}

    }
    )
        })
        }else{
 localStorage.setItem(x2+'_fm_'+value,JSON.stringify(currentChips));
     reloadMusic(currentL);
   generateChips();

}

    }
    )
        })
        }else{
 localStorage.setItem(x2+'_fm_'+value,JSON.stringify(currentChips));
     reloadMusic(currentL);
   generateChips();

}

    }
    )
     
    
    
	
	}
    
}
var hasEntered = false;
var inanimation = false;
async function mainInput1(e){
    makePreferenceBlocks();
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
            bounceIn(k,j,intt2,currentNewChips[typeofmusic]);
            intt2++;
        }
        intt3++;
    
},1000)
}
 var intt11 = 0;
 function puppetGenerateChip(t,a,b,c){
    setTimeout(function(){
     if(b.length>0){
        generateChip(a,b,c);
        }
    },2000*t)
 }
function generateChips(){
   
    for(var i of Object.keys(currentChips)){
        console.log(Object.keys(currentChips))
        if(currentChips[i].length>0){
        puppetGenerateChip(Object.keys(currentChips).indexOf(i),i,currentChips[i],intt11);
        
        }
    }
	 setTimeout(function(){generateEasyClicks(0,document.querySelector('#chipHouse'))},8000);
   
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
    var cc= false;
    if(i.getAttribute('class')!="chipContainer"){
        var switchHeight = i.parentNode.getBoundingClientRect().height+"px";
        i.parentNode.style.flexWrap="none";
        i.parentNode.style.maxHeight =  switchHeight;
        i.parentNode.style.minHeight = switchHeight;
        cc=true;
    }
    i.style.transition = "0.5s";
    i.style.marginLeft = "calc(100vw - 20em)";
    i.style.fontSize = "2px";
    i.style.opacity = 0;
    i.style.color = "var(--accent)"
    i.style.textDecorationColor = "var(--accent)"
    setTimeout(function(){ if(cc){i.parentNode.style.flexWrap="wrap"; i.parentNode.style.maxHeight = "8em"; i.parentNode.style.minHeight = "2em";}  i.remove(); },500);
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
            while(currentNewChips[typeofmusic][currentNewChips[typeofmusic+'N']]=="FM_TOBEREMOVED"){
                currentNewChips[typeofmusic+'N']=currentNewChips[typeofmusic+'N']+1; 
            }

            if(currentNewChips[typeofmusic].length >= currentNewChips[typeofmusic+'N']+3){
         var newValues = [currentNewChips[typeofmusic][currentNewChips[typeofmusic+'N']],currentNewChips[typeofmusic][currentNewChips[typeofmusic+'N']+1],currentNewChips[typeofmusic][currentNewChips[typeofmusic+'N']+2]]
            
        }else{
                currentNewChips[typeofmusic]=fisherYatesShuffle(currentChips[typeofmusic]);
                 currentNewChips[typeofmusic+'N']=0;
                 var newValues = [currentNewChips[typeofmusic][currentNewChips[typeofmusic+'N']],currentNewChips[typeofmusic][currentNewChips[typeofmusic+'N']+1],currentNewChips[typeofmusic][currentNewChips[typeofmusic+'N']+2]]
         
            }
       setTimeout(function(){
         for(var j of newValues){
            
            if(j){
            bounceIn(t.parentNode,j,intt2,currentNewChips[typeofmusic]);
            }
intt2++;
        }
    },600)
setTimeout(function(){generateEasyClicks(1,'#'+t.parentNode.querySelector('.blockTitle').innerText.split('-')[1].trim())},2000)
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
       chip.style.top = "calc("+qs[qs.length-1].getBoundingClientRect().bottom+"px - 1em)";
    }else{
    chip.style.top = "calc(0.5em + " + (6*number)+"em)";
    }
    var blockHolder = document.createElement("div");
    var blockText = document.createElement("div")
    var blockInner = document.createElement('span');
    var blockTitle = document.createElement("span");
    blockText.setAttribute('onclick','refreshMe(this)')
    chip.setAttribute('class','chipContainer');
    blockHolder.setAttribute('class','blockHolder');
    blockText.setAttribute('class','blockText');
    blockInner.setAttribute('dir',['left','right'][Math.floor(Math.random()*2)])
     blockInner.setAttribute('class','blockInner')
    blockTitle.innerText = shorten(mI.value,1)+" - "+ words[navLang][words['en'].indexOf(type) + 7];
    blockTitle.setAttribute('class','blockTitle');
    chip.append(blockTitle);
    chip.append(blockHolder);
    
    blockText.append(blockInner);
    chip.append(blockText);

    
        blockInner.innerText = words[navLang][5];
    
    home.append(chip);
    setTimeout(function(){
    chip.style.marginLeft = "0";
   
   
      
        screenShake(chip);
        
        
    
   
}, 50);
 
     var k = document.querySelectorAll('.chipContainer');
        k=k[k.length-1];
        handleChips(intt11,k);
        intt11++;
},500*number)
}
function screenShake(element){
    if(element.querySelector('.blockInner').getAttribute('dir').includes('left')){
            element.querySelector('.blockInner').style.lmarginLeft = "0em";
            element.querySelector('.blockInner').setAttribute('dir','right')
        }
        if(element.querySelector('.blockInner').getAttribute('dir').includes('right')){
            element.querySelector('.blockInner').style.marginLeft = "calc(100% - " + element.querySelector('.blockInner').getBoundingClientRect().width+"px)";
            element.querySelector('.blockInner').setAttribute('dir','left')
        }
    setTimeout(function(){
        element.style.transform = "translateX("+Math.random()*3+"em)";
        setTimeout(function(){
            element.style.transform = "translateX("+Math.random()*0+"em)"
            setTimeout(function(){
                element.style.transform = "translateX("+Math.random()*2+"em)";
                setTimeout(function(){
                    element.style.transform = "translateX(0em)"
                },Math.round(Math.random()*125))
            },Math.round(Math.random()*125))
        },Math.round(Math.random()*125))
    },Math.round(Math.random()*125))

}
function getCorrectSongName(name,tru,place){
    console.log(name, tru)
    var tbr=name;
    var didntWork=true;
            var splittedJ = name.toLowerCase().split('-');
            splittedJ[0] = splittedJ[0];
            if(splittedJ.length > 1){
                splittedJ[1] = splittedJ[1];
            
            if(tbr.includes('-')){
                if(splittedJ[1].toLowerCase().includes(nowSearch.toLowerCase())){
                tbr = shorten(splittedJ[0],1)
                if(currentChips.artist.toString().includes(splittedJ[0])){
didntWork=false;
                    tbr = shorten(splittedJ[1],1)
                }
                }else{
                    tbr = shorten(splittedJ[1],1);
                    if(currentChips.artist.toString().includes(splittedJ[1])){
didntWork=false;
                    tbr = shorten(splittedJ[0],1)
                }
                }
            }
        if(didntWork){
var firstPoints = 0;
var secondPoints = 0;
	for(var x of place){
if(x[1].split('-').length>1){
	if(x[1].split('-')[0].toLowerCase().includes(name.toLowerCase())){
	firstPoints+=1;
}
if(x[1].split('-')[1].toLowerCase().includes(name.toLowerCase())){
	secondPoints+=1;
}

}
}
    }
if(firstPoints<secondPoints){
tbr = name.split('-')[0];
}
if(firstPoints>secondPoints){
tbr = name.split('-')[1];
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
function bounceIn(element,j,intt2,place){
     var tf = (element.querySelector('span').innerText.includes(words[navLang][7])||element.querySelector('span').innerText.includes(words[navLang][8]))
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
            spann.innerText = shorten(getCorrectSongName(j[1], tf,place),1);
            getPlace.append(spann);
            element.querySelector('.blockHolder').append(getPlace);
       var eb = element.getBoundingClientRect();
    
            setTimeout(function(){
    var tempDiv = document.createElement('div');
   
    tempDiv.style.zIndex=2;
    tempDiv.style.backgroundColor = "var(--second)";
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
tempDiv2.style.transition = "0.1s";
        tempDiv2.style.zIndex=4;
        tempDiv2.style.left = (eb.x+eb.width)+"px";
        tempDiv2.style.width = "1em";
        tempDiv2.style.borderRadius="0"
        document.body.append(tempDiv2);
        setTimeout(function(){
            console.log([element, tf]) 
            
             var gpb = getPlace.getBoundingClientRect();
            tempDiv2.style.backgroundColor = "var(--second)"; 
            tempDiv2.style.borderRadius = "5px";
            setTimeout(function(){
                 tempDiv2.style.height = gpb.height+"px";
            tempDiv2.style.top = gpb.y+"px"
        setTimeout(function(){
           
            
                getPlace.setAttribute('link',j[0]);
            tempDiv2.style.backgroundColor = "var(--bg)";
            tempDiv2.style.width = gpb.width+"px"
            tempDiv2.style.left = gpb.x+"px";
        
            setTimeout(function(){
                getPlace.style.opacity = "1";
                tempDiv2.style.opacity = "0";
                tempDiv.style.transition = "0.5s"
                 tempDiv.style.left = "3em";
                  tempDiv.style.opacity = 0;
               setTimeout(function(){
tempDiv2.style.borderRadius="5px"
                    tempDiv.remove();
                    tempDiv2.remove();
                     element.style.borderRadius = "5px";
                },500)
            },100)
        },100)
        },100)
    },100)
    },100);
}, 900*intt2)
    }
function generateEasyClicks(level, element){
	 try{
    for(var p of document.querySelectorAll('.easyClickButton')){
       removeEasyClick(p);
    }
   }catch(e){}
	console.warn(element);
    switch(level){
        case 0: 
        var aa = document.querySelectorAll('.blockTitle')
            for(var a in aa){
                animateEasyClicks(aa[a],a,"generateEasyClicks(1,'#'+unShorten(this.innerText.trim()))");
            }
            break;
        case 1:
            var bb = [...document.querySelector(element).querySelectorAll('.option')];
			bb.unshift(document.querySelector(element).querySelector('.blockTitle'));
			console.warn(bb);
bb.push(document.querySelector(element).querySelector('.blockTitle'));
            for(var b in bb){
				if(b==0){
                animateEasyClicks(bb[b],b,"generateEasyClicks(0,'document.querySelector(&quot;#chipHouse&quot;)')",false,true);
				}else{
if(b==4){
animateEasyClicks(bb[b],b,"refreshMe(document.querySelector('#"+unShorten(bb[0].innerText.split('-')[1].trim())+"',true).children[0])",17);

}else{
					 animateEasyClicks(bb[b],b,"generateEasyClicks(2,'"+element+"|"+(b-1)+"')");
}
				}
            }
            break;
			 case 2:
			 var pcc=element.split('|');
            var cc = [...document.querySelector(pcc[0]).querySelectorAll('.option')]
			cc.unshift(document.querySelector(pcc[0]).querySelectorAll('.option')[pcc[1]]);
            for(var c in cc){
				if(c==0){
					animateEasyClicks(cc[c],c,"generateEasyClicks(1,'"+element.split("|")[0]+"')",false,true);
				}else{
                animateEasyClicks(cc[c],c,false,[0,13,14,15][c]);
				}
            }
            break;
    }
}
function removeEasyClick(p){
	try{
    p.style.left = "100vw";
    setTimeout(function(){
        p.remove();
    },1000)
	}catch(e){}
}
function animateEasyClicks(element,n, func, differentText, backButton){
  
setTimeout(function(){
    var newElement = document.createElement('div');	
	newElement.style.color = "var(--bg)";
    newElement.style.backgroundColor =  "var(--second)"
    newElement.style.fontSize = "var(--size2)";
var EITS =  element.innerText.split('-');

    newElement.innerText = element.innerText;

    newElement.style.borderRadius = "5px";
    newElement.style.position = "absolute";
    newElement.style.padding = 0
    newElement.setAttribute('class','easyClickButton');
    var eb = element.getBoundingClientRect();
    newElement.style.left = eb.x+"px";
    newElement.style.top = eb.y+"px";
    newElement.style.width = eb.width+"px";
    newElement.style.height = eb.height+"px";
    newElement.style.zIndex = "5";
    document.body.append(newElement);
    setTimeout(function(){
		//newElement.style.backgroundColor = "var(--second);";
		newElement.style.backgroundColor = "var(--accent)";
        newElement.style.left = "0em";
			 newElement.style.width = "100vw";
        newElement.style.top = "calc("+eb.top+"px + "+(Math.round(Math.random()*20)/5)+"em)";
        newElement.style.borderRadius = "0";
		newElement.style.fontSize = "var(--size2)";	
		setTimeout(function(){
			
			newElement.style.padding = "0.25em";
			

		var left = [...document.querySelectorAll('.easyClickButton')][n-1] || {getBoundingClientRect: function(){return({width: 2, left: 0})}}
		console.warn(left);
		left = left.getBoundingClientRect() || 2
		left = left.width+left.left || 2
            newElement.style.left = "calc(0.5em + "+left+"px)";
			var ebb = document.querySelector('#mainInp').getBoundingClientRect();
            newElement.style.top = "calc("+ebb.y+"px - 2em)";
			setTimeout(function(){newElement.setAttribute('done','1')},100);
            newElement.style.width = "max-content";
			newElement.style.height = "1em";
			newElement.style.overflowY = "hidden";

if(EITS.length>1){
    newElement.innerText = shorten(EITS[1],2);
}else{
newElement.innerText= shorten(element.innerText,2);
}
if(differentText){
				newElement.innerText = shorten(words[navLang][differentText],2);
			}
if(backButton){
newElement.innerText = "<-";
newElement.style.fontWeight = "bold";
}

            newElement.style.borderRadius = "5px";
            newElement.setAttribute('onclick',func)
        },500)
    },400)
},205 * n)
}
var currentSongPlaying = "";
function playSong(songURL){
    //playSong logic
    //would probably include a 30s timeout and check if song is still open to make sure the user acc wanted to play it, then...
    currentSongPlaying = songURL;
    var listened = localStorage.getItem('fm_listened');
    listened = listened.split('|');
    listened.push(songURL)
}
function makePreferenceBlocks(){
    var a = document.querySelector('#preferenceBlocks');
    var counter = 0;
    for(var i of a.children){
        i.innerText=words[navLang][18+counter];
        counter++;
    }
    a.style.right = "1em";
}
var currentL = 2;
function reloadMusic(l){
    var cn1 = currentchips.songN;
    var cn2 = currentchips.albumN;
    var cn3 = currentchips.playlistN;
    var cn4 = currentchips.artistN;
  var x = new Date();
    var x2 = x.getDate().toString().padStart(2,'0') + x.getMonth().toString().padStart(2,'0');
    var y = localStorage.getItem(x2+'_fm_'+value);
        currentChips = JSON.parse(y);
        currentChips.songN = cn1;
        currentChips.albumN = cn2;
        currentChips.playlistN = cn3;
        currentChips.artistN = cn4;
   switch(l){
       case 0:
       for(var big of currentChips){
           for(var small of big){
               if(localStorage.getItem('fm_listened').includes(small[0].split('=')[1])){
                   big[big.indexOf(small)] = "FM_TOBEREMOVED"
               }
           }
       }
       break;
        case 1:
        for(var big of currentChips){
           for(var small of big){
               if(!localStorage.getItem('fm_listened').includes(small[0].split('=')[1])){
                   big[big.indexOf(small)] = "FM_TOBEREMOVED"
               }
           }
       }
       break;
        case 2:
        //do nothing :) 🚢
       break;
   }
}
function walkToBlock(t){
    var w = document.querySelector('#walker');
    w.style.opacity = 1;
    var p = document.querySelector('#preferenceBlocks');
    var pb = p.getBoundingClientRect();
    w.style.opacity = 1;
    var count = 0;
    var r = document.querySelector('#walkerRibbon');
    var walkInterval = setInterval(function(pb,w,t){
       var wb = w.getBoundingClientRect();
     
       var puppet = document.createElement('div');
       puppet.style.left = wb.x+"px";
       puppet.style.width = "0.25em";
       puppet.style.height = "1em";
       puppet.style.top = wb.y+"px";
       document.body.append(puppet);
       puppet.setAttribute('id','puppet');
       puppet.style.position = "absolute";
       puppet.style.display = "block"
      
       //Credits for the em -> px comparison.
       // Source - https://stackoverflow.com/a/10465984
// Posted by mgiuffrida, modified by community. See post 'Timeline' for change history
// Retrieved 2026-10-29, License - CC BY-SA 4.0
puppet.style.transform = "rotate(0)";
       puppet.style.left = (wb.x + (2*parseFloat(getComputedStyle(document.querySelector('#chipHouse')).fontSize))) +"px";
       puppet.style.transform = "rotate(45deg)";
       puppet.style.transition = 0;
        var ppb = puppet.getBoundingClientRect();
        var nowOn = false;
       for(var x of p.children){
           if(x!==t){
               var xb = x.getBoundingClientRect();
               console.log([ppb.x >= xb.x,ppb.x<= xb.x+xb.width,ppb.x,xb.width,xb.x])
               if(ppb.x >= xb.x && ppb.x<= xb.x+xb.width){
                   nowOn = true;
                   console.log("YESS"+x.getAttribute('id'))
                  //  clearInterval(walkInterval);
                   puppet.style.top =  "calc(100vh - 10em)";
               }else{
                   if(!nowOn){
                    puppet.style.top =  "calc(100vh - 5em)";
                   }
               }
           }
       }
       w.style.left = puppet.getBoundingClientRect().left+"px";
       w.style.top = puppet.getBoundingClientRect().y+"px";
       w.style.transform = "rotate("+(45+(90*count))+"deg)";
       count++;
       var wb = w.getBoundingClientRect();
       if(wb.x >= t.getBoundingClientRect().x - 20){
           setTimeout(function(){
           //select
           w.style.transform = "rotate(0)";
           r.style.left = wb.x+wb.width+"px";
           r.style.display="block";
           r.style.transition = "0.1s";
           r.style.width = t.getBoundingClientRect().width+"px";
           r.style.height = t.getBoundingClientRect().height+"px";
           currentL = t.getAttribute('level');
           },500)
           //reloadMusic(currentL);
           clearInterval(walkInterval);
           
       }
       setTimeout(function(){
       puppet.remove();
       },150)
    },100,pb,w,t)
}