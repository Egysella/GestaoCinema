const salas = [];
const filmes = [];
const sessoes = [];
const reservas = [];


//Função listar salas / botoes salas
// Função para listar salas com editar
function listarSalas() {
	fetch('http://localhost:3000/salas')
		.then(response => response.json())
		.then(data => {
			const lista = document.getElementById('lista-salas');
			lista.innerHTML = ''; 
			data.forEach(sala => {
				const li = document.createElement('li');
				li.className = 'item-sala';

				const texto = document.createElement('span');
				texto.innerHTML = `Nome: ${sala.nome}<br>
				Capacidade: ${sala.capacidade}`;

				const botaoDeletar = document.createElement('button');
				botaoDeletar.textContent = 'Deletar';
				botaoDeletar.onclick = () => deletarSala(sala.id);

				const botaoEditar = document.createElement('button');
				botaoEditar.textContent = 'Editar';
				botaoEditar.onclick = () => editarSala(sala.id, sala.nome, sala.capacidade);

				li.appendChild(texto);
				li.appendChild(botaoEditar);
				li.appendChild(botaoDeletar);
				lista.appendChild(li);
			});
		})
		.catch(error => console.error('Erro ao listar sala:', error));
}
// Função para editar sala
function editarSala(id, nome, capacidade) {
	document.getElementById('nome-sala').value = nome;
	document.getElementById('capacidade-sala').value = capacidade;
	document.getElementById('salas-form').onsubmit = (e) => {
		e.preventDefault();
		atualizarSala(id);
		deletarSala(id);
	};
}

// Função para atualizar sala
function atualizarSala(id) {
	const nome = document.getElementById('nome-sala').value;
	const capacidade = document.getElementById('capacidade-sala').value;

	fetch(`http://localhost:3000/salas/${id}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ nome, capacidade }),
	})
		.then(response => response.json())
		.then(() => {
			listarSalas(); // Atualiza a lista após editar
			document.getElementById('salas-form').reset(); // Limpa o formulário
		})
		.catch(error => console.error('Erro ao atualizar sala:', error));
}
// Função para listar filmes com editar
function listarFilmes() {
	fetch('http://localhost:3000/filmes')
		.then(response => response.json())
		.then(data => {
			const lista = document.getElementById('lista-filmes');
			lista.innerHTML = ''; 
			data.forEach(filme => {
				const li = document.createElement('li');
				li.className = 'item-filme';

				const texto = document.createElement('span');
				texto.innerHTML = `Título: ${filme.titulo} <br>
				 Duração: ${filme.duracao} <br>
				 Genero: ${filme.genero} <br>
				 Descrição: ${filme.descricao}`;

				const botaoDeletar = document.createElement('button');
				botaoDeletar.textContent = 'Deletar';
				botaoDeletar.onclick = () => deletarFilme(filme.id);

				const botaoEditar = document.createElement('button');
				botaoEditar.textContent = 'Editar';
				botaoEditar.onclick = () => editarFilme(filme.id, filme.titulo, filme.duracao, filme.genero, filme.descricao);

				li.appendChild(texto);
				li.appendChild(botaoDeletar);
				li.appendChild(botaoEditar);
				lista.appendChild(li);
			});
		})
		.catch(error => console.error('Erro ao listar filme:', error));
}

// Função para editar filme
function editarFilme(id, titulo, duracao, genero, descricao) {
	document.getElementById('titulo-filme').value = titulo;
	document.getElementById('duracao-filme').value = duracao;
	document.getElementById('genero-filme').value = genero;
	document.getElementById('descricao-filme').value = descricao;
	document.getElementById('filmes-form').onsubmit = (e) => {
		e.preventDefault();
		atualizarFilme(id);
		deletarFilme(id);
	};
}

// Função para atualizar filme
function atualizarFilme(id) {
	const titulo = document.getElementById('titulo-filme').value;
	const duracao = document.getElementById('duracao-filme').value;
	const genero = document.getElementById('genero-filme').value;
	const descricao = document.getElementById('descricao-filme').value;

	fetch(`http://localhost:3000/filmes/${id}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ titulo, duracao, genero, descricao }),
	})
		.then(response => response.json())
		.then(() => {
			listarFilmes(); // Atualiza a lista após editar
			document.getElementById('filmes-form').reset(); // Limpa o formulário
		})
		.catch(error => console.error('Erro ao atualizar filme:', error));
}


