// const errorMiddleware = (err, req, res, next) => {
//   try {
//     let error = { ...err };

//     error.message = err.message;

//     console.error(error);

//     // mongoose bag objectId
//     if (err.name === "CastError") {
//       const message = "Resource not found";
//       error = new Error(message);
//       error.statusCode = 404;
//       throw error;
//     }

//     // mongoose duplicate key
//     if (err.code === 11000) {
//       const message = "Duplicate field value entered";
//       error = new Error(message);
//       error.statusCode = 400;
//       throw error;
//     }

//     // mongoose validation error
//     if (err.name === "ValidationError") {
//       const message = Object.values(err.errors).map((val) => val.message);
//       error = new Error(message.join(", "));
//       error.statusCode = 400;
//       throw error;
//     }

//     res
//       .status(error.statusCode || 500)
//       .json({ success: false, message: error.message || "Server error" });
//   } catch (error) {
//     next(error);
//   }
// };

const errorMiddleware = (err, req, res, next) => {
  console.error(err);

  let statusCode = err.statusCode || 500;
  let message = err.message || "Server Error";

  if (err.name === "CastError") {
    statusCode = 404;
    message = "Resource not found";
  }

  if (err.code === 11000) {
    statusCode = 400;
    message = "Duplicate field value entered";
  }

  if (err.name === "ValidationError") {
    message = Object.values(err.errors)
      .map((val) => val.message)
      .join(", ");
    statusCode = 400;
  }

  res.status(statusCode).json({
    success: false,
    message,
  });
};

export default errorMiddleware;
