<template>
  <div>
    <!--看卡片试图-->
    <el-card>
      <!--添加职位按钮-->
      <!--<el-row>-->
      <!--<el-col>-->
      <!--<el-button type="primary" @click="showAddRoleDialog">添加职位</el-button>-->
      <!--</el-col>-->
      <!--</el-row>-->
      <el-table :data="webResList" border stripe>
        <el-table-column type="index"/>
        <el-table-column label="id" prop="id"/>

        <!--<el-table-column label="读取权限" prop="perm_read">-->
          <!--<template slot-scope="scope">-->
            <!--<el-tag v-if="scope.row.perm_read===true" type="success">√</el-tag>-->
            <!--<el-tag v-else type="info">×</el-tag>-->
          <!--</template>-->
        <!--</el-table-column>-->
        <!--<el-table-column label="增加权限" prop="perm_add">-->
          <!--<template slot-scope="scope">-->
            <!--<el-tag v-if="scope.row.perm_add===true" type="success">√</el-tag>-->
            <!--<el-tag v-else type="info">×</el-tag>-->
          <!--</template>-->
        <!--</el-table-column>-->
        <!--<el-table-column label="修改权限" prop="perm_write">-->
          <!--<template slot-scope="scope">-->
            <!--<el-tag v-if="scope.row.perm_write===true" type="success">√</el-tag>-->
            <!--<el-tag v-else type="info">×</el-tag>-->
          <!--</template>-->
        <!--</el-table-column>-->
        <!--<el-table-column label="删除权限" prop="perm_delete">-->
          <!--<template slot-scope="scope">-->
            <!--<el-tag v-if="scope.row.perm_delete===true" type="success">√</el-tag>-->
            <!--<el-tag v-else type="info">×</el-tag>-->
          <!--</template>-->
        <!--</el-table-column>-->
        <!--<el-table-column-->
          <!--fixed="right"-->
          <!--label="操作"-->
          <!--width="100">-->
          <!--<template slot-scope="scope">-->
            <!--&lt;!&ndash;<el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>&ndash;&gt;-->
            <!--<el-button type="text" size="small" @click="showEditModelPermsDialog(scope.row)">编辑</el-button>-->
          <!--</template>-->
        <!--</el-table-column>-->
      </el-table>

      <!--分页功能-->
      <el-pagination
        :current-page="queryInfo.page"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="queryInfo.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="roleTotal"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />

      <!--&lt;!&ndash;分配权限对话框&ndash;&gt;-->
      <!--<el-dialog-->
      <!--title="分配权限"-->
      <!--:visible.sync="addPermsDialogVisible"-->
      <!--width="50%"-->
      <!--@close="restDefaultKeys"-->
      <!--&gt;-->
      <!--<el-tree-->
      <!--ref="treeRef"-->
      <!--:data="allPermsList"-->
      <!--:props="treeProps"-->
      <!--show-checkbox-->
      <!--node-key="id"-->
      <!--default-expand-all-->
      <!--:default-checked-keys="defkeys"-->
      <!--/>-->
      <!--<span slot="footer" class="dialog-footer">-->
      <!--<el-button @click="addPermsDialogVisible = false">取 消</el-button>-->
      <!--<el-button type="primary" @click="assignPerms">确 定</el-button>-->
      <!--</span>-->
      <!--</el-dialog>-->

      <!--&lt;!&ndash;修改职位对话框&ndash;&gt;-->
      <!--<el-dialog-->
      <!--title="修改职位详情"-->
      <!--:visible.sync="editDialogVisible"-->
      <!--width="50%"-->
      <!--@close="editDialogClose"-->
      <!--&gt;-->
      <!--&lt;!&ndash;这是修改主题区&ndash;&gt;-->
      <!--<el-form ref="editRoleForm" :model="editRoleForm" :rules="editRoleRules" label-width="80px">-->
      <!--<el-form-item prop="name" label="职位名称">-->
      <!--<el-input v-model="editRoleForm.name" placeholder="职位名称" />-->
      <!--</el-form-item>-->

      <!--<el-form-item prop="desc" label="职位描述">-->
      <!--<el-input v-model="editRoleForm.desc" placeholder="职位描述" />-->
      <!--</el-form-item>-->

      <!--</el-form>-->
      <!--&lt;!&ndash;底部按钮区域&ndash;&gt;-->
      <!--<span slot="footer" class="dialog-footer">-->
      <!--<el-button @click="editDialogVisible = false">取 消</el-button>-->
      <!--<el-button type="primary" @click="submitRoleEdit">确 定</el-button>-->
      <!--</span>-->
      <!--</el-dialog>-->

      <!--&lt;!&ndash;添加职位对话框&ndash;&gt;-->
      <!--<el-dialog-->
      <!--title="添加职位"-->
      <!--:visible.sync="addDialogVisible"-->
      <!--width="50%"-->
      <!--@close="addDialogClose"-->
      <!--&gt;-->
      <!--&lt;!&ndash;这是添加主题区&ndash;&gt;-->
      <!--<el-form ref="addRoleForm" :model="addRoleForm" :rules="addRoleRules" label-width="70px">-->
      <!--<el-form-item prop="name" label="职位名称">-->
      <!--<el-input v-model="addRoleForm.name" placeholder="请输入职位名称" />-->
      <!--</el-form-item>-->

      <!--<el-form-item prop="desc" label="职位描述">-->
      <!--<el-input v-model="addRoleForm.desc" placeholder="请输入职位描述" />-->
      <!--</el-form-item>-->

      <!--</el-form>-->
      <!--&lt;!&ndash;底部按钮区域&ndash;&gt;-->
      <!--<span slot="footer" class="dialog-footer">-->
      <!--<el-button @click="addDialogVisible = false">取 消</el-button>-->
      <!--<el-button type="primary" @click="submitRoleAdd">确 定</el-button>-->
      <!--</span>-->
      <!--</el-dialog>-->

      <!--更改职位数据权限对话框-->
      <!--<el-dialog-->
      <!--title="更改数据权限"-->
      <!--:visible.sync="changeDataPermsDialog"-->
      <!--width="50%"-->
      <!--&gt;-->
      <!--&lt;!&ndash;公司部门选择器&ndash;&gt;-->
      <!--<el-cascader-->
      <!--v-model="orgDeptSelect"-->
      <!--:options="orgDeptList"-->
      <!--:props="cascaderSettings"-->
      <!--placeholder="请选择组织机构"-->
      <!--filterable-->
      <!--clearable-->
      <!--&gt;-->
      <!--<template slot-scope="{ node, data }">-->
      <!--<span>{{ data.name }}</span>-->
      <!--&lt;!&ndash;显示子元素个数&ndash;&gt;-->
      <!--<span v-if="!node.isLeaf"> ({{ data.children.length }}) </span>-->
      <!--</template>-->
      <!--</el-cascader>-->
      <!--<div style="height: 10px" />-->
      <!--数据模式选择器-->
      <!--<el-select v-model="dataModeSelect" placeholder="请选择授权模式" filterable clearable>-->
      <!--<el-option-->
      <!--v-for="(value, key) in dataMode"-->
      <!--:key="key"-->
      <!--:label="value"-->
      <!--:value="key"-->
      <!--:disabled="key==curMode"-->
      <!--/>-->
      <!--</el-select>-->
      <!--&lt;!&ndash;底部按钮区域&ndash;&gt;-->
      <!--<span slot="footer" class="dialog-footer">-->
      <!--<el-button @click="changeDataPermsDialog = false">取 消</el-button>-->
      <!--<el-button type="primary" @click="submitChangeDataPermMode">确 定</el-button>-->
      <!--</span>-->
      <!--</el-dialog>-->

    </el-card>
  </div>
