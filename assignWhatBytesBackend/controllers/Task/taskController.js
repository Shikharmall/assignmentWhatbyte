const User = require("../../models/User/userModel");
const Task = require("../../models/Task/taskModel");

const isSameDay = (d1, d2) =>
  d1.getFullYear() === d2.getFullYear() &&
  d1.getMonth() === d2.getMonth() &&
  d1.getDate() === d2.getDate();

const isTomorrow = (date) => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);
  return isSameDay(date, tomorrow);
};

const isThisWeek = (date) => {
  const now = new Date();
  const dayOfWeek = now.getDay(); // 0 (Sun) - 6 (Sat)

  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - dayOfWeek);
  startOfWeek.setHours(0, 0, 0, 0);

  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);
  endOfWeek.setHours(23, 59, 59, 999);

  return date >= startOfWeek && date <= endOfWeek;
};

const formatDate = (date) => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return `${date.getDate()} ${months[date.getMonth()]}`;
};

//add user's task to db

const addTask = async (req, res) => {
  try {
    const { title, description, dueDate, priority } = req.body;
    const userId = req.user.id;

    const userData = await User.findById({ _id: userId });

    if (userData) {
      // title, description, due date, and priority (low, medium, high)

      const taskData = new Task({
        userId: userId,
        title: title,
        description: description,
        dueDate: dueDate,
        priority: priority,
        status: "incomplete",
      });

      const taskDataSaved = await taskData.save();

      if (taskDataSaved) {
        return res.status(201).json({ status: "success", data: taskDataSaved });
      }
    }
  } catch (error) {
    res.status(500).json({ status: "failed", message: error.message });
  }
};

//fetch user's tasks

const getUserTasks = async (req, res) => {
  try {
    const userId = req.user.id;
    const { priority, status } = req.query;

    if (!userId) {
      return res
        .status(401)
        .json({ status: "failed", message: "Unauthorized" });
    }

    // Build query filter
    const filter = { userId };

    if (priority && priority !== "all") {
      filter.priority = priority.toLowerCase(); // e.g., "low", "medium", "high"
    }

    if (status && status !== "all") {
      filter.status = status.toLowerCase(); // e.g., "completed", "incomplete"
    }

    const tasks = await Task.find(filter).sort({ dueDate: 1 });

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const sections = {
      Today: [],
      Tomorrow: [],
      "This Week": [],
      Upcoming: [],
    };

    tasks.forEach((task) => {
      const dueDate = new Date(task.dueDate);
      const item = {
        id: task._id.toString(),
        text: task.title,
        time: formatDate(dueDate),
        priority:
          task.priority?.charAt(0).toUpperCase() + task.priority?.slice(1),
        status: task.status,
      };

      if (isSameDay(dueDate, today)) {
        sections.Today.push(item);
      } else if (isTomorrow(dueDate)) {
        sections.Tomorrow.push(item);
      } else if (isThisWeek(dueDate)) {
        sections["This Week"].push(item);
      } else {
        sections.Upcoming.push(item);
      }
    });

    const response = Object.entries(sections).map(([title, data], index) => ({
      id: (index + 1).toString(),
      title,
      data,
    }));

    return res.status(200).json({ status: "success", data: response });
  } catch (error) {
    res.status(500).json({ status: "failed", message: error.message });
  }
};

//fetch user's task by ID

const getUserTaskByID = async (req, res) => {
  try {
    const { taskId } = req.query;

    const taskData = await Task.findById(taskId);

    return res.status(200).json({ status: "success", data: taskData });
  } catch (error) {
    res.status(500).json({ status: "failed", message: error.message });
  }
};

//update task by ID

const updateTask = async (req, res) => {
  try {
    const { taskId } = req.query;
    const { title, description, priority, dueDate, status } = req.body;

    const taskData = await Task.updateOne(
      { _id: taskId },
      {
        $set: {
          title: title,
          description: description,
          dueDate: dueDate,
          priority: priority,
          status: status,
        },
      }
    );

    return res.status(200).json({ status: "success", data: taskData });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "failed", message: error.message });
  }
};

//delete task by ID

const deleteTask = async (req, res) => {
  try {
    const { taskId } = req.query;

    console.log(taskId);

    // const deletedData = await Task.deleteOne({ taskId });
    const deletedData = await Task.findByIdAndDelete(taskId);

    if (deletedData) {
      return res.status(201).json({ status: "success", data: deletedData });
    }
  } catch (error) {
    res.status(500).json({ status: "failed", message: error.message });
  }
};

module.exports = {
  addTask,
  getUserTasks,
  getUserTaskByID,
  updateTask,
  deleteTask,
};
