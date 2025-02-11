<script setup lang="ts">
import { useMasterDataStore } from '@/stores/masterData/useMasterDataStore'
import { useProjectStore } from '@/stores/useProjectStore'
import { type Project, type ProjectToAdd } from '@/types'
import { storeToRefs } from 'pinia'
import { computed, onBeforeMount, onMounted, ref, watch } from 'vue'
import { useRoute, type RouteLocationNormalized } from 'vue-router'
import TheCollectedPriceStatusBar from '@/components/ui/TheCollectedPriceStatusBar.vue'
import { useProjectCategoryStore } from '@/stores/masterData/useProjectCategoryStore'
import { useCurrencyStore } from '@/stores/masterData/useCurrencyStore'
import { DATE_FORMAT_HINT } from '@/constants/constants'
import inputValidationRules from '@/helpers/inputValidationRules'
import router from '@/router'

const projectId = ref<number>()
const project = ref<Project | ProjectToAdd | null>(null)
const projectIsEdited = ref<boolean>(false)
const existingProjectEdited = computed(() => projectIsEdited.value && 'projectId' in project.value!)
const newProjectEdited = computed(() => projectIsEdited.value && !('projectId' in project.value!))

const profileImageSource = computed(
  () => project.value?.contact?.profileImage ?? '/profilePlaceholder.jpg'
)

const route = useRoute()
const projectStore = useProjectStore()
const currencyStore = useCurrencyStore()
const masterDataStore = useMasterDataStore()
const projectCategoryStore = useProjectCategoryStore()

const { getProject, handleCopyProjectBeforeEdit, updateProject, addProject, saveNewProject } = projectStore
const { projectCategories } = storeToRefs(projectCategoryStore)
const { currencies } = storeToRefs(currencyStore)
const { originalProjectWhileEdit, projectToSave } = storeToRefs(projectStore)

const SOCIALS: { name: string; icon: string }[] = [
  { name: 'Facebook', icon: '' },
  { name: 'Instagram', icon: '' },
  { name: 'X', icon: '' },
  { name: 'LinkedIn', icon: '' },
  { name: 'Website', icon: '' }
]

const projectStartDateFormatted = computed({
  get: (): string => {
    if (projectToSave.value?.startDate instanceof Date) {
      return projectToSave.value.startDate.toISOString().substring(0, 10);
    } else if(project.value?.startDate instanceof Date) {
      return project.value?.startDate.toISOString().substring(0,10);
    }
    return '';
  },
  set: (value: string) => {
    if(value.length < 10) return
    const parsedDate = new Date(value);
    if (!isNaN(parsedDate.getTime())) {
      if(projectToSave.value) {
        projectToSave.value!.startDate = parsedDate;
      } else if(project.value) {
        project.value!.startDate = parsedDate;
      }
    } else {
      console.warn('Érvénytelen dátumformátum:', value);
    }
  },
});

onBeforeMount(() => {
  const id = route.params.projectId
  if (id) {
    projectId.value = Number(id)
  }
})

onMounted(async () => {
  await masterDataStore.getAndInitProjectCategoryStore()
  await masterDataStore.getAndInitCurrencyStore()

  if (projectId.value) {
    const result = getProject(projectId.value)
    project.value = result ? result : null
    return
  }

  addProject()
  project.value = projectToSave.value
  projectIsEdited.value = true
})

watch(route, (newRoute: RouteLocationNormalized, oldRoute: RouteLocationNormalized) => {
  console.log(`Route changed`, {old: oldRoute.name, new: newRoute.name}); // Debug log
  projectIsEdited.value = false;
});
const handleEnableEditProject = () => {
  if ('projectId' in project.value!) {
    projectIsEdited.value = true
    handleCopyProjectBeforeEdit(project.value)
  }
}

const handleUndoEditProject = () => {
  project.value = originalProjectWhileEdit.value
  originalProjectWhileEdit.value = null
  projectIsEdited.value = false
}

const handleSaveProject = async () => {
  const project = await saveNewProject();
  if(route.name === "mySelectedProject") {
    projectIsEdited.value = false;
  }
  router.push({name: 'mySelectedProject', params: {'projectId': project.projectId}})
}

const handleUpdateProject = async () => {
  const updatedProject = await updateProject(project.value as Project)
  projectIsEdited.value = false
}
</script>

