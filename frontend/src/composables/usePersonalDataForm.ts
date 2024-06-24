import { sendRequest } from '@/core/sendRequest'
import type { RegistrableUser } from '@/interfaces/user'
import { computed, ref } from 'vue'

export function usePersonalDataForm() {
  const personalData = ref<RegistrableUser>({
    firstName: '',
    lastName: '',
    dateOfBirth: new Date(),
    email: '',
    password: '',
    passwordAgain: ''
  })

  const passwordVisibility = ref<{
    isPasswordVisible: boolean
    isPasswordAgainVisible: boolean
  }>({ isPasswordVisible: false, isPasswordAgainVisible: false })

  const validatePersonalData = (registrationData: RegistrableUser): boolean => {
    if (!registrationData.firstName || registrationData.firstName === '') return false

    if (!registrationData.lastName || registrationData.lastName === '') return false

    if (!registrationData.email.includes('@')) return false

    if (registrationData.password.length < 8) return false

    if (
      registrationData.passwordAgain.length < 8 ||
      registrationData.password !== registrationData.passwordAgain
    )
      return false

    return true
  }

  const togglePasswordVisibility = () => {
    passwordVisibility.value.isPasswordVisible = !passwordVisibility.value.isPasswordVisible
  }

  const togglePasswordAgainVisibility = () => {
    passwordVisibility.value.isPasswordAgainVisible =
      !passwordVisibility.value.isPasswordAgainVisible
  }

  const menu = ref<boolean>(false)

  const handleDateChange = (value: Date) => {
    const utcDate = new Date(Date.UTC(value.getFullYear(), value.getMonth(), value.getDate()))
    personalData.value.dateOfBirth = utcDate
    menu.value = false
  }

  const formattedDate = computed(() => personalData.value.dateOfBirth.toISOString().slice(0, 10))

  const saveUser = async (): Promise<string> => {
    const message = await sendRequest('registration', 'POST', personalData.value)
    return message
  }

  return {
    personalData,
    passwordVisibility,
    validatePersonalData,
    togglePasswordVisibility,
    togglePasswordAgainVisibility,
    handleDateChange,
    menu,
    formattedDate,
    saveUser
  }
}
