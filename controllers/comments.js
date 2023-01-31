import * as commentService from '../services/comments.js';

export const getAllComments = async(req, res) => {
  const comments = await commentService.getAllComments();
  res.send(comments);
}

export const getSelectedComments = async(req, res) => {
  const {parentid} = req.params
  const comments = await commentService.getSelectedComments(parentid)
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