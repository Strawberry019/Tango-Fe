<template>
  
  <el-form ref="form" :model="form" style="margin-left: 20px;">
    <!--<el-form-item label="任务集id">
      <el-input v-model="form.task_set_id" width="100"></el-input>
    </el-form-item>-->
    <h2>集合基本信息：</h2>
    <el-form-item label="任务数量" >
      <el-input v-model="form.task_count" placeholder="输入数字并按回车" @change="updateTaskCount"></el-input>
    </el-form-item>
    <el-form-item label="业务类型">
      <el-select v-model="form.name" placeholder="请描述业务场景" style="width: 100%">
        <el-option label="网站搭建/电商平台/应用程序开发" value="Website/E-commerce/App" />
        <el-option label="在线游戏" value="Online Game" />
        <el-option label="数据库" value="Database" />
        <el-option label="大数据" value="Big Data" />
        <el-option label="机器学习" value="Machine Learning" />
        <el-option label="图像渲染" value="Graphics Rendering" />
      </el-select>
    </el-form-item>

    <el-form-item v-for="(task, index) in form.tasks" :key="index" label-position="left">
      <h2>任务{{index+1}}：</h2>
      <!--<el-form-item label="任务id">
        <el-input v-model="task.task_id"></el-input>
      </el-form-item>-->
      <el-form-item label="CPU请求数量/核数">
        <el-input v-model="task.cpu_dem"></el-input>
      </el-form-item>
      <el-form-item label="内存请求数量/GB">
        <el-input v-model="task.mem_dem"></el-input>
      </el-form-item>
      <el-form-item label="磁盘请求数量/GB">
        <el-input v-model="task.disk_dem"></el-input>
      </el-form-item>
      <el-form-item label="延迟限制/ms">
        <el-input v-model="task.delay_constraint"></el-input>
      </el-form-item>
    </el-form-item>

    <el-form-item v-for="(interCstr, index) in form.inter_task_constraints" :key="index" label-position="left">
      <h2>任务间约束{{index+1}}：</h2>
      <el-form-item label="任务A ID">
        <el-input v-model="interCstr.a_task_id"></el-input>
      </el-form-item>
      <el-form-item label="任务B ID">
        <el-input v-model="interCstr.z_task_id" placeholder="注意:任务B ID > 任务A ID，参照任务的表单标题填写"></el-input>
      </el-form-item>
      <el-form-item label="任务间带宽限制/Gbps">
        <el-input v-model="interCstr.bandwidth"></el-input>
      </el-form-item>
      <el-form-item label="任务间延迟限制/ms">
        <el-input v-model="interCstr.delay"></el-input>
      </el-form-item>
    </el-form-item>


    <el-form-item>
      <el-button type="primary" @click="addInterTaskConstraint">新建任务间约束</el-button>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm">创建完成</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { postList } from '@/api/table'

export default {
  data() {
    return {
      form: {
        task_set_id: '0',
        task_count: '',
        name: '',
        tasks: [],
        inter_task_constraints: [],
        start_flag:true
      }
    };
  },
  methods: {
    addTask() {
      this.form.tasks.push({
        task_id: '0',
        cpu_dem: '',
        mem_dem: '',
        disk_dem: '',
        delay_constraint: '',
        image_tag:'0'
      });
    },
    addInterTaskConstraint() {
      this.form.inter_task_constraints.push({
        a_task_id: '',
        z_task_id: '',
        bandwidth: '',
        delay: ''
      });
    },
    updateTaskCount() {
    const newCount = parseInt(this.form.task_count);
    const oldCount = this.form.tasks.length;
    if (newCount > oldCount) {
      for (let i = oldCount; i < newCount; i++) {
        this.form.tasks.push({
          task_id: '0',
          cpu_dem: '',
          mem_dem: '',
          disk_dem: '',
          delay_constraint: '',
          image_tag: '0'
        });
      }
    } else if (newCount < oldCount) {
      this.form.tasks.splice(newCount);
    }
  },
    submitForm() {
      this.form.task_set_id = parseInt(this.form.task_set_id);
      this.form.task_count = parseInt(this.form.task_count);
      this.form.tasks.forEach(task => {
        task.task_id = parseInt(task.task_id);
        task.cpu_dem = parseInt(task.cpu_dem);
        task.mem_dem = parseInt(task.mem_dem);
        task.disk_dem = parseInt(task.disk_dem);
        task.delay_constraint = parseInt(task.delay_constraint);
      });
      this.form.inter_task_constraints.forEach(interCstr => {
        interCstr.a_task_id = parseInt(interCstr.a_task_id)-1;
        interCstr.z_task_id = parseInt(interCstr.z_task_id)-1;
        interCstr.bandwidth = parseInt(interCstr.bandwidth);
        interCstr.delay = parseInt(interCstr.delay);
      });
      console.log({ data: this.form })
      console.log(this.form)
      postList('/scheduling/task_set',this.form).then(() => {
        this.$message({
          message: '创建成功',
          type: 'success'
        });
        location.reload(); 
      });
    }
  }
};
</script>

