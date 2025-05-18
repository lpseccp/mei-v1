document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('notas-form');
  const lista = document.getElementById('lista-notas');

  const NOTAS_KEY = 'notas_fiscais_emitidas';

  function carregarNotas() {
    const dados = JSON.parse(localStorage.getItem(NOTAS_KEY)) || [];
    lista.innerHTML = '';

    dados.forEach(item => {
      const li = document.createElement('li');
      li.textContent = `${item.data} | ${item.cliente} | ${item.descricao} | R$ ${item.valor.toFixed(2)}`;
      lista.appendChild(li);
    });
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const data = document.getElementById('data').value;
    const cliente = document.getElementById('cliente').value.trim();
    const descricao = document.getElementById('descricao').value.trim();
    const valor = parseFloat(document.getElementById('valor').value);

    if (!data || !cliente || !descricao || isNaN(valor)) {
      alert('Preencha todos os campos corretamente.');
      return;
    }

    const dados = JSON.parse(localStorage.getItem(NOTAS_KEY)) || [];
    dados.push({ data, cliente, descricao, valor });

    localStorage.setItem(NOTAS_KEY, JSON.stringify(dados));
    carregarNotas();
    form.reset();
  });

  carregarNotas();
});