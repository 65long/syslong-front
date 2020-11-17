<template>
  <div>
    <!--卡片试图-->
    <el-card>
      <el-table :data="modelPermsList" border stripe>
        <el-table-column type="index"/>
        <el-table-column label="模型名称" prop="model_name"/>

        <el-table-column label="读取权限" prop="perm_read">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.perm_read===true" type="success">√</el-tag>
            <el-tag v-else type="info">×</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="增加权限" prop="perm_add">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.perm_add===true" type="success">√</el-tag>
            <el-tag v-else type="info">×</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="修改权限" prop="perm_write">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.perm_write===true" type="success">√</el-tag>
            <el-tag v-else type="info">×</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="删除权限" prop="perm_delete">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.perm_delete===true" type="success">√</el-tag>
            <el-tag v-else type="info">×</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="100">
          <template slot-scope="scope">
            <!--<el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>-->
            <el-button type="text" size="small" @click="showEditModelPermsDialog(scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!--修改职位对话框-->
      <el-dialog
        title="修改职位详情"
        :visible.sync="editPermDialogVisible"
        width="50%"
      >
        <!--这是修改主题区-->
        <el-form ref="editPermForm" :model="editPermForm" :rules="editPermRules" label-width="80px">
          <!--el-form-item prop 绑定数据校验规则-->
          <el-form-item label="模型名称">
            <el-input v-model="editPermForm.model_name" placeholder="模型名称" :disabled="true"/>
          </el-form-item>

          <el-form-item label="读取权限">
            <el-checkbox v-model="editPermForm.perm_read" placeholder="读取权限"/>
          </el-form-item>

          <el-form-item label="增加权限">
            <el-checkbox v-model="editPermForm.perm_add" placeholder="增加权限"/>
          </el-form-item>
          <el-form-item label="更改权限">
            <el-checkbox v-model="editPermForm.perm_write" placeholder="更改权限"/>
          </el-form-item>
          <el-form-item label="删除权限">
            <el-checkbox v-model="editPermForm.perm_delete" placeholder="删除权限"/>
          </el-form-item>

        </el-form>
        <!--底部按钮区域-->
        <span slot="footer" class="dialog-footer">
          <el-button @click="editPermDialogVisible = false">取 消</el-button>
          <!--<el-button type="primary" @click="submitRoleEdit">确 定</el-button>-->
        </span>
      </el-dialog>

    </el-card>

  </div>
</template>

<script>
  import {modelPermsList} from '@/api/perms'

  export default {
    name: 'Perms',
    data() {
      return {
        modelPermsList: [],
        editPermDialogVisible: false,
        waitEditModelPerm: false,
        permFormQuery: {id: 0},
        editPermForm: {},
        editPermRules: {}

      }
    },
    created() {
      this.getModelPermsList()
    },
    methods: {
      getModelPermsList() {
        // 获取权限列表
        modelPermsList(this.permFormQuery)
          .then(res => {
            if (res.code === 200) {
              this.modelPermsList = res.data
            } else {
              this.$notify.error('获取权限列表失败:' + res.message)
            }
          })
          .catch(() => {
            this.$notify.error('获取权限列表失败')
          })
      },
      showEditModelPermsDialog(row) {
        this.waitEditModelPerm = row
        this.permFormQuery.id = row.id
        this.editPermDialogVisible = true
        this.getModelPermById()
      },
      getModelPermById() {
        modelPermsList(this.permFormQuery)
          .then(res => {
            if (res.code === 200) {
              this.editPermForm = res.data[0]
              console.log('=================', '执行了呀', res.data[0])
            } else {
              this.$notify.error('获取权限失败:' + res.message)
            }
          })
          .catch(() => {
            this.$notify.error('获取权限失败')
          })
      }
    }
  }
</script>

<style scoped lang="less">

</style>
