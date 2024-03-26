import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { sendRequest } from '../../../core/sendRequest' // Importálja a sendRequest-et, hogy mockolni tudja
import TheContact from '../../../components/TheContact.vue'
import { mockEnquiry } from '../../../__mocks__/components/mockEnquiry'
import { createVuetify } from 'vuetify/lib/framework.mjs'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

vi.mock('../../../core/sendRequest', () => ({
  sendRequest: vi.fn(() => Promise.resolve({ enquiry: mockEnquiry }))
}))

const vuetify = createVuetify({
components,
directives
})

describe('MyComponent', () => {
  it('calls sendForm on button click and receives an enquiry object', async () => {
    const wrapper = mount(TheContact, {
      global: {
        plugins: [vuetify]
      }
    })
    await wrapper.find('[data-test-id="formButton"]').trigger('click')
    // Ellenőrizze, hogy a sendRequest függvény meghívódott-e

    // Mivel a sendForm aszinkron, várni kell, amíg lefut
    const response = await wrapper.vm.sendForm()

    // Ellenőrizzük, hogy a válasz a mockEnquiry objektum-e
    expect(response).toEqual(mockEnquiry)
    expect(sendRequest).toHaveBeenCalled()

    // További logika, hogy ellenőrizze a komponens állapotát vagy a DOM-ot a kérés után
  })
})
