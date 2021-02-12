<template lang="pug">
  div
    template(v-if="loaded")
      task-card(:item="item")

    template(v-else)
      div(:class="$style.loader") loading...

    template(v-if="error")
      div(:class="$style.error") {{ error }}
</template>

<script>
import ApiService from "@/services/api.service";
import TaskCard from "@/components/Tasks/TaskCard"

export default {
  components: {
    TaskCard
  },
  data() {
    return {
      itemId: null,
      item: null,
      loaded: false,
      error: null
    }
  },
  created() {
    this.itemId = this.$route.params.id;
    this.fetchData(this.itemId);
  },
  methods: {
    fetchData(id) {
      this.loaded = false;
      this.item = null;
      this.error = null;

      ApiService.get("/tasks/" + id).then(({data}) => {
        this.item = data;
        this.loaded = true;
      }).catch(() => {
        this.error = "Ошибка";
      });
    }
  }
}
</script>

<style lang="scss" module>
.loader {
  font-style: italic;
  text-align: center;
}
.error {
  margin-top: 24px;
  font-style: italic;
  color: red;
}
</style>