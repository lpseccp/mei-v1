document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('das-form');
  const lista = document.getElementById('lista-das');

  const DAS_KEY = 'pagamentos_das';

  function carregarPagamentos() {
    const dados = JSON.parse(localStorage.getItem(DAS_KEY)) || [];
    lista.innerHTML = '';

    dados.forEach(item => {
      const li = document.createElement('li');
      li.textContent = `${item.mes} - R$ ${item.valor.toFixed(2)} - ${item.pago ? 'Pago' : 'Pendente'}`;
      lista.appendChild(li);
    });
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const mes = document.getElementById('mes').value;
    const valor = parseFloat(document.getElementById('valor').value);
    const pago = document.getElementById('pago').checked;

    if (!mes || isNaN(valor)) {
      alert('Preencha todos os campos corretamente.');
      return;
    }

    const dados = JSON.parse(localStorage.getItem(DAS_KEY)) || [];

    // Substitui o mês caso já exista
    const existente = dados.find(d => d.mes === mes);
    if (existente) {
      existente.valor = valor;
      existente.pago = pago;
    } else {
      dados.push({ mes, valor, pago });
    }

    localStorage.setItem(DAS_KEY, JSON.stringify(dados));
    carregarPagamentos();
    form.reset();
  });

  carregarPagamentos();
});