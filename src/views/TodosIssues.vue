<template>
  <div>
    <h1>todoリスト</h1>

    <form @submit.prevent="addTodo()">
      <el-input placeholder="Agregar una nueva tarea" v-model="todo"></el-input>
    </form>

    <el-row :gutter="12">
      <TodoItem
        v-for="(todo, index) in todos"
        :key="index"
        :todo="todo"
        :index="index"
        @remove-todo="removeTodo"
      />
      <TodoItem
        v-for="(issue, index) in issues"
        :key="issue.id"
        :todo="issue"
        :index="index"
        @remove-todo="removeTodo"
        @close-issue="closeIssue"
      />
    </el-row>
  </div>
</template>

<script>
console.log("https://api.github.com/repos/RocioChena/ultima");
console.log('Token:', process.env.VUE_APP_GITHUB_TOKEN);
import axios from 'axios';
import TodoItem from './TodoItem.vue'; // Ajusta la ruta según tu estructura de archivos

const client = axios.create({
  baseURL: "https://api.github.com/repos/RocioChena/ultima",
  headers: {
    Authorization: `token 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`,
    Accept: 'application/vnd.github.v3+json',
    'Content-Type': 'application/json',
  },
});

export default {
  name: 'TodosIssues',
  components: {
    TodoItem,
  },
  data() {
    return {
      todo: '',
      todos: [], // Lista de todos locales
      issues: [], // Lista de issues de GitHub
    };
  },
  methods: {
    addTodo() {
      if (this.todo) {
        this.todos.push({ title: this.todo, id: Date.now(), type: 'task' });
        this.todo = '';
      }
    },
    removeTodo(index) {
      this.todos.splice(index, 1);
    },
    closeIssue(index) {
      const target = this.issues[index];
      console.log('Closing issue with number:', target.number); // Añadir log para depuración
      client
        .patch(`/issues/${target.number}`, {
          state: 'closed',
        })
        .then((response) => {
          console.log('Issue closed response:', response); // Añadir log para verificar la respuesta
          this.issues.splice(index, 1);
        })
        .catch((error) => {
          console.error('Error al cerrar el issue:', error);
        });
    },
    getIssues() {
      client
        .get('/issues')
        .then((res) => {
      this.issues = res.data.map(issue => ({
        ...issue,
        type: 'issue'
      }));
    })
        .catch((error) => {
          console.error('Error al obtener los issues:', error);
        });
    },
  },
  created() {
    this.getIssues();
  },
};
</script>
