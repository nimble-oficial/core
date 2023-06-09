export const getBaseSuccessResponse = () => ({
  ok: true,
  error: null,
  message: null,
});

export const getBaseErrorResponse = (message: string | Error) => ({
  ok: false,
  error: true,
  message,
  data: null,
});
