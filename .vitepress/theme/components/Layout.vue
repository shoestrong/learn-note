<template>
  <Layout />
</template>

<script setup>
import DefaultTheme from 'vitepress/theme'
import useFancybox from '@hooks/useFancybox.ts'
useFancybox()

const { Layout } = DefaultTheme
</script>
