import { checkErrorInterface, type IErrorResponse } from "~/types"
import Swal from "sweetalert2";

const TOKEN_INVALID_LIST = [
  'jwt expired',
  'TOKEN_NOT_FOUND',
  'INVALID_TOKEN',
  'TOKEN_EXPIRED'
]

export default async (error: IErrorResponse | any) => {
  if (checkErrorInterface(error)) {
    if (TOKEN_INVALID_LIST.includes(error.errorCode)) {
      await Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Your session has expired. Please login again.',
        animation: false,
        timer: 1500,
      });
      navigateTo('/login');
    }
    return Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: error.message,
      animation: false,
      timer: 1500,
    });
  }
  return Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: 'Something went wrong. Please try again later.',
    animation: false,
    timer: 1500,
  });
}