<template>
  <div class="mod-order-detail">
    <el-form ref="formInfor" :model="formInfor" label-width="80px">
      <div class="detail-box common-info">
        <div class="detail-head-title">
          <span>基本信息</span>
        </div>
        <div class="detail-content">
          <el-row>
            <el-col :span="6">
              <label>订单号：</label><span>{{formInfor.id}}</span>
            </el-col>
            <el-col :span="6">
              <label>订单类型：</label><span>{{formInfor.businessType}}</span>
            </el-col>
            <el-col :span="6">
              <label>订单类型：</label><span>{{formInfor.orderStatus}}</span>
            </el-col>
            <el-col :span="6"></el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <label>客户名称：</label><span>{{formInfor.customerName}}</span>
            </el-col>
            <el-col :span="6">
              <label>合同号：</label><span>{{formInfor.contractNumber}}</span>
            </el-col>
            <el-col :span="6">
              <label>订单币种：</label><span>{{formInfor.currencyCode}}</span>
            </el-col>
            <el-col :span="6"></el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <label>报关日期：</label><span>{{formInfor.bgdata}}</span>
            </el-col>
            <el-col :span="6">
              <label>主商务：</label><span>{{formInfor.bgdata}}</span>
            </el-col>
            <el-col :span="6">
              <label>主业务：</label><span>{{formInfor.operationMan}}</span>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <label>开票客户信息：</label><span>{{formInfor.bgdata}}</span>
            </el-col>
            <el-col :span="6">
            </el-col>
            <el-col :span="6">
            </el-col>
            <el-col :span="6">
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="detail-box common-info">
        <div class="detail-head-title">
          <span>订单明细</span>
        </div>
        <div class="detail-content">
          <el-table v-loading="dataListLoading" :data="details" header-align="center" style="width:100%;"
                    min-height="228">
            <el-table-column align="center" prop="date" style="height:38px;" label="合计：" class="total">
              <el-table-column align="center" type="index" label="序号" width="100">
              </el-table-column>
              <el-table-column align="center" prop="supplierName" label="供应商" width="400">
              </el-table-column>
              <el-table-column align="center" prop="customerMaterialName" label="客户品名" width="200">
              </el-table-column>
              <el-table-column align="center" prop="materialName" label="报关品名" width="150">
              </el-table-column>
              <el-table-column align="center" prop="materialBrand" label="品牌" width="120">
              </el-table-column>
              <el-table-column align="center" prop="materialModel" label="型号" width="200">
              </el-table-column>
              <el-table-column align="center" prop="zip" label="单位" width="100">
              </el-table-column>
            </el-table-column>
            <el-table-column align="center" prop="totalQuantity" :label="totalQuantity">
              <el-table-column align="center" prop="quantity" label="数量" width="120">
              </el-table-column>
            </el-table-column>
            <el-table-column align="center">
              <el-table-column align="center" prop="price" label="单价" width="120">
              </el-table-column>
              <el-table-column align="center" prop="currencyCode" label="币制" width="100">
              </el-table-column>
            </el-table-column>
            <el-table-column align="center" prop="orderAmount" :label="orderAmount">
              <el-table-column align="center" prop="totalPrice" label="总价" width="200">
              </el-table-column>
            </el-table-column>
            <el-table-column align="center" prop="totalNetWeight" :label="totalNetWeight">
              <el-table-column align="center" prop="netWeight" label="净量/KG" width="150">
              </el-table-column>
            </el-table-column>
            <el-table-column align="center" prop="totalGrossWeight" :label="totalGrossWeight">
              <el-table-column align="center" prop="grossWeight" label="毛量/KG" width="150">
              </el-table-column>
            </el-table-column>
            <el-table-column align="center">
              <el-table-column align="center" prop="zip" label="产地" width="100">
              </el-table-column>
              <el-table-column align="center" prop="hsCode" label="HS CODE" width="200">
              </el-table-column>
              <el-table-column align="center" prop="tariffRate" label="关税率" width="120">
              </el-table-column>
              <el-table-column align="center" prop="vaTaxRate" label="增值税率" width="200">
              </el-table-column>
              <el-table-column align="center" prop="consumptionTaxRate" label="消费税率" width="200">
              </el-table-column>
            </el-table-column>
            <el-table-column align="center" fixed="right" width="200">
              <el-table-column align="center" fixed="right" label="报关要素" width="200">
                <template slot-scope="scope">
                  <el-button @click="openElement(scope.row)" type="text" size="small" style="color:#4798FB">查看
                  </el-button>
                </template>
              </el-table-column>
            </el-table-column>
          </el-table>
          <el-pagination @size-change="sizeChangeHandle" @current-change="currentChangeHandle" :current-page="pageIndex"
                         :page-sizes="[5, 10, 15, 20]" :page-size.sync="pageSize" :total="totalPage"
                         layout="total, sizes, prev, pager, next, jumper">
          </el-pagination>
          <el-row>
            <el-col :span="6">
              <label>订单总金额：</label><span>{{formInfor.orderAmount}}</span>
            </el-col>
            <el-col :span="6">
              <label>订单件数：</label><span>{{formInfor.totalQuantity}}</span>
            </el-col>
            <el-col :span="6"></el-col>
            <el-col :span="6"></el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <label>订单毛重：</label><span>{{formInfor.totalGrossWeight}}</span>
            </el-col>
            <el-col :span="6">
              <label>订单净重：</label><span>{{formInfor.totalNetWeight}}</span>
            </el-col>
            <el-col :span="6"></el-col>
            <el-col :span="6"></el-col>
          </el-row>
        </div>

      </div>
      <div class="detail-box common-info">
        <div class="detail-head-title">
          <span>运输信息</span>
        </div>
        <div class="detail-content">
          <el-row>
            <el-col :span="6">
              <label>运输方式：</label><span>{{formInfor.transportName}}</span>
            </el-col>
            <el-col :span="6">
              <label>订单状态：</label><span>{{formInfor.shipmentPort}}</span>
            </el-col>
            <el-col :span="6">
              <label>启运港：</label><span>{{formInfor.orderStatus}}</span>
            </el-col>
            <el-col :span="6"></el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <label>通关口岸：</label><span>{{formInfor.sapPortName}}</span>
            </el-col>
            <el-col :span="6">
              <label>供应商送货信息：</label><span>{{formInfor.sendh}}</span>
            </el-col>
            <el-col :span="6"></el-col>
            <el-col :span="6"></el-col>
          </el-row>
        </div>
      </div>
    </el-form>
    <el-form ref="editComment" :model="editComment" label-width="80px">
      <div class="detail-box">
        <div class="detail-head-title">
          <span>评价及反馈</span>
        </div>
        <div class="detail-content">
          <div class="block">
            <span class="spanAlign">点击星星，给我们评分：</span>
            <el-rate v-model="editComment.value" show-score text-color="#999999" class="spanAlign"></el-rate>
            <span style="display: inline-block;">星</span>
          </div>
          <div>
            <span style="margin: 15px 20px;vertical-align: top;display: inline-block;">留言反馈：</span>
            <el-input type="textarea" :rows="10" class="editCom" placeholder="具体说几句吧..." v-model="editComment.textarea">
            </el-input>
          </div>
          <el-button type="primary" style="width:84px;margin: 8px 94px;" @click="submitDetail()">提交</el-button>
        </div>
      </div>
    </el-form>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        totalQuantity: '',
        orderAmount: '',
        totalNetWeight: '',
        totalGrossWeight: '',
        formInfor: {},
        editComment: {},
        details: [],
        hasNextPage: false,
        dataListLoading: false,
        totalPage: 0,
        pageSize: 5,
        pageIndex: 1,
        prev: 0,
        pager: 1,
        next: 1,
        contractId: '',
        value: 0,
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
        checkedColumns: ['序号', '订单号', '状态', '订单提交日期', '供应商'],
        columns: ['序号', '订单号', '状态', '订单提交日期', '供应商', '客户订单号', '业务类型', '订单物料信息', '通关口岸', '金额', '境外采购币制', '件数', '毛重(KG)', '是否关注', '操作'],
        radio3: '上海',
        orders: [],
        orderDetail: [],
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
      openElement (row) {
        this.$alert(row.declareElement, '报关要素', {
          confirmButtonText: '关闭'
        })
      },
      orderDetailForClient (contractId) {
        this.dataListLoading = true
        this.$http({
          url: this.$http.adornUrl('/order/orderDetailForClient'),
          method: 'get',
          params: this.$http.adornParams({
            'contractId': contractId
          })
        }).then(({
                   data
                 }) => {
          if (data && data.code === 'C0000') {
            this.formInfor = data.result
            // 总数量
            this.totalQuantity = data.result.totalQuantity.toString()
            // 订单总额
            this.orderAmount = data.result.orderAmount.toString()
            // 总净
            this.totalNetWeight = data.result.totalNetWeight.toString()
            // 总毛重
            this.totalGrossWeight = data.result.totalGrossWeight.toString()
          } else {
            this.totalPage = 0
          }
          this.dataListLoading = false
        })
      },
      orderDetailByPage (contractId, pageIndex, pageSize) {
        this.$http({
          url: this.$http.adornUrl('/order/orderDetailByPage'),
          method: 'get',
          params: this.$http.adornParams({
            'contractId': contractId,
            'pageNum': pageIndex,
            'pageSize': pageSize
          })
        }).then(({
                   data
                 }) => {
          if (data && data.code === 'C0000') {
            this.details = data.result.list
            this.totalPage = data.result.total
            this.pageIndex = data.result.pageNum
            this.hasNextPage = data.result.hasNextPage
            this.prev = data.result.prePage
          }
        })
      },
      sizeChangeHandle (val) {
        this.pageSize = val
        this.pageIndex = 1
      },
      // 当前页
      currentChangeHandle (val) {
        if (this.hasNextPage === true) {
          this.pageIndex = val
          this.orderDetailByPage(this.$route.params.id || localStorage.getItem('detailId'), val, this.pageSize)
        } else if (this.prev !== 0) {
          this.pageIndex = val - 1
          this.orderDetailByPage(this.$route.params.id || localStorage.getItem('detailId'), val - 1, this.pageSize)
        }
      },
      submitDetail () {
        if (this.editComment.value || this.editComment.textarea) {
          this.$http({
            url: this.$http.adornUrl('/order/editComment'),
            method: 'post',
            data: this.$http.adornData({
              'contractId': this.$route.params.id === undefined ? Number(localStorage.getItem('detailId')) : this.$route.params.id,
              'userId': 111,
              'score': this.editComment.value,
              'content': this.editComment.textarea
            })
          }).then(({
                     data
                   }) => {
            if (data && data.code === 'C0000') {
              this.$message({
                message: '提交成功',
                type: 'success'
              })
              this.editComment.value = 0
              this.editComment.textarea = ''
            } else {
              this.$message({
                showClose: true,
                message: data.message
              })
            }
          })
        } else {
          this.$message({
            showClose: true,
            message: '评分和留言都为空!'
          })
        }
      }
    },
    mounted () {
      if (this.$route.params.id !== localStorage.getItem('detailId') && this.$route.params.id !== undefined) {
        localStorage.setItem('detailId', '')
        this.orderDetailForClient(this.$route.params.id)
        this.orderDetailByPage(this.$route.params.id, this.totalPage, this.pageSize)
        localStorage.setItem('detailId', this.$route.params.id)
      } else if (this.$route.params.id === undefined) {
        var detailId = localStorage.getItem('detailId')
        this.orderDetailForClient(detailId)
        this.orderDetailByPage(detailId, this.pageIndex, this.pageSize)
        localStorage.setItem('detailId', detailId)
      }
    },
    watch: {
      $route (to, from) {
        if (this.$route.params.id !== undefined) {
          this.orderDetailForClient(this.$route.params.id)
          this.orderDetailByPage(this.$route.params.id, this.pageIndex, this.pageSize)
          this.editComment.value = 0
          this.editComment.textarea = ''
          localStorage.setItem('detailId', this.$route.params.id)
        }
      }
    }
  }
