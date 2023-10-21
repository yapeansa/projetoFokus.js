const html = document.querySelector('html')
const botoes = document.querySelectorAll('.app__card-button')
const banner = document.querySelector('.app__image')
const titulo = document.querySelector('.app__title')
const startPauseBt = document.getElementById('start-pause')
const musicaFocoInput = document.getElementById('alternar-musica')
const tempoNaTela = document.querySelector('#timer')

const musica = new Audio('./sons/luna-rise-part-one.mp3')
const iniciarPlay = new Audio('./sons/play.wav')
const iniciarPause = new Audio('./sons/pause.mp3')
const beep = new Audio('./sons/beep.mp3')
let tempoDecorridoEmSegundos = 1500
let intervaloId = null

musica.loop = true

function mostrarTempo() {
    const tempo = new Date(tempoDecorridoEmSegundos * 1000)
    const tempoFormatado = tempo.toLocaleString('pt-br', { minute: '2-digit', second: '2-digit' })
    tempoNaTela.innerHTML = `${tempoFormatado}`
}

function contagemRegressiva() {
    //console.log(tempoDecorridoEmSegundos)
    if (tempoDecorridoEmSegundos <= 0) {
        zerar()
        beep.paused ? beep.play() : beep.pause()
        startPauseBt.childNodes[3].textContent = "Começar"
        startPauseBt.childNodes[1].setAttribute('src', './imagens/play_arrow.png')
        const atributoDocumento = html.getAttribute('data-contexto')
        switch (atributoDocumento) {
            case 'descanso-longo':
                tempoDecorridoEmSegundos = 900
                break
            case 'descanso-curto':
                tempoDecorridoEmSegundos = 300
                break
            default:
                tempoDecorridoEmSegundos = 1500
                break
        }
        return
    }
    tempoDecorridoEmSegundos -= 1
    mostrarTempo()
}

function iniciarOuPausar() {
    (iniciarPlay.paused && !intervaloId) ? iniciarPlay.play() : iniciarPlay.pause()
    if (intervaloId) {
        iniciarPause.paused ? iniciarPause.play() : iniciarPause.pause()
        startPauseBt.childNodes[3].textContent = "Começar"
        startPauseBt.childNodes[1].setAttribute('src', './imagens/play_arrow.png')
        zerar()
        return
    }
    intervaloId = setInterval(contagemRegressiva, 1000)
    startPauseBt.childNodes[3].textContent = "Pausar"
    startPauseBt.childNodes[1].setAttribute('src', './imagens/pause.png')
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

function alterarContexto(contexto, botao, tempoId) {
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
    tempoDecorridoEmSegundos = tempoId
    mostrarTempo()
}

botoes.forEach(botao => {
    botao.addEventListener('click', () => {
        botoes.forEach(botao => botao.classList.remove('active'))
        const atributo = botao.getAttribute('data-contexto')
        if (atributo === 'short') {
            alterarContexto('descanso-curto', botao, 300)
        } else if (atributo === 'long') {
            alterarContexto('descanso-longo', botao, 900)
        } else {
            alterarContexto('foco', botao, 1500)
        }
    })
})

mostrarTempo()