//Função listar sessoes / botoes sessoes
function listarSessoes() {
	fetch('http://localhost:3000/sessoes')
		.then(response => response.json())
		.then(data => {
			const lista = document.getElementById('lista-sessoes');
			lista.innerHTML = ''; 
			data.forEach(sessao => {
				const li = document.createElement('li');
				li.className = 'item-sessao';


				const texto = document.createElement('span');
				texto.innerHTML = `Filme: ${sessao.filme_titulo || 'Título não encontrado'}<br>
						Sala: ${sessao.sala_nome || 'Sala não encontrada'} <br>
						Horário: ${new Date(sessao.data_hora).toLocaleString()}
				`;

				const botao = document.createElement('button');
				botao.textContent = 'Deletar';
				botao.onclick = () => deletarSessao(sessao.sessao_id);

				li.appendChild(texto);
				li.appendChild(botao);
				lista.appendChild(li);
			});
		})
		.catch(error => console.error('Erro ao listar sessao:', error));
}


// Função listar reservas / botões reservas
function listarReservas() {
	fetch('http://localhost:3000/reservas')
		.then(response => response.json())
		.then(data => {
			const lista = document.getElementById('lista-reservas');
			lista.innerHTML = '';  // Limpa a lista antes de popular

			data.forEach(reserva => {
				const li = document.createElement('li');
				li.className = 'item-reserva';

				const texto = document.createElement('span');
				texto.innerHTML = `
				ID Sessão: ${reserva.id_reserva}<br>
				Cliente: ${reserva.nome_cliente}<br>
				Lugares: ${reserva.lugares}<br>
				Tipo Ingresso: ${reserva.tipo_ingresso}<br>
				Sessão: Filme ${reserva.filme_titulo} na sala ${reserva.sala_nome}<br>
				às ${new Date(reserva.data_hora).toLocaleString()}
			`;

				const botao = document.createElement('button');
				botao.textContent = 'Deletar';
				botao.onclick = () => deletarReserva(reserva.id_reserva);  // Certifique-se de que 'reserva.id' é o valor correto

				li.appendChild(texto);
				li.appendChild(botao);
				lista.appendChild(li);
			});
		})
		.catch(error => console.error('Erro ao listar reservas:', error));
}




// Chama a função para listar os itens ao carregar a página
listarSalas();
listarFilmes();
listarSessoes();
listarReservas();


// Funcao para adicionar uma nova sala
document.getElementById('salas-form').addEventListener('submit', (e) => {
	e.preventDefault();
	const nome = document.getElementById('nome-sala').value;
	const capacidade = document.getElementById('capacidade-sala').value;

	fetch('http://localhost:3000/salas', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ nome, capacidade }),
	})
		.then(response => response.json())
		.then(() => {
			listarSalas(); // Atualiza a lista após adicionar
			e.target.reset(); // Limpa o formulário
		})
		.catch(error => console.error('Erro ao adicionar sala:', error));
});


// Função para adicionar filmes
document.getElementById('filmes-form').addEventListener('submit', (e) => {
	e.preventDefault();
	const titulo = document.getElementById('titulo-filme').value;
	const duracao = document.getElementById('duracao-filme').value; // Campo de duração adicionado
	const genero = document.getElementById('genero-filme').value;
	const descricao = document.getElementById('descricao-filme').value;

	fetch('http://localhost:3000/filmes', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ titulo, duracao, genero, descricao }),
	})
	.then(response => {
		if (!response.ok) {
			throw new Error(`Erro HTTP: ${response.status}`); // Exibe o código de status HTTP
		}
		return response.json();
	})
	.then(() => {
		listarFilmes();
		e.target.reset();
	})
	.catch(error => console.error('Erro ao adicionar filme:', error));
	});


