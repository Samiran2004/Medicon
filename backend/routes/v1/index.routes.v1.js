import express from "express";
import { StatusCodes } from "http-status-codes";
const router = express.Router();
import controllers from "../../controllers/index.controllers.js";
import upload from "../../middlewares/multer.middleware.js";
import Middlewares from "../../middlewares/index.middleware.js";
import getNearbyDoctors from "../../controllers/get/getNearbyDoctors.controller.js";

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *         - phonenumber
 *         - profileimage
 *         - secNumber
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the user
 *         email:
 *           type: string
 *           description: The user's email address
 *         password:
 *           type: string
 *           description: The user's password
 *         phonenumber:
 *           type: number
 *           description: The user's phone number
 *         profilepic:
 *           type: string
 *           description: URL of the user's profile image
 *         secNumber:
 *           type: number
 *           description: The user's secondary phone number, which is required for emergency
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Doctor:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - phonenumber
 *         - password
 *         - specialization
 *         - registrationId
 *         - address
 *         - geoLocation
 *       properties:
 *         name:
 *           type: string
 *           description: Name of the doctor.
 *           example: Dr. John Doe
 *         email:
 *           type: string
 *           description: Email address of the doctor.
 *           example: johndoe@hospital.com
 *         phonenumber:
 *           type: integer
 *           description: Phone number of the doctor.
 *           example: 1234567890
 *         password:
 *           type: string
 *           description: Password for the doctor's account.
 *           example: password123
 *         profilepic:
 *           type: string
 *           description: URL of the doctor's profile picture.
 *           example: https://example.com/profile.jpg
 *         specialization:
 *           type: array
 *           items:
 *             type: string
 *           description: List of specializations.
 *           example: ["Cardiology", "Dermatology"]
 *         registrationId:
 *           type: string
 *           description: Unique registration ID of the doctor.
 *           example: D12345
 *         address:
 *           type: string
 *           description: Address of the doctor.
 *           example: 123 Health Street, Wellness City
 *         geoLocation:
 *           type: object
 *           description: Geographical coordinates of the doctor's location.
 *           properties:
 *             type:
 *               type: string
 *               enum: ["Point"]
 *               example: "Point"
 *             coordinates:
 *               type: array
 *               items:
 *                 type: number
 *               description: Coordinates in [longitude, latitude] format.
 *               example: [88.3639, 22.5726]
 *         isVerified:
 *           type: boolean
 *           description: Indicates if the doctor is verified.
 *           example: true
 *         languages:
 *           type: array
 *           items:
 *             type: string
 *           description: Languages spoken by the doctor.
 *           example: ["English", "Hindi"]
 *         education:
 *           type: string
 *           description: Educational qualifications of the doctor.
 *           example: MBBS, MD - Cardiology
 *         consultationFee:
 *           type: number
 *           description: Consultation fee of the doctor.
 *           example: 500
 *         facts:
 *           type: string
 *           description: A motivational or informative quote from the doctor.
 *           example: "Each patient is a story waiting to be heard—listen with compassion, heal with expertise."
 *         isOnline:
 *           type: boolean
 *           description: Indicates if the doctor is currently online.
 *           example: true
 *         isAvailable:
 *           type: boolean
 *           description: Indicates if the doctor is available for consultation.
 *           example: true
 *         isBusy:
 *           type: boolean
 *           description: Indicates if the doctor is currently busy.
 *           example: false
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp of the doctor's record creation.
 *           example: 2025-03-30T14:00:00.000Z
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp of the last update.
 *           example: 2025-03-30T14:00:00.000Z
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Admin:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the admin.
 *           example: "John Doe"
 *         email:
 *           type: string
 *           description: The email of the admin (must be unique).
 *           example: "admin@example.com"
 *         password:
 *           type: string
 *           description: The password of the admin (hashed for security).
 *           example: "admin123"
 *         role:
 *           type: string
 *           description: The role of the admin, default is "admin".
 *           example: "admin"
 *       required:
 *         - name
 *         - email
 *         - password
 */


/**
 * Check health...
 * path: /api/v1/health
 * Permission: All
 */

/**
 * @swagger
 * paths:
 *  /health:
 *    get:
 *      summary: Check server health status
 *      description: Returns the health status of the server.
 *      responses:
 *        200:
 *          description: Server is up and running.
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  status:
 *                    type: string
 *                    example: "OK"
 *                  message:
 *                    type: string
 *                    example: "Server is Up and Running"
 *        500:
 *          description: Internal server error.
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  status:
 *                    type: string
 *                    example: "Failed"
 */