<template>
  <v-container v-if="project" class="project">
    <v-container id="project-header">
      <v-container id="project-name">
        <v-text-field
          v-model="project.projectName"
          label="Name of the project"
          variant="outlined"
          :disabled="!projectIsEdited"
          :rules="[inputValidationRules.project.projectName]"
        />
      </v-container>
      <v-combobox
        v-model.number="project.categoryId"
        :items="projectCategories"
        label="Project category"
        variant="outlined"
        item-title="categoryName"
        item-value="categoryId"
        style="grid-area: category"
        :disabled="!projectIsEdited"
        :rules="[inputValidationRules.required]"
        :return-object="false"
      />
      <v-container id="toolbar">
        <base-button v-show="projectIsEdited" :rounded="true" @click="handleUndoEditProject">
          <v-icon icon="mdi-undo" />
        </base-button>
        <base-button v-show="existingProjectEdited" :rounded="true" @click="handleUpdateProject">
          <v-icon icon="mdi-floppy" />
        </base-button>
        <base-button v-show="newProjectEdited" :rounded="true" @click="handleSaveProject">
          <v-icon icon="mdi-floppy" />
        </base-button>
        <base-button v-show="!projectIsEdited" :rounded="true" @click="handleEnableEditProject">
          <v-icon icon="mdi-pencil" />
        </base-button>
      </v-container>
    </v-container>
    <the-collected-price-status-bar
      :goalPrice="project.startingAmount"
      :actualPrice="1645"
      :showInPercentage="false"
      :currencyCode="project.currency?.code"
      style="grid-area: status"
    />
    <v-container id="project-detail-wrapper">
      <v-container>
        <v-textarea
          variant="outlined"
          label="Description"
          v-model="project.description"
          class="project-content"
          hide-details="auto"
          :no-resize="true"
          id="project-description"
          :disabled="!projectIsEdited"
          :rules="[inputValidationRules.project.description]"
        />
      </v-container>
      <v-container id="project-price">
        <v-text-field
          label="Starting Price"
          v-model.number="project.startingAmount"
          variant="outlined"
          hint="The price needed to collect."
          :disabled="!projectIsEdited"
          :rules="[inputValidationRules.project.startPrice]"
        />
        <v-combobox
          label="Currency"
          v-model.number="project.currencyId"
          :items="currencies"
          item-value="currencyId"
          item-title="name"
          variant="outlined"
          :disabled="!projectIsEdited"
          :rules="[inputValidationRules.required]"
          :return-object="false"
        />
        <v-text-field
          label="Starting Date"
          v-model="projectStartDateFormatted"
          variant="outlined"
          :hint="DATE_FORMAT_HINT"
          :disabled="!projectIsEdited"
          :rules="[inputValidationRules.required]"
        />
      </v-container>
      <v-container id="vision">
        <v-textarea
          label="Description about the team"
          placeholder="TODO"
          hint="Write here about the team or the vision of yours."
          hide-details="auto"
          :no-resize="true"
          variant="outlined"
          :disabled="!projectIsEdited"
        />
      </v-container>
    </v-container>

    <v-divider id="photos-top-separator" />
    <v-container id="photos">
      <v-img alt="Selected photo about the project." class="photo selected-photo" />
      <v-container id="photo-selector">
        <v-img class="photo selectable-photo" />
        <v-img class="photo selectable-photo" />
        <v-img class="photo selectable-photo" />
        <v-img class="photo selectable-photo" />
        <v-img class="photo selectable-photo" />
      </v-container>
      <base-button v-show="projectIsEdited" id="add-photo-button"> Add new image</base-button>
      <base-button v-show="projectIsEdited" id="select-photo-button"> Select images</base-button>
    </v-container>
    <v-divider id="photos-bottom-separator" />
    <v-container id="contact">
      <v-img
        :src="profileImageSource"
        alt="Image of the contact person for this project."
        id="contact-photo"
      />
      <v-container id="name-fields">
        <v-text-field
          label="First name"
          variant="outlined"
          density="compact"
          hide-details="auto"
          v-model="project.contact.firstName"
          :disabled="!projectIsEdited"
        />
        <v-text-field
          label="Last name"
          variant="outlined"
          density="compact"
          hide-details="auto"
          v-model="project.contact.lastName"
          :disabled="!projectIsEdited"
        />
        <v-text-field
          label="Email"
          variant="outlined"
          id="contact-email"
          density="compact"
          hide-details="auto"
          v-model="project.contact.email"
          :disabled="!projectIsEdited"
        />
      </v-container>
    </v-container>
    <v-container id="contact-social-separator">
      <v-divider vertical inset />
    </v-container>
    <v-container id="socials">
      <v-combobox
        v-show="projectIsEdited"
        label="Socials"
        hint="Select your social media platforms"
        variant="outlined"
        :items="SOCIALS"
        item-title="name"
      />
    </v-container>
  </v-container>
  <div v-else>
    <p>Loading...</p>
  </div>
</template>
<style scoped lang="css">
.project {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;

  @media (min-width: 768px) {
    display: grid;
    grid-template:
      'project-header project-header project-header project-header project-header project-header project-header project-header project-header project-header project-header project-header'
      'status status status status status status status status status status status status'
      'project-detail-wrapper project-detail-wrapper project-detail-wrapper project-detail-wrapper project-detail-wrapper project-detail-wrapper project-detail-wrapper project-detail-wrapper project-detail-wrapper project-detail-wrapper project-detail-wrapper project-detail-wrapper'
      'photos-top-separator photos-top-separator photos-top-separator photos-top-separator photos-top-separator photos-top-separator photos-top-separator photos-top-separator photos-top-separator photos-top-separator photos-top-separator photos-top-separator'
      'photos photos photos photos photos photos photos photos photos photos photos photos'
      'photos-bottom-separator photos-bottom-separator photos-bottom-separator photos-bottom-separator photos-bottom-separator photos-bottom-separator photos-bottom-separator photos-bottom-separator photos-bottom-separator photos-bottom-separator photos-bottom-separator photos-bottom-separator'
      'contact contact contact contact contact contact-social-separator contact-social-separator socials socials socials socials socials';
    grid-template-columns: repeat(12, 1fr);
    grid-template-rows: repeat(8, auto);
    gap: 1rem;
    padding: 1rem;
    align-items: stretch;
  }
}

