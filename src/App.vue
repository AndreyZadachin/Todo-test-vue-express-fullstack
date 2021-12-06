<template>
  <div id="app">
    <InputItem @add-item="addItem" />
    <TodoInProcess :db="db.length" />
    <TodoList :todoLists="db" @removeItem="removeTodo" />
  </div>
</template>

<script>
//@ - указывает путь от папки src
import InputItem from '@/components/InputItem.vue';
import TodoInProcess from '@/components/TodoInProcess.vue';
import TodoList from '@/components/TodoList.vue';
import axios from 'axios';

const url = 'api/todos/';

export default {
  name: 'App',
  data() {
    return {
      db: [],
    };
  },
  mounted() {
    axios
      .get(url)
      .then((response) => (this.db = response.data))
      .catch((error) => console.log(error));
  },
  //Регистрируем компоненты
  components: {
    InputItem,
    TodoInProcess,
    TodoList,
  },
  methods: {
    //Удаляем задачу по id
    removeTodo(id) {
      this.db = this.db.filter((item) => item._id !== id);

      axios
        .delete(url + id)
        .then((response) => console.log(response))
        .catch((error) => console.log(error));
    },
    //Добавляем новую задачу
    addItem(item) {
      this.db = [...this.db, item];

      axios
        .post(url, item)
        .then((response) => console.log(response))
        .catch((error) => console.log(error));

      axios
        .get(url)
        .then((response) => (this.db = response.data))
        .catch((error) => console.log(error));
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 80%;
  margin: 0 auto;
  margin-top: 60px;
}

* {
  margin: 0;
  padding: 0;
}

ul {
  list-style: none;
}
</style>
