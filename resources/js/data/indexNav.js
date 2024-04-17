import department from "./enums/department";
import clearanceLevel from "./enums/clearanceLevel";
import { inventoryNavtems, inventoryPageItems, storeManagerNavItems, storeManagerPageItems } from "./inventoryItems";
import adminNavItems, { adminPageItems } from "./adminItems";

export const pageData = {
  navItems: [],
  pageItems: [],
};

export let pageItems = [];

export let navItems = [];

function pageAndNavItemsDeterminer (role, clearance) {
  if (role === department.INVENTORY) {
    if (clearance === clearanceLevel.DEPARTMENT_LEADER) {
      pageData.navItems = storeManagerNavItems;
      pageData.pageItems = storeManagerPageItems;
    } else {
      pageData.navItems = inventoryNavtems;
      pageData.pageItems = inventoryPageItems;
    }
  } else if (role === department.ADMIN) {
    pageData.navItems = adminNavItems;
    pageData.pageItems = adminPageItems;
  }

  return pageData;
}

function pageItemsDeterminer(role, clearance) {
  if (role === department.INVENTORY) {
    if (clearance === clearanceLevel.DEPARTMENT_LEADER) {
      pageItems = storeManagerPageItems;
    } else {
      pageItems = inventoryPageItems;
    }
  } else if (role === department.ADMIN) {
    pageItems = adminPageItems;
  }

  return pageItems;
}

function navItemsDeterminer(role, clearance) {
  if (role === department.INVENTORY) {
    if (clearance === clearanceLevel.DEPARTMENT_LEADER) {
      navItems = storeManagerNavItems;
    } else {
      navItems = inventoryNavtems;
    }
  } else if (role === department.ADMIN) {
    navItems = adminNavItems;
  }

  return navItems;
}

export { pageItemsDeterminer, navItemsDeterminer };
export default pageAndNavItemsDeterminer;
