import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Motor',
    icon: 'shopping-cart-outline',
    link: '/pages/motor',
    home: true,
    children: [
      {
        title: 'Monitor',
        link: '/pages/motor/monitor',
      },
      {
        title: 'Pid',
        link: '/pages/motor/pid',
      },
    ],
  },
  {
    title: 'Auth',
    icon: 'lock-outline',
    children: [
      {
        title: 'Login',
        link: '/auth/login',
      },
      {
        title: 'Register',
        link: '/auth/register',
      },
      {
        title: 'Request Password',
        link: '/auth/request-password',
      },
      {
        title: 'Reset Password',
        link: '/auth/reset-password',
      },
    ],
  },
];
