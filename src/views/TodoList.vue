<template>
  <div>
    <h1>TodoList</h1>
    <form @submit.prevent="addTodo()">
      <input v-model="todo" placeholder="Agregar nueva tarea">
    </form>
    <el-row :gutter="12">
      <el-col :span="12" v-for="(todo, index) in todos" :key="index">
        <el-card class="box-card" shadow="hover" style="margin: 5px 0;">
          <el-row :gutter="12">
            <el-col :span="21">{{ todo }}</el-col>
            <el-col :span="3">
              <el-button @click="removeTodo(index)" type="success" icon="el-icon-check" circle></el-button>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>

    <h2>Issues de GitHub</h2>
    <el-row :gutter="12">
      <el-col :span="24">
        <el-card class="box-card" shadow="hover" style="margin: 5px 0;">
          <el-row v-for="issue in issues" :key="issue.id" :gutter="12">
            <el-col :span="24">{{ issue.title }}</el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'TodoList',
  data() {
    return {
      todo: '',
      todos: [],
      issues: []  // Array para almacenar los issues de GitHub
    };
  },
  created() {
    this.fetchIssues();
  },
  methods: {
    addTodo() {
      this.todos.push(this.todo);
      this.todo = '';
    },
    removeTodo(index) {
      this.todos.splice(index, 1);
    },
    fetchIssues() {
      axios.get('https://github.com/RocioChena/proyectoToDo')
        .then((response) => {
          this.issues = response.data;
        })
        .catch((error) => {
          console.error('Error al obtener los issues:', error);
        });
    }
  }
}
</script>