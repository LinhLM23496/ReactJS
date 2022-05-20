fetch('https://6245b93d6b7ecf057c23abe2.mockapi.io/products')
  .then(
    function(response) {
      if (response.status !== 200) {
        console.log('Lỗi, mã lỗi ' + response.status);
        return;
      }
      // parse response data
      response.json().then(data => {
        console.log(data);
      })
    }
  )
  .catch(err => {
    console.log('Error :-S', err)
  });