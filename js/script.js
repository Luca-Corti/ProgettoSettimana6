const mieImg = ["arrabbiato", "bello", "piangere", "ridere", "amare", "amare1", "spavento", "shock", "arrabbiato", "bello",
    "piangere", "ridere", "amare", "amare1", "spavento", "shock"];
// creo una variabile che mi contiene le immagini cliccate e un contatore di click
var clickedImgs = [];
var click = 0;    
//funzione che randomizza array
function shuffle(array) {
        var currentIndex = array.length;
        var temporaryValue, randomIndex;

        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;
    }
 
$(document).ready(function () {
    var audio = document.getElementById('player');
    $('#gioca p').click(function(){
        audio.volume=0.1;
        audio.play();
        $(this).parent().fadeOut(1500);
    })
    $('.unmuted').click(function(){
        $(this).toggleClass('muted');
        if(audio.volume>0.0){
            audio.volume=0.0;
        }
        else{
            audio.volume=0.1
        }
    })
    // quando il documento è pronto...vado a randomizzare array immagini
    shuffle(mieImg)
    console.log(mieImg);

//faccio un ciclo che crea 16 div con all'interno 16 immagini, con src e alt in base all'indice nell'array, ed id in base alla posizione nella griglia
    for (let i = 0; i < 16; i++) {
        let card = '<div class="images"><img id="' + i + '"src="img/' + mieImg[i] + '.png" width="130px" height="130px" alt="' + mieImg[i] + '"></div>';
        $(card).appendTo(".griglia");
    }
// al click dei div:
    $('.images').click(function () {
        click += 1;                                                             //aggiorno contatore
        $('#clicks').text('' + click + '');
        let currentimg = $(this).children();                                    //mostro immagine
        currentimg.css("display", "block");
        clickedImgs.push(currentimg.attr('alt'));                               //salvo in un array l'attributo alt e id(oppure src e id). L'id(posizione nella griglia) mi serve per prevenire che l'utente possa cliccare due volte sulla stessa immagine
        clickedImgs.push(currentimg.attr('id'));
        console.log(clickedImgs);
        if (clickedImgs.length == 4) {                                          //quando ho fatto due click => array ha 4 valori
            let primoClick= $('img[alt="' + clickedImgs[0] + '"]');
            let secondoClick=$('img[alt="' + clickedImgs[2] + '"]');
            if (clickedImgs[1] !== clickedImgs[3]) {                                   //se l'utente non ha cliccato due volte sulla stessa immagine
                if (clickedImgs[0] !== clickedImgs[2]) {                                        //se le immagini sono diverse: resetto array e nascondo immagini
                    primoClick.fadeOut(500);        
                    secondoClick.fadeOut(500);
                    clickedImgs = [];
                }
                else {    
                    primoClick.addClass("found").click(false);     
                    secondoClick.addClass("found").click(false);                        //altrimenti resetto array, disabilito immagini uguali
                    clickedImgs = [];
                    var effect = document.getElementById('effects');
                    effect.volume=0.1;
                    effect.play();
                }
            } else {                                                                   //altrimenti cancello gli ultimi due valori del mio array e l'utente può cliccare altre immagini
                clickedImgs.pop();
                clickedImgs.pop();
            }

        }
        console.log($('.found').length)
        if($('.found').length==16){
            $('.container').append('<div class="modale"><h2>Hai Vinto!</h2><img src="img/victory.png" class="victory">' 
            +'<p>Il tuo punteggio è di '+click+'.</p><button type="button" class="rigioca" id="chiudi">Chiudi</button></div>');
           
            var victory = document.getElementById('victory');
            victory.volume=0.2;
            if(audio.volume>0.0){
                audio.volume=0.03;
            }
            victory.play();
            victory.onended = function() {
                if(audio.volume>0.0){
                    audio.volume=0.1;
                }
            };

            $('#chiudi').click(function(){
                $('.modale').remove();
            })
        }
    })

    $('.rigioca').click(function(){
        location.reload();
    })
    
})
