<template>
  <div class="about m-6 pt-6">
    <el-upload
      drag
      class="upload"
      action="/api/upload"
      name="image"
      :before-upload="beforeAvatarUpload"
      :on-success="handleAvatarSuccess"
      v-loading="loading"
      :on-progress="handleProgress"
    >
      <el-icon class="el-icon--upload"><upload-filled /></el-icon>
      <div class="el-upload__text">将文件拖放到此处或 <em>单击上传</em></div>
      <template #tip>
        <div class="el-upload__tip">小于3MB的jpg/png文件</div>
      </template>
    </el-upload>

    <div class="mt-8 ml-1" v-if="tableData.length">
      {{
        `姓名：${chat_msg.name} 性别：${chat_msg.gender} 年龄：${chat_msg.age} 病情描述：${chat_msg.info} 疾病初步诊断：${chat_msg.initial_diagnosis}`
      }}
    </div>
    <el-table class="mt-4" :data="tableData" border style="width: 100%">
      <el-table-column prop="name" label="姓名" width="180" />
      <el-table-column prop="gender" label="性别" width="180" />
      <el-table-column prop="age" label="年龄" width="180" />
      <el-table-column prop="info" label="病情描述" />
      <el-table-column prop="initial_diagnosis" label="疾病初步诊断" />
    </el-table>

    <div class="mt-10 text-center text-xl text-gray-200 w-full">
      <a href="https://beian.miit.gov.cn/" target="_blank">京ICP备: 2023040367号</a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import type { UploadProps } from 'element-plus'
import axios from 'axios'
import { de, fa } from 'element-plus/es/locales.mjs'

const conversation_id = ref('7417728248110432283')
const chat_id = ref('7417709843714244635')
const chat_msg = ref({})
const tableData = ref<any[]>([])
const loading = ref(false)

const headers = {
  Authorization: 'Bearer pat_fK9eOFYUAPSR5qAxGeJhTT4bI2jrTEARdOTidSIWobPgGX6RWpeQJhgTWnG4MdpP',
  'Content-Type': 'application/json'
}

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (rawFile.type !== 'image/jpeg' && rawFile.type !== 'image/png') {
    ElMessage.error('Picture must be JPG/PNG format!')
    return false
  } else if (rawFile.size / 1024 / 1024 > 3) {
    ElMessage.error('Picture size can not exceed 3MB!')
    return false
  }
  return true
}
const handleAvatarSuccess = (response: any, file: File) => {
  console.log('Avatar upload success:', response, file)
  console.log('first', JSON.stringify(response.forwardResponse))

  chat_id.value = response.forwardResponse.id
  console.log('chat_id', chat_id.value)
  let retrieveId = setInterval(async () => {
    const app = await axios.get(
      `/api/v3/chat/retrieve?conversation_id=${conversation_id.value}&chat_id=${chat_id.value}`,
      {
        headers
      }
    )
    console.log('app', app)
    console.log('app status', app.data.data.data.status)
    if (app.data.data.data.status === 'completed') {
      ElMessage.success('completed')
      clearInterval(retrieveId)
      getChatList()
      loading.value = false
    } else if (
      app.data.data.data.status === 'failed' ||
      app.data.data.data.status === 'requires_action' ||
      app.data.data.data.status === 'canceled'
    ) {
      ElMessage.error('failed')
      loading.value = false
    }
  }, 1000)
}
const handleProgress = (event: any) => {
  loading.value = true
}

async function getChatList() {
  const chat_list = await axios.get(
    `/api/v3/chat/message/list?conversation_id=${conversation_id.value}&chat_id=${chat_id.value}`,
    {
      headers
    }
  )
  console.log('getChatList', chat_list.data.data.data)
  chat_list.data.data.data.forEach((item: any) => {
    if (item.type === 'answer') {
      chat_msg.value = JSON.parse(item.content)
      tableData.value.push(JSON.parse(item.content))
    }
  })
  console.log('item1', chat_msg.value)
  console.log('item2', chat_msg.value.name)
  console.log('item3', tableData.value)
}
async function sendChatRequest() {
  const url = 'https://api.coze.cn/v3/chat?conversation_id=7417694655820759091'

  const data = {
    bot_id: '7415539925338308658',
    user_id: 'Chai123456789',
    stream: false,
    auto_save_history: true,
    additional_messages: [
      {
        role: 'user',
        content: JSON.stringify([
          {
            type: 'image',
            // file_url: 'https://jcds-2020.oss-cn-beijing.aliyuncs.com/1669546595964.jpeg'
            file_url: 'https://jcds-2020.oss-cn-beijing.aliyuncs.com/GG1-Yz2bQAER-Yg.jpg'
            // file_id: '7417450356503904308'
          },
          {
            type: 'text',
            text: '帮我看看这张图片里都有什么'
          }
        ]),
        content_type: 'object_string'
      }
    ]
  }
  console.log(data)
  try {
    const response = await axios.post(url, data, { headers })
    console.log('Chat response:', response.data)
    return response.data
  } catch (error) {
    console.error('Error sending chat request:', error)
    throw error
  }
}

onMounted(async () => {
  console.log(import.meta.env.VITE_APP_NAME)
  // sendChatRequest()
  const response = await axios.get('/api/v3/conversation/create', { headers })
  conversation_id.value = response.data.data.conversation_id
  console.log('conversation_id', conversation_id.value)
})
</script>

<style scoped>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    /* display: flex; */
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background-color: #f5f5f5;
    padding: 20px;
  }
}
</style>
