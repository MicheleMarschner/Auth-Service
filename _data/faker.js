//lodash & faker & moment & json-server
const faker = require('faker');
const { fake } = require('faker');
const _ = require("lodash");
const moment = require('moment');
const fs = require('fs');
const path = require('path');

const users = [];
const userProfiles = [];
const stories = [];

const userProfile_status_list = ['active', 'not_verified', 'achieved'];
const userProfile_category_list = ['Sport', 'Cooking', 'Social', 'Sewing', 'Hiking', 'Eating', 'Holiday'];
const userProfile_role_list = ['admin', 'user'];
const story_status_list = ['draft', 'published', 'achieved'];

function generateUserData() {

    for (let i = 0; i < 10; i++) {
        
        let newUser = 
        {
            "_id": faker.random.uuid(),
            "name": faker.name.findName(),
            "email": faker.internet.email(),
            "password": faker.internet.password(),
            "created_at": faker.date.between('2010-01-01', '2020-01-05')
        }
        
        users.push(newUser);
    }
}


function generateUserProfileData() {

    for (let i = 0; i < 10; i++) {
        
    let newUserProfile = 
    {
    "_id": faker.random.uuid(),
    "auth_id": users[i]._id,
        "created_at": users[i].created_at,
        "name": {
            "first": faker.name.firstName(),
            "last": faker.name.lastName()
        },
        "phone": faker.phone.phoneNumber('01#########'),
        "address": faker.fake("{{address.streetAddress}}, {{address.city}}, {{address.countryCode}}, {{address.zipCode}}"),
        //faker.helpers.contextualCard().address,
        "dob": moment(faker.date.past()).format('L'),
        "short_profile": faker.lorem.words(200),
        "profile_picture": faker.image.avatar(),
        "category": _.sampleSize(userProfile_category_list, (Math.floor(Math.random() * userProfile_category_list.length+1))).map(
            category => category),
        "friend_list": [],
        "role": _.sample(userProfile_role_list),
        "status": _.sample(userProfile_status_list),
        "last_login": faker.date.between('2010-01-01', '2020-01-05')
        }

        userProfiles.push(newUserProfile);
    }
}

function generateStoryData() {

    for (let i = 0; i < 10; i++) {
        let randomUser = _.sample(userProfiles);
        
        let newStory = 
        {
            "_id": faker.random.uuid(),
            "title": faker.lorem.words(7),
        /*  "slug": faker.slug(), */
            "url": faker.internet.url(),
            "body": faker.lorem.words(200),
            "author_id": randomUser._id,
            "author_name": randomUser.name,
            "created_at": faker.date.between('2010-01-01', '2020-01-05'),
            "published_at": faker.date.recent(),
            "status": _.sample(story_status_list),
            "likes": _.sampleSize(userProfiles, (Math.floor(Math.random() * userProfiles.length+1))).map(
                userProfile => userProfile._id),
            "comments": _.sampleSize(userProfiles, (Math.floor(Math.random() * userProfiles.length+1))).map(
                userProfile => ({
                    "author_id": randomUser._id,
                    "author_name": randomUser.name,
                    "profile_picture": randomUser.profile_picture,
                    "created_at": faker.date.past(),
                    "text": faker.lorem.words(7),
                    "active": faker.random.boolean()
                    //?? what happens to replies??
                }
            )),
            "category": _.sampleSize(userProfile_category_list, (Math.floor(Math.random() * userProfile_category_list.length+1))).map(
                category => category),
            "media": faker.image.image()
        }

        stories.push(newStory);
    }

}

function addFriendList() {
    userProfiles.forEach(userProfile => {
        userProfile.friend_list = _.sampleSize(userProfiles, (Math.floor(Math.random() * userProfiles.length+1))).map(
            userProfile => userProfile._id);
    });


}

generateUserData();
generateUserProfileData();
generateStoryData();
addFriendList();

fs.writeFileSync(path.join(__dirname,'users.json'), JSON.stringify(users, null, '\t'));
fs.writeFileSync(path.join(__dirname,'userProfiles.json'), JSON.stringify(userProfiles, null, '\t'));
fs.writeFileSync(path.join(__dirname,'stories.json'), JSON.stringify(stories, null, '\t'));

