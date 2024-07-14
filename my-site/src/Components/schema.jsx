import * as yup from "https://cdn.jsdelivr.net/npm/yup@1/+esm";
const nameReg = /^[a-zA-Zа-яА-Я'][a-zA-Zа-яА-Я-' ]+[a-zA-Zа-яА-Я']?$/;
const EMAIL_REGEXP =
  /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
export const schema = () => {
  const yupSchema = yup.object().shape({
    name: yup.string().matches(nameReg, "Некорректное имя!"),
    email: yup.string().matches(EMAIL_REGEXP, "Некорректный формат почты!"),
  });
  return yupSchema;
};
