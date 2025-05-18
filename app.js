if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js')
    .then(function() {
      console.log('Service Worker registrado com sucesso.');
    })
    .catch(function(error) {
      console.log('Erro ao registrar Service Worker:', error);
    });
}