import {User} from '../models/user.js';
import { nanoid } from 'nanoid';

const signup = async (req, res) => {
    console.log('signup fun');
    // Check if user already exists, then cannot signup
    
    await User.findOne({
        email: req.body.email
    }).exec(function (err, user) {
        console.log('till here');
        if(user) {
            return res.status(400).json({
                error: 'Email is taken'
            })
        }

        const { name, email, password } = req.body;
        // Random id generator. By default 21 characters long. If you need another length specify it in parameter
        let username = nanoid();
        let profile = `${process.env.CLIENT_URL}/profile/${username}`;

        let newUser = new User({
            name,
            email,
            password,
            profile,
            username,
        });

        newUser.save((err, success) => {
            if(err) {
                return res.status(400).json(
                    {
                        error: err
                    }
                )
            }
            res.json({
                user: success
            })
            // res.json({
            //     message: 'Signup success! Please signin'
            // });
        });
    });
}

export {
    signup
}