router.get("/health", (req, res, next) => {
  try {
    res.status(StatusCodes.OK).send({
      status: "OK",
      message: "Server is Up and Running",
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      status: "Failed",
    });
  }
});

/**
 * SignUp for user
 * Path: /api/v1/signup-user
 * Permission: All
 */

/**
 * @swagger
 * /api/user/signup:
 *   post:
 *     summary: User Signup
 *     description: Register a new user with basic details and geolocation.
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the user.
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 description: User's email address.
 *                 example: johndoe@example.com
 *               phonenumber:
 *                 type: integer
 *                 description: User's phone number.
 *                 example: 1234567890
 *               password:
 *                 type: string
 *                 description: User's password.
 *                 example: strongpassword123
 *               geoLocation:
 *                 type: string
 *                 description: Geolocation in the format "latitude,longitude".
 *                 example: "22.5726,88.3639"
 *               secNumber:
 *                 type: integer
 *                 description: Secondary contact number.
 *                 example: 9876543210
 *               profilepic:
 *                 type: string
 *                 format: binary
 *                 description: User's profile picture.
 *     responses:
 *       201:
 *         description: Successfully Signed Up!
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 message:
 *                   type: string
 *                   example: Successfully Signed Up!
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 641a1f9b9e24dc001c3c423f
 *                     name:
 *                       type: string
 *                       example: John Doe
 *                     email:
 *                       type: string
 *                       example: johndoe@example.com
 *                     phonenumber:
 *                       type: integer
 *                       example: 1234567890
 *                     profilepic:
 *                       type: string
 *                       example: "https://example.com/profile.jpg"
 *                     geoLocation:
 *                       type: object
 *                       properties:
 *                         type:
 *                           type: string
 *                           example: Point
 *                         coordinates:
 *                           type: array
 *                           items:
 *                             type: number
 *                           example: [88.3639, 22.5726]
 *                     secNumber:
 *                       type: integer
 *                       example: 9876543210
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: 2025-03-30T14:00:00.000Z
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: 2025-03-30T14:00:00.000Z
 *       400:
 *         description: Bad Request - Missing required fields or invalid data.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: Failed
 *                 message:
 *                   type: string
 *                   example: Please enter all required fields including location!
 *       409:
 *         description: Conflict - User already exists.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: Failed
 *                 message:
 *                   type: string
 *                   example: User already exists!
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: Failed
 *                 message:
 *                   type: string
 *                   example: Internal Server Error
 */
router.post(
  "/signup-user",
  upload.single("profileimage"),
  controllers.UserSignUp
);

/**
 * SignUp for Doctor
 * Path: /api/v1/signup-doctor
 * Permission: All
 */

/**
 * @swagger
 * /api/v1/signup-doctor:
 *   post:
 *     summary: Doctor Signup
 *     description: Register a new doctor with basic details and geolocation.
 *     tags:
 *       - Doctor
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the doctor.
 *                 example: Dr. John Doe
 *               email:
 *                 type: string
 *                 description: Doctor's email address.
 *                 example: johndoe@example.com
 *               phonenumber:
 *                 type: integer
 *                 description: Doctor's phone number.
 *                 example: 1234567890
 *               password:
 *                 type: string
 *                 description: Doctor's password.
 *                 example: strongpassword123
 *               specialization:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: List of specializations.
 *                 example: ["Cardiology", "Dermatology"]
 *               registrationId:
 *                 type: string
 *                 description: Unique registration ID of the doctor.
 *                 example: D12345
 *               address:
 *                 type: string
 *                 description: Address of the doctor.
 *                 example: 123 Health Street, Wellness City
 *               geoLocation:
 *                 type: string
 *                 description: Geolocation in the format "latitude,longitude".
 *                 example: "22.5726,88.3639"
 *               profilepic:
 *                 type: string
 *                 format: binary
 *                 description: Doctor's profile picture.
 *     responses:
 *       201:
 *         description: Successfully Signed Up!
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 message:
 *                   type: string
 *                   example: Successfully Signed Up!
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 641a1f9b9e24dc001c3c423f
 *                     name:
 *                       type: string
 *                       example: Dr. John Doe
 *                     email:
 *                       type: string
 *                       example: johndoe@example.com
 *                     phonenumber:
 *                       type: integer
 *                       example: 1234567890
 *                     profilepic:
 *                       type: string
 *                       example: "https://example.com/profile.jpg"
 *                     specialization:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example: ["Cardiology", "Dermatology"]
 *                     registrationId:
 *                       type: string
 *                       example: D12345
 *                     address:
 *                       type: string
 *                       example: 123 Health Street, Wellness City
 *                     geoLocation:
 *                       type: object
 *                       properties:
 *                         type:
 *                           type: string
 *                           example: Point
 *                         coordinates:
 *                           type: array
 *                           items:
 *                             type: number
 *                           example: [88.3639, 22.5726]
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: 2025-03-30T14:00:00.000Z
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: 2025-03-30T14:00:00.000Z
 *       400:
 *         description: Bad Request - Missing required fields or invalid data.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: Failed
 *                 message:
 *                   type: string
 *                   example: Please enter all required fields including location!
 *       409:
 *         description: Conflict - Doctor already exists.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: Failed
 *                 message:
 *                   type: string
 *                   example: Doctor already exists!
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: Failed
 *                 message:
 *                   type: string
 *                   example: Internal Server Error
 */
