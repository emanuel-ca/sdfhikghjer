// Simple single-page vocational test with scoring for precision.
// Areas preserved: saude, tecnologia, engenharia, direito, administracao
const areas = {
  saude: {
    title: 'Área da Saúde',
    desc: 'Profissões relacionadas ao cuidado, biologia e atendimento humano. Ex: Medicina, Enfermagem, Psicologia, Nutrição, Fisioterapia.',
    img: 'images/saude.jpg',
    questions: [
      { id:'s1', q:'Você gosta de biologia e do corpo humano?', w: {'Sim':2,'Mais ou menos':1,'Não':0} },
      { id:'s2', q:'Prefere trabalhar diretamente com pessoas?', w: {'Sim':2,'Às vezes':1,'Não':0} },
      { id:'s3', q:'Gosta de rotinas de cuidado e procedimentos?', w: {'Sim':2,'Às vezes':1,'Não':0} }
    ],
    professions: [
      { name:'Medicina', scoreProfile:{'s1':2,'s2':2,'s3':2}, desc:'Formação longa; forte componente clínico.' },
      { name:'Enfermagem', scoreProfile:{'s1':1,'s2':2,'s3':2}, desc:'Atuação prática no cuidado direto.' },
      { name:'Psicologia', scoreProfile:{'s1':1,'s2':2,'s3':1}, desc:'Foco em comportamento e terapia.' }
    ]
  },
  tecnologia: {
    title:'Área da Tecnologia',
    desc:'Programação, análise, redes e segurança digital. Ex: Desenvolvimento, Cibersegurança, IA.',
    img:'images/tecnologia.jpg',
    questions:[
      { id:'t1', q:'Você gosta de lógica e resolver problemas?', w:{'Sim':2,'Mais ou menos':1,'Não':0} },
      { id:'t2', q:'Gosta de criar sistemas e aplicativos?', w:{'Sim':2,'Talvez':1,'Não':0} },
      { id:'t3', q:'Interessa-se por matemática ou algoritmos?', w:{'Sim':2,'Mais ou menos':1,'Não':0} }
    ],
    professions:[
      { name:'Desenvolvedor de Software', scoreProfile:{'t1':2,'t2':2,'t3':1}, desc:'Cria aplicações e sistemas.'},
      { name:'Analista de Sistemas', scoreProfile:{'t1':1,'t2':2,'t3':1}, desc:'Projeta soluções e integrações.'},
      { name:'Cibersegurança', scoreProfile:{'t1':2,'t2':1,'t3':1}, desc:'Protege sistemas contra ataques.'}
    ]
  },
  engenharia: {
    title:'Área da Engenharia',
    desc:'Construção, projetos e soluções práticas. Ex: Civil, Mecânica, Elétrica, Ambiental.',
    img:'images/engenharia.jpg',
    questions:[
      { id:'e1', q:'Você gosta de matemática e física?', w:{'Sim':2,'Mais ou menos':1,'Não':0} },
      { id:'e2', q:'Prefere criar soluções práticas e máquinas?', w:{'Sim':2,'Talvez':1,'Não':0} },
      { id:'e3', q:'Gosta de projetos e desenho técnico?', w:{'Sim':2,'Mais ou menos':1,'Não':0} }
    ],
    professions:[
      { name:'Engenharia Civil', scoreProfile:{'e1':2,'e2':2,'e3':1}, desc:'Foco em obras e estruturas.'},
      { name:'Engenharia Mecânica', scoreProfile:{'e1':2,'e2':2,'e3':1}, desc:'Mecânica e projetos de máquinas.'},
      { name:'Engenharia Ambiental', scoreProfile:{'e1':1,'e2':1,'e3':1}, desc:'Soluções sustentáveis e estudos ambientais.'}
    ]
  },
  direito: {
    title:'Direito e Políticas Públicas',
    desc:'Leis, justiça e defesa de direitos. Ex: Advogado, Juiz, Gestor Público.',
    img:'images/direito.jpg',
    questions:[
      { id:'d1', q:'Gosta de argumentar e defender ideias?', w:{'Sim':2,'Às vezes':1,'Não':0} },
      { id:'d2', q:'Interessa-se por leis e direitos?', w:{'Sim':2,'Talvez':1,'Não':0} },
      { id:'d3', q:'Gosta de leitura e interpretação de textos?', w:{'Sim':2,'Mais ou menos':1,'Não':0} }
    ],
    professions:[
      { name:'Advogado', scoreProfile:{'d1':2,'d2':2,'d3':2}, desc:'Atuação jurídica e defesa de clientes.'},
      { name:'Gestor Público', scoreProfile:{'d1':1,'d2':2,'d3':1}, desc:'Administração e políticas públicas.'},
      { name:'Promotor/Procurador', scoreProfile:{'d1':2,'d2':2,'d3':1}, desc:'Representação do Estado.'}
    ]
  },
  administracao: {
    title:'Administração e Abastecimento',
    desc:'Gestão, finanças e logística. Ex: Administrador, Contador, Logística.',
    img:'images/administracao.jpg',
    questions:[
      { id:'a1', q:'Gosta de organizar processos e equipes?', w:{'Sim':2,'Às vezes':1,'Não':0} },
      { id:'a2', q:'Interesse em negócios e finanças?', w:{'Sim':2,'Talvez':1,'Não':0} },
      { id:'a3', q:'Gosta de planejar e otimizar recursos?', w:{'Sim':2,'Mais ou menos':1,'Não':0} }
    ],
    professions:[
      { name:'Administrador', scoreProfile:{'a1':2,'a2':2,'a3':2}, desc:'Gestão de empresas e equipes.'},
      { name:'Contador', scoreProfile:{'a1':1,'a2':2,'a3':1}, desc:'Finanças, tributos e contabilidade.'},
      { name:'Logística', scoreProfile:{'a1':2,'a2':1,'a3':2}, desc:'Cadeia de suprimentos e operações.'}
    ]
  }
}

