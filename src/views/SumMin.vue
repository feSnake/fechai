<script setup lang="ts">
import axios from 'axios'

axios
  .get('/api/one_yan')
  .then(function (response) {
    // handle success
    console.log(response)
  })
  .catch(function (error) {
    // handle error
    console.log(error)
  })
  .finally(function () {
    // always executed
  })

function resultFormat(result) {
  var h = Math.floor((result / 3600) % 24)
  var m = Math.floor((result / 60) % 60)
  if (h < 1) {
    return (result = m + '分钟')
  } else {
    return (result = h + '小时' + m + '分钟')
  }
}

let list = document.getElementById('multi_page').getElementsByClassName('duration')
let timeMin = 0
for (let index = 0; index < list.length; index++) {
  const element = list[index].innerText.split(':')
  timeMin += parseInt(element[0]) * 60 + parseInt(element[1])
}
console.log(resultFormat(timeMin))
</script>

<template>
  <div></div>
</template>
