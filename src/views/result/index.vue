<template>
    <div>
      <div class="table_result_buttons">
      <el-button
        class="table_result_button"
        :class="{ 'is-active': activeButton === 'request' }"
        @click="handleRequestClick"
        :activeButton="'request'"
      >
        请求信息
      </el-button>
      <el-button
        class="table_result_button"
        :class="{ 'is-active': activeButton === 'schedule' }"
        @click="handleScheduleClick"
        :activeButton="'schedule'"
      >
        调度结果
      </el-button>
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
      taskSetId: null,
      taskSetInfo: [],
      taskInfo: [],
      activeButton: 'schedule',
    };
  },
  created() {
    //this.taskSetId = 1240
    this.taskSetId = this.$route.params.id;
    this.fetchData()
  },
  methods: {
    fetchData() {
        const url = `scheduling/result/${this.taskSetId}`;
        getList(url).then(response => {
            this.taskInfo = response.data.task_result_list;
            this.taskSetInfo = [Object.assign({}, response.data)];
            //console.log(this.taskInfo)
            //console.log(this.taskSetId)
        });
      },
      handleRequestClick() {
        this.$router.push(`/table_taskSet/${this.taskSetId}/index`);
        console.log("死绝了")
      },
      handleScheduleClick() {
        this.$router.push(`/result/${this.taskSetId}/index`);
        console.log("活着，只是没有响应")
    }
    },
};
</script>
<style>
.table_result_buttons {
  display: flex;
  margin-top: 20px;
  margin-bottom: 20px;
  margin-left: 20px;
}

.table_result_button {
  border-radius: 20px;
  margin-right: 10px;
}

.table_result {
  margin-left: 20px;
}

</style>