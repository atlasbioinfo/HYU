<template>
  <section class="section">
    <h2 class="section-title">Education</h2>

    <div v-for="(item, index) in data" :key="index" class="timeline-item">
      <div class="timeline-year">{{ item.year }}</div>
      <div class="timeline-content">
        <h3>{{ item.degree }}</h3>
        <p>{{ item.institution }}</p>
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  data: {
    type: Array,
    required: true
  }
})
</script>
