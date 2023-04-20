<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="实例名称">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="当前所在地">
        <el-select v-model="form.region" placeholder="请选择用户当前所在地">
          <el-option label="华东地区" value="shanghai" />
          <el-option label="华北地区" value="beijing" />
          <el-option label="西南地区" value="chengdu" />
          <el-option label="西北地区" value="lanzhou" />
          <el-option label="海外地区" value="newyork" />
        </el-select>
      </el-form-item>
<!--      <el-form-item label="租用时间">
        <el-col :span="11">
          <el-date-picker v-model="form.date1" type="date" placeholder="Pick a date" style="width: 100%;" />
        </el-col>
        <el-col :span="2" class="line">-</el-col>
        <el-col :span="11">
          <el-time-picker v-model="form.date2" type="fixed-time" placeholder="Pick a time" style="width: 100%;" />
        </el-col>
      </el-form-item>-->
      <el-form-item label="自动选择地区">
        <el-switch v-model="form.autoDelivery" />
      </el-form-item>
      <el-form-item label="服务器部署区域">
        <el-checkbox-group v-model="form.type">
          <el-checkbox label="华东地区" name="type" />
          <el-checkbox label="华北地区" name="type" />
          <el-checkbox label="西南地区" name="type" />
          <el-checkbox label="西北地区" name="type" />
          <el-checkbox label="海外地区" name="type" />
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="租用时长">
        <el-radio-group v-model="form.duration">
          <el-radio label="1月" />
          <el-radio label="3月" />
          <el-radio label="半年" />
          <el-radio label="1年" />
        </el-radio-group>
      </el-form-item>
      <el-form-item label="自动续费">
        <el-switch v-model="form.renew" />
      </el-form-item>
      <el-form-item label="套餐规格">
        <el-radio-group v-model="form.combination">
          <el-radio label="32元/月" :value="1" />
          <el-radio label="64元/月" :value="2" />
          <el-radio label="80元/月" :value="3" />

        </el-radio-group>

      
  
      </el-form-item>
      <el-form-item label="服务器描述">
        <el-input v-model="form.desc" type="textarea" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">创建</el-button>
      </el-form-item>
        <el-checkbox v-model="form.permission">我已阅读并同意《云服务协议》、《退款规则》</el-checkbox>
      <el-form-item>

      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: '',
        region: '',
        /*date1: '',
        date2: '',*/
        autoDelivery: true,
        type: [],
        duration: '',
        renew:false,
        combination:'',
        desc: '',
        permission:false
      }
    }
  },
  methods: {
    validateForm() {
      const requiredFields = ['name', 'region','autoDelivery','type','duration','renew','combination','permission']; // 在此处添加任何其他必填字段
      const emptyFields = requiredFields.filter(field => !this.form[field]);
      if (emptyFields.length > 0) {
        this.$message.error('有必填项未完成！');
        return false;
      }
      return true;
    },
    submitForm() {
      if (this.validateForm()) {
        if(this.form.permission){
          this.$message({
            message: '表单已提交！',
            type: 'success'
          });
          this.form = {
            name: '',
            region: '',
            /*date1: '',
            date2: '',*/
            autoDelivery: true,
            type: [],
            duration: '',
            renew:false,
            combination:'',
            desc: '',
            permission:false
          };  
        }else{
          this.$message({
            message: '请阅读并确认同意服务协议！',
            type: 'warning'
          });
        }
      }   
    }
  }
}
</script>
<!--因为是之前写的表单，数据格式还和api上不匹配，暂时还没有写post-->