// initial options to pick area to explore
const initialOptions = [
  { key:'saude', label:'Cuidar de pessoas', img:'images/saude.jpg' },
  { key:'tecnologia', label:'Resolver problemas com tecnologia', img:'images/tecnologia.jpg' },
  { key:'direito', label:'Entender leis e ajudar pessoas', img:'images/direito.jpg' },
  { key:'engenharia', label:'Construir, calcular e projetar', img:'images/engenharia.jpg' },
  { key:'administracao', label:'Organizar e gerenciar recursos', img:'images/administracao.jpg' }
]

// state
let selectedArea = null
let answers = {}
let qIndex = 0

// DOM
const intro = document.getElementById('intro')
const startBtn = document.getElementById('startBtn')
const initialQuestion = document.getElementById('initialQuestion')
const initialOptionsDiv = document.getElementById('initialOptions')
const areaTest = document.getElementById('areaTest')
const areaImage = document.getElementById('areaImage')
const areaTitle = document.getElementById('areaTitle')
const areaDesc = document.getElementById('areaDesc')
const qText = document.getElementById('qText')
const qOptions = document.getElementById('qOptions')
const backBtn = document.getElementById('backBtn')
const skipBtn = document.getElementById('skipBtn')
const result = document.getElementById('result')
const resultText = document.getElementById('resultText')
const matchesDiv = document.getElementById('matches')
const restart = document.getElementById('restart')
const pq = document.getElementById('pq')
const pt = document.getElementById('pt')
const currentIdx = document.getElementById('currentIdx')
const totalIdx = document.getElementById('totalIdx')

startBtn.addEventListener('click', ()=>{
  showSection('initialQuestion')
  renderInitialOptions()
})

function renderInitialOptions(){
  initialOptionsDiv.innerHTML = ''
  initialOptions.forEach(opt=>{
    const div = document.createElement('div')
    div.className='option'
    div.innerHTML = `<img src="${opt.img}" alt="${opt.label}"><strong>${opt.label}</strong>`
    div.onclick = ()=> chooseInitial(opt.key)
    initialOptionsDiv.appendChild(div)
  })
  pq.textContent = '1'
  pt.textContent = '1'
}

function chooseInitial(key){
  selectedArea = key
  // go to area test
  qIndex = 0
  answers = {}
  showSection('areaTest')
  setupArea()
}

function setupArea(){
  const area = areas[selectedArea]
  areaImage.src = area.img
  areaTitle.textContent = area.title
  areaDesc.textContent = area.desc
  totalIdx.textContent = area.questions.length
  currentIdx.textContent = qIndex+1
  renderQuestion()
}

function renderQuestion(){
  const area = areas[selectedArea]
  const q = area.questions[qIndex]
  qText.textContent = q.q
  qOptions.innerHTML = ''
  for(const optLabel of Object.keys(q.w)){
    const b = document.createElement('div')
    b.className='option'
    b.textContent = optLabel
    b.onclick = ()=> answerCurrent(q.id, optLabel)
    qOptions.appendChild(b)
  }
  currentIdx.textContent = qIndex+1
}

function answerCurrent(qid, optLabel){
  answers[qid] = optLabel
  qIndex++
  if(qIndex >= areas[selectedArea].questions.length){
    showResult()
  } else {
    renderQuestion()
  }
}

backBtn.onclick = ()=>{
  if(qIndex>0){ qIndex-- ; delete answers[areas[selectedArea].questions[qIndex].id]; renderQuestion() }
  else { showSection('initialQuestion') }
}
skipBtn.onclick = ()=>{
  qIndex++
  if(qIndex >= areas[selectedArea].questions.length) showResult(); else renderQuestion()
}

function showResult(){
  showSection('result')
  // score professions in selected area by comparing answers to profession profiles
  const area = areas[selectedArea]
  const profScores = area.professions.map(p=>{
    let score = 0, max = 0
    for(const q of area.questions){
      const user = answers[q.id] || 'Não'
      const userVal = q.w[user] || 0
      const profVal = p.scoreProfile[q.id] || 0
      score += Math.max(0, (2 - Math.abs(userVal - profVal))) // similarity
      max += 2
    }
    const percent = Math.round((score / max) * 100)
    return {...p, percent}
  }).sort((a,b)=>b.percent-a.percent)

  resultText.textContent = `Área sugerida: ${area.title}`
  matchesDiv.innerHTML = ''
  profScores.forEach(p=>{
    const d = document.createElement('div')
    d.className='match'
    d.innerHTML = `<strong>${p.name}</strong> — ${p.percent}%<div style="font-size:13px;color:#475569;margin-top:6px">${p.desc}</div>`
    matchesDiv.appendChild(d)
  })
}

restart.onclick = ()=> location.reload()

function showSection(id){
  document.querySelectorAll('.card').forEach(c=>c.classList.remove('active'))
  document.getElementById(id).classList.add('active')
}

// initial: show intro
showSection('intro')