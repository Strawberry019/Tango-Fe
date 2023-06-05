<template>
    <div>
      <div class="input_request">
        <h2>待查询任务集</h2>
        <div class="inline-block">
            <el-input type="text" v-model="taskSetId" placeholder="请输入任务集合ID"></el-input>
        </div>
        <div class="inline-block">
        <el-button type="primary" @click="handleRequest">结果查询</el-button>
        </div>
      </div>
      <div class="table_result">
        <div class="table_taskSet_container">
          <h2>任务集调度信息</h2>
          <el-table       
          highlight-current-row 
          :data="taskSetInfo" 
          style="width: 100%">
            <el-table-column prop="task_set_id" label="任务集ID" width="120"></el-table-column>
            <el-table-column prop="algorithm_type" label="算法类型" width="120"></el-table-column>
            <el-table-column prop="time_cost" label="调度时间" width="120"></el-table-column>
            <el-table-column prop="cost" label="调度成本" width="120"></el-table-column>
            <el-table-column prop="tail_latency" label="尾接入延迟" width="120"></el-table-column>
            <el-table-column prop="avg_latency" label="平均接入延迟" width="120"></el-table-column>
          </el-table>
        </div>
        <div class="table_taskSet_container">
          <h2>任务-节点映射</h2>
          <el-table 
          highlight-current-row 
          :data="taskInfo" style="width: 100%">
            <el-table-column prop="task_id" label="任务ID" width="120"></el-table-column>
            <el-table-column prop="node_id" label="节点ID" width="120"></el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { getList } from '@/api/table.js';
  
  export default {
    data() {
      return {
        taskSetId: '',
        taskSetInfo: [],
        taskInfo: [],
        /*taskSetInfo: {
            task_set_id: '',
            algorithm_type: '',
            time_cost: '',
            cost: '',
            tail_latency: '',
            avg_latency: '',
        },
        taskInfo: {
            task_result_list:[
                task_id:'',
                node_id:'',
            ]
        }*/
      };
    },
    methods: {
      handleRequest() {
        const url = `scheduling/result/${this.taskSetId}`;
        getList(url).then(response => {
          this.taskInfo = response.data.task_result_list;
          this.taskSetInfo = [Object.assign({}, response.data)];
          console.log(this.taskInfo)
        });
      },
    },
  };
  </script>
<style>
.inline-block {
  display: inline-block;
}

</style>
