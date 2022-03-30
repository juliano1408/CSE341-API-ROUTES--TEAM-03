const express = require('express');
const { body } = require('express-validator');

const User = require('../models/user');
const authController = require('../controllers/auth');

const router = express.Router();


/**
* @swagger
*  components:
*      schemas:
*          User:
*              type: object
*              properties:
*                  email:
*                      type: string
*                  password:
*                      type: string
*                  name:
*                      type: string
*/



/**
* @swagger
* /signup:
*  put:
*      summary: creates a new user
*      description: New users can signup for an account in order to have quotes in the system
*      requestBody:
*          required: true
*          content:
*              application/json:
*                  schema:
*                      $ref: '#components/schemas/User'
*      responses:
*          200:
*              description: User Create Successfully
*
*/
router.put(
  '/signup',
  [
    body('email')
      .isEmail()
      .withMessage('Please enter a valid email.')
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then(userDoc => {
          if (userDoc) {
            return Promise.reject('E-Mail address already exists!');
          }
        });
      })
      .normalizeEmail(),
    body('password')
      .trim()
      .isLength({ min: 5 }),
    body('name')
      .trim()
      .not()
      .isEmpty()
  ],
  authController.signup
);


/**
* @swagger
* /auth:
*  post:
*      summary: User Login
*      description: Existent users can log in and acquire a Token for the API use
*      requestBody:
*          required: true
*          content:
*              application/json:
*                  schema:
*                      $ref: '#components/schemas/User'
*      responses:
*          200:
*              description: OK
*/
router.post('/auth', authController.login);

module.exports = router;
