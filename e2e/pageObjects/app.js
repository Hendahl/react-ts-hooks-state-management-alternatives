import { root } from "./index";

const introSelector = ".MuiTypography-root.MuiTypography-h3";
const linkSelector = ".MuiBox-root.MuiBox-root-173>h3 a";

export const getIntroText = async () => {
  const app = await root();
  return await app.$eval(introSelector, (el) => el.innerText);
};

export const getLinkText = async () => {
  const app = await root();
  return await app.$eval(linkSelector, (el) => el.innerText);
};
