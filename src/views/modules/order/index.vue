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

  .mod-order-list {
    position: relative;
    z-index: 510;
    padding-bottom: 20px;
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
  }

</style>

<template>

  <div class="mod-order-list">
    <div class="abel-tabs">
      <el-row class="tabs">
        <el-col :span="6" v-on:click.native="toggleTabs('all');" :class="{ 'active':currentView === 'all' }">
          <icon-svg name="all-order"></icon-svg>
          全部订单
        </el-col>
        <el-col :span="6" v-on:click.native="toggleTabs('UNDECLARE');"
                :class="{ 'active':currentView === 'UNDECLARE' }">
          <icon-svg name="daibaoguan"></icon-svg>
          待报关
        </el-col>
        <el-col :span="6" v-on:click.native="toggleTabs('DECLARE');" :class="{ 'active':currentView === 'DECLARE' }">
          <icon-svg name="baoguanzhong"></icon-svg>
          报关中
        </el-col>
        <el-col :span="6" v-on:click.native="toggleTabs('RELEASED');" :class="{ 'active':currentView === 'RELEASED' }"
                style="border-right:none">
          <icon-svg name="fangxing"></icon-svg>
          已放行
        </el-col>
      </el-row>
      <el-row v-show="currentView !== ''">
        <div style="border-bottom:1px solid #ebeef5">
          <el-form :inline="true" :model="queryOrderForm" class="query-order-form">
            <el-form-item>
              <el-input v-model="queryOrderForm.user" placeholder="订单号/供应商" size="small"></el-input>
            </el-form-item>
            <!--
            <el-form-item>
                <el-radio-group v-model="radio3" size="small">
                    <el-radio-button label="今天"></el-radio-button>
                    <el-radio-button label="本周"></el-radio-button>
                    <el-radio-button label="本月"></el-radio-button>
                </el-radio-group>
            </el-form-item>
            -->
            <el-form-item>
              <el-date-picker v-model="queryOrderForm.date" type="daterange" align="right" unlink-panels
                              range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"
                              :picker-options="pickerOptions2" size="small">
              </el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-checkbox v-model="queryOrderForm.attention" size="small">我关注的订单</el-checkbox>
            </el-form-item>
            <el-form-item>
              <el-select v-model="value" placeholder="请选择" size="small">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="queryOrder()" size="small">查询</el-button>

              <el-button type="primary" @click="" size="small">清除</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="pd20">
          <div class="clearfix mb20">
            <el-popover placement="bottom" trigger="click">
              <el-checkbox-group v-model="checkedColumns" class="fliterbox">
                <el-checkbox v-for="column in columns" :label="column" :key="column">{{column}}</el-checkbox>
              </el-checkbox-group>
              <el-button slot="reference" style="float: right; margin-left:10px;">
                筛选
              </el-button>
            </el-popover>
            <el-button style="float: right;">刷新<i class="el-icon-refresh"></i></el-button>
          </div>
          <el-table :data="orderList" style="width: 100%;">
            <el-table-column type="selection" header-align="center" align="center" width="50">
            </el-table-column>
            <el-table-column prop="id" header-align="center" align="center" width="80" label="序号">
            </el-table-column>
            <el-table-column prop="contractNumber" header-align="center" align="center" width="120" label="订单号">
            </el-table-column>
            <el-table-column prop="orderStatus" header-align="center" align="center" width="160" label="状态">
              <!--  <template slot-scope="{row}">
                 {{ row.name || '--' }}
               </template>-->
            </el-table-column>
            <el-table-column prop="createTime" header-align="center" align="center" width="120" label="订单提交日期">
              <template slot-scope="scope">
                {{scope.row.createTime| formatDate}}
              </template>
            </el-table-column>
            <el-table-column prop="supplierName" header-align="center" align="center" width="220" label="供应商"
                             :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column prop="customerOrderNumber" header-align="center" align="center" width="120" label="客户订单号">
            </el-table-column>
            <el-table-column prop="declareType" header-align="center" align="center" width="120" label="业务类型">
              <template slot-scope="scope">
                <div v-if="scope.row.declareType === 'IMPORT'">代理进口</div>
                <div v-else>合作出口</div>
              </template>
            </el-table-column>
            <el-table-column prop="orderDetail" header-align="center" align="center" width="120" label="订单物料信息"
                             :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column prop="sapPortName" header-align="center" align="center" label="通关口岸">
            </el-table-column>
            <el-table-column prop="orderAmount" header-align="center" align="center" label="金额"
                             :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column prop="currencyCode" header-align="center" align="center" width="120" label="境外采购币制">
            </el-table-column>
            <el-table-column prop="totalQuantity" header-align="center" align="center" label="件数">
            </el-table-column>
            <el-table-column prop="totalGrossWeight" header-align="center" align="center" label="毛重(KG)">
            </el-table-column>
            <el-table-column prop="isAttention" header-align="center" align="center" label="是否关注">
              <template slot-scope="scope">
                <div v-if="scope.row.isAttention === 0">否</div>
                <div v-else>是</div>
              </template>
            </el-table-column>
            <el-table-column fixed="right" header-align="center" align="center" width="150" label="操作">
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="handleAttention(scope.row.id,'5',scope.row.isAttention)">
                  <el-tooltip content="关注" placement="top">
                    <icon-svg name="attention-off" v-show="scope.row.isAttention==0"></icon-svg>
                  </el-tooltip>
                  <el-tooltip content="取消关注" placement="top">
                    <icon-svg name="attention-on" v-show="scope.row.isAttention==1"></icon-svg>
                  </el-tooltip>
                </el-button>
                <el-button type="text " size="small " @click="showOrderDetail(scope.row.id) ">
                  <el-tooltip content="查看详情" placement="top">
                    <icon-svg name="detail-show"></icon-svg>
                  </el-tooltip>
                </el-button>
                <el-button type="text " size="small " @click="handleComment(scope.row.id,'5',scope.row.isAttention)">
                  <el-tooltip content="评论" placement="top">
                    <icon-svg name="order-comment" v-show="scope.row.isAttention==0"></icon-svg>
                  </el-tooltip>
                  <el-tooltip content="编辑评论" placement="top">
                    <icon-svg name="comment-edit" v-show="scope.row.isAttention==1"></icon-svg>
                  </el-tooltip>
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-row>
    </div>
  </div>

