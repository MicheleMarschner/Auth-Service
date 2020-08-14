const mongoose = require('mongoose');
const slugify = require('slugify');

const StorySchema = new mongoose.Schema({
    _id: { type: String },
    //story_id?? to overwrite just id?
    title: {
        type: String,
        required: [true, 'Please add a title'],
        minlength: 8,
        maxlength: 100
    },
    slug: String,
    //needed??
    url: {
        type: String,
    },
    body: {
        type: String,
        required: [true, 'Please add a text'],
        minlength: 10
    },
    author_id: {
        type: mongoose.Schema.ObjectId,
        ref: 'UserProfile',
        required: true
    },
    author_name: {
        type: mongoose.Schema.name,
        ref: 'UserProfile',
        required: [true, 'Please add a name']
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    published_at: {
        type: Date,
    },
    status: {
        type: String,
        enum: [draft, published, achieved]
    },
    like_count: Number,
    //?? or reactions? or separate?
    likes: [{
            user_id: { type: mongoose.Schema.ObjectId, ref: 'UserProfile'},
            active: false
        }],
    comment_count: Number,
    comments: [{
        author_id: {
            type: mongoose.Schema.ObjectId,
            ref: 'UserProfile',
            required: true
        },
        author_name: {
            type: mongoose.Schema.name,
            ref: 'UserProfile',
            required: [true, 'Please add a name']
        },
        profile_picture: {
            type: mongoose.Schema.profile_picture,
            ref: 'UserProfile'
        },
        created_at: {
            type: Date,
            default: Date.now
        },
        text: {
            type: String,
            required: true,
        },
        active: {
            type: Boolean,
            default: true
        }
        //?? what happens to replies??
    }],
    category: {
        type: Array,
        enum: []
    },
    //??or image?? where stored??
    media: {
        type: Date,
        default: Date.now
    }
});

// Create Story slug from the name
StorySchema.pre('save', function(next) {
    this.slug = slugify(this.name, { lower: true });
    next();
});

// Static method to get likes count and save
StorySchema.statics.countLikes = async function() {
    const obj = await this.aggregate(
        { $unwind: '$likes' },
        { $count : 'total_documents' }
        
        
      /*{
        $group: {
          'likes._id': '$likes',
         count: { $count: "likes" } 
        }
      }*/
    )};

StorySchema.statics.countComments = async function() {
    const obj = await this.aggregate([
      {
        $match: 'likes'
      },
      {
        $group: {_id: null, like_count: { $sum: 1 } /* or sum??*/
        }
      }]
    )};


//needed for likes o reactions???
// Prevent user from submitting more than one review per bootcamp
//ReviewSchema.index({ bootcamp: 1, user: 1 }, { unique: true });


module.exports = mongoose.model('Story', StorySchema);