const Vehicle = require('../models/vehicle')
const User = require('../models/user');
const uuid = require('uuid');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { hash } = require('bcrypt');
const jwt = require('jsonwebtoken');
exports.postVehicleData = (req, res, next) => {
    const { name, price, description } = req.body;
    const vehicle = new Vehicle({
        _id: new mongoose.Types.ObjectId,
        name: name,
        price: price,
        description: description,
        uniqueId: uuid(),
    })

    vehicle.save()
        .then(result => {
            res.status(200).json({
                newVehicle: result
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        })
}

exports.getVehicleData = (req, res, next) => {
    Vehicle.find()
        .then(result => {
            res.status(200).json({
                vehicleData: result
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        })
}

exports.getVehicleByID = (req, res, next) => {
    Vehicle.findById(req.params.id)
        .then(result => {
            res.status(200).json({
                vehicleData: result
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        })
}

exports.deleteVehicle = (req, res, next) => {
    Vehicle.remove({
        _id: req.params._id
    })
        .then(result => {
            res.status(200).json({
                message: 'Product Deleted',
                result: result
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        })
}

exports.updateVehicle = (req, res, next) => {
    const { name, price, description } = req.body;
    Vehicle.findOneAndUpdate(
        {
            _id: req.params._id
        },
        {
            $set: {
                name: name,
                price: price,
                description: description
            }
        }
    )
        .then(result => {
            res.status(200).json({
                updated_product: result
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        })
}

exports.userSignup = (req, res, next) => {
    const { userName, phone, email, userType } = req.body;
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
            return res.status(500).json({
                error: err
            })
        } else {
            const user = new User({
                _id: new mongoose.Types.ObjectId,
                userName: userName,
                password: hash,
                phone: phone,
                email: email,
                userType: userType
            })

            user.save().then(result => {
                res.status(200).json({
                    new_user: result
                })
            })
                .catch(err => {
                    console.log(err)
                    res.status(500).json({
                        error: err
                    })
                })

        }
    })
}

exports.userLogin = (req, res, next) => {
    const { userName, password } = req.body;
    User.find({ userName: userName })
        .exec()
        .then(user => {
            if (user.length < 1) {
                return res.status(401).json({
                    message: 'User not exist',
                })
            }
            bcrypt.compare(password, user[0].password, (err, result) => {
                if (!result) {
                    res.status(401).json({
                        message: 'Password Matching Fail'
                    })
                }
                if (result) {
                    const token = jwt.sign({
                        userName: user[0].userName,
                        userType: user[0].userType,
                        email: user[0].email,
                        phone: user[0].phone,
                    },
                        'this is dummy text',
                        {
                            expiresIn: "24h"
                        }
                    );
                    res.status(200).json({
                        userName: user[0].userName,
                        userType: user[0].userType,
                        email: user[0].email,
                        phone: user[0].phone,
                        token: token
                    })
                }
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        })
}