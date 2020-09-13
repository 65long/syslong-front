<template>
  <div class="content-main">
    <el-card>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-row :span="3">我的头像</el-row>
          <el-row :span="21">
            <div class="avatar-content">      <!--action 表示图片上传的地址-->
              <el-upload
                class="avatar-uploader"
                :show-file-list="false"
                :action="uploadImgUrl"
                :before-upload="beforeAvatarUpload"
                :on-success="uploadSuccess"
                :headers="headerObj"
                accept="jpg,png"
              >
                <img v-if="avatar" :src="avatar" title="点击上传头像" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon" />
                <div slot="tip" class="el-upload__tip">只能上传jpg文件，且不超过200kb</div>
              </el-upload>
            </div>
          </el-row>
        </el-col>
        <el-col :span="16">
          <el-row class="content-detail">
            <el-col :span="8">昵称</el-col>
            <el-col :span="16">{{ userInfo.nickname }}</el-col>
          </el-row>
          <el-row class="content-detail">
            <el-col :span="8">邮箱</el-col>
            <el-col :span="16">{{ userInfo.email }}</el-col>
          </el-row>
          <el-row class="content-detail">
            <el-col :span="8">账号状态</el-col>
            <el-col :span="16">正常</el-col>
          </el-row>
          <el-row class="content-detail">
            <el-col :span="8">联系方式</el-col>
            <el-col :span="16">{{ userInfo.mobile }}</el-col>
          </el-row>
          <el-row class="content-detail">
            <el-col :span="8">当前角色</el-col>
            <el-col :span="16">{{ userInfo.role }}</el-col>
          </el-row>
          <el-row class="content-detail">
            <el-col :span="8">注册时间</el-col>
            <el-col :span="16">{{ userInfo.date_joined }}</el-col>
          </el-row>
          <el-row class="content-detail">
            <el-col :span="8">上次登录</el-col>
            <el-col :span="16">{{ userInfo.last_login }}</el-col>
          </el-row>

        </el-col>
      </el-row>

    </el-card>

    <el-card shadow="never" class="box-card reset-pass">
      <el-row :gutter="20">
        <el-col :span="10">
          <el-row>
            <el-col :span="12"><el-button type="primary" size="mini" @click="showEditForm">修改密码</el-button></el-col>
            <el-col v-if="editPwdVisible" :span="12"><el-button type="primary" size="mini" @click="submitEditPwd">确认提交</el-button></el-col>
          </el-row>
          <p>安全性高的密码可使账号更安全</p>
          <el-row />
          <el-row>
            <p>建议设置同时包含字母，数字，符号的密码。</p>
          </el-row>
        </el-col>
        <el-col v-if="editPwdVisible" :span="14">
          <el-form ref="changePwdForm" :model="changePwdForm" :rules="changePwdFormRules" size="small" label-width="88px">
            <el-form-item label="原密码" prop="old_pwd">
              <el-input v-model="changePwdForm.old_pwd" type="password" auto-complete="on" style="width: 200px;" />
            </el-form-item>
            <el-form-item label="新密码" prop="new_pwd">
              <el-input v-model="changePwdForm.new_pwd" type="password" auto-complete="on" style="width: 200px;" />
            </el-form-item>
            <el-form-item label="确认密码" prop="repeat_pwd">
              <el-input v-model="changePwdForm.repeat_pwd" type="password" auto-complete="on" style="width: 200px;" @keyup.enter.native="submitEditPwd" />
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import { getToken, getUserInfo } from '@/utils/auth'
import { changeUserPwd } from '@/api/user'
export default {
  name: 'Center',
  data() {
    const confirmPass = (rule, repeat_pwd, callback) => {
      if (this.changePwdForm.new_pwd !== repeat_pwd) {
        callback(new Error('两次输入的密码不一致'))
      } else {
        callback()
      }
    }
    return {
      userInfo: getUserInfo(),
      uploadImgUrl: 'http://118.31.12.178:8888/api/rbac/upload/user/headimg/',
      headerObj: {
        token: getToken()
      },
      acceptType: '',
      editPwdVisible: false,
      changePwdForm: {
        old_pwd: '',
        new_pwd: '',
        repeat_pwd: ''
      },
      changePwdFormRules: {
        old_pwd: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        new_pwd: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
          { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
        ],
        repeat_pwd: [
          { required: true, validator: confirmPass, trigger: 'blur' }
        ] }
    }
  },
  computed: {
    avatar() {
      console.log(this.userInfo)
      return this.$store.getters.avatar
    }
  },
  methods: {
    submitEditPwd() {
      // 用户修改密码
      this.$refs['changePwdForm'].validate((valid) => {
        if (valid) {
          changeUserPwd(this.changePwdForm)
            .then(res => {
              console.log(res)
              if (res.code === 200) {
                this.$store.dispatch('user/logout', {}, { root: true })
                this.$router.push({ name: 'center' })
              } else {
                this.$message.error(res.message)
              }
            })
            .catch(err => {
              console.log(err)
            })
        } else {
          this.$message.warning('信息填写有误')
        }
      })
    },
    showEditForm() {
      //
      this.editPwdVisible = !this.editPwdVisible
    },
    // 一下是上传头像部件
    uploadSuccess(response, file, fileList) {
      this.$store.dispatch('user/changeAvatar', response.head_img, { root: true })
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt200k = file.size / 1024 / 1024 < 0.2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
        return isJPG
      }
      if (!isLt200k) {
        this.$message.error('上传头像图片大小不能超过200kb!')
        return isLt200k
      }
      return isJPG && isLt200k
    }
  }
}
</script>

<style scoped>
  .avatar {
    height: 178px;
    width: 178px;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .content-detail {
    margin-top: 20px;
  }
</style>
