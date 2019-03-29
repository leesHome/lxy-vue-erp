<style lang="scss">
  .fliterbox {
    .el-checkbox {
      display: block;
      margin: 0;
    }
    .el-checkbox + .el-checkbox {
      margin: 0;
    }
  }

  .panle {
    padding: 20px;
    background: #fff;
  }

  .mod-home-index {
    position: relative;
    z-index: 510;
    margin-top: 20px;
    padding: 20px;
    background: #fff;
    > .el-alert {
      margin-bottom: 10px;
    }
    .mb20 {
      margin-bottom: 20px;
    }
    .pd20 {
      padding: 20px;
    }
    .el-form-item {
      margin: 10px 20px;
    }
    .abel-tabs {
      .tabs {
        .el-col {
          height: 42px;
          line-height: 42px;
          text-align: center;
          background: rgba(255, 255, 255, 1);
          border-right: 1px solid rgba(232, 232, 232, 1);
          border-bottom: 1px solid rgba(232, 232, 232, 1);
          color: #333333;
          font-weight: normal;
        }
        .active,
        .el-col:hover {
          background-color: #4798FB;
          color: #fff;
          border-right: 1px solid #4798FB;
        }
        .icon-svg {
          vertical-align: -.15em;
          margin-right: 8px;
        }
      }
    }
    .my-orders .icon-svg {
      vertical-align: -.15em;
      margin-right: 8px;
    }
    .el-table__empty-block {
      min-height: 300px;
    }
    .el-table__empty-text {
      color: #4798FB;
    }
  }
</style>

<template>
  <div>
    <div class="panle">
      <PanelGroup :orderSum="orderSum"></PanelGroup>

    </div>
    <div class="mod-home-index">
      <el-radio-group v-model="orderType" class="mb10" @change="handelOrderList(orderType)">
        <el-radio-button label="latest">最新</el-radio-button>
        <el-radio-button label="attention">已关注</el-radio-button>
      </el-radio-group>
      <el-table :data="orderList" style="width: 100%;" v-loading="dataListLoading">
        <el-table-column prop="id" header-align="center" align="center" width="120" label="序号">
        </el-table-column>
        <el-table-column prop="contractNumber" header-align="center" align="center" width="120" label="订单号">
        </el-table-column>
        <el-table-column prop="orderStatus" header-align="center" align="center" width="160" label="状态">
          <!--  <template slot-scope="{row}">
             {{ row.name || '--' }}
           </template>-->
        </el-table-column>
        <el-table-column prop="createTime" header-align="center" align="center" width="160" label="订单提交日期">
          <template slot-scope="scope">
            {{scope.row.createTime| formatDate}}
          </template>
        </el-table-column>
        <el-table-column prop="supplierName" header-align="center" align="center" width="420" label="供应商"
                         :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column prop="orderAmount" header-align="center" align="center" label="金额"
                         :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column fixed="right" header-align="center" align="center" width="150" label="操作">
          <template slot-scope="scope">
            <!--<el-button type="text" size="small" @click="handleAttention(scope.row.id,'5',scope.row.isAttention)">
                <el-tooltip content="关注" placement="top">
                    <icon-svg name="attention-off" v-show="scope.row.isAttention==0"></icon-svg>
                </el-tooltip>
                <el-tooltip content="取消关注" placement="top">
                    <icon-svg name="attention-on" v-show="scope.row.isAttention==1"></icon-svg>
                </el-tooltip>
            </el-button>-->
            <el-button type="text " size="small " @click="showOrderDetail(scope.row.id) ">
              <el-tooltip content="查看详情" placement="top">
                <icon-svg name="detail-show"></icon-svg>
              </el-tooltip>
            </el-button>
            <!--<el-button type="text " size="small " @click="handleComment(scope.row.id,'5',scope.row.isAttention)">
                <el-tooltip content="评论" placement="top">
                    <icon-svg name="order-comment" v-show="scope.row.isAttention==0"></icon-svg>
                </el-tooltip>
                <el-tooltip content="编辑评论" placement="top">
                    <icon-svg name="comment-edit" v-show="scope.row.isAttention==1"></icon-svg>
                </el-tooltip>
            </el-button>-->
          </template>
        </el-table-column>


        <div slot="empty">
          <icon-svg name="no-data" :style="{'fontSize': '60px'}"></icon-svg>
          <p :style="{'marginTop': '23px'}">暂无数据~</p>
        </div>

      </el-table>
    </div>
  </div>
</template>

<script>
  import PanelGroup from './components/PanelGroup'

  export default {
    components: {
      PanelGroup
    },
    data () {
      return {
        dataListLoading: false,
        orderSum: {},
        userId: 5,
        orderType: 'latest',
        attentionOrders: [],
        orderList: [],
        currentView: ''
      }
    },
    filters: {
      formatDate (time) {
        if (time) return time.substring(0, 10)
      }
    },
    mounted () {
      // 请求订单数据
      this.getOrderSum()
      // 最新订单
      this.getOrderList({
        'pageSize': 10
      }, 'new')
      // 我关注的订单
    },
    methods: {
      // 获取订单数量
      getOrderSum () {
        this.$http({
          url: this.$http.adornUrl('/order/orderCnt'),
          method: 'get',
          params: this.$http.adornParams({
            userId: this.userId
          })
        }).then(({
                   data
                 }) => {
          if (data && data.code === 'C0000') {
            this.orderSum = data.result
          } else {
          }
        })
      },
      // 获取订单列表
      getOrderList (params, type) {
        this.dataListLoading = true
        this.$http({
          url: this.$http.adornUrl('/order/list'),
          method: 'get',
          params: this.$http.adornParams(params)
        }).then(({
                   data
                 }) => {
          if (data && data.code === 'C0000') {
            this.orderList = data.result.list
          } else {
          }
          this.dataListLoading = false
        })
      },
      // 跳转详情页
      showOrderDetail (id) {
        this.$router.push({
          name: 'order-detail',
          params: {
            'id': id
          }
        })
      },
      // 处理关注
      handleAttention (contractId, userId, isAttention) {
        if (isAttention === 1) {
          isAttention = 0
        } else {
          isAttention = 1
        }
        this.$http({
          url: this.$http.adornUrl('/order/attention'),
          method: 'post',
          data: this.$http.adornData({
            'contractId': contractId,
            'userId': userId,
            'isAttention': isAttention
          }, true, 'form')
        }).then(({
                   data
                 }) => {
          if (data && data.code === 'C0000') {
            this.handelOrderList(this.orderType)
            this.dataListLoading = false
          }
        })
      },
      // 处理评价
      handleComment (contractId, userId, isAttention) {
        if (isAttention === 1) {
          isAttention = 0
        } else {
          isAttention = 1
        }
        this.$http({
          url: this.$http.adornUrl('/order/attention'),
          method: 'get',
          params: this.$http.adornParams({
            'contractId': contractId,
            'userId': userId,
            'isAttention': isAttention
          })
        }).then(({
                   data
                 }) => {
          if (data && data.code === 'C0000') {
            alert('成功')
          } else {
          }
          this.dataListLoading = false
        })
      },
      // 处理订单列表
      handelOrderList (type) {
        if (type === 'attention') {
          this.getOrderList({
            'pageSize': 10,
            'isAttention': 1,
            'userId': this.userId
          }, 'attention')
        } else {
          this.getOrderList({
            'pageSize': 10
          }, 'new')
        }
      }
    }
  }
</script>
