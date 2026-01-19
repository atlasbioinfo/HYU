<template>
  <section class="section">
    <h2 class="section-title">Academic Service</h2>

    <div class="service-item">
      <h3>{{ data.peerReview.title }}</h3>
      <p>{{ data.peerReview.journals }}</p>
    </div>

    <div class="service-item">
      <h3>{{ data.editorial.title }}</h3>
      <p>
        {{ data.editorial.journal }}<br>
        ({{ data.editorial.topics }})
      </p>
    </div>

    <div class="service-item">
      <h3>{{ data.mentoring.title }}</h3>
      <p>{{ data.mentoring.description }}</p>
    </div>
  </section>
</template>

<script setup>
defineProps({
  data: {
    type: Object,
    required: true
  }
})
</script>
