// vi.mock('../../stores/useFAQStore', () => ({
//   useFAQStore: {
//     FAQs: ref(mockFAQs),
//     initFAQs: vi.fn(() => Promise.resolve())
//   }
// }))
import { beforeEach, describe, expect, test, vi } from 'vitest'
import TheFAQList from '../../components/TheFAQList.vue'
import { mockFAQs } from '../../__mocks__/stores/mockFAQs'
import { createPinia, setActivePinia } from 'pinia'
import {mount} from '@vue/test-utils'
import { useFAQStore } from '../../stores/useFAQStore'
import {createVuetify} from 'vuetify'

vi.mock('../../core/sendRequest', () => ({
  sendRequest: vi.fn(() => Promise.resolve(mockFAQs))
}))

describe('Test cases of the FAQ list component', async () => {
  let vuetify
  beforeEach(() => {
    vuetify = createVuetify()
    setActivePinia(createPinia())

    const store = useFAQStore()
    store.frequentlyAskedQuestions = mockFAQs
    store.initFAQs = vi.fn(() => Promise.resolve())
  })

  test('renders the same number of elements as in the FAQs array', async () => {
    const wrapper = mount(TheFAQList, {
      global: {
        plugins: [vuetify]
      }
    })

    // Mivel az initFAQs aszinkron, biztosítani kell, hogy a Vue frissítse a DOM-ot
    await wrapper.vm.$nextTick()

    // Ellenőrizd, hogy pontosan annyi panel van-e renderelve, ahány elem a mockolt FAQs tömbben van
    const panels = wrapper.findAll('[data-test-id="faqContainer"]')
    expect(panels.length).toBe(2) // A mockolt adatok alapján
  })
})
