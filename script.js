const html = document.querySelector('html')
const botoes = document.querySelectorAll('.app__card-button')
const banner = document.querySelector('.app__image')
const titulo = document.querySelector('.app__title')
const musicaFocoInput = document.getElementById('alternar-musica')
const musica = new Audio('./sons/luna-rise-part-one.mp3')
musica.loop = true

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
