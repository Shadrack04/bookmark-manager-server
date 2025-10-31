export const success = (res, data, code = 200) => {
  return res.status(code).json({
    success: true,

    data,
  });
};

export const fail = (res, message, code = 400) => {
  return res.status(code).json({
    success: false,
    message,
  });
};
