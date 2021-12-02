<template>
  <div id="app">
    <InputItem @add-item="addItem" />
    <TodoInProcess :db="db.length" />
    <TodoList :todoLists="db" @remove-item="removeItem" />
  </div>
</template>

<script>
//@ - указывает путь от папки src
import InputItem from '@/components/InputItem.vue';
import TodoInProcess from '@/components/TodoInProcess.vue';
import TodoList from '@/components/TodoList.vue';

export default {
  name: 'App',
  data() {
    return {
      db: [],
    };
  },
  //Запрос с сервера
  mounted() {
    fetch('https://vue-test-db-bd42b-default-rtdb.firebaseio.com/todo.json')
      .then((response) => response.json())
      .then((res) => {
        this.db = res;
      })
      .catch((error) => {
        console.log('Ошибка ' + error);
      });
  },
  //Регистрируем компоненты
  components: {
    InputItem,
    TodoInProcess,
    TodoList,
  },
  methods: {
    //Удаляем задачу по id
    removeItem(id) {
      this.db = this.db.filter((item) => item.id !== id);
    },
    //Добавляем новую задачу
    addItem(item) {
      this.db = [...this.db, item];
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
