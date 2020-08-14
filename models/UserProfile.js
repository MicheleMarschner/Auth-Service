const mongoose = require('mongoose');
const geocoder = require('../utils/geocoder');

const UserProfileSchema = new mongoose.Schema({
    _id: { type: String },
    //user_id?? or foreign key with auth_id
    created_at: {
        //??from UserSchema
        type: Date,
        default: Date.now
    },
    name: {
        first: {
            type: String,
            required: [true, 'Please add a first_name']
        },
        last: {
            type: String,
            required: [true, 'Please add a last_name']
        }
    },
    phone: {
        type: Number,
        required: [true, 'Please add a phone']
        //?? phone
       /* match: [, 'Please add a valid phone number']*/
    },
    address: {
        type: String,
        required: [true, 'Please add a name']
    },
    location: {
        // GeoJSON Point
        type: {
          type: String,
          enum: ['Point']
        },
        coordinates: {
          type: [Number],
          index: '2dsphere'
        },
        formattedAddress: String,
        street: String,
        city: String,
        state: String,
        zipcode: String,
        country: String
    },
    //??"dob": new Date(“<YYYY-mm-dd>”),
    dob: {
        type: Date,
        default: Date.now
    },
    short_profile: String,
    profile_picture: {
        type: String,
        required: [true, 'Please add a name']
    },
    category: {
        type: Array,
        //enum: []
    },
    //is it a user profile thing?
    friend_list: Array,
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    status: {
        type: String,
        enum: ['active', 'not_verified', 'achieved']
    },
    last_login: {
        type: Date,
        default: Date.now
    }
});



// Geocode & create location field
UserProfileSchema.pre('save', async function(next) {
    const loc = await geocoder.geocode(this.address);
    this.location = {
      type: 'Point',
      coordinates: [loc[0].longitude, loc[0].latitude],
      formattedAddress: loc[0].formattedAddress,
      street: loc[0].streetName,
      city: loc[0].city,
      state: loc[0].stateCode,
      zipcode: loc[0].zipcode,
      country: loc[0].countryCode
    };
  
    //?? do we need the address?
    // Do not save address in DB
    this.address = undefined;
    next();
});

/*
UserProfileSchema.virtual('full_name').get(function() {
return this.first_name + ' ' + this.last_name
})

StorySchema.virtual('full_name').set(function(name) {
let str = name.split(' ')

this.firstName = str[0]
this.lastName = str[1]
})
*/

module.exports = mongoose.model('UserProfile', UserProfileSchema);