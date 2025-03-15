import express from "express";
import { StatusCodes } from "http-status-codes";
const router = express.Router();
import controllers from "../../controllers/index.controllers.js";
import upload from "../../middlewares/multer.middleware.js";
import Middlewares from "../../middlewares/index.middleware.js";

/**
 * Check health...
 * path: /api/v1/health
 * Permission: All
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
 * Signup
 * path: /api/v1/signup
 * Permission: All
 */
router.post("/signup", upload.single("profileimage"), controllers.SignUp);

/**
 * Login
 * path: /api/v1/login
 * Permission: All
 */
router.post("/login", controllers.Login);

/**
 * Logout
 * Path: /api/v1/logout
 * Permission: All
 */
router.get("/logout", (req, res) => {
  res.clearCookie().redirect("/");
});

/**
 * Update Schedule
 * Path: /api/v1/updateSchedule
 * Permission: Doctor
 */
router.post(
  "/updateSchedule",
  Middlewares.DoctorAuth("doctortoken"),
  controllers.UpdateDoctorSchedule
);

/**
 * Get all Schedules
 * Path: /api/v1/getSchedule
 * Permission: Doctor
 */
router.get(
  "/getSchedule",
  (req, res, next) => {
    console.log("Route: /api/v1/getSchedule - Request received");
    next();
  },
  Middlewares.DoctorAuth("doctortoken"),
  controllers.GetDoctorSchedule
);

/**
 * Update Doctor's Dets
 * Path: /api/v1/updateDetails
 * Permission: Doctor
 */
router.post(
  "/updateDetails",
  Middlewares.DoctorAuth("doctortoken"),
  controllers.UpdateDoctorDetails
);

/**
 * Get all Doctors
 * Path: /api/v1/doctors
 * Body: isVerified: true or false
 * Permission: User
 */
// router.get('/doctors', Middlewares.UserAuth('usertoken'), controllers.GetAllDoctors);
router.get('/doctors', controllers.GetAllDoctors); // For testing

/**
 * Get all doctors by spec
 * Path: /api/v1/doctors/specality
 * Body: specality and isVerified: true or false
 * Permission: User
 */
router.get('/doctors/specality', controllers.GetAllDoctorsBySpec); // For testing
// router.get('/doctors/specality', Middlewares.UserAuth('usertoken'), controllers.GetAllDoctorsBySpec);

/**
 * Book an appointment
 * Path: /api/v1/appoint/book
 * Permission: User
 */
router.post('/appoint/book', controllers.BookAppointment);

/**
 * Get all users
 * Path: /api/v1/users
 * Body: userid if get user by id
 * Permission: Admin
 */
router.get('/users', controllers.GetAllUsers);

/**
 * Delete doctor by id
 * Path: /api/v1/doctor
 * Body: doctorid
 * Permission: Admin
 */
router.delete('/doctor', controllers.DeleteDoctorById); // For testing

/**
 * Delete user by id
 * Path: /api/v1/user
 * Body: userid
 * Permission: Admin
 */
router.delete('/user', controllers.DeleteUserById); // For testing

export default router;