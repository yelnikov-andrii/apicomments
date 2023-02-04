import * as commentService from '../services/comments.js';

export const getAllComments = async(req, res) => {
  const comments = await commentService.getAllComments();
  if (!comments) {
    res.sendStatus(404);
    return;
  }

  res.send(comments);
}

export const getSelectedComments = async(req, res) => {
  const {parentid} = req.params
  const comments = await commentService.getSelectedComments(parentid);

  if (!comments) {
    res.sendStatus(404);
    return;
  }

  res.send(comments);
};

export const addComment = async (req, res) => {
  const comment = req.body;

  if (comment) {
    await commentService.addComment(comment);
    res.send(comment);
  } else {
    res.sendStatus(422)
  }
};