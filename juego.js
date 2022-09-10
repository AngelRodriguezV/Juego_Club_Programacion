// JavaScript Document
document.addEventListener('keydown',function(evento){
		if(evento.keyCode==32){
			console.log("salta");
			if(nivel.muerto==false)
			  //if(jugador.saltando!=true)
                  saltar();
			else{
				nivel.velocidad=9;
				nube.velocidad=1;
				soldado.x=ancho + 100;
				nube.x=ancho+100;
				nivel.marcador=0;
				nivel.muerto=false;
				}
			}	
		});

var imgJug,imgNube,imgSol,imgSuelo,imgfondo;
var imgMar=[mar01=new Image(),mar02=new Image(),mar03=new Image()];

function cargaImagenes(){
	imgJug=new Image();
	imgNube=new Image();
	imgSol=new Image();
	imgSuelo=new Image();
    imgFondo=new Image();imgFondo.src ='img/fondo.png';
	imgNube.src='img/nube.png';
	imgSol.src='img/sol2.png';
	imgSuelo.src='img/suelo.png';
	
    mar01.src='img/mar01.png';mar02.src='img/mar02.png';
    mar03.src='img/mar03.png';
	}

//ANIMACION DEL JUGADOR
var contador=0;
var tA=0;
function animarJugador(){
    if(nivel.muerto==false){
        if(jugador.saltando==true){
            imgJug=imgMar[1];
        }else{
            if(tA<=4){
                tA++;
            }
            else{
                if(contador<=3){
                    imgJug=imgMar[contador];
                    contador++;
                    tA=0;
                }else{
                    contador=0;
                    tA=0;
                    imgJug=imgMar[contador];
                }
            }
        }
    }
    else{
        imgJug=imgMar[contador];
    }
}
	
var ancho=700;
var alto=300;
var canvas,ctx;
function inicializa(){
	canvas=document.getElementById('canvas');
	ctx= canvas.getContext('2d');
	cargaImagenes();
	}
	
	
	
function borrarCanvas(){
	canvas.width=ancho;
	canvas.height=alto;
	}

   var suelo=200;
   var jugador={y: suelo, vy:0, gravedad:2, salto:28, vymax:9, saltando: false};
   var nivel={velocidad:9,marcador:0,muerto:false};
   var soldado={x: ancho + 100 ,y:suelo};
   var nube={x: 400,y:100,velocidad:1};
   var suelog={x:0, y:suelo+35};
   
   function dibujaJugador(){
	ctx.drawImage(imgJug,0,0,55,110,100,jugador.y,40,65);
	}
	//------------------------------------------------------------------
	function dibujaSoldado(){
		ctx.drawImage(imgSol,0,0,50,110,soldado.x,soldado.y,40,65);
		
		}
		
		function logicaSoldado(){
			if(soldado.x<-100){
				soldado.x=ancho+100;
				nivel.marcador++;
				}
				else{
					soldado.x-=nivel.velocidad;
					}
			}
	
	//_--------------------------------------------
	
	
	 function dibujaSuelo(){
	ctx.drawImage(imgSuelo,0,0,650,70,0,suelog.y,1000,30);
	}
	
	
		
		function logicaSuelo(){
			if(suelog.x>100){
				suelog.x=0;
				}
				else{
					suelog.x+=nivel.velocidad;
					}
			}
	
	//---------------------------------------------
function dibujarFondo(){
    ctx.drawImage(imgFondo,0,0,1000,300,0,0,700,300)
}
   
   //----------------------------------------------
   function dibujaNube(){
			ctx.drawImage(imgNube,0,0,82,33,nube.x,nube.y,82,31);	
								
			}
								
								
			function logicaNube(){
			if(nube.x<-100){
				nube.x=ancho+100;
				}
				else{
					nube.x-=nube.velocidad;
					}
			}

function saltar(){
	jugador.saltando=true;
	jugador.vy=jugador.salto;
	
	}

function gravedad(){
	if(jugador.saltando==true){
		if(jugador.y - jugador.vy -jugador.gravedad >suelo){
            
			jugador.saltando=false;
			jugador.vy= 0;
			jugador.y=suelo;
			
        }
			else{
		jugador.vy -=jugador.gravedad;
		jugador.y -=jugador.vy;
			}
			
		}
	
	}
	
function colision(){
	//soldado.x
	//tmar.y
	if(soldado.x>=100 && soldado.x<=150){
		if(jugador.y>=suelo-25){
			nivel.muerto=true;
			nivel.velocidad=0;
			nube.velocidad=0;
			}
		}
		
	}
	
	
	
	function puntuacion(){
		ctx.font="30px impact";
		ctx.fillStyle='#555555';
		ctx.fillText(`${nivel.marcador}`,600,50);
		if(nivel.muerto==true){
			ctx.font="60px impact";
			ctx.fillText(`PERDISTE`,240,150);}
		
		
		}
//---------------------------------------------------------------
//Bucle principal
var FPS=60;
setInterval(function(){
			principal();
			 },1000/FPS);
function principal(){
	borrarCanvas();
    dibujarFondo();
    animarJugador();
	gravedad();
	colision();
	logicaSuelo();
	logicaSoldado();
	logicaNube();
	 dibujaSuelo();
	dibujaSoldado();
	
	dibujaNube();
	dibujaJugador();
	puntuacion();
	
}