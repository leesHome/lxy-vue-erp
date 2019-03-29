<style lang="scss">
  .mod-config {
    position: relative;
    z-index: 510;
    padding: 20px 25px;
    background: #fff;
    .ruleForm {
      display: block;
      width: 800px;
      .tips {
        display: inline-block;
        margin-left: 50px;
        width: 200px;
        span {
          display: inline-block;
          vertical-align: middle;
          color: #666666;
          margin-right: 5px
        }
      }
      .el-input--medium {
        width: 300px;
      }
      input {
        color: #666666;
        display: inline-block;
        width: 300px;
        margin-left: -20px;
      }
    }
  }
</style>

<style scoped>
  .el-switch span {
    color: #cccccc;
  }
  .el-switch .el-switch__label > span {
    color: #666666;
  }
</style>

<template>
  <div class="mod-config">
    <el-form
      :model="ruleForm"
      :rules="dataRule"
      ref="ruleForm"
      label-width="100px"
      class="ruleForm"
      :label-position="position"
      @keyup.enter.native="submitSave()">
      <icon-svg name="all-order" style="float:left;margin-top:10px;margin-right:5px"></icon-svg>
      <el-form-item label="邮箱地址：" prop="email" :rules="dataRule.email">
        <el-input v-model="ruleForm.email" type="email" ref="email" :disabled="emailch"></el-input>
        <el-button size="small" type="text" @click="editEmail()" style="margin-left:-10px">修改</el-button>
        <div class="tips">
          <span>是否接受邮件提醒</span>
          <el-switch
            v-model="isSendMail"
            active-color="#1890FF">
          </el-switch>
        </div>
        <el-button type="primary" style="width:83px;display:inline-block" @click="submitSave('ruleForm')">保存</el-button>
      </el-form-item>
      <icon-svg name="all-order" style="float:left;margin-top:10px;margin-right:5px"></icon-svg>
      <el-form-item label="手机号码：" prop="mobile">
        <el-input v-model="ruleForm.mobile" type="tel" :disabled="true"></el-input>
        <el-button size="small" type="text" @click="" style="margin-left:-10px;visibility:hidden">修改</el-button>
        <div class="tips">
          <span>是否接受短信提醒</span>
          <el-switch
            v-model="isSendSms"
            active-color="#1890FF">
          </el-switch>
        </div>
      </el-form-item>
      <icon-svg name="all-order" style="float:left;margin-top:10px;margin-right:5px"></icon-svg>
      <el-form-item label="微信：" prop="Wechat">
        <el-input v-model="ruleForm.Wechat" type="text" :disabled="true"></el-input>
        <el-button size="small" type="text" @click="" style="margin-left:-10px;visibility:hidden">修改</el-button>
        <div class="tips">
          <span>是否接受微信提醒</span>
          <el-switch
            v-model="isSendWechat"
            active-color="#1890FF">
          </el-switch>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {
    // eslint-disable-next-line
    isEmail, isMobile
  } from '@/utils/validate'

  export default {
    data () {
      var validateEmail = (rule, value, callback) => {
        if (!isEmail(value)) {
          callback(new Error('邮箱格式错误'))
        } else {
          callback()
        }
      }
      return {
        emailch: true,
        isSendMail: 0,
        isSendSms: 0,
        isSendWechat: 1,
        position: 'left',
        ruleForm: {},
        dataRule: {
          email: [{
            required: true,
            message: '邮箱不能为空',
            trigger: 'blur'
          }, {
            validator: validateEmail,
            trigger: 'blur'
          }]
        }
      }
    },
    watch: {},
    created () {
      this.init()
    },
    methods: {
      init (userId) {
        userId = this.$store.state.id || 5
        if (userId) {
          this.$http({
            url: this.$http.adornUrl('/user/SelectAccountInfoPush'),
            method: 'get',
            params: this.$http.adornParams({
              'userId': userId
            })
          }).then(({data}) => {
            if (data && data.code === 'C0000') {
              this.ruleForm = data.result
            }
          })
        }
      },
      editEmail: function () {
        this.emailch = false
        this.$refs['email'].focus()
      },
      /* 保存 */
      submitSave (ruleForm) {
        this.$refs[ruleForm].validate((valid) => {
          if (valid) {
            this.$http({
              url: this.$http.adornUrl('/user/AccountInfoPushSettings'),
              method: 'post',
              data: this.$http.adornData({
                'userId': 1,
                'email': this.ruleForm.email
              })
            }).then(({data}) => {
              if (data && data.code === 'C0000') {
                this.$message({
                  message: '保存成功',
                  type: 'success'
                })
                this.emailch = true
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
              message: '邮箱有误'
            })
            this.$refs['email'].focus()
          }
        })
      }
    }
  }
</script>
