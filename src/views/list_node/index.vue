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
    <el-table-column align="center" label="节点ID" width="95" sortable>
        <template slot-scope="scope">
            <router-link :to="'/detail_node/' + scope.row.id+'/index'" class="link">{{scope.row.id}}</router-link>
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

    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
      <span slot="prev" :class="{'is-disabled': currentPage === 1}">
        <i class="el-icon-arrow-left"></i>
      </span>
      <span slot="next" :class="{'is-disabled': currentPage === Math.ceil(total / pageSize)}">
      <i class="el-icon-arrow-right"></i>
      </span>
    </el-pagination>
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
      listLoading: true,
      currentPage: 1,
      pageSize: 20,
      total: 0
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
    handleSizeChange(val) {
      this.pageSize = val
      this.fetchData()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.fetchData()
    },
    fetchData() {
      this.listLoading = true
      getList('/cloud_info/nodes', {
        page: this.currentPage,
        page_size: this.pageSize,
        sort_by: 'id',
        order_by: 'asc'
      }).then(response => {
        this.list = response.data.items;
        this.total = response.data.total;
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