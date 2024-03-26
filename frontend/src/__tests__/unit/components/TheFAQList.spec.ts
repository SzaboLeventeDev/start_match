import { beforeEach, describe, expect, test, vi } from 'vitest'
import TheFAQList from '../../../components/TheFAQList.vue'
import { mockFAQs } from '../../../__mocks__/stores/mockFAQs'
import { createPinia, setActivePinia } from 'pinia'
import {mount} from '@vue/test-utils'
import { useFAQStore } from '../../../stores/useFAQStore'
import {createVuetify} from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

vi.mock('../../core/sendRequest', () => ({
  sendRequest: vi.fn(() => Promise.resolve(mockFAQs))
}))

const vuetify = createVuetify({
  components,
  directives
})

describe('Test cases of the FAQ list component', async () => {
  beforeEach(() => {
    setActivePinia(createPinia())

    const store = useFAQStore()
    store.frequentlyAskedQuestions = mockFAQs
    store.initFAQs = vi.fn(() => Promise.resolve())
  })

  test('Renders the same number of elements as in the FAQs array', async () => {
    const wrapper = mount(TheFAQList, {
      global: {
        plugins: [vuetify]
      }
    })

    await wrapper.vm.$nextTick()

    const panels = wrapper.findAll('[data-test-id="faqContainer"]')
    expect(panels.length).toBe(2)
  })
})
