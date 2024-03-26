import omitProps from "../../helper/omitProps";
import { EnquiryAttributes } from "../../models/landingPage/enquiry";

interface MockEnquiryAttributes extends EnquiryAttributes {
  get(options?: {plain: boolean}): EnquiryAttributes
}

export const mockEnquiry: MockEnquiryAttributes = {
  id: 1,
  email: "test@test.com",
  message: "Test message",
  categoryId: 1,
  get() {
    return {
      id: 1,
      email: "test@test.com",
      message: "Test message",
      categoryId: 1,
    };
  },
};

const mockEnquiry2: MockEnquiryAttributes = {
  id: 2,
  email: "test2@test.com",
  message: "Test message 2",
  categoryId: 2,
  get() {
    return {
      id: 2,
      email: "test2@test.com",
      message: "Test message 2",
      categoryId: 2,
    };
  }
}

export const mockEnquiryToProcess: Omit<EnquiryAttributes, "id"> = omitProps(
  mockEnquiry,
  "id",
  "get"
);

export const mockAllEnquiries: EnquiryAttributes[] = [mockEnquiry, mockEnquiry2]