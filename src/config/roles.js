const roles = ['customer', 'vendor', 'admin'];

const roleRights = new Map();

const getPermissionList = [
  'getUser', 'getUsers',
  'getState', 'getStates',
  'getCity', 'getCitys', 'getCityByState',
  'getVehicle', 'getVehicles',
  'getWorkshop', 'getWorkshops',
  'getService', 'getServices',
];

const customerPermissionList = [];
const vendorManagePermissionList = ['manageVehicles', 'manageServices'];
const adminManagePermissionList = ['manageUsers', 'manageState', 'manageCity', 'manageWorkshops'];

roleRights.set(roles[0], customerPermissionList.concat(getPermissionList));
roleRights.set(roles[1], vendorManagePermissionList.concat(getPermissionList, customerPermissionList));
roleRights.set(roles[2], adminManagePermissionList.concat(getPermissionList, customerPermissionList, vendorManagePermissionList));

module.exports = {
  roles,
  roleRights,
};