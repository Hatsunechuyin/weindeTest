<template>
  <div class="app-container">
    <el-row id="form-button">
      <el-button type="primary" @click="showDialog()">添加权限</el-button>
    </el-row>
    <el-dialog title="添加权限" :visible.sync="dialogFormVisible">
      <el-form ref="form" :model="form" :rules="rules">
        <el-form-item :label="formFormat.name" :label-width="formLabelWidth" prop="name">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
        <el-form-item :label="formFormat.remark" :label-width="formLabelWidth">
          <el-input v-model="form.remark" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button v-if="dialogTitle===1" type="primary" @click="addAccess('form')">确 定</el-button>
        <el-button v-else type="primary" @click="editAccess('form')">修 改</el-button>
      </div>
    </el-dialog>
    <el-table
      border
      :data="accessData"
      style="width: 100%"
      :row-class-name="tableRowClassName"
    >
      <el-table-column prop="id" label="id" width="180" />
      <el-table-column prop="name" label="名称" width="180" />
      <el-table-column prop="remark" label="备注" />
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
  </div>
</template>

<script>
import { getAccessList, addAccess, deleteAccess, eidtAccess } from '@/api/test/access'
export default {
  name: 'Access',
  components: { },
  data() {
    return {
      // 判断数据是否重复的字段
      repeatField: {
        name: '',
        remark: ''
      },
      formFormat: {
        'name': '权限名称',
        'remark': '备注'
      },
      accessData: [],
      page: {
        'page_no': 0,
        'page_size': 0,
        'total_count': 0
      },
      dialogFormVisible: false,
      form: {
        id: '',
        name: '',
        remark: ''
      },
      dialogTitle: 1,
      formLabelWidth: '100px',
      rules: {
        name: [
          { required: true, message: '请输入权限名称', trigger: 'blur' },
          { min: 1, max: 255, message: '长度在 1 到 255 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getAccessList()
  },
  methods: {
    async getAccessList() {
      var data = {
        'page_no': 1
      }
      await getAccessList(data).then(res => {
        this.accessData = res.data.list
        this.page.page_no = res.data.page_no
        this.page.page_size = res.data.page_size
        this.page.total_count = res.data.total_count
      })
    },
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 1) {
        return 'warning-row'
      } else if (rowIndex === 3) {
        return 'success-row'
      }
      return ''
    },
    async handleCurrentChange(val) {
      var data = {
        'page_no': val
      }
      const res = await getAccessList(data)
      this.accessData = res.data.list
      this.page.page_no = res.data.page_no
      this.page.page_size = res.data.page_size
      this.page.total_count = res.data.total_count
    },
    // 模态框
    showDialog() {
      this.form.id = ''
      this.form.name = ''
      this.form.remark = ''
      this.repeatField.name = ''
      // 判断是否修改的字段
      this.repeatField.remark = ''
      this.dialogTitle = 1
      this.dialogFormVisible = true
    },
    // 添加权限
    addAccess(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          var data = this.form
          addAccess(data).then(res => {
            this.getAccessList()
            this.dialogFormVisible = false
          }).catch(err => {
            // 针对error_code = 1004
            var errMessage = JSON.parse(err.message)
            console.log(errMessage)
            this.dealCode1004(this.formFormat, errMessage)
          })
        }
      })
    },
    // 删除权限
    handleDelete(index, row) {
      this.$confirm('此操作将永久删除该权限, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteAccess(row.id).then(res => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.getAccessList()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 编辑
    handleEdit(index, row) {
      // 浅拷贝
      this.form = JSON.parse(JSON.stringify(row))
      // 判断是否修改过
      this.repeatField.name = row.name
      this.repeatField.remark = row.remark
      this.dialogTitle = 2
      this.dialogFormVisible = true
    },
    editAccess(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // var data = this.form
          var data = {}
          if (this.repeatField.name !== this.form.name) {
            data.name = this.form.name
          }
          if (this.repeatField.remark !== this.form.remark) {
            data.remark = this.form.remark
          }
          eidtAccess(this.form.id, data).then(res => {
            this.getAccessList()
            this.dialogFormVisible = false
          }).catch(err => {
            // 显示不同的信息
            var errMessage = JSON.parse(err.message)
            this.dealCode1004(this.formFormat, errMessage)
          })
        }
      })
    },
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

<style scoped>
#form-button {
  margin-bottom: 20px;
}
.el-table .warning-row {
  background: rgb(78, 138, 1);
}
.el-table .success-row {
  background: #f0f9eb;
}
.el-pagination{
  margin-top: 20px;
  margin-bottom: 20px;
  text-align: center
}
</style>
