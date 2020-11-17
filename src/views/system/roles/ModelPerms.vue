<template>
  <div>
    <!--卡片试图-->
    <el-card>
      <el-table :data="modelPermsList" border stripe>
        <el-table-column type="index"/>
        <el-table-column label="模型名称" prop="model_name"/>
        <!--<el-table-column label="读取权限" prop="perm_read"/>-->
        <!--<el-table-column label="增加权限" prop="perm_add"/>-->
        <!--<el-table-column label="修改权限" prop="perm_write"/>-->
        <!--<el-table-column label="删除权限" prop="perm_delete"/>-->

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
      </el-table>
    </el-card>

  </div>
</template>

<script>
  import {modelPermsList} from '@/api/perms'

  export default {
    name: 'Perms',
    data() {
      return {
        modelPermsList: []
      }
    },
    created() {
      this.getModelPermsList()
    },
    methods: {
      getModelPermsList() {
        // 获取权限列表
        modelPermsList()
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
      }
    }
  }
</script>

<style scoped lang="less">

</style>