router.post(
  "/signup-doctor",
  upload.single("profileimage"),
  controllers.DoctorSignUp
);

/**
 * Login for user
 * Path: /api/v1/login-user
 * Permission: All
 */

/**
 * @swagger
 * /api/v1/login-user:
 *   post:
 *     summary: User Login
 *     description: Authenticate a user and return a JWT token.
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: User's email address.
 *                 example: johndoe@example.com
 *               password:
 *                 type: string
 *                 description: User's password.
 *                 example: strongpassword123
 *     responses:
 *       200:
 *         description: Successfully Logged In!
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 message:
 *                   type: string
 *                   example: Successfully Logged In!
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       401:
 *         description: Unauthorized - Invalid credentials.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: Failed
 *                 message:
 *                   type: string
 *                   example: Invalid email or password!
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: Failed
 *                 message:
 *                   type: string
 *                   example: Internal Server Error
 */
router.post("/login-user", controllers.UserLogin);

/**
 * Login for doctor
 * Path: /api/v1/login-doctor
 * Permission: All
 */

/**
 * @swagger
 * /api/v1/login-doctor:
 *   post:
 *     summary: Doctor Login
 *     description: Authenticate a doctor and return a JWT token.
 *     tags:
 *       - Doctor
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Doctor's email address.
 *                 example: johndoe@example.com
 *               password:
 *                 type: string
 *                 description: Doctor's password.
 *                 example: strongpassword123
 *     responses:
 *       200:
 *         description: Successfully Logged In!
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 message:
 *                   type: string
 *                   example: Successfully Logged In!
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       401:
 *         description: Unauthorized - Invalid credentials.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: Failed
 *                 message:
 *                   type: string
 *                   example: Invalid email or password!
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: Failed
 *                 message:
 *                   type: string
 *                   example: Internal Server Error
 */
router.post("/login-doctor", controllers.DoctorLogin);

/**
 * Login for admin
 * Path: /api/v1/login-admin
 * Permission: All
 */

/**
 * @swagger
 * paths:
 *  /admin/login:
 *    post:
 *      summary: Admin Login
 *      description: Allows an admin to log in by providing their email and password. If successful, returns a JWT token.
 *      tags:
 *       - Admin
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                email:
 *                  type: string
 *                  description: The email of the admin.
 *                  example: "admin@example.com"
 *                password:
 *                  type: string
 *                  description: The password of the admin.
 *                  example: "admin123"
 *      responses:
 *        200:
 *          description: Successfully logged in.
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  status:
 *                    type: string
 *                    example: "OK"
 *                  message:
 *                    type: string
 *                    example: "Successfully logged in"
 *                  token:
 *                    type: string
 *                    description: The JWT token for the authenticated admin.
 *                    example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YzYyY2QyMS1jZGQ0LTQ2ODktODZlZC1kNTJlZmZmZDk3M2UiLCJuYW1lIjoiYWRtaW4iLCJlbWFpbCI6ImFkbWluQGV4YW1wbGUuY29tIiwicm9sZSI6ImFkbWluIn0.-8hXf9yjpH1Z2r52QwJ_VjwA3ROjxLIsXbSH13XU0Mw"
 *                  data:
 *                    type: object
 *                    properties:
 *                      name:
 *                        type: string
 *                        example: "Admin"
 *                      email:
 *                        type: string
 *                        example: "admin@example.com"
 *                      role:
 *                        type: string
 *                        example: "admin"
 *        400:
 *          description: All fields are required.
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  status:
 *                    type: string
 *                    example: "Failed"
 *                  message:
 *                    type: string
 *                    example: "All fields are required!"
 *        401:
 *          description: Unauthorized due to incorrect password.
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  status:
 *                    type: string
 *                    example: "Failed"
 *                  message:
 *                    type: string
 *                    example: "Unauthorized"
 *        409:
 *          description: Conflict, admin with the provided email does not exist.
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  status:
 *                    type: string
 *                    example: "Failed"
 *                  message:
 *                    type: string
 *                    example: "Conflict"
 *        500:
 *          description: Internal server error.
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  status:
 *                    type: string
 *                    example: "Failed"
 *                  message:
 *                    type: string
 *                    example: "Internal Server Error"
 */

