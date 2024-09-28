<template>
  <h1>Food</h1>
  <food-item/>
  <food-item/>
  <food-item/>
</template>
<script>
export default {
  data(){
    return {
      message: "Hello, world!"
    }
  }
}
</script>

<style>
  #app > div {
    border: dashed black 1px;
    display: inline-block;
    margin: 10px;
    padding: 10px;
    background-color: lightgreen;
  }
  #app > div:hover{
    cursor: pointer;
  }
</style>
