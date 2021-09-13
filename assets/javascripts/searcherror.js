// 這裡想不到要怎麼抓從server傳過來的restaurants，所以自行宣告restaurants長度
const restaurants = []

if (restaurants.length <= 0) {
  swal.fire({
    icon: 'error',
    title: '非常抱歉',
    text: '沒有找到相符的餐廳!',
  }).then(function () {
    window.location = "/"
  })
}