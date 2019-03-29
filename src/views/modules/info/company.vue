<style lang="scss">
  .mod-info-company {
    padding: 20px;
    background: #fff;
    table {
      width: 75%;
      border: 1px solid rgba(232, 232, 232, 1);
      border-collapse: collapse;
    }
    & td {
      width: 50%;
      height: 32px;
      line-height: 32px;
      border: 1px solid rgba(232, 232, 232, 1);
      padding: 10px 20px;
    }
  }

</style>

<template>
  <div class="mod-info-company">
    <table>
      <tr>
        <td>公司名称：{{info.customerName}}</td>
        <td>公司地址：{{info.companyAddress}}</td>
      </tr>
      <tr>
        <td>公司编号：{{info.customerName}}</td>
        <td>公司电话：{{info.companyPhone}}</td>
      </tr>
      <tr>
        <td>公司传真：{{info.companyFax}}</td>
        <td>联系邮箱：{{info.contractMail}}</td>
      </tr>
      <tr>
        <td>联系人：{{info.contractBy}}</td>
        <td>联系电话：{{info.contractPhone}}</td>
      </tr>
    </table>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        info: {}
      }
    },
    components: {},
    mounted () {
      this.getCustomerInfo()
    },
    methods: {
      // 获取客户信息
      getCustomerInfo () {
        this.$http({
          url: this.$http.adornUrl('/customer/selectSingle'),
          method: 'post',
          data: this.$http.adornData({
            'customerNumber': '0000201087'
          })
        }).then(({ data }) => {
          if (data && data.code === 'C0000') {
            this.info = data.result
          }
        })
      }

    }
  }
</script>
