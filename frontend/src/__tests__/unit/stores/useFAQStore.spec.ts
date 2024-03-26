import { describe, test, beforeEach, vi, expect } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useFAQStore } from '../../../stores/useFAQStore'
import { mockFAQs } from '../../../__mocks__/stores/mockFAQs'

vi.mock('../../../core/sendRequest', () => ({
  sendRequest: vi.fn(() => Promise.resolve(mockFAQs))
}))

describe('Test cases of FAQ store', () => {
  let store: any
  beforeEach(() => {
    setActivePinia(createPinia())
    store = useFAQStore()
  })

  test('The store initialization is successful', async () => {
    await store.initFAQs()

    expect(store.FAQs).toEqual(mockFAQs)
  })
})
