<template lang="pug">
  div
    div(:class="$style.task" :style="{'background-color':bgColor}" @dblclick="goToUpdateTask")
      div(:class="$style.taskName") {{ item.title }}
      div(:class="$style.taskDescription") {{ item.description }}
      div(:class="$style.taskDate") {{ item.created_date }}

    div(:class="$style.controls")
      router-link(to="/tasks" :class="$style.controlsLink") Вернуться
      button(:class="[$style.controlsLink, $style.controlsLinkRed]" @click="deleteTask") Удалить

</template>

<script>
import ApiService from "@/services/api.service";
import statuses from "@/assets/statuses.json";

export default {
  props: ["item"],
  data() {
    return {
      error: null
    }
  },
  computed: {
    bgColor() {
      return statuses.statues.find(item => item.id == this.item.status).color || "";
    }
  },
  methods: {
    goToUpdateTask() {
      this.$router.push({ path: "/tasks/" + this.item.id + "/update" });
    },
    deleteTask() {
      this.error = null;

      if(confirm("Удалить?")) {
        ApiService.delete("/tasks/" + this.item.id).then(() => {
          this.$router.push({ path: "/tasks" });
        }).catch(() => {
          this.error = "Ошибка";
        });
      }
    }
  }
}
</script>

<style lang="scss" module>
.controls {
  display: flex;
  justify-content: space-between;
  margin-top: 24px;

  &__link {
    padding: 12px 18px;
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    background-color: cadetblue;
    text-decoration: none;
    border: none;
    cursor: pointer;
    outline: none;

    &-red {
      background-color: darkred;
    }
  }
}
.task {
  padding: 12px;
  margin-bottom: 8px;
  color: white;

  &:last-child {
    margin-bottom: 0;
  }

  &__name {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-bottom: 8px;
  }
  &__description {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  &__date {
    font-style: italic;
    font-size: 12px;
    margin-top: 8px;
  }
}
</style>