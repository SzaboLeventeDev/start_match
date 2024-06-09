<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import { sendRequest } from '@/core/sendRequest'
import useAuthenticationStore from '@/stores/useAuthenticationStore'
import type User from '@/interfaces/user'
import type { RegistrableUser } from '@/interfaces/user';
const store = useAuthenticationStore()
const { getUserId } = store
const initialUser: User = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  dateOfBirth: new Date(),
  userId: 0,
  profileImage: '/profilePlaceholder.jpg'
}
const initialModifiedUser: RegistrableUser = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  passwordAgain: '',
  dateOfBirth: new Date(),
  profileImage: '/profilePlaceholder.jpg'
}

const user = ref<User>(initialUser);
const modifiedUser = ref<RegistrableUser>(initialModifiedUser);

const id = computed(() => getUserId);
const fullName = computed(() => `${user.value?.firstName} ${user.value.lastName}`);
const profileImageSource = computed(() => user.value.profileImage ?? '/profilePlaceholder.jpg');
const formattedDateOfBirth = computed(() =>
  user.value.dateOfBirth ? new Date(user.value?.dateOfBirth).toLocaleDateString('hu-HU') : null
)

const fetchUser = async () => {
  if (id.value) {
    const response = await sendRequest(`user/${id.value}`, 'GET', undefined, undefined, true)
    user.value = response.user;
    modifiedUser.value = response.user;
    modifiedUser.value.passwordAgain = response.user.password
  }
}

onMounted(fetchUser);
</script>
<template>
  <v-container class="profile">
    <v-img
      :width="128"
      :height="128"
      aspect-ratio="1/1"
      cover
      class="rounded-circle"
      :src="profileImageSource"
    />
    <v-card-title>{{ fullName }}</v-card-title>
    <base-card title="Personal data" :isEditable="true">
      <template #content>
        <v-container>
          <v-container class="cardContentRow">
            <v-icon icon="mdi-email"></v-icon>
            <v-label>{{ user.email }}</v-label>
          </v-container>
          <v-container class="cardContentRow">
            <v-icon icon="mdi-lock"></v-icon>
            <v-label>...</v-label>
          </v-container>
          <v-container class="cardContentRow">
            <v-icon icon="mdi-calendar"></v-icon>
            <v-label>{{ formattedDateOfBirth }}</v-label>
          </v-container>
        </v-container>
      </template>
      <template #editContent>
        <v-container>
          <v-text-field label="First name" v-model="modifiedUser.firstName" />
          <v-text-field label="Last name" v-model="modifiedUser.lastName" />
          <v-text-field
            label="Email"
            prepend-inner-icon="mdi-email"
            v-model="modifiedUser.email"
            type="email"
          />
          <v-text-field
            label="Password"
            prepend-inner-icon="mdi-lock"
            append-inner-icon="mdi-eye"
            v-model="modifiedUser.password"
            type="password"
          />
          <v-text-field
            label="Password again"
            prepend-inner-icon="mdi-lock"
            append-inner-icon="mdi-eye"
            v-model="modifiedUser.password"
            type="password"
          />
          <v-text-field
            label="Date of birth"
            outlined
            prepend-inner-icon="mdi-calendar"
            :value="modifiedUser.dateOfBirth"
          />
        </v-container>
      </template>
      <!-- <v-date-input variant="outlined"></v-date-input> -->
      <!-- <template #editActions>
        <v-container class="actions">
          <base-button>Cancel</base-button>
          <base-button>Save</base-button>
        </v-container>
      </template> -->
    </base-card>
  </v-container>
</template>
<style scoped>
.profile {
  display: flex;
  flex-direction: column;
  align-items: center;
}

base-card .v-icon {
  color: var(--c-orange);
}

.cardContentRow {
  display: flex;
  padding: unset;
  gap: 0.5rem;
}

.actions {
  display: flex;
  justify-content: space-between;
}
</style>
