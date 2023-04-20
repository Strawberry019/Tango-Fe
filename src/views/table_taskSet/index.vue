<template>
  <div class="table_taskSet">
    <div class="table_taskSet_container">
      <h2>集合数据</h2>
      <el-table :data="taskSetList" style="width: 100%">
        <el-table-column prop="id" label="任务集ID" width="180"></el-table-column>
        <el-table-column prop="name" label="名称" width="180"></el-table-column>
        <el-table-column prop="task_count" label="任务数" width="180"></el-table-column>
        <el-table-column prop="state" label="状态" width="180"></el-table-column>
        <el-table-column prop="creator_id" label="创建者ID" width="180"></el-table-column>
        <el-table-column prop="ctime" label="创建时间" width="180"></el-table-column>
        <el-table-column prop="mtime" label="修改时间" width="180"></el-table-column>
        <el-table-column prop="all_tasks" label="所有任务" width="180"></el-table-column>
      </el-table>
    </div>
    <div class="table_taskSet_container">
      <h2>成员数据</h2>
      <el-table :data="taskList" style="width: 100%">
        <el-table-column prop="id" label="任务ID" width="180"></el-table-column>
        <el-table-column prop="task_id" label="在该集合下的ID" width="180"></el-table-column>
        <el-table-column prop="task_set_id" label="所属任务集ID" width="180"></el-table-column>
        <el-table-column prop="node_id" label="分配节点ID" width="180"></el-table-column>
        <el-table-column prop="cpu_dem" label="CPU需求" width="180"></el-table-column>
        <el-table-column prop="mem_dem" label="内存需求" width="180"></el-table-column>
        <el-table-column prop="disk_dem" label="磁盘需求" width="180"></el-table-column>
        <el-table-column prop="delay_constraint" label="延迟约束" width="180"></el-table-column>
        <el-table-column prop="image_tag" label="image标签" width="180"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { getList } from '@/api/table'

export default {
  data() {
    return {
      taskSetList: [],
      taskList: []
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      getList('/scheduling/task_set/1').then(response => {
        /*this.taskSetList = Object.values(response.data.task_set);*/
        this.taskList = response.data.tasks// Convert the response.data.task_set object to a dictionary
        this.taskSetList = [Object.assign({}, response.data.task_set)];
        console.log(this.taskSetList)
        console.log(this.taskList)
      })
    }
  }
}
</script>
