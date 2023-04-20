<template>
    <div class="app-container">
      <el-table
        v-loading="listLoading"
        :data="list"
        element-loading-text="Loading"
        border
        fit
        highlight-current-row
        @sort-change="handleSortChange"
      >
        <el-table-column align="center" label="任务集ID" prop="id" width="95">
          <template slot-scope="scope">
            <router-link :to="'/' + scope.row.id">{{ scope.row.id }}</router-link>
          </template>
        </el-table-column>
        <el-table-column align="center" label="任务集名称" prop="name"></el-table-column>
        <el-table-column label="任务数量" width="120" align="center" prop="task_count"></el-table-column>
        <el-table-column label="任务集状态" width="120" align="center" prop="state" sortable></el-table-column>
        <el-table-column label="创建者ID" width="120" align="center" prop="creator_id"></el-table-column>
        <el-table-column label="创建时间" width="140" align="center" prop="ctime" sortable></el-table-column>
        <el-table-column label="修改时间" width="130" align="center" prop="mtime" sortable></el-table-column>
        <el-table-column label="集合成员" width="130" align="center" prop="all_tasks"></el-table-column>
      </el-table>
    </div>
  </template>
  
  <script>
  import { getList } from '@/api/table'
  
  export default {
    filters: {
      statusFilter(status) {
        const statusMap = {
          published: 'success',
          draft: 'gray',
          deleted: 'danger'
        }
        return statusMap[status]
      }
    },
    data() {
      return {
        list: null,
        listLoading: true
      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      handleSortChange({ prop, order }) {
        this.list.sort((a, b) => {
          const valA = a[prop];
          const valB = b[prop];
          if (order === 'ascending') {
            return valA - valB;
          } else {
            return valB - valA;
          }
        });
      },
      fetchData() {
        this.listLoading = true
        getList('/scheduling/task_sets').then(response => {
          this.list = response.data.items;
          console.log(response)
          console.log(this.list)
          this.listLoading = false;
        })
      }
    }
  }
  </script>
  