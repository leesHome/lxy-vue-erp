<style rel="stylesheet/scss" lang="scss" scoped>
  .panel-group {
    /**/
    .card-panel {
      border-radius: 4px;
      height: 120px;
      cursor: pointer;
      font-size: 12px;
      position: relative;
      overflow: hidden;
      color: #666;
      background: #fff;
      box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
      border-color: rgba(0, 0, 0, .05);
      &.bgcolor-4798FB {
        background: #4798FB;
      }
      &.bgcolor-FFBC5A {
        background: #FFBC5A;
      }
      &.bgcolor-FD5E94 {
        background: #FD5E94;
      }
      &.bgcolor-AED581 {
        background: #AED581;
      }
      &:hover {
        .card-panel-icon-wrapper {
          color: #fff;
        }
        .icon-people {
          background: #40c9c6;
        }
        .icon-message {
          background: #36a3f7;
        }
        .icon-money {
          background: #f4516c;
        }
        .icon-shoppingCard {
          background: #34bfa3
        }
      }
      .icon-people {
        color: #40c9c6;
      }
      .icon-message {
        color: #36a3f7;
      }
      .icon-money {
        color: #f4516c;
      }
      .icon-shoppingCard {
        color: #34bfa3
      }
      .card-panel-icon-wrapper {
        float: left;
        margin: 29px 0 0 48px;
        transition: all 0.38s ease-out;
        border-radius: 6px;
        .icon-svg {
          font-size: 62px;
        }
      }
      .card-panel-icon {
        float: left;
        font-size: 48px;
      }
      .card-panel-description {
        float: right;
        font-weight: bold;
        margin: 26px;
        margin-left: 0px;
        .card-panel-text {
          line-height: 18px;
          color: rgba(255, 255, 255, 1);
          font-size: 16px;
          text-algin: center;
        }
        .card-panel-num {
          font-size: 36px;
          color: rgba(255, 255, 255, 1);
          margin-bottom: 10px;
          display: block;
        }
      }
    }
  }
</style>

<template>
  <el-row class="panel-group" :gutter="40">
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class='card-panel bgcolor-4798FB' @click="toggleTabs('all')">
        <div class="card-panel-icon-wrapper">
          <icon-svg name="all-order-b"></icon-svg>
        </div>
        <div class="card-panel-description">
          <count-to class="card-panel-num" :startVal="0" :endVal="orderSum.totalOrderCnt" :duration="3000"></count-to>
          <div class="card-panel-text">全部订单</div>
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel bgcolor-FFBC5A" @click="toggleTabs('UNDECLARE')">
        <div class="card-panel-icon-wrapper">
          <icon-svg name="daibaoguan-b"></icon-svg>
        </div>
        <div class="card-panel-description">
          <count-to class="card-panel-num" :startVal="0" :endVal="orderSum.unDeclareOrderCnt"
                    :duration="3000"></count-to>
          <div class="card-panel-text">待报关</div>
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel bgcolor-FD5E94" @click="toggleTabs('DECLARE')">
        <div class="card-panel-icon-wrapper">
          <icon-svg name="baoguanzhong-b"></icon-svg>
        </div>
        <div class="card-panel-description">
          <count-to class="card-panel-num" :startVal="0" :endVal="orderSum.declareOrderCnt" :duration="3000"></count-to>
          <div class="card-panel-text">报关中</div>
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel bgcolor-AED581" @click="toggleTabs('RELEASED')">
        <div class="card-panel-icon-wrapper">
          <icon-svg name="fangxing-b"></icon-svg>
        </div>
        <div class="card-panel-description">
          <count-to class="card-panel-num" :startVal="0" :endVal="orderSum.releasedOrderCnt"
                    :duration="3000"></count-to>
          <div class="card-panel-text">已放行</div>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
  import CountTo from 'vue-count-to'
  export default {
    props: {
      orderSum: Object

    },
    components: {
      CountTo
    },
    methods: {
      handleSetLineChartData (type) {
        this.$emit('handleSetLineChartData', type)
      },
      // 订单列表切换
      toggleTabs (index) {
        this.$router.push({
          name: 'order-index',
          params: {
            'tabIndex': index
          }
        })
      }
    }
  }
</script>
