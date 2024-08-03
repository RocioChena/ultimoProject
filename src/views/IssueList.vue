<template>
    <div>
    <h1>issueリスト</h1>
    <el-button type="success" @click="getIssues()">Obtener problema</el-button>
    <el-row :gutter="12">
      
      <el-col :span="12"  v-for="( issue, index ) in issues" :key="issue.id">
        <el-card class="box-card" shadow="hover" style="margin: 5px 0;">
          <el-row :gutter="12">
            <el-col :span="21">{{ issue.title }}</el-col>
            <el-col :span="3">
              
              <el-button @click="closeIssue(index)" type="success" icon="el-icon-check" circle></el-button>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
  </div>
  </template>
  
  
  <script>
import axios from 'axios';


const client = axios.create({  //--1
    baseURL: `${process.env.VUE_APP_GITHUB_ENDPOINT}`, //--2
  headers: { //--3
    'Accept': 'application/vnd.github.v3+json',
    'Content-Type':'application/json',
     'Authorization': `token ${process.env.VUE_APP_GITHUB_TOKEN}`
  },
})


export default {
  name: 'IssueList',
  data() {
    return {
      issues: []
    }
  },
  methods: {
    getIssues() {
      client.get('/issues')
        .then((res) => {
          this.issues = res.data;
        })
    }, 
    

    closeIssue(index) {
      const target = this.issues[index];
      client.patch(`/issues/${target.number}`, {
          state: 'closed'
        })
        .then(() => {
          this.issues.forEach((v, i) => {
            if (v.number === target.number) {
              this.issues.splice(i, 1);
            }
          });
        });
    },

  },
  created() {
    this.getIssues();
  }
}
</script>