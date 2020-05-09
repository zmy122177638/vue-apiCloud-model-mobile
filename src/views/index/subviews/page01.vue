<template>
  <div>
    <p>page01</p>
    <p
      style="padding:10px 0;color:rgb(32, 172, 241)"
      @click="$router.push('/about')"
    >
      关于与帮助
    </p>
    <p
      style="padding:10px 0;color:rgb(32, 172, 241)"
      @click="$router.push('/example')"
    >
      better-scroll示例
    </p>
  </div>
</template>

<script>
export default {
  name: 'page01',
  components: {}
}
</script>
