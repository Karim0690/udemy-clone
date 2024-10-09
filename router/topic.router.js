
import express from "express";
import * as topicController from '../controller/topic.controller.js';
import { createTopicSchema, updateTopicSchema } from '../validation/topic.schema.js';
import { validation } from "../middleware/validation.js";

const topicRouter = express.Router();

topicRouter
    .route("/")
    .post(validation(createTopicSchema),
    topicController.createTopic)
    .get(topicController.getAllTopics)
topicRouter
    .route("/:id")
    .get(topicController.getTopic)
    .put(validation(updateTopicSchema),
    topicController.updateTopic)
    .delete(topicController.deleteTopic)

export default topicRouter;
