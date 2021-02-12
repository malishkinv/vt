<template lang="pug">
  router-link(:to="'/tasks/'+item.id" :class="$style.task" :style="{'background-color':bgColor}")
    div(:class="$style.taskName") {{ item.title }}
</template>

<script>
import statuses from "@/assets/statuses.json";

export default {
  props: ["item"],
  computed: {
    bgColor() {
      return statuses.statues.find(item => item.id == this.item.status).color || "";
    }
  }
}
</script>

<style lang="scss" module>
.task {
  display: block;
  padding: 12px;
  color: white;
  text-decoration: none;
  cursor: pointer;
  border-bottom: 1px solid #efefef;

  &:last-child {
    border-bottom: none;
  }

  &__name {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  &__description {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }
}
</style>