import { OpenWindows } from './constants';

const ErrorMessage = {
  INCORRECTPASSWORD: `Неверный пароль, попробуйте снова`,
  USERNOTFOUND: `Пользователь не найден`,
  USERFOUND: 'Такой пользователь уже существует',
};

export const setTypeError = (error) => {
  switch (error) {
    case ErrorMessage.INCORRECTPASSWORD:
      return { message: error, type: 'password' };
    case ErrorMessage.USERNOTFOUND || ErrorMessage.USERFOUND:
      return { message: error, type: 'email' };
    default:
      return { message: error, type: 'other' };
  }
};

export const setClassNameOnLogin = (openWindow) => {
  switch (openWindow) {
    case OpenWindows.AUTH:
      return 'login--auth';
    case OpenWindows.REGISTRATION:
      return 'login--registration';
    case OpenWindows.DASHBOARD:
      return 'login--dashboard';
    default:
      return '';
  }
};

export const checkForValidationEmail = (email) => {
  const reg = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;
  return reg.test(email);
};

export const projectStartDateAndWeek = (number = null) => {
  const start = new Date('2021-02-01'); // дата начала нового проекта (обязательно понедельник)
  let numberOfWeek = number;
  if (!numberOfWeek) {
    numberOfWeek = Math.ceil((new Date() - start) / (24 * 60 * 60 * 1000 * 7));
  }

  const startWeek = new Date(604800000 * numberOfWeek + Number(start));
  return { numberOfWeek, startWeek };
};

export const getPostsThisUser = (posts, user) => {
  const postsThisUser = posts.filter((post) => post.userId === user.userId);
  return postsThisUser;
};