router.post("/login-admin", controllers.AdminLogin);

/**
 * Update Schedule
 * Path: /api/v1/updateSchedule
 * Permission: Doctor
 */

/**
 * @swagger
 * paths:
 *  /api/v1/updateSchedule:
 *    post:
 *      summary: Update Doctor's Schedule
 *      description: Allows an authenticated doctor to update their schedule.
 *      security:
 *        - BearerAuth: []
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                schedules:
 *                  type: array
 *                  description: List of the doctor's updated schedule times.
 *                  items:
 *                    type: string
 *                    format: date-time
 *                    example: "2025-04-01T09:00:00Z"
 *      responses:
 *        200:
 *          description: Schedule updated successfully.
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  status:
 *                    type: string
 *                    example: "Success"
 *                  message:
 *                    type: string
 *                    example: "Schedule updated successfully"
 *                  data:
 *                    $ref: '#/components/schemas/Schedule'
 *        400:
 *          description: Schedule data is required.
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  status:
 *                    type: string
 *                    example: "Failed"
 *                  message:
 *                    type: string
 *                    example: "Schedule data is required"
 *        401:
 *          description: Doctor ID not found in request.
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  status:
 *                    type: string
 *                    example: "Failed"
 *                  message:
 *                    type: string
 *                    example: "Doctor ID not found in request"
 *        404:
 *          description: Failed to update schedule.
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  status:
 *                    type: string
 *                    example: "Failed"
 *                  message:
 *                    type: string
 *                    example: "Failed to update schedule"
 *        500:
 *          description: Error updating schedule.
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  status:
 *                    type: string
 *                    example: "Failed"
 *                  message:
 *                    type: string
 *                    example: "Error updating schedule"
 *                  error:
 *                    type: string
 *                    example: "Database error message"
 * components:
 *   schemas:
 *     Schedule:
 *       type: object
 *       properties:
 *         doctorId:
 *           type: string
 *           description: The ID of the doctor.
 *           example: "60b8d8c0d7b9a93449b1536d"
 *         schedules:
 *           type: array
 *           description: List of scheduled times.
 *           items:
 *             type: string
 *             format: date-time
 *             example: "2025-04-01T09:00:00Z"
 *         lastUpdated:
 *           type: string
 *           format: date-time
 *           description: The date when the schedule was last updated.
 *           example: "2025-04-01T08:00:00Z"
 */

router.post(
  "/updateSchedule",
  Middlewares.DoctorAuth,
  controllers.UpdateDoctorSchedule
);

/**
 * Get all Schedules
 * Path: /api/v1/getSchedule
 * Permission: Doctor
 */

