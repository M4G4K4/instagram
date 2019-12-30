
<template>
  <div class="about">
    <h1>This is about page</h1>

    <MyBtn Color="error"  Text="ESTG" Limit="10" Start="1"/> <!-- Component -->

    <MyBtn Color="success"  Text="IPVC" Limit="15" Start="10" /> <!-- Component -->


  </div>
</template>

<script>
  export default {
    name: 'about',
    components: {
      MyBtn : ()=>import ('@/components/Button')
    }
  }
</script>