</template>

<script>
  export default {
    data () {
      return {
        value: '',
        queryOrderForm: {},
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        checkedColumns: ['序号', '订单号', '状态', '订单提交日期', '供应商', '客户订单号', '业务类型', '订单物料信息', '通关口岸', '金额', '境外采购币制', '件数', '毛重(KG)', '是否关注', '操作'],
        columns: ['序号', '订单号', '状态', '订单提交日期', '供应商', '客户订单号', '业务类型', '订单物料信息', '通关口岸', '金额', '境外采购币制', '件数', '毛重(KG)', '是否关注', '操作'],
        radio3: '上海',
        checked: '',
        orders: [],
        orderList: [],
        first: 'first',
        second: 'second',
        third: 'third',
        forth: 'forth',
        currentView: 'first',
        formInline: {},
        pickerOptions2: {
          shortcuts: [{
            text: '最近一周',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '最近一个月',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '最近三个月',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }]
        },
        value7: ''
      }
    },
    filters: {
      formatDate (time) {
        if (time) return time.substring(0, 10)
      }
    },

    methods: {
      // 跳转详情页
      showOrderDetail (id) {
        this.$router.push({
          name: 'order-detail',
          params: {
            'id': id
          }
        })
      },
      // 订单列表
      getOrderList (params) {
        this.$http({
          url: this.$http.adornUrl('/order/list'),
          method: 'get',
          params: this.$http.adornParams(params)
        }).then(({
                   data
                 }) => {
          if (data && data.code === 'C0000') {
            this.orderList = data.result.list
            //  this.totalPage = data.page.totalCount
          } else {
            //  this.dataList = []
            // this.totalPage = 0
          }
          // this.dataListLoading = false
        })
      },
      // 订单类型切换
      toggleTabs (tabText) {
        if (tabText === 'all') {
          this.getOrderList()
        }
        this.getOrderList({
          'declareStatus': tabText
        })
        this.currentView = tabText
      },
      // 查询订单
      queryOrder () {
        console.log(this.queryOrderForm)
        // let params = {}
      }

    },
    created () {
      if (this.$route.params.tabIndex) {
        this.currentView = this.$route.params.tabIndex
        if (this.currentView === 'all') {
          this.getOrderList()
        } else {
          this.getOrderList({
            'declareStatus': this.currentView
          })
        }
      }
    },
    mounted () {

    }
  }
</script>