/**
 * @swagger
 * paths:
 *  /api/v1/getSchedule/{id}:
 *    get:
 *      summary: Get Doctor's Schedule
 *      description: Fetches the available schedule for a specified doctor on a given date.
 *      tags:
 *        - Doctor
 *      security:
 *        - BearerAuth: []
 *      parameters:
 *        - name: id
 *          in: path
 *          required: true
 *          description: The ID of the doctor.
 *          schema:
 *            type: string
 *            example: "60b8d8c0d7b9a93449b1536d"
 *        - name: date
 *          in: query
 *          required: true
 *          description: The date for which the schedule is being requested (format: YYYY-MM-DD).
 *          schema:
 *            type: string
 *            example: "2025-04-01"
 *      responses:
 *        200:
 *          description: Successfully fetched the schedule.
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  status:
 *                    type: string
 *                    example: "Success"
 *                  message:
 *                    type: string
 *                    example: "Schedule fetched successfully."
 *                  data:
 *                    type: object
 *                    properties:
 *                      schedules:
 *                        type: array
 *                        description: A list of available slots for the specified date.
 *                        items:
 *                          type: string
 *                          example: "2025-04-01T09:00:00Z"
 *        400:
 *          description: Doctor ID and date are required.
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  status:
 *                    type: string
 *                    example: "Failed"
 *                  message:
 *                    type: string
 *                    example: "Doctor ID and date are required."
 *        404:
 *          description: No schedule found for the specified doctor.
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  status:
 *                    type: string
 *                    example: "Success"
 *                  message:
 *                    type: string
 *                    example: "No schedule found for the specified doctor."
 *                  data:
 *                    type: object
 *                    properties:
 *                      schedules:
 *                        type: array
 *                        description: An empty array as no schedule is found.
 *                        items:
 *                          type: string
 *                          example: []
 *        500:
 *          description: Error fetching schedule.
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  status:
 *                    type: string
 *                    example: "Failed"
 *                  message:
 *                    type: string
 *                    example: "Error fetching schedule."
 */

router.get(
  "/getSchedule/:id",
  // (req, res, next) => {
  //   console.log("Route: /api/v1/getSchedule - Request received");
  //   next();
  // },
  Middlewares.DoctorAuth,
  controllers.GetDoctorSchedule
);

/**
 * Update Doctor's Dets
 * Path: /api/v1/updateDetails
 * Permission: Doctor
 */
router.post(
  "/updateDetails",
  Middlewares.DoctorAuth, // Protected for Doctors
  controllers.UpdateDoctorDetails
);

/**
 * Get all Doctors
 * Path: /api/v1/doctors
 * Body: isVerified: true or false
 * Permission: User
 */
// router.get('/doctors', Middlewares.UserAuth, controllers.GetAllDoctors);
router.get("/doctors", controllers.GetAllDoctors); // For testing

//logout for doctor route
router.post("/logout-doctor", Middlewares.DoctorAuth, controllers.DoctorLogout);

//video call 
router.post(
  "/video-call/request",
  Middlewares.DoctorAuth,
  controllers.VideoCallRequest
);

router.post("/update-doctor-status", controllers.UpdateDoctorStatus)

/**
 * Get all doctors by spec
 * Path: /api/v1/doctors/specality
 * Body: specality and isVerified: true or false
 * Permission: User
 */
router.get("/doctors/specality", controllers.GetAllDoctorsBySpec); // For testing
// router.get('/doctors/specality', Middlewares.UserAuth('usertoken'), controllers.GetAllDoctorsBySpec);

/**
 * Get Doctor by id
 * Path: /api/v1/doctors/:id
 * Body: N/A
 * Permission: All
 */
router.get("/doctors/:id", controllers.GetDoctorById);

/**
 * Book an appointment
 * Path: /api/v1/appoint/book
 * Permission: User
 */
router.post("/appoint/book", controllers.BookAppointment);

/**
 * Get all users
 * Path: /api/v1/users
 * Body: userid if get user by id
 * Permission: Admin
 */
router.get("/users", controllers.GetAllUsers);

/**
 * Get User By Id
 * Path: /api/v1/users/:id
 * Permission: All
 */
router.get("/users/:id", controllers.GetUserById);

/**
 * Delete doctor by id
 * Path: /api/v1/doctor
 * Body: doctorid
 * Permission: Admin
 */
router.delete("/doctor", controllers.DeleteDoctorById); // For testing

/**
 * Delete user by id
 * Path: /api/v1/user
 * Body: userid
 * Permission: Admin
 */
router.delete("/user", Middlewares.AdminAuth, controllers.DeleteUserById); // For testing

/**
 * Verify doctors
 * Path: /api/v1/verifyDoctor
 * Body: doctorid
 * Permission: Admin
 */
router.post("/verifyDoctor", Middlewares.AdminAuth, controllers.VerifyDoctor);

/**
 * Get Nearby Doctors
 * path: /api/v1/nearby-doctors
 * Permission: All
 */
router.get("/nearby-doctors", getNearbyDoctors);

/**
 * Upload Medical Certificate
 * Path: /api/v1/upload-medical-certificate
 * Permission: User
 */
router.post(
  "/upload-medical-certificate",
  Middlewares.UploadFile.upload("files", 5), // Call upload function properly
  controllers.UploadMedicalCertificate
);

export default router;