// Função para criar sessões
document.getElementById('sessoes-form').addEventListener('submit', (e) => {
	e.preventDefault();

	const id_filme = document.getElementById('filme-sessao').value;
	const id_sala = document.getElementById('sala-sessao').value;
	const data_hora_raw = document.getElementById('data-sessao').value;

	// Validação dos campos
	if (!id_filme || !id_sala || !data_hora_raw) {
		console.error('Por favor, preencha todos os campos obrigatórios.');
		return;
	}

	const data_hora = new Date(data_hora_raw).toISOString().slice(0, 19); 


	fetch('http://localhost:3000/sessoes', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ id_sala, id_filme, data_hora }),
	})
	.then(response => {
		if (!response.ok) {
			throw new Error(`Erro ao criar sessão: ${response.status}`);
		}
		return response.json();
	})
	.then(() => {
		listarSessoes(); // Atualiza a lista de sessões
		e.target.reset(); // Limpa o formulário
	})
	.catch(error => console.error('Erro ao adicionar sessão:', error));
});



// Função para listar filmes e preencher o select de criar sessões
function carregarFilmesParaSessao() {
	fetch('http://localhost:3000/filmes') 
		.then(response => {
			if (!response.ok) {
				throw new Error(`Erro ao carregar filmes: ${response.status}`);
			}
			return response.json();
		})
		.then(filmes => {
			const filmeSelect = document.getElementById('filme-sessao');
			filmeSelect.innerHTML = '<option value="" disabled selected>Selecione um Filme</option>'; // Limpa e adiciona o placeholder

			filmes.forEach(filme => {
				const option = document.createElement('option');
				option.value = filme.id; // Use o ID do filme como valor
				option.textContent = filme.titulo; // Exiba o título do filme
				filmeSelect.appendChild(option);
			});
		})
		.catch(error => console.error('Erro ao carregar filmes para sessões:', error));
}

// Função para fazer reservas
document.getElementById('reservas-form').addEventListener('submit', (e) => {
	e.preventDefault();
	const id_sessao = document.getElementById('sessao-reserva').value;
	const nome_cliente = document.getElementById('nome-cliente').value;
	const lugares = document.getElementById('lugares-reserva').value; 
	const tipo = document.getElementById('tipo-ingresso').value;

	console.log(id_sessao);
	console.log(nome_cliente);
	console.log(lugares);

	fetch('http://localhost:3000/reservas', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ id_sessao, nome_cliente, lugares, tipo }),
	})
		.then(response => response.json())
		.then(() => {
			listarReservas(); 
			e.target.reset(); 
		})
		.catch(error => console.error('Erro ao adicionar reserva:', error));
});


//funcoes de atualizar o select

function atualizarSalasSelect() {
	const select = document.getElementById('sala-sessao');
	select.innerHTML = salas.map(sala => `<option value="${sala.nome}">${sala.nome}</option>`).join('');
}
	
function atualizarListaFilmes() {
	const lista = document.getElementById('lista-filmes');
	lista.innerHTML = filmes.map(filme => `<li>${filme.titulo} (${filme.duracao} minutos) - ${filme.genero}</li>`).join('');
	atualizarFilmesSelect();
}

function atualizarFilmesSelect() {
	const select = document.getElementById('filme-sessao');
	select.innerHTML = filmes.map(filme => `<option value="${filme.titulo}">${filme.titulo}</option>`).join('');
}

// Função para listar salas e preencher o select de salas
function carregarSalasParaSessao() {
	fetch('http://localhost:3000/salas') 
		.then(response => {
			if (!response.ok) {
				throw new Error(`Erro ao carregar salas: ${response.status}`);
			}
			return response.json();
		})
		.then(salas => {
			const salaSelect = document.getElementById('sala-sessao');
			salaSelect.innerHTML = '<option value="" disabled selected>Selecione uma Sala</option>'; 

			salas.forEach(sala => {
				const option = document.createElement('option');
				option.value = sala.id; // Use o ID da sala como valor
				option.textContent = `${sala.nome} (Capacidade: ${sala.capacidade})`; 
				salaSelect.appendChild(option);
			});
		})
		.catch(error => console.error('Erro ao carregar salas para sessões:', error));
}

