const connection = require('./conn');

const getAll = async () => {
  const tasks = await connection.execute('SELECT * FROM tasks');
  return tasks[0];
};

const createTask = async (task) => {

try {

  const { title } = task;
  const dateUTC = new Date(Date.now());

  let query = 'INSERT INTO tasks (title, status, created_at) VALUES (?, ?, ?)';

  const createdTask = await connection.execute(query, [title, 'pendente', dateUTC]);

  const insertId = createdTask[0].insertId;

  return { insertId: insertId };

}
catch (error) {

  console.log(error);
  return error;
  
}

};

const deleteTask = async (taskId) => {

  let query = 'DELETE FROM tasks WHERE id = ?';

  const removedTask = await connection.execute(query, [taskId]);
  return removedTask;

};

const updateTask = async (taskId, task) => {

  const { title, status } = task;

  let query = 'UPDATE tasks SET title = ?, status = ? WHERE id = ?';

  const [updatedTask] = await connection.execute(query, [title, status, taskId]);
  return updatedTask;

};

module.exports = {
  getAll,
  createTask,
  deleteTask,
  updateTask
};