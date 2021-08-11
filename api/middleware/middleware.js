
const {getById} = require('../users/users-model');

function logger(req, res, next) {

  const {method, url} = req;
  const timestamp = Date.now().toLocaleString();

  console.log(`Request Method: ${method}`);
  console.log(`Request Url: ${url}`);
  console.log(`Timestamp: `);

  next();
}

async function validateUserId(req, res, next) {

  const {id} = req.params;

  try {
    const user = await getById(id);
    if (!user) throw user;
    req.user = user;
    next();
  } catch(err) {
    res.status(404).json({message: 'user not found'});
  }
}

function validateUser(req, res, next) {
  const newUser = req.body;
  if (!newUser.name) res.status(400).json({message: 'missing required text field'});
  next();
}

function validatePost(req, res, next) {
  const newUser = req.body;
  if (!newUser.text) res.status(400).json({message: `missing required text field`});
}

// do not forget to expose these functions to other modules
module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost
}