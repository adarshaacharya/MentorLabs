import { message, notification } from 'antd';

/**
 * display success message
 *
 * @param message
 * @param description
 */
export function displaySuccessNotification(message: string, description?: string) {
  return notification['success']({
    message,
    description,
    placement: 'topLeft',
    style: {
      marginTop: 50,
    },
  });
}

/**
 * displays error toast
 */
export const displayErrorMessage = (error: string) => {
  return message.error(error);
};
