var computer = []
var user = []
var options = document.querySelectorAll('.option') 
var rows = document.getElementsByClassName('chance')
var effectsContainer = document.getElementsByClassName('effect')
var computerSlots = document.getElementsByClassName('computer slot')
var firstcount = 0
var secondcount = 0
var rowIncrement = 1
var effectIncrement = 1
var colors = {
    1:"green",
    2:"purple",
    3:"red",
    4:"yellow"
}

computerCombination(1,4);

  function computerCombination (min, max) {
        for (var i = 0; i < 4; i++)
        computer[i] = Math.round(Math.random() * (max - min)) + min;
        //connsssole.log(computer)
 }

function insertColor (){
   var self = this;
    var row = rows[rows.length - rowIncrement]
    //console.log("row:",row)
    var color = row.getElementsByClassName('slot'); //get to each row and their slot
     //console.log(coloor, user.length)
    color[user.length].className = color[user.length].className + ' peg ' + self.id; 
}

function insertPeg (type) {
    var slots = effectsContainer[effectsContainer.length - effectIncrement].getElementsByClassName('effect-slot');
    slots[0].className = 'slot ' + type;
  }

function clickHandler () {
    for(let i=0;i<options.length; i++){
        let option = options[i]
        let value = option.getAttribute('value')
        option.addEventListener('click', insertColor)
        option.addEventListener('click', function(){
            if(user.length < 4){
                user.push(Number(value))
               // console.log(user)
                

            } else {
                user = []
                firstcount = 0
                secondcount = 0
                user.push(Number(value))
              //  console.log(user)
            }

            if(user.length === 4){
                compare()
                user = []
                firstcount = 0
                secondcount = 0
                rowIncrement += 1;
                effectIncrement +=1;
            }
        })
    }
}

function compare (){
    var computerCopy = computer.slice(0)
    for(var i=0; i<computer.length; i++){
        if(computer[i] === user[i]){
            firstcount++
           insertPeg('yup');
           computerCopy[i] = 0
           user[i] = -1 
           if(firstcount === 4){
               alert('WOOOOOOOOOOOOOOOOO')
               clearBoard()
                user = []
                firstcount = 0
                secondcount = 0
                rowIncrement = 0;
                effectIncrement =0;
           }
        }
    }

    for (var j=0;j<computer.length;j++){
        if(computerCopy.indexOf(user[j]) !== -1){
            secondcount++
            insertPeg('almost there');
            computerCopy[computerCopy.indexOf(user[j])] = 0
        }
    }
            

     // console.log('firstcount:' + firstcount)
      if(rowIncrement === 8){
        for(var i=0;i<computerSlots.length;i++){
            computerSlots[i].className += ' ' + colors[computer[i]]
        }
        alert('nah')
    }
   
}



function clickButton () {
   var button = document.getElementById('button')
    button.addEventListener('click', function(){
        clearBoard()
        user = []
        firstcount = 0
        secondcount = 0
        rowIncrement = 1;
        effectIncrement =1;
        for(var i=0;i<computerSlots.length;i++){
            computerSlots[i].className = 'computer slot'
        }
    })
}


//clears whole board
function clearBoard () {
    //omly clears game board
    for (var i = 0; i < rows.length; i++) {
        //clear out all the rows
        rows[i].innerHTML = '';
        //re create elements in those rows
        for (var j = 0; j < 4; j++) {
          var slot = document.createElement('div');
          slot.className = 'slot';
          rows[i].appendChild(slot);
        }
    }

    //only clears the effects board
    for(var i=0; i<effectsContainer.length; i++){
       //getting to the element slot
        var clearEffects = effectsContainer[i].getElementsByClassName('slot');
        // setting class back to 'effect-slot slot' from 'slot hit'
        for(var j=0; j<4;j++){
           clearEffects[j].className = 'effect-slot slot'
        }
    }
    computerCombination(1,4);
}
clickHandler()
clickButton()