import {
  mockAllEnquiries,
  mockEnquiry,
  mockEnquiryToProcess,
} from "../../__mocks__/enquiry/mockEnquiry";
import enquiryController from "../../controller/enquiryController";
import {
  createEnquiry,
  getAllEnquiriesService,
} from "../../services/enquiryService";
import { Request, Response } from "express";
jest.mock("../../services/enquiryService", () => ({
  createEnquiry: jest.fn(),
  getAllEnquiriesService: jest.fn(),
}));
jest.mock("../../logger");

describe("Test cases of the Enquiry controller", () => {
  describe("Create Enquiry", () => {
    let resObj = {};
    const mockReq = { body: mockEnquiryToProcess };
    const mockRes: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockImplementation((result) => (resObj = result)),
    } as Partial<Response>;

    it("Creating inquiry should return with 201 status and the saved data", async () => {
      (createEnquiry as jest.Mock).mockResolvedValue(mockEnquiry);

      await enquiryController.createEnquiry(
        mockReq as Request,
        mockRes as Response
      );

      expect(mockRes.status).toHaveBeenLastCalledWith(201);
      expect(mockRes.json).toHaveBeenLastCalledWith({ enquiry: mockEnquiry });
    });

    it("Creating enquiry throws error with 400 status", async () => {
      const error = new Error("Database Error!");
      (createEnquiry as jest.Mock).mockRejectedValue(error);

      await enquiryController.createEnquiry(
        mockReq as Request,
        mockRes as Response
      );

      expect(mockRes.status).toHaveBeenLastCalledWith(400);
      expect(mockRes.json).toHaveBeenLastCalledWith({
        message: "Bad request!",
      });
    });
  });

  describe("Get Enquiries", () => {
    let mockReq: any;
    let mockRes: Partial<Response>;
    beforeEach(() => {
      mockReq = {
        body: null,
      };

      mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      };
    });
    it("The function should retrieve all of the enquiries with 200 status", async () => {
      (getAllEnquiriesService as jest.Mock).mockResolvedValue(mockAllEnquiries);

      await enquiryController.getAllEnquiries(
        mockReq as Request,
        mockRes as Response
      );

      expect(mockRes.status).toHaveBeenLastCalledWith(200);
      expect(mockRes.json).toHaveBeenLastCalledWith({
        enquiries: mockAllEnquiries,
      });
    });

    it("Getting all enquiries throws error with 400 status", async () => {
      const error = new Error("Bad request!");

      (getAllEnquiriesService as jest.Mock).mockRejectedValue(error);

      await enquiryController.getAllEnquiries(
        mockReq as Request,
        mockRes as Response
      );

      expect(mockRes.status).toHaveBeenLastCalledWith(400);
      expect(mockRes.json).toHaveBeenLastCalledWith({
        message: "Bad request!",
      });
    });
  });

  afterEach(() => jest.clearAllMocks());
});
