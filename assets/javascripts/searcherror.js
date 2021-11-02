const search = document.querySelector('#search')
const filtered_restaurant_length = Number(search.dataset.length)


if (search.value === undefined || filtered_restaurant_length === 0) {
  Swal.fire({
    icon: 'error',
    title: '非常抱歉',
    text: '沒有找到相符的餐廳!',
  }).then(function () {
    window.location = "/"
  })
}