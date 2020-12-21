<template>
  <el-row :gutter="20">
    <el-col :xs="24" :sm="24" :md="24" :lg="10" :xl="10">
      <el-card
        shadow="none"
        class="card"
        :body-style="{ padding: '0px' }"
      >
        <template #header>
        </template>
      </el-card>
    </el-col>
    <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8">
      <el-card
        shadow="none"
        class="card"
        :body-style="{ padding: '0px' }"
      >
        <template #header>
        </template>
      </el-card>
    </el-col>
    <el-col :xs="24" :sm="24" :md="24" :lg="6" :xl="6">
      <el-card
        shadow="none"
        class="card"
        :body-style="{ padding: '0px' }"
      >
        <template #header>
        </template>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
export default {
  
}
</script>

<style lang="scss" scoped>
.card {
  height: 200px;
}
</style>
