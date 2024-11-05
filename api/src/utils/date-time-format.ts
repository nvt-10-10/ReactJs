import * as moment from 'moment';

export const getFromNow = (dateTime) => {
  if (!dateTime) return '';
  return moment(dateTime).fromNow();
};

export const formatDate = (dateTime, format = 'DD/MM/YYYY') => {
  if (!dateTime) return '';
  return moment(dateTime).format(format);
};

export const getCurrentYear = () => {
  return moment().year();
};

export const getCurrentMonth = () => {
  return moment().month() + 1;
};
