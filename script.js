

const universo = document.getElementById('universo');
const camera = document.querySelector('.camera');

const modal = document.querySelector('.modal');
const fechar = document.querySelector('.fechar');

const modalTitulo = document.getElementById('modalTitulo');
const modalTexto = document.getElementById('modalTexto');
const modalImagem = document.getElementById('modalImagem');

const barra = document.querySelector('.progresso-barra');
const textoProgresso = document.querySelector('.progresso-texto');

const final = document.querySelector('.final');

const especiais =
document.querySelectorAll('.especial');

let estrelasVisitadas = 0;



for(let i = 0; i < 900; i++){

    const estrela = document.createElement('div');

    estrela.classList.add('estrela');

    estrela.style.left =
    Math.random() * 100 + '%';

    estrela.style.top =
    Math.random() * 100 + '%';

    universo.appendChild(estrela);

}


let moverX;
let moverY;



function centralizarUniverso(){

    moverX =
    -(universo.offsetWidth / 2) +
    (window.innerWidth / 2);

    moverY =
    -(universo.offsetHeight / 2) +
    (window.innerHeight / 2);

    universo.style.transform =
    `translate(${moverX}px, ${moverY}px)`;

}

window.addEventListener('load', ()=>{

    centralizarUniverso();

});

window.addEventListener('resize', ()=>{

    centralizarUniverso();

});



let pressionando = false;

let inicioX = 0;
let inicioY = 0;


camera.addEventListener('mousedown', (e)=>{

    pressionando = true;

    inicioX = e.clientX - moverX;
    inicioY = e.clientY - moverY;

    camera.style.cursor = 'grabbing';

});

window.addEventListener('mouseup', ()=>{

    pressionando = false;

    camera.style.cursor = 'grab';

});

window.addEventListener('mousemove', (e)=>{

    if(!pressionando) return;

    moverX = e.clientX - inicioX;
    moverY = e.clientY - inicioY;

    limitar();

});



camera.addEventListener('touchstart', (e)=>{

    pressionando = true;

    inicioX =
    e.touches[0].clientX - moverX;

    inicioY =
    e.touches[0].clientY - moverY;

});

window.addEventListener('touchend', ()=>{

    pressionando = false;

});

window.addEventListener('touchmove', (e)=>{

    if(!pressionando) return;

    moverX =
    e.touches[0].clientX - inicioX;

    moverY =
    e.touches[0].clientY - inicioY;

    limitar();

});



function limitar(){

    const limiteX =
    -(universo.offsetWidth - window.innerWidth);

    const limiteY =
    -(universo.offsetHeight - window.innerHeight);

    if(moverX > 0){
        moverX = 0;
    }

    if(moverX < limiteX){
        moverX = limiteX;
    }

    if(moverY > 0){
        moverY = 0;
    }

    if(moverY < limiteY){
        moverY = limiteY;
    }

    universo.style.transform =
    `translate(${moverX}px, ${moverY}px)`;

}



especiais.forEach((estrela)=>{

    estrela.addEventListener('click', ()=>{

        modalTitulo.innerText =
        estrela.dataset.titulo || '';

        modalTexto.innerText =
        estrela.dataset.texto || '';

        if(estrela.dataset.img){

            modalImagem.src =
            estrela.dataset.img;

            modalImagem.style.display = 'block';

        }else{

            modalImagem.style.display = 'none';

        }

        modal.classList.add('ativo');

        if(!estrela.classList.contains('visitada')){

            estrela.classList.add('visitada');

            estrelasVisitadas++;

            atualizarProgresso();

        }

    });

});



fechar.addEventListener('click', ()=>{

    modal.classList.remove('ativo');

});

modal.addEventListener('click', (e)=>{

    if(e.target === modal){

        modal.classList.remove('ativo');

    }

});



function atualizarProgresso(){

    const total =
    especiais.length;

    const porcentagem =
    Math.floor(
        (estrelasVisitadas / total) * 100
    );

    barra.style.width =
    porcentagem + '%';

    textoProgresso.innerText =
    porcentagem + '% descoberto';

    if(porcentagem >= 100){

        mostrarMensagemFinal();

    }

}



function mostrarMensagemFinal(){

    setTimeout(()=>{

        final.classList.add('ativo');

    }, 1000);

}