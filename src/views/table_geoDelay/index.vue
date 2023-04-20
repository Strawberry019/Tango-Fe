<template>
    <div class="app-container">  
        <div style="display: flex; align-items: center;">
            <el-input v-model="filterText" placeholder="请输入地理位置名" @input="filterHandler"></el-input>
            <el-button @click="filterHandler(filterText)">查找</el-button>
        </div>
        <el-table :data="list" style="width: 100%" v-bind:default-sort="{prop: 'geographic_place_name', order: 'ascending'}" :filter-method="filterHandler">
        <el-table-column prop="delay_info_id" label="延迟id"></el-table-column>
        <el-table-column prop="network_node_id" label="节点id"></el-table-column>
        <el-table-column prop="geographic_place_id" label="地理位置id"></el-table-column>
        <el-table-column prop="geographic_place_name" label="地理位置名" filter="{type: 'text', method: filterHandler}"></el-table-column>
        <el-table-column prop="node_to_geo_place_delay" label="延迟值" sortable></el-table-column>
      </el-table>
  
    </div>
  </template>
  
  <script>
  import { getList } from '@/api/table'
  
  export default {
  
  data() {
    return {
      list: null,
      listLoading: true,
      filterText: ''
    }
  },
  created() {
    this.fetchData()
  },
    methods: {
    fetchData() {
    this.listLoading = true;
    getList().then(response => {
        this.list = response.data.items;
        console.log(response)
        console.log(this.list)
        this.listLoading = false;
    });
    },
    filterHandler(value) {
    if (!value) {
        // if the input is empty, reset the list to show all rows
        this.fetchData();
        return;
    }
    this.listLoading = true;
    getList({ geographic_place_name: value }).then(response => {
        this.list = response.data.items;
        this.listLoading = false;
    });
    }
    }
  }
  </script>
  <!--api文档还没有延迟这一块的方法？-->