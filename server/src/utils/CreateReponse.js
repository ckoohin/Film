export const CreateRes = (res, message = "Thành công", data = {}) => {
  return res.json({ status: "success", message, data });
};