</script>

<style lang="scss">
  .mod-order-detail {
    position: relative;
    z-index: 510;
    background: #fff;
    padding-bottom: 20px;
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
    .icon-svg {
      vertical-align: -.15em;
      margin-right: 8px;
    }
    .detail-box {
      .detail-head-title {
        width: 100%;
        height: 32px;
        background: rgba(255, 255, 255, 1);
        border-bottom: 1px solid #E8E8E8;
        span {
          border-left: 3px solid #4798FB;
          padding-left: 5px;
          height: 32px;
          line-height: 32px;
          margin-left: 10px;
          color: #333333;
          font-weight: 600;
        }
      }
      .detail-content {
        padding: 20px;
        .el-table__header thead th {
          &.is-leaf {
            background: #4798fb;
            color: #fff;
          }
          background: #fff;
          color: #333;
        }
      }
    }
    .editCom {
      display: inline-block;
      width: 662px;
      height: 224px;
      padding: 8px;
      margin-bottom: 10px;
      margin-left: -30px;
      background: rgba(255, 255, 255, 1);
      border-radius: unset;
    }

    .spanAlign {
      display: inline-block;
      vertical-align: middle
    }
    .common-info {
      .el-col {
        height: 32px;
        line-height: 32px;
        margin-bottom: 20px;
        label {
          display: inline-block;
          margin-right: 15px;
        }
      }
      .el-pagination {
        margin-bottom: 20px;
        margin-top: 0;
        text-align: center;
        border: 1px solid #E8E8E8;
        height: 40px;
        line-height: 40px;
        padding-top: 5px;
      }
    }
  }

</style>

