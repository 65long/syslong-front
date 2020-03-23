<template>
  <div>
    <!--卡片试图-->
    <el-card>
      <el-table :data="permsList" border stripe>
        <el-table-column type="index" />
        <el-table-column label="权限名称" prop="name" />
        <el-table-column label="权限路径" prop="path" />
        <el-table-column label="权限等级" prop="level">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.level ==='一级'" type="success">一级权限</el-tag>
            <el-tag v-if="scope.row.level === '二级'" type="info">二级权限</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

  </div>
</template>

<script>
import { permsListDisplay } from '@/api/perms'
export default {
  name: 'Perms',
  data() {
    return {
      permsList: []
    }
  },
  created() {
    this.getPermsList()
  },
  methods: {
    getPermsList() {
      // 获取权限列表
      permsListDisplay()
        .then(res => {
          this.permsList = res
        })
        .catch(() => {
          this.$message.error('获取权限列表失败')
        })
    }
  }
}
</script>

<style scoped lang="less">

</style>