#project-header {
  grid-area: project-header;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: repeat(3, 1fr);
  grid-template:
    'project-name project-name project-name project-name project-name project-name project-name project-name project-name project-name project-name project-name'
    'category category category category category category category category category category category category'
    'toolbar toolbar toolbar toolbar toolbar toolbar toolbar toolbar toolbar toolbar toolbar toolbar ';

  @media (min-width: 768px) {
    grid-template-rows: auto;
    grid-template:
      'project-name project-name project-name project-name project-name project-name project-name project-name project-name toolbar toolbar toolbar'
      'category category category category category category category category category category category category';
  }
}

#project-name {
  /** TODO: investigate the wrapper container */
  grid-area: project-name;
  padding: 0;
  width: 100%;
}

#project-detail-wrapper {
  grid-area: project-detail-wrapper;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 0;

  @media (min-width: 768px) {
    grid-area: 'project-details';
    display: grid;
    grid-template: 'project-description vision project-price';
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr;
  }
}

#project-price {
  grid-area: project-price;
}

#toolbar {
  grid-area: toolbar;
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  padding: 0;
  flex-shrink: 2;
}

.project-content {
  grid-area: description;
  color: white;
  height: 100%;
}

.contact-header {
  @media (min-width: 768px) {
    display: none;
  }
}

.nameCard {
  grid-area: contact;
  display: grid;
  grid-template-columns: 70% 30%;
  border: 1px solid var(--c-orange);
  border-radius: 1rem;
  padding: 0.5rem;
  align-items: center;
  gap: 1rem;
}

.nameCard v-container {
  display: flex;
  align-items: center;
}

.nameCard a {
  text-decoration: none;
  color: var(--c-orange);
}

.nameCard v-img {
  width: 100%;
  height: auto;
  border-radius: 50%;
}

h1,
h2 {
  color: var(--c-orange);
}

#photos {
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media (min-width: 768px) {
    grid-area: photos;
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    grid-template-rows: repeat(3, auto);
    grid-template:
      'selected-photo selected-photo selected-photo selected-photo selected-photo selected-photo photo-selector photo-selector photo-selector photo-selector photo-selector photo-selector'
      'selected-photo selected-photo selected-photo selected-photo selected-photo selected-photo photo-selector photo-selector photo-selector photo-selector photo-selector photo-selector'
      'selected-photo selected-photo selected-photo selected-photo selected-photo selected-photo add-photo-button add-photo-button add-photo-button select-photo-button select-photo-button select-photo-button';
  }
}

.photo {
  background-color: var(--c-dark-grey);
}

.selected-photo {
  border-radius: 1rem;
  aspect-ratio: 16/9;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 100%;

  @media (min-width: 768px) {
    width: 400px;
    grid-area: selected-photo;
  }

  @media (min-width: 1024px) {
    width: 700px;
  }
}

#photo-selector {
  display: flex;
  gap: 1rem;
  overflow-y: auto;
  padding: 0;

  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: auto;
    grid-area: photo-selector;
  }
}

.selectable-photo {
  border-radius: 1rem;
  aspect-ratio: 16/9;
  display: flex;
  flex-wrap: wrap;
  height: 5rem;
}

#add-photo-button {
  grid-area: add-photo-button;
}

#select-photo-button {
  grid-area: select-photo-button;
}

.divider {
  @media (min-width: 768px) {
    visibility: hidden;
  }
}

#vision {
  grid-area: vision;
}

#contact {
  grid-area: contact;
  display: grid;
  grid-template-rows: repeat(2, 1fr);
  grid-template-columns: repeat(12, 1fr);
  grid-template:
    'contact-photo name-fields name-fields name-fields name-fields'
    'contact-email contact-email contact-email contact-email contact-email';
  align-items: center;
}

#contact-photo {
  width: 7rem;
  height: 7rem;
  background-color: var(--c-dark-grey);
  border-radius: 50%;
  grid-area: contact-photo;
}

#name-fields {
  grid-area: name-fields;
  display: flex;
  flex-direction: column;
  padding: 0;
  gap: 0.5rem;
}

#contact-email {
  grid-area: contact-email;
}

#socials {
  grid-area: socials;
}

#contact-social-separator {
  grid-area: contact-social-separator;
  display: flex;
  justify-content: center;
}

.v-divider {
  color: white;
}

#photos-top-separator {
  grid-area: photos-top-separator;
}

#photos-bottom-separator {
  grid-area: photos-bottom-separator;
}
</style>
