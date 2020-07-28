<template>
  <div class="app-container">
    <el-row id="form-button">
      <el-button type="primary" @click="addRole()">添加角色</el-button>
    </el-row>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="id" label="编号" width="360"></el-table-column>
      <el-table-column prop="name" label="姓名" width="180"></el-table-column>
      <el-table-column prop="ctime" label="日期"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :title="dialogTitle==1 ? '添加角色' : '修改角色'" :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="角色名称" :label-width="formLabelWidth" prop="name">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="权限" :label-width="formLabelWidth">
          <el-checkbox-group v-model="form.type">
            <div v-for="(value,i) in dialogData" :key="i">
              <el-checkbox :label="value.id" name="type">{{ value.name }}--{{ value.remark }}</el-checkbox>
            </div>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmAdd('form')" v-if="dialogTitle===1">确 定</el-button>
        <el-button type="primary" @click="editRole('form')" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getAccessList } from '@/api/test/access'
import { getRoles, addRole, getRoleDetail, deleteRole } from '@/api/test/role'
export default {
  name: 'Test',
  components: {},
  data() {
    return {
      tableData: [],
      dialogFormVisible: false,
      form: {
        id: '',
        name: '',
        region: '',
        delivery: false,
        type: []
      },
      formLabelWidth: '100px',
      dialogTitle: 1,
      dialogData: [],
      rules: {
        name: [
          { required: true, message: '请输入角色名称', trigger: 'blur' },
          { min: 1, max: 8, message: '长度在 1 到 8 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getAccessList()
    this.getRoleList()
  },
  methods: {
    async getRoleList() {
      const res = await getRoles()
      this.tableData = res.data.list
    },
    async getAccessList() {
      const res = await getAccessList()
      this.dialogData = res.data.list
    },
    handleEdit(index, row) {
      getRoleDetail(row.id).then(res => {
        this.form.name = res.data.name
        this.form.id = res.data.id
   
        let myArray=[];
        let access_list = res.data.access_list
        for (var i = 0; i < access_list.length; i++) { 
            myArray.push(access_list[i]['id'])
        }
        this.form.type = myArray
        this.dialogTitle = 2
        this.dialogFormVisible = true
      })
    },
    handleDelete(index, row) {
      this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteRole(row.id).then( res => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.getRoleList()
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
    addRole() {
      // 添加角色初始化数据
      this.form.type = []
      this.dialogTitle = 1
      this.dialogFormVisible = true
    },
    editRole(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let data = {
            "role": {
                "name": this.form.name
            },
            "access_id_list": this.form.type
          }
          addRole(data).then(res => {
            this.getRoleList()
            this.dialogFormVisible = false
          })
        } else {
        }
      })
    },
    confirmAdd(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let data = {
            "role": {
                "name": this.form.name
            },
            "access_id_list": this.form.type
          }
          addRole(data).then(res => {
            this.getRoleList()
            this.dialogFormVisible = false
          })
        } else {
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
#form-button {
  margin-bottom: 20px;
}
</style>
