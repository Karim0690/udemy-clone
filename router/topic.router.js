import express from "express";
import * as topicController from "../controller/topic.controller.js";
import {
  createTopicSchema,
  updateTopicSchema,
} from "../validation/topic.schema.js";
import { validation } from "../middleware/validation.js";
import {
  protectedRoutes,
  restrictedTo,
} from "../middleware/authourtization.js";

const topicRouter = express.Router();

topicRouter
  .route("/")
  .post(
    protectedRoutes,
    restrictedTo("admin"),
    validation(createTopicSchema),
    topicController.createTopic
  )
  .get(topicController.getAllTopics);
topicRouter
  .route("/:id")
  .get(topicController.getTopic)
  .put(validation(updateTopicSchema), topicController.updateTopic)
  .delete(topicController.deleteTopic);

topicRouter.route("/searchTopic").post(topicController.getTopics);

export default topicRouter;
