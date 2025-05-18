document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('declaracao-form');
  const lista = document.getElementById('lista-declaracoes');

  const DECLARACAO_KEY = 'declaracoes_mei';

  function carregarDeclaracoes() {
    const dados = JSON.parse(localStorage.getItem(DECLARACAO_KEY)) || [];
    lista.innerHTML = '';

    dados.forEach(item => {
      const li = document.createElement('li');
      li.textContent = `Ano: ${item.ano} | R$ ${item.faturamento.toFixed(2)} | Funcionário: ${item.funcionario} | ${item.entregue ? 'Entregue' : 'Pendente'}`;
      lista.appendChild(li);
    });
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const ano = parseInt(document.getElementById('ano').value);
    const faturamento = parseFloat(document.getElementById('faturamento').value);
    const funcionario = document.getElementById('funcionario').value;
    const entregue = document.getElementById('entregue').checked;

    if (isNaN(ano) || isNaN(faturamento)) {
      alert('Preencha todos os campos corretamente.');
      return;
    }

    const dados = JSON.parse(localStorage.getItem(DECLARACAO_KEY)) || [];

    // Substitui se ano já existir
    const existente = dados.find(d => d.ano === ano);
    if (existente) {
      existente.faturamento = faturamento;
      existente.funcionario = funcionario;
      existente.entregue = entregue;
    } else {
      dados.push({ ano, faturamento, funcionario, entregue });
    }

    localStorage.setItem(DECLARACAO_KEY, JSON.stringify(dados));
    carregarDeclaracoes();
    form.reset();
  });

  carregarDeclaracoes();
});