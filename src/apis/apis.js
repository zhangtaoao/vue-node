import require from '../router/axios'

export const login = () => {
  return require('/api/login', 'GET')
};
export const upload = (parmas) => {
  return require('/api/upload', 'POST', parmas);
}
export const getFile = () => {
  return require('/api/getFile', 'GET')
};
export const deleteFile = (parmas) => {
  return require('/api/deleteFile', 'POST', parmas)
};
export const genVerifyCode = () => {
  return require('/api/genVerifyCode', 'GET')
};