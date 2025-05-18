document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('faturamento-form');
  const lista = document.getElementById('lista-faturamento');

  const FATURAMENTO_KEY = 'faturamento_mensal';

  function carregarFaturamentos() {
    const dados = JSON.parse(localStorage.getItem(FATURAMENTO_KEY)) || [];
    lista.innerHTML = '';

    dados.forEach(item => {
      const li = document.createElement('li');
      li.textContent = `${item.mes}: R$ ${item.valor.toFixed(2)}`;
      lista.appendChild(li);
    });
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const mes = document.getElementById('mes').value;
    const valor = parseFloat(document.getElementById('valor').value);

    if (!mes || isNaN(valor)) {
      alert('Preencha todos os campos corretamente.');
      return;
    }

    const dados = JSON.parse(localStorage.getItem(FATURAMENTO_KEY)) || [];

    // Substitui o mês caso já exista
    const existente = dados.find(d => d.mes === mes);
    if (existente) {
      existente.valor = valor;
    } else {
      dados.push({ mes, valor });
    }

    localStorage.setItem(FATURAMENTO_KEY, JSON.stringify(dados));
    carregarFaturamentos();
    form.reset();
  });

  carregarFaturamentos();
});