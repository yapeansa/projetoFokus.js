const html = document.querySelector('html')
const botoes = document.querySelectorAll('.app__card-button')
const banner = document.querySelector('.app__image')
const titulo = document.querySelector('.app__title')
const startPauseBt = document.getElementById('start-pause')
const musicaFocoInput = document.getElementById('alternar-musica')
const musica = new Audio('./sons/luna-rise-part-one.mp3')
const iniciarPlay = new Audio('./sons/play.wav')
const iniciarPause = new Audio('./sons/pause.mp3')
const beep = new Audio('./sons/beep.mp3')
let tempoDecorridoEmSegundos = 5
let intervaloId = null

musica.loop = true

const contagemRegressiva = () => {
    console.log(tempoDecorridoEmSegundos)
    if (tempoDecorridoEmSegundos <= 0) {
        zerar()
        beep.paused ? beep.play() : beep.pause()
        return
    }
    tempoDecorridoEmSegundos -= 1
}

function iniciarOuPausar() {
    (iniciarPlay.paused && !intervaloId) ? iniciarPlay.play() : iniciarPlay.pause()
    if (intervaloId) {
        iniciarPause.paused? iniciarPause.play() : iniciarPause.pause()
        zerar()
        return
    }
    intervaloId = setInterval(contagemRegressiva, 1000)
}

function zerar() {
    clearInterval(intervaloId)
    intervaloId = null
}

startPauseBt.addEventListener('click', iniciarOuPausar)

musicaFocoInput.addEventListener('change', () => {
    if (musica.paused) {
        musica.play()
    } else {
        musica.pause()
    }
})

const alterarContexto = (contexto, botao) => {
    html.setAttribute('data-contexto', `${contexto}`)
    banner.setAttribute('src', `./imagens/${contexto}.png`)

    switch (contexto) {
        case 'descanso-curto':
            titulo.innerHTML = `
Que tal dar uma respirada?<br>
<strong class="app__title-strong">Faça uma pausa curta!</strong>
            `
            break
        case 'descanso-longo':
            titulo.innerHTML = `
Hora de voltar à superfície.<br>
<strong class="app__title-strong">Faça uma pausa longa.</strong>
            `
            break
        default:
            titulo.innerHTML = `
Otimize sua produtividade,<br>
<strong class="app__title-strong">mergulhe no que importa.</strong>
            `
            break
    }

    !botao.classList.contains('active') ? botao.classList.add('active') : ''
}

const focoBotao = () => {

}

botoes.forEach(botao => {
    botao.addEventListener('click', () => {
        botoes.forEach(botao => botao.classList.remove('active'))
        const atributo = botao.getAttribute('data-contexto')
        if (atributo === 'short') {
            alterarContexto('descanso-curto', botao)
        } else if (atributo === 'long') {
            alterarContexto('descanso-longo', botao)
        } else {
            alterarContexto('foco', botao)
        }
    })
})
