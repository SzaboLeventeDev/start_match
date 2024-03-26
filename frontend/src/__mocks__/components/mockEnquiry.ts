/**
 * Contains mock data for TheContact component to send enquiry for the backend.
 */

export const mockEnquiry: Enquiry = {
  id: 1,
  email: 'test@test.com',
  message: 'Test message',
  categoryId: 1,
}

export const mockEnquiryToProcess: Omit<Enquiry, 'id'> = {
  email: 'test@test.com',
  message: 'Test message',
  categoryId: 1
}