//funcoes que atualiza as sessoes
function atualizarListaSessoes() {
	const lista = document.getElementById('lista-sessoes');
	lista.innerHTML = sessoes.map(sessao => `<li>${sessao.id_filme} em ${sessao.id_sala} às ${sessao.data_hora}</li>`).join('');
	atualizarSessoesSelect();
}

function atualizarSessoesSelect() {
	const select = document.getElementById('sessao-reserva');
	select.innerHTML = sessoes.map(sessao => `<option value="${sessao.id_filme} - ${sessao.id_sala}">${sessao.id_filme} - ${sessao.id_sala}</option>`).join('');
}



// Função para preencher o select de sessões
function carregarSessoesParaReservas() {
	fetch('http://localhost:3000/sessoes')
		.then(response => response.json())
		.then(data => {
			const select = document.getElementById('sessao-reserva');
			select.innerHTML = '<option value="" disabled selected>Selecione uma Sessão</option>'; 
			data.forEach(sessao => {
				select.innerHTML += `
					<option value="${sessao.sessao_id}">
						Filme: ${sessao.filme_titulo} - \n
						Sala: ${sessao.sala_nome} - 
						Horário: ${new Date(sessao.data_hora).toLocaleString()}
					</option>
				`;
			});
		})
		.catch(error => console.error('Erro ao carregar sessões:', error));
}


//funcao deletar salas
function deletarSala(id) {

	if (confirm('Tem certeza que deseja deletar esta sala?')) {
		fetch(`http://localhost:3000/salas/${id}`, {
			method: 'DELETE',
		})
			.then(response => {
				if (!response.ok) {
					throw new Error('Erro ao deletar a sala');
				}
				return response.json();
			})
			.then(() => {
				alert('Sala deletada com sucesso!');
				listarSalas(); // atualiza a lista 
			})
			.catch(error => console.error('Erro ao deletar sala:', error));
	}
}

//funcao deletar filmes
function deletarFilme(id) {
	if (confirm('Tem certeza que deseja deletar este filme?')) {
		fetch(`http://localhost:3000/filmes/${id}`, {
			method: 'DELETE',
		})
			.then(response => {
				if (!response.ok) {
					throw new Error('Erro ao deletar o filme');
				}
				return response.json();
			})
			.then(() => {
				alert('Filme deletado com sucesso!');
				listarFilmes(); // Atualiza a lista de filmes
			})
			.catch(error => console.error('Erro ao deletar filme:', error));
	}
}

//funcao deletar sessoes
function deletarSessao(id) {

	if (confirm('Tem certeza que deseja deletar esta sessão?')) {
		fetch(`http://localhost:3000/sessoes/${id}`, {
			method: 'DELETE',
		})
			.then(response => {
				if (!response.ok) {
					throw new Error('Erro ao deletar a sessão');
				}
				return response.json();
			})
			.then(() => {
				alert('Sessão deletada com sucesso!');
				listarSessoes(); // atualiza a lista 
			})
			.catch(error => console.error('Erro ao deletar sessão:', error));
	}
}



//funcao deletar reservas
function deletarReserva(id) {

	if (confirm('Tem certeza que deseja deletar esta reserva?')) {
		fetch(`http://localhost:3000/reservas/${id}`, {
			method: 'DELETE',
		})
			.then(response => {
				if (!response.ok) {
					throw new Error('Erro ao deletar a reserva');
				}
				return response.json();
			})
			.then(() => {
				alert('Reserva deletada com sucesso!');
				listarReservas(); // atualiza a lista 
			})
			.catch(error => console.error('Erro ao deletar reserva:', error));
	}
}


// Chamar a função ao carregar a página
carregarSessoesParaReservas();

// Atualizar selects ao carregar a página
atualizarSalasSelect();
atualizarFilmesSelect();

// Chame a função ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
	carregarFilmesParaSessao(); 
	carregarSalasParaSessao();  
});


