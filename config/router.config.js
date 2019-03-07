export default [
  // home
  {
    path: '/home',
    component: './Home',
  },
  // user
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      { path: '/user', redirect: '/user/login' },
      { path: '/user/login', name: 'login', component: './User/Login' },
      { path: '/user/register', name: 'register', component: './User/Register' },
      {
        path: '/user/register-result',
        name: 'register.result',
        component: './User/RegisterResult',
      },
    ],
  },
  // app
  {
    path: '/',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],
    routes: [
      // dashboard
      { path: '/', redirect: '/home' },
      // { path: '/dashboard', redirect: '/dashboard/analysis' },
      {
        path: '/dashboard',
        name: 'dashboard',
        icon: 'dashboard',
        component: './Dashboard/Analysis',
      },
      // Quản lý chatbot
      {
        path: '/chatbots',
        name: 'Quản lý chatbot',
        icon: 'form',
        component: './Chatbots/Chatbots',
      },
      // create
      {
        path: '/create/',
        name: 'Tạo chatbot mới',
        icon: 'plus',
        routes: [
          {
            path: '/create/info',
            name: 'Thông tin cơ bản',
            component: './Chatbots/Info',
          },
          {
            path: '/create/defaultQuestion',
            name: 'Nhập câu trả lời mặc định',
            component: './Chatbots/DefaultQuestion',
          },
        ],
      },
      {
        path: '/inputQA',
        name: 'Nhập dữ liệu cá nhân',
        icon: 'reconciliation',
        component: './Chatbots/CustomQuestion',
      },
      {
        name: 'Tài khoản',
        icon: 'user',
        path: '/account',
        routes: [
          {
            path: '/account/center',
            name: 'Trang cá nhân',
            component: './Account/Center/Center',
            routes: [
              {
                path: '/account/center',
                redirect: '/account/center/articles',
              },
              {
                path: '/account/center/articles',
                component: './Account/Center/Articles',
              },
              {
                path: '/account/center/applications',
                component: './Account/Center/Applications',
              },
              {
                path: '/account/center/projects',
                component: './Account/Center/Projects',
              },
            ],
          },
          {
            path: '/account/settings',
            name: 'Cài đặt',
            component: './Account/Settings/Info',
            routes: [
              {
                path: '/account/settings',
                redirect: '/account/settings/base',
              },
              {
                path: '/account/settings/base',
                component: './Account/Settings/BaseView',
              },
              {
                path: '/account/settings/security',
                component: './Account/Settings/SecurityView',
              },
              {
                path: '/account/settings/binding',
                component: './Account/Settings/BindingView',
              },
              {
                path: '/account/settings/notification',
                component: './Account/Settings/NotificationView',
              },
            ],
          },
        ],
      },
      {
        component: '404',
      },
    ],
  },
];
