const { schema, model, ObjectId } = require('../config/config');
const userSchema = new schema(
    {
        useraddress: {
            type: String,
            required: true
        },
        userStatus: {
            // 0: false, 1: true
            type: Number,
            required: true
        }, 
        createdBy: {
            type: String,
            default: Date.now
        },
        updatedBy: {
            type: String
        }
    }, {
        collection: 'users',
        timestamps: true
    });
module.exports = User = model('users', userSchema)