</template>

<script>
  import {getWebResList} from '@/api/role'
  // import { updateDataList } from '@/utils/ary'
  export default {
    name: 'WebRes',
    data() {
      return {
        // 选中的组织机构
        orgDeptSelect: '',
        // 级联选择器配置
        cascaderSettings: {
          expandTrigger: 'hover',
          // 单选任意一级
          checkStrictly: true,
          value: 'id', label: 'name', children: 'children'
        },
        // 组织机构部门列表
        orgDeptList: [],
        // 当前的数据权限模式
        curMode: '',
        // 数据权限模式1：所有数据。。。
        dataMode: {},
        // 选择的数据权限模式
        dataModeSelect: '',
        roleTotal: 0,
        // 查询职位列表分页
        queryInfo: {
          page: 1,
          size: 5
        },
        roleList: [],
        allPermsList: [],
        // 显示分配权限对话框
        addPermsDialogVisible: false,
        // 显示更改数据权限对话框
        changeDataPermsDialog: false,
        // 树形控件的属性绑定对象，指定展示那些，指定嵌套关系字段
        treeProps: {
          label: 'name',
          children: 'children'
        },
        // 默认选中的节点id值
        defkeys: [],
        // 被操作的职位id
        operRoleId: -1,
        // 控制显示编辑职位对话框的显示
        editDialogVisible: false,
        // 修改对话框的提交数据
        editRoleForm: {},
        editRoleRules: {
          name: [
            {required: true, message: '请输入职位名称', trigger: 'blur'},
            {min: 2, max: 8, message: '用户名长度在2-15个字符之间', trigger: 'blur'}
          ]
        },
        addRoleForm: {},
        addRoleRules: {
          name: [
            {required: true, message: '请输入职位名称', trigger: 'blur'},
            {min: 2, max: 8, message: '用户名长度在2-15个字符之间', trigger: 'blur'}
          ]
        },
        // 控制显示添加职位对话框显示
        addDialogVisible: false,

        webResList: [],
        webResQueryInfo: {'id': 0}
      }
    },
    created() {
      this.getWebResList()
    },
    methods: {
      // submitChangeDataPermMode() {
      //   if (this.dataModeSelect) {
      //     var data = { role_id: this.operRoleId, mode: this.dataModeSelect,
      //       org_dept: this.orgDeptSelect }
      //     ChangeDataPermMode(data)
      //       .then(res => {
      //         this.roleList.forEach(role => {
      //           if (role.id === this.operRoleId) {
      //             // 更改当前职位的数据权限
      //             role.cur_mode = res.mode
      //             role.dept = res.dept
      //             role.org = res.org
      //             this.curMode = this.dataModeSelect
      //             this.closeChangeDataPermsDialog()
      //             this.$notify.success(`更改成功`)
      //           }
      //         })
      //       })
      //       .catch(() => {
      //         this.$notify.success('更改失败')
      //       })
      //   } else {
      //     this.$notify.warning({
      //       title: '失败',
      //       message: '请选择要更改的数据权限模式'
      //     })
      //   }
      // },
      // getDataPermsMode() {
      //   dataPermsMode({ role_id: this.operRoleId })
      //     .then(res => {
      //       this.dataMode = res.all_dataperms
      //       this.curMode = res.cur_mode
      //       this.orgDeptList = res.org_dept_lst
      //     })
      //     .catch(() => {
      //       this.$notify.success('获取失败')
      //     })
      // },
      // showChangeDataPermsDialog(role) {
      //   this.operRoleId = role.id
      //   this.getDataPermsMode()
      //   this.changeDataPermsDialog = !this.changeDataPermsDialog
      // },
      // closeChangeDataPermsDialog() {
      //   // 关闭数据权限对话框同时制空响应的数据
      //   this.operRoleId = -1
      //   this.dataModeSelect = ''
      //   this.orgDeptSelect = ''
      //   this.changeDataPermsDialog = false
      // },
      //
      // showAddRoleDialog() {
      //   this.addDialogVisible = !this.addDialogVisible
      // },
      // submitRoleAdd() {
      //   // 提交前的预验证
      //   this.$refs.addRoleForm.validate(valid => {
      //     if (!valid) {
      //       // 与验证不合法
      //       this.$notify.error('填写信息错误')
      //       return
      //     } else {
      //       // 与验证合法
      //       // 提交职位编辑的数据
      //       addRole(this.addRoleForm)
      //         .then(res => {
      //           this.getRoleList()
      //           this.showAddRoleDialog()
      //           this.$notify.success('添加职位成功')
      //         })
      //         .catch(() => {
      //           this.$notify.error('添加职位失败')
      //         })
      //     }
      //   })
      // },
      // addDialogClose() {
      //   this.addRoleForm = {}
      //   this.$refs.editRoleForm.resetFields()
      // },
      // deleteRole(role) {
      //   // 删除职位
      //   this.$confirm(`确定删除【${role.name}】这个职位吗？`, '删除职位',
      //     { confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning' })
      //     .then(() => {
      //       delRole(role.id)
      //         .then(res => {
      //           this.$notify.success(`删除职位成功---${role.name}`)
      //           this.getRoleList()
      //         })
      //         .catch(() => {
      //           this.$notify.error(`删除职位失败---${role.name}`)
      //         })
      //     })
      //     .catch(() => {
      //       this.$notify.warning({
      //         title: '失败',
      //         message: '您已经取消删除'
      //       })
      //     })
      // },
      // editDialogClose() {
      //   // 修改职位对话框关闭之后做的动作，重置表单的验证效果
      //   // 重置提交数据表单
      //   this.editRoleForm = {}
      //   this.$refs.editRoleForm.resetFields()
      // },
      // submitRoleEdit() {
      //   // 提交前的预验证
      //   this.$refs.editRoleForm.validate(valid => {
      //     if (!valid) {
      //       // 与验证不合法
      //       this.$notify.error('填写信息错误')
      //       return
      //     } else {
      //       // 与验证合法
      //       // 提交职位编辑的数据
      //       editRole(this.operRoleId, this.editRoleForm)
      //         .then(res => {
      //           // console.log(res.data);
      //           updateDataList(res, this.roleList)
      //           this.closeEditRoleDialog()
      //           this.$notify.success('修改职位信息成功')
      //         })
      //         .catch(() => {
      //           this.$notify.error('更改职位信息失败')
      //         })
      //     }
      //   })
      // },
      // showEditRoleDialog(role) {
      //   // 打开职位编辑对话狂
      //   this.operRoleId = role.id
      //   this.editRoleForm = role
      //   this.editDialogVisible = true
      // },
      // closeEditRoleDialog() {
      //   // 关闭职位编辑对话狂
      //   this.editDialogVisible = false
      // },
      // handleSizeChange(newSize) {
      //   // 处理每页数量改变
      //   this.queryInfo.size = newSize
      //   this.getRoleList()
      // },
      // handleCurrentChange(newPage) {
      //   // 处理当前页码改变
      //   this.queryInfo.page = newPage
      //   this.getRoleList()
      // },
      // getRoleList() {
      //   // 获取职位列表数据
      //   roleList(this.queryInfo)
      //     .then(res => {
      //       this.roleList = res.data
      //       this.roleTotal = res.total
      //     })
      //     .catch(err => {
      //       this.$notify.error('获取职位列表错误', err)
      //     })
      // },
      // getPermListToRole(role) {
      //   // # 获取素有权限
      //   // console.log(role);
      //   getPermsOfRole({ role_id: role.id })
      //     .then(res => {
      //       this.allPermsList = res.allperms
      //       this.defkeys = res.ownperms
      //       // console.log(res.data)
      //     })
      //     .catch(() => {
      //       this.$notify.error('获取所有权限列表失败')
      //     })
      // },
      // removeRolePermById(perm_id, role, name) {
      //   this.$confirm(`删除该职位的【${name}】权限？`, '删除权限',
      //     { confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning' })
      //     .then(() => {
      //       var param = { perm_id, role_id: role.id }
      //       delPermsOfRole(param)
      //         .then(res => {
      //           this.$notify.success(`删除权限成功---${name}`)
      //           role.perms = res
      //         })
      //         .catch(err => {
      //           this.$notify.error(`删除权限失败---${name}`, err)
      //         })
      //     })
      //     .catch(err => err)
      // },
      // showAddPermsDialog(role) {
      //   // 保存当前操作的id，后续使用
      //   this.operRoleId = role.id
      //   this.getPermListToRole(role)
      //   this.addPermsDialogVisible = true
      // },
      // // 重置defaultkeys，使得用户已经拥有的权限清空
      // restDefaultKeys() {
      //   this.defkeys = []
      // },
      // assignPerms() {
      //   // 为职位分配权限
      //   const keys = [
      //     ...this.$refs.treeRef.getCheckedKeys(),
      //     ...this.$refs.treeRef.getHalfCheckedKeys()
      //   ]
      //   addPermsForRole({ role_id: this.operRoleId, perm_id: keys })
      //     .then(res => {
      //       this.$notify.success('分配权限成功')
      //       // role.perms = res.data
      //       this.roleList.forEach(role => {
      //         if (role.id === this.operRoleId) {
      //           role.perms = res
      //         }
      //       })
      //
      //       this.addPermsDialogVisible = false
      //     })
      //     .catch(() => {
      //       this.$notify.error('分配权限失败')
      //     })
      // }
      getWebResList() {
        getWebResList(this.webResQueryInfo)
          .then(res => {
            if (res.code === 200) {
              this.webResList = res.data
            } else {
              this.$notify.error('获取网络资源列表失败:' + res.message)
            }
          })
          .catch(() => {
            this.$notify.error('获取网络资源列表失败')
          })
      }
    }
  }
</script>

<style scoped>
  .v-center {
    display: flex;
    align-items: center;
  }
</style>
