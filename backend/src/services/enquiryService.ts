import { Enquiry, EnquiryAttributes } from "../models/landingPage/enquiry";

/**
 * @function createEnquiry
 * Service to create enquiry record to the database
 * @param {EnquiryAttributes} enquiryData Enquiry object
 * 
 */
export const createEnquiry = async (enquiryData: EnquiryAttributes): Promise<EnquiryAttributes> => {
  const newRecord = await Enquiry.create({...enquiryData});
  return newRecord.get({plain: true});
};
