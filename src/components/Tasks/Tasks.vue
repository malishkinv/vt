<template lang="pug">
  div(:class="$style.tasks")
    task-item(v-for="item in items" :item="item" :key="item.id")
</template>

<script>
import TaskItem from "./TaskItem"

export default {
  props: ["items"],
  components: {
    TaskItem
  }
}
</script>

<style lang="scss" module>
.tasks {
  border-radius: 8px;
  overflow: hidden;
}
</style>