<template lang="pug">
  div
    h2 Задачи

    template(v-if="loaded")
      tasks(:items="items")

    template(v-else)
      div(:class="$style.loader") loading...

    div(:class="$style.controls")
      router-link(to="/tasks/new" :class="$style.controlsLink") Добавить задачу

    template(v-if="error")
      div(:class="$style.error") {{ error }}
</template>

<script>
import ApiService from "@/services/api.service";
import Tasks from "@/components/Tasks/Tasks.vue"

export default {
  components: {
    Tasks
  },
  data() {
    return {
      items: [],
      loaded: false,
      error: null
    }
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.error = null;
      this.loaded = false;
      this.items = [];

      ApiService.get("/tasks").then(({data}) => {
        this.items = data;
        this.loaded = true;
      }).catch(() => {
        this.error = "Ошибка";
      });
    }
  }
}
</script>

<style lang="scss" module>
.error {
  margin-top: 24px;
  font-style: italic;
  color: red;
}
.loader {
  font-style: italic;
  text-align: center;
}
.controls {
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
  }
}
</style>