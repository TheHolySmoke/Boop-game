//---SOME DATA & SELECTIONS---
let bench_player_one = document.getElementById('bench_player_one');
let bench_player_two = document.getElementById('bench_player_two');
let main_grid = document.getElementById('main_grid');
let button = document.getElementById("start_button");
let start_menu = document.getElementById("start_menu");
let content = document.getElementById("content");

let kittenL = '<img src="media/p1.png" alt="kitten1" class="game_piece_L">'
let kittenR = '<img src="media/p2.png" alt="kitten2" class="game_piece_R">'



//------------------------------------------------------START GAME VIA PLAY BUTTON------------------------------------------------------

button.addEventListener("click", function(e) {
    e.preventDefault();
    content.style.display = "";
    start_menu.style.display = "none";
    let n = parseInt(document.getElementById('dim').value);
    let k = parseInt(document.getElementById('kitty').value);

//---------------------------------------------CREATE THE BOARD BASED ON THE INPUT SIZE--------------------------------------------------
    function create_board(x) {

        //---BENCHE---
        for (var i = 1; i <= k; i++) {
            var div = document.createElement("div");
            div.setAttribute("class", "cellL");
            div.setAttribute("id", i);
            bench_player_one.appendChild(div);
        }
    
        for (var i = 1; i <= k; i++) {
            var div = document.createElement("div");
            div.setAttribute("class", "cellR");
            div.setAttribute("id", i);
            bench_player_two.appendChild(div);
        }
    
        document.querySelectorAll('.cellL').forEach(cell => cell.innerHTML = kittenL)
        document.querySelectorAll('.cellR').forEach(cell => cell.innerHTML = kittenR)
    
        //---PLAYER NAME---
        document.querySelector('.pnameone').innerText = document.getElementById('p1').value
        document.querySelector('.pnametwo').innerText = document.getElementById('p2').value
    
        //---MAIN BOARD---
        for (var i = 1; i <= x * x; i++) {
    
            if (i % x == 0 || i % x == 1 || i <= x || i > x * (x - 1)) {
    
                //---BORDER---
                var div = document.createElement("div");
                div.setAttribute("class", "cell2");
                div.setAttribute("id", 'X');
                div.classList.add("border");
                main_grid.appendChild(div);
    
            } else {
    
                //---INSIDE---
                var div = document.createElement("div");
                div.setAttribute("class", "cell2");
                div.setAttribute("id", i);
                main_grid.appendChild(div);
    
            }
    
    
        }
    
        main_grid.style.gridTemplateColumns = "repeat(" + x + ", 1fr)"
        main_grid.style.gridTemplateRows = "repeat(" + x + ", 1fr)"
    
    }
    
    create_board(n + 2);


//---------------------------------------------------------ACTIONS--------------------------------------------------------------

//---SELECTIONS---
let CurrentPlayer = document.getElementById('current_player')
let Cells = document.querySelectorAll('.cell2')
let PlayerOneBench = document.querySelectorAll('.cellL')
let PlayerTwoBench = document.querySelectorAll('.cellR')
let POscore = document.querySelector('.POscore')
let PTscore = document.querySelector('.PTscore')

var HM = (n + 2)    //HORIZONTAL MANUVER
var LOM = (n + 3)   //LEFT-ORIB MANUVER
var ROM = (n + 1)   //RIGHT-ORIB MANUVER

let Turn = 1        //STARTER TURN


//----GAME LOGICS---
function logic(Cells , i ){

    //-----N HORIZONTALY-----
    if(Cells[ i + 1 ].innerHTML && Cells[i + 2].id == 'X'){
        boardToBench(i + 1)
        Cells[ i + 1 ].innerHTML = ''
        
    } else if (Cells[ i + 1 ].innerHTML && Cells[ i + 2 ].innerHTML == ''){
        Cells[ i + 2 ].innerHTML = Cells[i + 1].innerHTML
        Cells[ i + 1 ].innerHTML = ''
    }

    //----S HORIZONTALY-------
    if(Cells[ i - 1 ].innerHTML && Cells[i - 2].id == 'X'){
        boardToBench(i - 1)
        Cells[ i - 1 ].innerHTML = ''

    } else if (Cells[ i - 1 ].innerHTML && Cells[ i - 2 ].innerHTML == ''){
        Cells[ i - 2 ].innerHTML = Cells[i - 1].innerHTML
        Cells[ i - 1 ].innerHTML = ''
    }

    //-----N VERTICALLY -------
    if(Cells[i + HM].innerHTML && Cells[i + 2*HM].id == 'X'){
        boardToBench(i + HM)
        Cells[ i + HM ].innerHTML = ''

    }else if(Cells[ i + HM ].innerHTML && Cells[i + 2*HM].innerHTML == ''){
        Cells[ i + 2*HM ].innerHTML = Cells[i + HM].innerHTML
        Cells[ i + HM ].innerHTML = ''                    
    }
    //------S VERTICALLY --------
    if(Cells[i - HM].innerHTML && Cells[i - 2*HM].id == 'X'){
        boardToBench(i - HM)
        Cells[ i - HM ].innerHTML = ''

    }else if(Cells[ i - HM ].innerHTML && Cells[i - 2*HM].innerHTML == ''){
        Cells[ i - 2*HM ].innerHTML = Cells[i - HM].innerHTML
        Cells[ i - HM ].innerHTML = ''                    
    }
    //-----N ORIB LEFT-----
    if(Cells[i + LOM].innerHTML && Cells[i + 2*LOM].id == 'X'){
        boardToBench(i + LOM)
        Cells[ i + LOM ].innerHTML = ''

    }else if(Cells[ i + LOM ].innerHTML && Cells[i + 2*LOM].innerHTML == ''){
        Cells[ i + 2*LOM ].innerHTML = Cells[i + LOM].innerHTML
        Cells[ i + LOM ].innerHTML = ''                    
    }
    //-----S ORIB RIGHT -----
    if(Cells[i - LOM].innerHTML && Cells[i - 2*LOM].id == 'X'){
        boardToBench(i - LOM)
        Cells[ i - LOM ].innerHTML = ''

    }else if(Cells[ i - LOM ].innerHTML && Cells[i - 2*LOM].innerHTML == ''){
        Cells[ i - 2*LOM ].innerHTML = Cells[i - LOM].innerHTML
        Cells[ i - LOM ].innerHTML = ''                    
    }
    //-----N ORIB RIGHT -----
    if(Cells[i + ROM].innerHTML && Cells[i + 2*ROM].id == 'X'){
        boardToBench(i + ROM)
        Cells[ i + ROM ].innerHTML = ''

    }else if(Cells[ i + ROM ].innerHTML && Cells[i + 2*ROM].innerHTML == ''){
        Cells[ i + 2*ROM ].innerHTML = Cells[i + ROM].innerHTML
        Cells[ i + ROM ].innerHTML = ''                    
    }
    //----S ORIB RIGHT -----
    if(Cells[i - ROM].innerHTML && Cells[i - 2*ROM].id == 'X'){
        boardToBench(i - ROM)
        Cells[ i - ROM ].innerHTML = ''

    }else if(Cells[ i - ROM ].innerHTML && Cells[i - 2*ROM].innerHTML == ''){
        Cells[ i - 2*ROM ].innerHTML = Cells[i - ROM].innerHTML
        Cells[ i - ROM ].innerHTML = ''                    
    }
}

//----Board TO BENCH----

function boardToBench(m){

    if(Cells[m].innerHTML == kittenL){

        for(let j = 0; j < PlayerOneBench.length ; j++){

            if(PlayerOneBench[j].innerHTML == ''){
                PlayerOneBench[j].innerHTML = kittenL
                break
            }   
    }

    }else if(Cells[m].innerHTML == kittenR){

        for(let j = 0; j < PlayerTwoBench.length ; j++){
            if(PlayerTwoBench[j].innerHTML == ''){
                PlayerTwoBench[j].innerHTML = kittenR
                break
            }   
        }
    }
}

//--------------------------------------------------------SCORE & WIN CHECK-------------------------------------------------------
let pnameone = document.querySelector('.pnameone')
let pnametwo = document.querySelector('.pnametwo')
let ws = parseInt(document.getElementById('score').value);
let Onescore = 0
let Twoscore = 0

//----WIN CONDITION------
function win(){
    if(Onescore == ws || (Array.from(PlayerOneBench).every(e => e.innerHTML == ''))){
        window.alert(pnameone.innerHTML + ' Wins!')

        window.location.reload();

    }else if(Twoscore == ws || Array.from(PlayerTwoBench).every(e => e.innerHTML == '')){
        window.alert(pnametwo.innerHTML + ' Wins!')

        window.location.reload();
    }
}


//---HELPER FUNCTIONS FOR MOVING THE ALIGNED KITTENS INTO BENCH---
function alignedKittiesL(){
    for(let j = 0; j < 3 ; j++){
        for(let i = 0; i < PlayerOneBench.length ; i++){

            if(PlayerOneBench[i].innerHTML == ''){
                PlayerOneBench[i].innerHTML = kittenL
                break
            }   
        }
    }
}
function alignedKittiesR(){
    for(let j = 0; j < 3 ; j++){
        for(let i = 0; i < PlayerTwoBench.length ; i++){

            if(PlayerTwoBench[i].innerHTML == ''){
                PlayerTwoBench[i].innerHTML = kittenR
                break
            }   
        }
    }
}

//----ADJACENCY CHECK----
function victoryResult(j , x){

        if(Cells[j].innerHTML === Cells[j + 1].innerHTML && Cells[j].innerHTML === Cells[j - 1].innerHTML){
            Cells[j].innerHTML = ''
            Cells[j + 1].innerHTML = ''
            Cells[j - 1].innerHTML =  ''

            for(let i = 0; i < PlayerOneBench.length ; i++){

                if(PlayerOneBench[i].innerHTML == ''){
                    PlayerOneBench[i].innerHTML = kittenL
                    break
                }   
            }

            if(x === 1){
                Onescore += 1
                POscore.innerHTML = Onescore
                alignedKittiesL()
                win()
                
            } else {
                Twoscore += 1
                PTscore.innerHTML = Twoscore
                alignedKittiesR()
                win()
            }
            win()
            
            
        } else
        if(Cells[j].innerHTML === Cells[j + HM].innerHTML && Cells[j].innerHTML === Cells[j - HM].innerHTML){
            Cells[j].innerHTML = ''
            Cells[j + HM].innerHTML = ''
            Cells[j - HM].innerHTML =  ''

            if(x === 1){
                Onescore += 1
                POscore.innerHTML = Onescore
                alignedKittiesL()
                win()
                
            } else {
                Twoscore += 1
                PTscore.innerHTML = Twoscore
                alignedKittiesR()
                win()
                
            }

            win()

        } else
        if(Cells[j].innerHTML === Cells[j + ROM].innerHTML && Cells[j].innerHTML === Cells[j - ROM].innerHTML){
            Cells[j].innerHTML = ''
            Cells[j + ROM].innerHTML = ''
            Cells[j - ROM].innerHTML =  ''
            
            if(x === 1){
                Onescore += 1
                POscore.innerHTML = Onescore
                alignedKittiesL()
                win()
                
            } else {
                Twoscore += 1
                PTscore.innerHTML = Twoscore
                alignedKittiesR()
                win()
                
            }

            win()

        } else
        if(Cells[j].innerHTML === Cells[j + LOM].innerHTML && Cells[j].innerHTML === Cells[j - LOM].innerHTML){
            Cells[j].innerHTML = ''
            Cells[j + LOM].innerHTML = ''
            Cells[j - LOM].innerHTML =  ''

            if(x === 1){
                Onescore += 1
                POscore.innerHTML = Onescore
                alignedKittiesL()
                win()
                
            } else {
                Twoscore += 1
                PTscore.innerHTML = Twoscore
                alignedKittiesR()
                win()
                
            }

            win()
        }
}

//-----ADDING SCORES----
function scoreCheck (Cells){

    for(let j = n + 3; j < (Cells.length - (n + 3)) ; j++){
        if(Cells[j].innerHTML != '' && Cells[j].innerHTML == kittenL){
            victoryResult(j , 1)

        }else if(Cells[j].innerHTML != '' && Cells[j].innerHTML == kittenR){
            victoryResult(j , 0)
            
        }
    }
}


//-------------------------------------------------GAME UPDATING AND RENDERING------------------------------------------------------

for (let i = 1; i < Cells.length; i++) {
    

    Cells[i].onclick = function() {
        win()
        //---PLAYER 1-----------
        //---TURN RECOGNITION---
        if (Turn === 1) {

            //---ERROR BLOCKER---           
            if( Cells[i].innerHTML == '' && Cells[i].id !== 'X' ){ 

            //----PLAYER 1 TURN AND MOVMENT----
                Turn = 2
                CurrentPlayer.innerHTML = pnameone.innerHTML + '\'s Turn'
                Cells[i].innerHTML = kittenL

            //----BENCH TO BOARD P1----

                for(let j = 0; j < PlayerOneBench.length ; j++){
                    if( PlayerOneBench[j].innerHTML ){
                        PlayerOneBench[j].innerHTML = ''
                        break
                    }
                }

            //----ACTION LOGIC----
                logic(Cells , i )
            
                
            //----SCORECHECK----
                scoreCheck(Cells)

                
        }

        //---PLAYER 2-----------
        //---TURN RECOGNITION---
        } else if (Turn === 2) {

            //---ERROR BLOCKER---
            if(Cells[i].innerHTML == '' && Cells[i].id !== 'X'){

            //----PLAYER 2 TURN AND MOVMENT---
                Turn = 1
                CurrentPlayer.innerHTML = pnametwo.innerHTML + '\'s Turn '
                Cells[i].innerHTML = kittenR
                
            //----BENCH TO BOARD P2----

                for(let j = 0; j < PlayerTwoBench.length ; j++){
                    if( PlayerTwoBench[j].innerHTML ){
                        PlayerTwoBench[j].innerHTML = ''
                        break
                    }
                }

            //----ACTION LOGIC----
                logic(Cells , i)


            //----SCORECHECK----
                scoreCheck(Cells)

            }

        }
    }
}

});




