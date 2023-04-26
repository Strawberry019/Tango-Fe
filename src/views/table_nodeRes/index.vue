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
      <el-table-column align="center" label="节点ID" width="95">
        <template slot-scope="scope">
            <router-link :to="'/table_nodeAll/' + scope.row.id+'/index'" class="link">{{scope.row.id}}</router-link>
        </template>
      </el-table-column>
      <el-table-column align="center" label="节点名称" prop="name"></el-table-column>
      <el-table-column label="总cpu资源/核数" width="120" align="center" prop="cpu" sortable></el-table-column>
      <el-table-column label="总内存资源/GB" width="120" align="center" prop="mem" sortable></el-table-column>
      <el-table-column label="总磁盘资源/GB" width="120" align="center" prop="disk" sortable></el-table-column>
      <el-table-column label="剩余cpu资源/核数" width="140" align="center" prop="cpu_rem" sortable></el-table-column>
      <el-table-column label="剩余内存资源/GB" width="130" align="center" prop="mem_rem" sortable></el-table-column>
      <el-table-column label="剩余磁盘资源/GB" width="130" align="center" prop="disk_rem" sortable></el-table-column>
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
      getList('/could_info/nodes').then(response => {
        this.list = response.data.items;
        console.log(response)
        console.log(this.list)
        this.listLoading = false;
      })
    }
  }
}
</script>
  <style scoped>
    .link {
  color: blue;
  text-decoration: underline;
  }
  </style>