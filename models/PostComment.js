const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const UserPost = require('./UserPost');
const UserComment = require('./UserComment');


class PostComment extends Model { }

PostComment.init(
    {
        postcomment_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        post_id: {
            type: DataTypes.INTEGER,
            references: {
                model: UserPost,
                key: 'post_id',
            },
        },
        comment_id: {
            type: DataTypes.INTEGER,
            references: {
                model: UserComment,
                key: 'comment_id',
            },
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'post_comment',
    }
);

module.exports = PostComment;
