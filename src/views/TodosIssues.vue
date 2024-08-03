<template>
  <div>
    <h1>todoリスト</h1>

    <form @submit.prevent="addTodo()">
      <el-input placeholder="Agregar una nueva tarea" v-model="todo"></el-input>
    </form>

    <!-- Mostrar la lista de todos -->
    <el-row :gutter="12">
      <el-col :span="12" v-for="(todo, index) in todos" :key="index">
        <!-- Usar el componente TodoItem para cada todo -->
        <TodoItem :todo="todo" @removeTodo="removeTodo(index)" :isIssue="false" />
      </el-col>
    </el-row>

    <!-- Mostrar la lista de issues de GitHub -->
    <el-row :gutter="12">
      <el-col :span="12" v-for="(issue, index) in issues" :key="issue.id">
        
        <TodoItem :todo="issue" @closeIssue="closeIssue(index)" @remove="removeTodo(index)
        " :isIssue="true" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from 'axios';
import TodoItem from './TodoItem.vue'; // Ajusta la ruta según tu estructura de archivos

const client = axios.create({
  baseURL: `${process.env.VUE_APP_GITHUB_ENDPOINT}`,
  headers: {
    'Authorization': `token ${process.env.VUE_APP_GITHUB_TOKEN}`,
    'Accept': 'application/vnd.github.v3+json',
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
        this.todos.push({ title: this.todo, id: Date.now() });
        this.todo = '';
      }
    },
    removeTodo(index) {
      this.todos.splice(index, 1);
    },
    closeIssue(index) {
      const target = this.issues[index];
      client.patch(`/issues/${target.number}`, {
        state: 'closed',
      })
      .then(() => {
        this.issues.splice(index, 1);
      })
      .catch(error => {
        console.error('Error al cerrar el issue:', error);
      });
    },
    getIssues() {
      client.get('issues')
        .then((res) => {
          this.issues = res.data;
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