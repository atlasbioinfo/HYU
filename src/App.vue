<template>
  <n-config-provider :theme-overrides="themeOverrides">
    <n-layout style="min-height: 100vh; background: #f5f7fa;">
      <!-- Layout Selector Bar -->
      <n-layout-header bordered style="padding: 12px 24px; background: white; z-index: 100;">
        <div style="display: flex; align-items: center; justify-content: space-between; max-width: 1400px; margin: 0 auto;">
          <div style="display: flex; gap: 8px; align-items: center; flex-wrap: wrap;">
            <span style="font-weight: 600; color: #2d3748; margin-right: 12px;">选择布局 / Select Layout:</span>
            <n-button
              v-for="layout in layouts"
              :key="layout.id"
              :type="currentLayout === layout.id ? 'primary' : 'default'"
              @click="currentLayout = layout.id"
              size="small"
              :style="{ minWidth: '100px' }"
            >
              {{ layout.name }}
            </n-button>
          </div>
          <n-button
            quaternary
            @click="toggleLanguage"
            :title="currentLang === 'en' ? '切换到中文' : 'Switch to English'"
          >
            <template #icon>
              <n-icon><globe-outline /></n-icon>
            </template>
            {{ currentLang === 'en' ? '中文' : 'EN' }}
          </n-button>
        </div>
      </n-layout-header>

      <!-- Layout 1: Classic Split with Fixed Left Panel -->
      <div v-if="currentLayout === 1" class="layout-container layout-1">
        <div class="left-panel">
          <div class="profile-card">
            <div class="photo-wrapper">
              <img :src="resumeData.personal.photo" alt="Profile Photo" class="profile-photo" />
            </div>
            <h2 class="profile-name">{{ resumeData.personal.name[currentLang] }}</h2>
            <p class="profile-title">{{ resumeData.personal.title[currentLang] }}</p>
            <p class="profile-subtitle">{{ resumeData.personal.subtitle[currentLang] }}</p>

            <div class="nav-menu">
              <div
                v-for="item in menuItems"
                :key="item.key"
                class="nav-item"
                :class="{ active: activeSection === item.key }"
                @click="activeSection = item.key"
              >
                <n-icon :component="item.icon" size="18" />
                <span>{{ item.label }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="right-panel">
          <div class="content-cards">
            <div v-show="activeSection === 'home'" class="section-content">
              <n-card class="welcome-card" :bordered="false">
                <h1 style="font-family: 'Crimson Text', serif; font-size: 2.5rem; margin: 0 0 16px 0;">
                  {{ resumeData.personal.name[currentLang] }}
                </h1>
                <p style="font-size: 1.2rem; color: #4a5568;">{{ resumeData.personal.subtitle[currentLang] }}</p>
              </n-card>
            </div>

            <div v-show="activeSection === 'education'" class="section-content">
              <Education :data="resumeData.education" :lang="currentLang" />
            </div>

            <div v-show="activeSection === 'employment'" class="section-content">
              <Employment :data="resumeData.employment" :lang="currentLang" />
            </div>

            <div v-show="activeSection === 'grants'" class="section-content">
              <Grants :data="resumeData.grants" :lang="currentLang" />
            </div>

            <div v-show="activeSection === 'awards'" class="section-content">
              <Awards :data="resumeData.awards" :lang="currentLang" />
            </div>

            <div v-show="activeSection === 'publications'" class="section-content">
              <Publications :data="resumeData.publications" :lang="currentLang" />
            </div>

            <div v-show="activeSection === 'presentations'" class="section-content">
              <Presentations :data="resumeData.presentations" :lang="currentLang" />
            </div>

            <div v-show="activeSection === 'service'" class="section-content">
              <AcademicService :data="resumeData.academicService" :lang="currentLang" />
            </div>
          </div>
        </div>
      </div>

      <!-- Layout 2: Modern Dashboard with Cards Grid -->
      <div v-if="currentLayout === 2" class="layout-container layout-2">
        <div class="left-panel-2">
          <div class="profile-card-modern">
            <div class="photo-wrapper-large">
              <img :src="resumeData.personal.photo" alt="Profile Photo" class="profile-photo-large" />
            </div>
            <h2 class="profile-name-modern">{{ resumeData.personal.name[currentLang] }}</h2>
            <p class="profile-title-modern">{{ resumeData.personal.title[currentLang] }}</p>
            <div class="profile-subtitle-modern">{{ resumeData.personal.subtitle[currentLang] }}</div>
          </div>
        </div>

        <div class="right-panel-2">
          <div class="cards-grid">
            <n-card
              v-for="item in menuItems.filter(i => i.key !== 'home')"
              :key="item.key"
              class="grid-card hoverable"
              :bordered="false"
              @click="activeSection = item.key; currentLayout = 1"
            >
              <div class="card-icon">
                <n-icon :component="item.icon" size="32" color="#2563eb" />
              </div>
              <h3 class="card-title">{{ item.label }}</h3>
              <p class="card-desc">{{ item.description[currentLang] }}</p>
            </n-card>
          </div>
        </div>
      </div>

      <!-- Layout 3: Vertical Timeline Style -->
      <div v-if="currentLayout === 3" class="layout-container layout-3">
        <div class="left-panel-3">
          <div class="profile-sidebar">
            <div class="photo-circle">
              <img :src="resumeData.personal.photo" alt="Profile Photo" class="profile-photo-circle" />
            </div>
            <h2 class="sidebar-name">{{ resumeData.personal.name[currentLang] }}</h2>
            <p class="sidebar-title">{{ resumeData.personal.title[currentLang] }}</p>
            <div class="sidebar-divider"></div>
            <p class="sidebar-bio">{{ resumeData.personal.subtitle[currentLang] }}</p>
          </div>
        </div>

        <div class="right-panel-3">
          <div class="timeline-container">
            <div
              v-for="item in menuItems.filter(i => i.key !== 'home')"
              :key="item.key"
              class="timeline-card"
              @click="activeSection = item.key; currentLayout = 1"
            >
              <div class="timeline-marker">
                <n-icon :component="item.icon" size="24" color="white" />
              </div>
              <div class="timeline-content">
                <h3>{{ item.label }}</h3>
                <p>{{ item.description[currentLang] }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Layout 4: Compact Professional -->
      <div v-if="currentLayout === 4" class="layout-container layout-4">
        <div class="left-panel-4">
          <div class="compact-profile">
            <div class="compact-photo-wrapper">
              <img :src="resumeData.personal.photo" alt="Profile Photo" class="compact-photo" />
            </div>
            <div class="compact-info">
              <h2 class="compact-name">{{ resumeData.personal.name[currentLang] }}</h2>
              <p class="compact-title">{{ resumeData.personal.title[currentLang] }}</p>
              <p class="compact-subtitle">{{ resumeData.personal.subtitle[currentLang] }}</p>
            </div>
          </div>
        </div>

        <div class="right-panel-4">
          <div class="multi-column-cards">
            <n-card
              v-for="item in menuItems.filter(i => i.key !== 'home')"
              :key="item.key"
              class="compact-card"
              :bordered="false"
              @click="activeSection = item.key; currentLayout = 1"
            >
              <div style="display: flex; align-items: center; gap: 12px;">
                <n-icon :component="item.icon" size="28" color="#2563eb" />
                <div>
                  <h4 style="margin: 0 0 4px 0; font-size: 16px;">{{ item.label }}</h4>
                  <p style="margin: 0; font-size: 13px; color: #718096;">{{ item.description[currentLang] }}</p>
                </div>
              </div>
            </n-card>
          </div>
        </div>
      </div>

      <!-- Layout 5: Minimalist Centered -->
      <div v-if="currentLayout === 5" class="layout-container layout-5">
        <div class="minimalist-container">
          <div class="minimalist-left">
            <div class="minimalist-profile">
              <div class="minimalist-photo-wrapper">
                <img :src="resumeData.personal.photo" alt="Profile Photo" class="minimalist-photo" />
              </div>
              <h1 class="minimalist-name">{{ resumeData.personal.name[currentLang] }}</h1>
              <p class="minimalist-title">{{ resumeData.personal.title[currentLang] }}</p>
              <p class="minimalist-subtitle">{{ resumeData.personal.subtitle[currentLang] }}</p>
            </div>
          </div>

          <div class="minimalist-right">
            <div class="minimalist-cards">
              <div
                v-for="item in menuItems.filter(i => i.key !== 'home')"
                :key="item.key"
                class="minimalist-card"
                @click="activeSection = item.key; currentLayout = 1"
              >
                <n-icon :component="item.icon" size="24" color="#2563eb" />
                <span>{{ item.label }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </n-layout>
  </n-config-provider>
</template>

<script setup>
import { ref } from 'vue'
import {
  NConfigProvider,
  NLayout,
  NLayoutHeader,
  NButton,
  NIcon,
  NCard
} from 'naive-ui'
import {
  HomeOutline,
  SchoolOutline,
  BusinessOutline,
  TrophyOutline,
  DocumentTextOutline,
  MicOutline,
  PeopleOutline,
  ChatbubbleEllipsesOutline,
  GlobeOutline,
  CashOutline
} from '@vicons/ionicons5'

import resumeData from './data/resume.json'
import Education from './components/Education.vue'
import Employment from './components/Employment.vue'
import Grants from './components/Grants.vue'
import Awards from './components/Awards.vue'
import AcademicService from './components/AcademicService.vue'
import Presentations from './components/Presentations.vue'
import Publications from './components/Publications.vue'

// State
const currentLang = ref('en')
const currentLayout = ref(1)
const activeSection = ref('home')

// Layout Options
const layouts = [
  { id: 1, name: 'Classic' },
  { id: 2, name: 'Dashboard' },
  { id: 3, name: 'Timeline' },
  { id: 4, name: 'Compact' },
  { id: 5, name: 'Minimal' }
]

// Menu Items with descriptions
const menuItems = [
  {
    key: 'home',
    label: 'Home',
    icon: HomeOutline,
    description: { en: 'Welcome page', cn: '欢迎页面' }
  },
  {
    key: 'education',
    label: 'Education',
    icon: SchoolOutline,
    description: { en: 'Academic background and degrees', cn: '学术背景和学位' }
  },
  {
    key: 'employment',
    label: 'Employment',
    icon: BusinessOutline,
    description: { en: 'Professional experience', cn: '职业经历' }
  },
  {
    key: 'grants',
    label: 'Research Grants',
    icon: CashOutline,
    description: { en: 'Funded research projects', cn: '资助研究项目' }
  },
  {
    key: 'awards',
    label: 'Awards',
    icon: TrophyOutline,
    description: { en: 'Honors and recognitions', cn: '荣誉和奖项' }
  },
  {
    key: 'publications',
    label: 'Publications',
    icon: DocumentTextOutline,
    description: { en: 'Research papers and articles', cn: '研究论文和文章' }
  },
  {
    key: 'presentations',
    label: 'Presentations',
    icon: MicOutline,
    description: { en: 'Conference talks and seminars', cn: '会议演讲和研讨会' }
  },
  {
    key: 'service',
    label: 'Academic Service',
    icon: PeopleOutline,
    description: { en: 'Professional contributions', cn: '专业贡献' }
  }
]

// Theme
const themeOverrides = {
  common: {
    primaryColor: '#2563eb',
    primaryColorHover: '#3b82f6',
    primaryColorPressed: '#1d4ed8',
    borderRadius: '12px'
  }
}

const toggleLanguage = () => {
  currentLang.value = currentLang.value === 'en' ? 'cn' : 'en'
}
</script>

<style scoped>
/* Global Styles */
.layout-container {
  display: flex;
  max-width: 1400px;
  margin: 0 auto;
  padding: 24px;
  gap: 24px;
  min-height: calc(100vh - 80px);
}

/* Layout 1: Classic Split */
.layout-1 {
  gap: 32px;
}

.layout-1 .left-panel {
  width: 320px;
  flex-shrink: 0;
}

.layout-1 .profile-card {
  background: white;
  border-radius: 16px;
  padding: 32px 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  position: sticky;
  top: 24px;
}

.photo-wrapper {
  width: 160px;
  height: 160px;
  margin: 0 auto 24px;
  border-radius: 50%;
  overflow: hidden;
  border: 4px solid #e2e8f0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.profile-photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.profile-name {
  font-family: 'Crimson Text', serif;
  font-size: 24px;
  font-weight: 700;
  color: #1a202c;
  text-align: center;
  margin: 0 0 8px 0;
}

.profile-title {
  font-size: 15px;
  font-weight: 600;
  color: #2563eb;
  text-align: center;
  margin: 0 0 8px 0;
}

.profile-subtitle {
  font-size: 13px;
  color: #718096;
  text-align: center;
  line-height: 1.6;
  margin: 0 0 24px 0;
}

.nav-menu {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  color: #4a5568;
  font-size: 14px;
  font-weight: 500;
}

.nav-item:hover {
  background: #f7fafc;
  color: #2563eb;
}

.nav-item.active {
  background: #2563eb;
  color: white;
}

.layout-1 .right-panel {
  flex: 1;
  min-width: 0;
}

.content-cards {
  background: transparent;
}

.section-content {
  animation: fadeIn 0.3s ease;
}

.welcome-card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 48px 32px;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(102, 126, 234, 0.25);
}

/* Layout 2: Dashboard */
.layout-2 {
  gap: 32px;
  align-items: flex-start;
}

.layout-2 .left-panel-2 {
  width: 350px;
  flex-shrink: 0;
}

.profile-card-modern {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 20px;
  padding: 40px 32px;
  box-shadow: 0 12px 32px rgba(102, 126, 234, 0.3);
  color: white;
  position: sticky;
  top: 24px;
}

.photo-wrapper-large {
  width: 180px;
  height: 180px;
  margin: 0 auto 24px;
  border-radius: 50%;
  overflow: hidden;
  border: 5px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
}

.profile-photo-large {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.profile-name-modern {
  font-family: 'Crimson Text', serif;
  font-size: 28px;
  font-weight: 700;
  text-align: center;
  margin: 0 0 12px 0;
}

.profile-title-modern {
  font-size: 16px;
  font-weight: 600;
  text-align: center;
  opacity: 0.95;
  margin: 0 0 16px 0;
}

.profile-subtitle-modern {
  font-size: 14px;
  text-align: center;
  line-height: 1.6;
  opacity: 0.9;
}

.layout-2 .right-panel-2 {
  flex: 1;
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
}

.grid-card {
  background: white;
  border-radius: 16px;
  padding: 24px;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.grid-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.12);
}

.card-icon {
  margin-bottom: 16px;
}

.card-title {
  font-size: 18px;
  font-weight: 600;
  color: #1a202c;
  margin: 0 0 8px 0;
}

.card-desc {
  font-size: 14px;
  color: #718096;
  margin: 0;
  line-height: 1.5;
}

/* Layout 3: Timeline */
.layout-3 {
  gap: 32px;
}

.layout-3 .left-panel-3 {
  width: 300px;
  flex-shrink: 0;
}

.profile-sidebar {
  background: white;
  border-radius: 16px;
  padding: 32px 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  position: sticky;
  top: 24px;
}

.photo-circle {
  width: 140px;
  height: 140px;
  margin: 0 auto 24px;
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid #e2e8f0;
}

.profile-photo-circle {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.sidebar-name {
  font-family: 'Crimson Text', serif;
  font-size: 22px;
  font-weight: 700;
  color: #1a202c;
  text-align: center;
  margin: 0 0 8px 0;
}

.sidebar-title {
  font-size: 14px;
  font-weight: 600;
  color: #2563eb;
  text-align: center;
  margin: 0 0 16px 0;
}

.sidebar-divider {
  height: 2px;
  background: linear-gradient(to right, transparent, #e2e8f0, transparent);
  margin: 16px 0;
}

.sidebar-bio {
  font-size: 13px;
  color: #4a5568;
  text-align: center;
  line-height: 1.6;
  margin: 0;
}

.layout-3 .right-panel-3 {
  flex: 1;
}

.timeline-container {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.timeline-card {
  display: flex;
  gap: 20px;
  background: white;
  padding: 24px;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  position: relative;
}

.timeline-card::before {
  content: '';
  position: absolute;
  left: 28px;
  top: 60px;
  bottom: -24px;
  width: 2px;
  background: #e2e8f0;
}

.timeline-card:last-child::before {
  display: none;
}

.timeline-card:hover {
  transform: translateX(8px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

.timeline-marker {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

.timeline-content h3 {
  font-size: 18px;
  font-weight: 600;
  color: #1a202c;
  margin: 0 0 8px 0;
}

.timeline-content p {
  font-size: 14px;
  color: #718096;
  margin: 0;
  line-height: 1.5;
}

/* Layout 4: Compact Professional */
.layout-4 {
  flex-direction: column;
  gap: 24px;
}

.layout-4 .left-panel-4 {
  width: 100%;
}

.compact-profile {
  background: white;
  border-radius: 16px;
  padding: 32px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  display: flex;
  align-items: center;
  gap: 32px;
}

.compact-photo-wrapper {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid #e2e8f0;
  flex-shrink: 0;
}

.compact-photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.compact-info {
  flex: 1;
}

.compact-name {
  font-family: 'Crimson Text', serif;
  font-size: 32px;
  font-weight: 700;
  color: #1a202c;
  margin: 0 0 8px 0;
}

.compact-title {
  font-size: 18px;
  font-weight: 600;
  color: #2563eb;
  margin: 0 0 8px 0;
}

.compact-subtitle {
  font-size: 15px;
  color: #718096;
  margin: 0;
  line-height: 1.5;
}

.layout-4 .right-panel-4 {
  width: 100%;
}

.multi-column-cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 16px;
}

.compact-card {
  background: white;
  border-radius: 12px;
  padding: 20px;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.06);
}

.compact-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.12);
}

/* Layout 5: Minimalist */
.layout-5 {
  align-items: center;
  justify-content: center;
}

.minimalist-container {
  display: flex;
  gap: 64px;
  align-items: center;
  max-width: 1200px;
}

.minimalist-left {
  flex: 0 0 400px;
}

.minimalist-profile {
  text-align: center;
}

.minimalist-photo-wrapper {
  width: 200px;
  height: 200px;
  margin: 0 auto 32px;
  border-radius: 50%;
  overflow: hidden;
  border: 6px solid white;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.15);
}

.minimalist-photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.minimalist-name {
  font-family: 'Crimson Text', serif;
  font-size: 36px;
  font-weight: 700;
  color: #1a202c;
  margin: 0 0 12px 0;
}

.minimalist-title {
  font-size: 18px;
  font-weight: 600;
  color: #2563eb;
  margin: 0 0 16px 0;
}

.minimalist-subtitle {
  font-size: 15px;
  color: #4a5568;
  line-height: 1.6;
  margin: 0;
}

.minimalist-right {
  flex: 1;
}

.minimalist-cards {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.minimalist-card {
  background: white;
  border-radius: 12px;
  padding: 24px;
  display: flex;
  align-items: center;
  gap: 16px;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  font-size: 16px;
  font-weight: 500;
  color: #1a202c;
}

.minimalist-card:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.minimalist-card:hover :deep(.n-icon) {
  color: white !important;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive Design */
@media (max-width: 1024px) {
  .layout-container {
    flex-direction: column;
  }

  .layout-1 .left-panel,
  .layout-2 .left-panel-2,
  .layout-3 .left-panel-3 {
    width: 100%;
    position: relative;
  }

  .cards-grid {
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  }

  .minimalist-container {
    flex-direction: column;
    gap: 32px;
  }

  .minimalist-left {
    flex: none;
  }
}
</style>
