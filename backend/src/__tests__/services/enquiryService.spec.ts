import { mockAllEnquiries, mockEnquiry, mockEnquiryToProcess } from '../../__mocks__/enquiry/mockEnquiry';
import { Enquiry, EnquiryAttributes } from '../../models/landingPage/enquiry';
import { createEnquiry, getAllEnquiriesService } from '../../services/enquiryService';

jest.mock('../../models/landingPage/enquiry', () => ({
  Enquiry: {
    create: jest.fn().mockResolvedValue({
      get: jest.fn<EnquiryAttributes, []>(() => mockEnquiry),
    }),
    findAll: jest
      .fn<Promise<EnquiryAttributes[]>, []>()
      .mockResolvedValue(mockAllEnquiries),
  },
}));

jest.mock('../../helper/sequelizeToResponseHelper', () => ({
  __esModule: true,
  sequelizeToResponseArrayHelper: jest
    .fn()
    .mockImplementation((models) => models),
}));

describe('Test cases of Enquiry service', () => {
  test('The creation of the enquiry is successful', async () => {
    (Enquiry.create as jest.Mock).mockResolvedValue(mockEnquiry);

    const result = await createEnquiry(mockEnquiryToProcess);

    expect(result).toEqual({
      id: mockEnquiry.id,
      email: mockEnquiry.email,
      message: mockEnquiry.message,
      categoryId: mockEnquiry.categoryId,
    });
  });

  test('The service retrieves all of the enquiries successfully', async () => {
    (Enquiry.findAll as jest.Mock).mockResolvedValue(mockAllEnquiries);
    const result = await getAllEnquiriesService();

    expect(result).toEqual(mockAllEnquiries);
  });

  afterEach(() => jest.clearAllMocks());
});
