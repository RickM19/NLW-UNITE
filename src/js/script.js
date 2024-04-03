
let participantes = [
    {
      nome: "Diego Fernandes",
      email: "diego@gmail.com",
      dataInscricao: new Date(2024, 2, 1, 19, 23),
      dataCheckIn: new Date(2024, 2, 1, 20, 20)
    },
    {
      nome: "Mayk Brito",
      email: "mayk@gmail.com",
      dataInscricao: new Date(2024, 2, 23, 19, 23),
      dataCheckIn: new Date(2024, 2, 25, 20, 20)
    },
    {
      nome: "Ana Souza",
      email: "ana@gmail.com",
      dataInscricao: new Date(2024, 0, 3, 19, 23),
      dataCheckIn: new Date(2024, 0, 4, 20, 20)
    },
    {
      nome: "João Silva",
      email: "joao@gmail.com",
      dataInscricao: new Date(2023, 11, 4, 19, 23),
      dataCheckIn: new Date(2023, 11, 5, 20, 20)
    },
    {
      nome: "Maria Oliveira",
      email: "maria@gmail.com",
      dataInscricao: new Date(2023, 10, 5, 19, 23),
      dataCheckIn: new Date(2023, 10, 6, 20, 20)
    },
    {
      nome: "Pedro Santos",
      email: "pedro@gmail.com",
      dataInscricao: new Date(2023, 9, 6, 19, 23),
      dataCheckIn: new Date(2023, 9, 7, 20, 20)
    },
    {
      nome: "Carla Lima",
      email: "carla@gmail.com",
      dataInscricao: new Date(2023, 8, 7, 19, 23),
      dataCheckIn: new Date(2023, 8, 8, 20, 20)
    },
    {
      nome: "Lucas Sousa",
      email: "lucas@gmail.com",
      dataInscricao: new Date(2023, 7, 8, 19, 23),
      dataCheckIn: new Date(2023, 7, 9, 20, 20)
    },
    {
      nome: "Paula Costa",
      email: "paula@gmail.com",
      dataInscricao: new Date(2023, 6, 9, 19, 23),
      dataCheckIn: new Date(2023, 6, 10, 20, 20)
    },
    {
      nome: "Gabriel Almeida",
      email: "gabriel@gmail.com",
      dataInscricao: new Date(2023, 5, 10, 19, 23),
      dataCheckIn: new Date(2023, 5, 11, 20, 20)
    }
  ];
const criarParticipante = (participante) => {
    const dataInscricao = dayjs(Date.now()).to(participante.dataInscricao)
    let dataCheckIn = dayjs(Date.now()).to(participante.dataCheckIn)

  if(participante.dataCheckIn == null){
      dataCheckIn = `
        <button
          data-email="${participante.email}"
          onclick="fazerCheckIn(event)"
        >
            Confirmar Check-in
        </button>
    `
  }

    return `
<tr>
    <td>
        <strong>${participante.nome}</strong>
        <br>
        <small>${participante.email}</small>
    </td>
    <td>${dataInscricao}</td>
    <td>${dataCheckIn}</td>
</tr>
    `
}

const atualizarLista = (participantes) => {
    let output = ""
    for(let participante of participantes) {
        output += criarParticipante(participante)
    }
    
    document.querySelector("tbody").innerHTML = output
    
}
atualizarLista(participantes)

// pegar os dados do formulario
// event = onsubmit
// form data -> pega os dados
// event.target -> pega os dados do formulario criado
const adicionarParticipante = (event) => {
  event.preventDefault()

  const dadosDoFormulario = new FormData(event.target)

  const participante = {
    nome: dadosDoFormulario.get('nome'),
    email: dadosDoFormulario.get('email'),
    dataInscricao: new Date(),
    dataCheckIn: null
  }

  // verificar se o participante ja existe
  const participanteExiste = participantes.find((p) => p.email == participante.email)

  if (participanteExiste) {
    alert("Email já cadastrado!")
    return
  }

  participantes = [participante, ...participantes]
  atualizarLista(participantes)

  // limpar o forms
  event.target.querySelector(['name="nome"']).value = ""
  event.target.querySelector(['name="email"']).value = ""
}


const fazerCheckIn = (event) => {
    //confirmar  se realmente quer o checkIn
    const mensagem = 'Tem certeza que deseja realizar o Check-In?'
    if (confirm(mensagem) == false) {
      return
    }
    // encontrar o participante do botao clicado
    const participante = participantes.find((p) => {
        return p.email == event.target.dataset.email
    })

    // atualizar o eheckin
    participante.dataCheckIn = new Date()

    // atualizar a lista de participantes
    atualizarLista(participantes)
}