<template>
  <div class="dashboard-container">
    <div class="dashboard-text">数据可视化</div>
    
    <iframe src='./static/resCost_per.html'  scrolling="no"  width="1000" height="500" frameborder="0"></iframe>
    <iframe src='./static/avgDelay.html'  scrolling="no"  width="1000" height="500" frameborder="0"></iframe>
    <!--<iframe src='' scrolling="no" width="1000" height="1000" frameborder="0">-->
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  data(){
    return{
      src:'',
    };
  },
  mounted(){
    this.src = '../../../public/resCost_per.html'
  },
  
};
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
