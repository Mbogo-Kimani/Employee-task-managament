import department from "./enums/department";
import clearanceLevel from "./enums/clearanceLevel";
import { inventoryNavtems, inventoryPageItems, storeManagerNavItems, storeManagerPageItems } from "./inventoryItems";
import adminNavItems, { adminPageItems } from "./adminItems";

export const pageData = {
  navItems: [],
  pageItems: [],
};

function pageAndNavItemsDeterminer (role, clearance) {
  // debugger
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

export default pageAndNavItemsDeterminer;
