<template>
    <div>
      <el-col :span="12">
        <el-card class="box-card" shadow="hover" style="margin: 5px 0;">
          <el-row :gutter="12">
            <el-col :span="21">{{ todo.title }}</el-col>
            <el-col :span="3">
              <el-button @click="removeTodo(index)" type="success" icon="el-icon-check" circle></el-button>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </div>
  </template>
  
  <script>
  export default {
  name: 'TodoItem',
  props: {
    todo: Object,
    isIssue: Boolean // Para distinguir si es una tarea o un issue
  },
  methods: {
    completeItem() {
      if (this.isIssue) {
        this.$emit('closeIssue', this.todo.id); // Emite un evento para cerrar el issue
      } else {
        this.$emit('removeTodo', this.todo.id); // Emite un evento para eliminar la tarea
      }
    }
  }
}
</script>