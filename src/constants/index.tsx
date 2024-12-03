type menuItem = {
  lable: string;
  path: string;
  icon: string;
  key: string;
};
export const menuList: menuItem[] = [
  {
    lable: "Home",
    path: "/",
    icon: "home",
    key: "home",
  },
  {
    lable: "About",
    path: "/about",
    icon: "user",
    key: "about",
  },
  {
    lable: "Contact",
    path: "/contact",
    icon: "phone",
    key: "contact",
  },
];
