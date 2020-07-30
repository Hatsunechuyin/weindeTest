<template>
  <div class="app-container">
    <el-table
      :data="tableData"
      border
      style="width: 100%"
    >
      <el-table-column
        prop="id"
        label="id"
        width="260"
      />
      <el-table-column
        prop="name"
        label="名称"
        width="180"
      />
      <el-table-column
        prop="sign"
        label="标志"
      />
      <el-table-column
        prop="ctime"
        label="创建时间"
      />
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)"
          >编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getWxSms } from '@/api/sms/tenxun'
export default {
  name: 'SMS',
  components: { },
  data() {
    return {
      tableData: [],
      formData: {
        app_id: '',
        ctime: '',
        id: '',
        name: '',
        sign: '',
        template_id: '',
        utime: ''
      }
    }
  },
  created() {
    this.getWxSms()
  },
  methods: {
    async getWxSms() {
      var data = {
        'page_no': 1
      }
      await getWxSms(data).then(res => {
        this.tableData = res.data.list
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style scoped>
</style>
