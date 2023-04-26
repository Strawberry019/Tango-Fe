<template>
  <div>
    <el-table :data="nodeInfo" style="width: 100%">
      <el-table-column prop="id" label="节点ID" width="90"></el-table-column>
      <el-table-column prop="name" label="节点名称" width="100"></el-table-column>
      <el-table-column prop="cpu" label="总cpu资源/核数" width="120"></el-table-column>
      <el-table-column prop="mem" label="总内存资源/GB" width="120"></el-table-column>
      <el-table-column prop="disk" label="总磁盘资源/GB" width="120"></el-table-column>
      <el-table-column prop="cpu_rem" label="剩余cpu资源/核数" width="140"></el-table-column>
      <el-table-column prop="mem_rem" label="剩余内存资源/GB" width="130"></el-table-column>
      <el-table-column prop="disk_rem" label="剩余磁盘资源/GB" width="130"></el-table-column>
      <el-table-column prop='geo_place_id' label='地理位置ID' width='120' ></el-table-column>
      <el-table-column prop="delay_value" label="延迟值" width="120"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getList } from '@/api/table'

export default {
  data() {
    return {
      nodeInfo: [],
      /*写法1：
      delayColumn:[
        { prop: 'geo_place_id', label: '地理位置ID', width: '120' },
        { prop: 'delay', label: '延迟值', width: '120' } 
      ]
      */
    }
  },
  created() {
    let id = this.$route.params.id;
    this.id = id
    this.fetchData()
  },
  methods: {
    fetchData() {
      getList(`/could_info/node/${this.id}`).then(response => {
        let delay = response.data.delay;
        let nodeInfo = Object.assign({}, response.data);
        nodeInfo.delay_value = delay[0].delay;
        nodeInfo.geo_place_id = delay[0].geo_place_id;
        this.nodeInfo = [nodeInfo];
        console.log(this.nodeInfo);
      })
    }
  }
}
</script>

