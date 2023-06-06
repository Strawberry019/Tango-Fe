<template>
  <div>
  <div class="table_taskSet_buttons">
      <el-button
        class="table_taskSet_button"
        :class="{ 'is-active': activeButton === 'request' }"
        @click="handleRequestClick"
        :activeButton="'request'"
      >
        请求信息
      </el-button>
      <el-button
        class="table_taskSet_button"
        :class="{ 'is-active': activeButton === 'schedule' }"
        @click="handleScheduleClick"
        :activeButton="'schedule'"
      >
        调度结果
      </el-button>
    </div>
  <div class="table_taskSet"> 
    <div class="table_taskSet_container">
      <h2>集合数据</h2>
      <el-table :data="taskSetInfo" style="width: 100%">
        <el-table-column prop="id" label="任务集ID" width="140"></el-table-column>
        <el-table-column prop="name" label="名称" width="140"></el-table-column>
        <el-table-column prop="task_count" label="任务数" width="140"></el-table-column>
        <el-table-column prop="state" label="状态" width="140"></el-table-column>
        <el-table-column prop="creator_id" label="创建者ID" width="140"></el-table-column>
        <el-table-column prop="ctime" label="创建时间" width="140"></el-table-column>
        <el-table-column prop="mtime" label="修改时间" width="140"></el-table-column>
      </el-table>
    </div>
    <div class="table_taskSet_container">
      <h2>成员数据</h2>
      <el-table :data="taskInfo" style="width: 100%">
        <el-table-column prop="id" label="任务ID" width="100"></el-table-column>
        <el-table-column prop="task_id" label="在该集合下的ID" width="150"></el-table-column>
        <el-table-column prop="task_set_id" label="所属任务集ID" width="150"></el-table-column>
        <!--<el-table-column prop="node_id" label="分配节点ID" width="140"></el-table-column>-->
        <el-table-column prop="cpu_dem" label="CPU需求" width="120"></el-table-column>
        <el-table-column prop="mem_dem" label="内存需求" width="120"></el-table-column>
        <el-table-column prop="disk_dem" label="磁盘需求" width="120"></el-table-column>
        <el-table-column prop="delay_constraint" label="延迟约束id" width="140"></el-table-column>
      </el-table>
    </div>
    <!--
    <div class="table_taskSet_container">
      <h2>任务间约束</h2>
      <el-table :data="constraintInfo" style="width: 100%">
        <el-table-column prop="id" label="任务间约束ID" width="140"></el-table-column>
        <el-table-column prop="task_set_id" label="所属任务集ID" width="140"></el-table-column>
        <el-table-column prop="a_task_id" label="任务A ID" width="140"></el-table-column>
        <el-table-column prop="z_task_id" label="任务B ID" width="140"></el-table-column>
        <el-table-column prop="bandwidth" label="网络带宽" width="140"></el-table-column>
        <el-table-column prop="delay" label="延迟值" width="140"></el-table-column>
      </el-table>
    </div>
    -->
  </div>
  </div>
</template>

<script>
import { getList } from '@/api/table'

export default {
  data() {
    return {
      taskSetInfo: [],
      taskInfo: [],
      activeButton: 'request',
      id:null
      //constraintInfo:[]
    }
  },
  created() {
  // $route是每一个vue实例都具有的属性，存储路由相关的信息
  // 获取列表页传来的id
    let temp = this.$route.params.id;
    this.id = temp
    //console.log(this.id)
    this.fetchData()
  },
  methods: {
    fetchData() {
      getList(`/scheduling/task_set/${this.id}`).then(response => {
        console.log(response.data);
        this.taskInfo = response.data.all_tasks;
        //this.taskSetInfo = Object.values(response.data);
        // Convert the response.data.task_set object to a dictionary
        this.taskSetInfo = [Object.assign({}, response.data)];
        //this.constraintInfo = response.data.all_inter_task_constraints;
        //console.log(this.taskSetInfo)
        console.log(this.taskInfo) 
      })
    },
    handleRequestClick() {
      this.$router.push(`/table_taskSet/${this.id}/index`);
    },
    handleScheduleClick() {
      this.$router.push(`/result/${this.id}/index`);
    }
  }
  }

</script>
<style>
.table_taskSet_buttons {
  display: flex;
  margin-top: 20px;
  margin-bottom: 20px;
  margin-left: 20px;
}

.table_taskSet_button {
  border-radius: 20px;
  margin-right: 10px;
}

.table_taskSet {
  margin-left: 20px;
}

</style>