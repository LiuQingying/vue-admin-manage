<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb" mode="out-in">
      <el-breadcrumb-item v-for="(item, index) in matched" :key="item.name">
        <span v-if="item.redirect === 'noRedirect' || index == matched.length - 1" class="no-redirect">{{ item.meta.title }}</span>
        <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script lang="ts" setup>
  import pathToRegexp from 'path-to-regexp'
  import { onMounted, ref, watch,computed } from 'vue'
  import { useRoute ,useRouter} from 'vue-router'

  const levelList = ref([])
  const route = useRoute()
  const router = useRouter()

  const handleLink = (item)=>{
    router.push({
      path:item.path
    })
  }

  const matched = computed(() => route.matched.filter(item => item.meta && item.meta.title && item.meta.breadcrumb !== false));

</script>

