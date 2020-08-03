<template>
  <div class="app-container">
    <el-row id="form-button">
      <el-button type="primary" @click="addRole()">添加角色</el-button>
    </el-row>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="id" label="编号" width="360" />
      <el-table-column prop="name" label="姓名" width="180" />
      <el-table-column prop="ctime" label="日期" />
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :page-size="page.page_size"
      :current-page="page.page_no"
      :total="page.total_count"
      @current-change="handleCurrentChange"
    />
    <el-dialog v-if="dialogFormVisible" :title="dialogTitle==1 ? '添加角色' : '修改角色'" :visible.sync="dialogFormVisible">
      <el-form ref="form" :model="form" :rules="rules">
        <el-form-item :label="formFormat.name" :label-width="formLabelWidth" prop="name">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
        <el-form-item :label="formFormat.type" :label-width="formLabelWidth">
          <el-checkbox-group v-model="form.type">
            <div v-for="(value,i) in dialogData" :key="i">
              <el-checkbox :label="value.id" name="type">{{ value.name }}--{{ value.remark }}</el-checkbox>
            </div>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button v-if="dialogTitle===1" type="primary" @click="confirmAdd('form')">确 定</el-button>
        <el-button v-else type="primary" @click="editRole('form')">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getAccessList } from '@/api/test/access'
import { getRoles, addRole, getRoleDetail, deleteRole, editRole } from '@/api/test/role'
export default {
  name: 'Test',
  components: {},
  data() {
    return {
      // 判断数据是否重复的字段
      repeatField: {
        name: '',
        type: []
      },
      formFormat: {
        'name': '角色名称',
        'type': '权限'
      },
      tableData: [],
      dialogFormVisible: false,
      form: {
        id: '',
        name: '',
        region: '',
        type: []
      },
      formLabelWidth: '100px',
      dialogTitle: 1,
      dialogData: [],
      rules: {
        name: [
          { required: true, message: '请输入角色名称', trigger: 'blur' },
          { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
        ]
      },
      page: {
        'page_no': 1,
        'page_size': 1,
        'total_count': 1
      }
    }
  },
  created() {
    this.getAccessList()
    this.getRoleList()
  },
  methods: {
    async getRoleList() {
      var data = {
        'page_no': 1
      }
      const res = await getRoles(data)
      this.tableData = res.data.list
      this.page.page_no = res.data.page_no
      this.page.page_size = res.data.page_size
      this.page.total_count = res.data.total_count
    },
    async getAccessList() {
      const res = await getAccessList()
      this.dialogData = res.data.list
    },
    // 编辑用户
    handleEdit(index, row) {
      getRoleDetail(row.id).then(res => {
        this.form.name = res.data.name
        this.form.id = res.data.id
        var myArray = []
        const access_list = res.data.access_list
        for (var i = 0; i < access_list.length; i++) {
          myArray.push(access_list[i]['id'])
        }
        this.form.type = myArray
        // 判断是否修改的字段
        this.repeatField.name = res.data.name
        this.repeatField.type = myArray
        // 移除校验结果
        // this.$refs['form'].resetFields();
        // this.$refs.form.clearValidate()
        this.dialogTitle = 2
        this.dialogFormVisible = true
      })
    },
    // 删除用户
    handleDelete(index, row) {
      this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteRole(row.id).then(res => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.getRoleList()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 添加用户显示模态框
    addRole() {
      // 添加角色初始化数据
      this.form.name = ''
      this.form.type = []
      this.dialogTitle = 1
      // 判断是否修改的字段
      this.repeatField.name = ''
      this.repeatField.type = []
      // 移除校验结果
      // this.$refs[formName].for;
      this.dialogFormVisible = true
    },
    // 编辑用户的
    editRole(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.repeatField.name)
          // var data = {
          //   'role': {
          //     'name': this.form.name
          //   },
          //   'access_id_list': this.form.type
          // }
          var data = {}
          if (this.repeatField.name !== this.form.name) {
            data.role = {
              'name': this.form.name
            }
          }
          data.access_id_list = this.form.type
          editRole(this.form.id, data).then(res => {
            this.getRoleList()
            this.dialogFormVisible = false
          }).catch(err => {
            // 针对error_code 1004
            var errMessage = JSON.parse(err.message)
            this.dealCode1004(this.formFormat, errMessage)
          })
        }
      })
    },
    confirmAdd(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          var data = {
            'role': {
              'name': this.form.name
            },
            'access_id_list': this.form.type
          }
          addRole(data).then(res => {
            this.getRoleList()
            this.dialogFormVisible = false
          }).catch(err => {
            // 针对error_code 1004
            var errMessage = JSON.parse(err.message)
            this.dealCode1004(this.formFormat, errMessage)
          })
        }
        //  else {
        // }
      })
    },
    // 分页
    async handleCurrentChange(val) {
      var data = {
        'page_no': val
      }
      const res = await getRoles(data)
      this.tableData = res.data.list
      this.page.page_no = res.data.page_no
      this.page.page_size = res.data.page_size
      this.page.total_count = res.data.total_count
    },
    // 判断1004这个状态的
    dealCode1004(formFormat, errMessage) {
      if (errMessage.error_code === 1004) {
        for (var x in errMessage.data) {
          if (Object.prototype.hasOwnProperty.call(formFormat, x)) {
            var err_message = this.formFormat[x] + ':' + errMessage.data[x]
            this.$message({
              type: 'error',
              message: err_message
            })
          } else {
            this.$message({
              type: 'error',
              message: x + ':' + errMessage.data[x]
            })
          }
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
#form-button {
  margin-bottom: 20px;
}
.el-pagination{
  margin-top: 20px;
  margin-bottom: 20px;
  text-align: center;
}
</style>
