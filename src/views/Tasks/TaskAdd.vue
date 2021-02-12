<template lang="pug">
  div
    h2 Новая задача
    form(:class="$style.form" :style="{'background-color':bgColor}" @submit.prevent="addTask")
      div(:class="$style.formRow")
        label(:class="$style.formLabel")
          div Статус
          select(:class="$style.formSelect" v-model="item.status")
            option(value="0" disabled) ...
            option(v-for="status in statuses" :key="status.id" :value="status.id") {{ status.title }}

      div(:class="$style.formRow")
        label(:class="$style.formLabel")
          div Название задачи
          input(:class="$style.formInput" v-model="item.title")

      div(:class="$style.formRow")
        label(:class="$style.formLabel")
          div Описание
          textarea(:class="$style.formTextarea" v-model="item.description")

      div(:class="$style.formRow")
        div(:class="$style.formButtons")
          button(:class="$style.formButton" @click.prevent="cancel") Отмена
          button(:class="$style.formButton" :disabled="!validated" @click="addTask") Добавить

    template(v-if="error")
      div(:class="$style.error") {{ error }}

</template>

<script>
import ApiService from "@/services/api.service";
import statuses from "@/assets/statuses.json";

export default {
  data() {
    return {
      error: null,
      item: {
        status: 0,
        title: "",
        description: "",
        created_date: ""
      }
    }
  },
  computed: {
    bgColor() {
      return this.item.status ? this.statuses.find(item => item.id == this.item.status).color : "";
    },
    statuses() {
      return statuses.statues;
    },
    validated() {
      return this.item.title && this.item.description && this.item.status;
    },
    getDate() {
      let d = new Date();
      d = new Date(d.getTime() - 3000000);
      return d.getFullYear().toString()+"-"+((d.getMonth()+1).toString().length==2?(d.getMonth()+1).toString():"0"+(d.getMonth()+1).toString())+"-"+(d.getDate().toString().length==2?d.getDate().toString():"0"+d.getDate().toString())+" "+(d.getHours().toString().length==2?d.getHours().toString():"0"+d.getHours().toString())+":"+((parseInt(d.getMinutes()/5)*5).toString().length==2?(parseInt(d.getMinutes()/5)*5).toString():"0"+(parseInt(d.getMinutes()/5)*5).toString())+":00";
    }
  },
  methods: {
    addTask() {
      this.error = null;
      this.item.created_date = this.getDate;
      ApiService.post("/tasks", this.item).then(() => {
        this.$router.push({ path: "/tasks" });
      }).catch(() => {
        this.error = "Ошибка";
      });
    },
    cancel() {
      this.$router.push({ path: "/tasks" });
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
.form {
  width: 100%;
  padding: 12px 12px 12px;

  &__row {
    margin-bottom: 12px;

    &:last-child {
      margin-bottom: 0;
    }
  }
  &__select {
    width: 50%;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    padding: 8px 12px;
    cursor: pointer;
    outline: none;
  }
  &__label {
    div {
      margin-bottom: 6px;
    }
  }
  &__input {
    width: 100%;
    padding: 8px 12px;
    outline: none;
  }
  &__textarea {
    width: 100%;
    height: 100px;
    padding: 8px 12px;
    outline: none;
  }
  &__buttons {
    display: flex;
    justify-content: space-between;
  }
  &__button {
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

    &:disabled {
      background-color: darkgrey;
    }
  }
}
</style>