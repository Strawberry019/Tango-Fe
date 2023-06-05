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
        <el-table-column align="center" label="任务集ID" width="95" prop="id" sortable></el-table-column>
        <el-table-column align="center" label="任务集名称" prop="name"></el-table-column>
        <el-table-column label="任务数量" width="120" align="center" prop="task_count"></el-table-column>
        <el-table-column label="任务集状态" width="120" align="center" prop="state" sortable></el-table-column>
        <el-table-column label="创建者ID" width="120" align="center" prop="creator_id"></el-table-column>
        <el-table-column label="创建时间" width="140" align="center" prop="ctime" sortable></el-table-column>
        <el-table-column label="修改时间" width="130" align="center" prop="mtime" sortable></el-table-column>
        <el-table-column label="组成详情" width="130" align="center" >
        <template slot-scope="scope">
            <router-link :to="'/table_taskSet/' + scope.row.id+'/index'" class="link">点击查看</router-link>
        </template>
        </el-table-column>
      </el-table>

      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[20, 50, 100, 200]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
        <span slot="prev" :class="{'is-disabled': currentPage === 1}">
          <i class="el-icon-arrow-left"></i>
        </span>
        <span slot="next" :class="{'is-disabled': currentPage === Math.ceil(total / pageSize)}">
          <i class="el-icon-arrow-right"></i>
        </span>
>     </el-pagination>
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
      fetchData() {
        this.listLoading = true
        getList('/scheduling/task_sets', {
          sort_by: 'ctime',
          order_by: 'asc',
          page: this.currentPage,
          page_size: this.pageSize,
        })
        .then(response => {
          this.list = response.data.items;
          this.total= response.data.total;
          console.log(response)
          console.log(this.list)
          this.listLoading = false;
        })
      },
      handleSizeChange(val) {
        this.pageSize = val;
        this.fetchData();
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this.fetchData();
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
  