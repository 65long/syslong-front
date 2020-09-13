<template>
  <el-row :gutter="5">
    <!--左侧-->
    <el-col :span="6">
      <el-card>
        <el-tree
          ref="treeRef"
          :data="allOrgsList"
          :props="treeProps"
          node-key="name"
          default-expand-all
        />
      </el-card>
    </el-col>
    <!--右侧-->
    <el-col :span="18">
      <el-card>
        右侧的card
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'Organization',
  data() {
    return {
      // 树形控件的属性绑定对象，指定展示那些，指定嵌套关系字段
      treeProps: {
        label: 'name',
        children: 'children'
      },
      allOrgsList: [
        { name: '华夏一同', children: [{ name: '小伙子' }, { name: 'nihao' }] }
      ]
    }
  }
}
</script>

<style scoped>

</style>
