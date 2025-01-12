import department from './enums/department';
import clearanceLevel from './enums/clearanceLevel';
import {
  inventoryNavtems,
  inventoryPageItems,
  storeManagerNavItems,
  storeManagerPageItems,
} from './inventoryItems';
import adminNavItems, { adminPageItems } from './adminItems';
import {
  leadTechnicianNavItems,
  leadTechnicianPageItems,
  technicianNavtems,
  technicianPageItems,
} from './technicianItems';
import { financeNavItems,financePageItems } from './financeItems';
import { salesNavItems, salesPageItems } from './salesItems';

export const pageData = {
  navItems: [],
  pageItems: [],
};

export let pageItems = [];

export let navItems = [];

function pageAndNavItemsDeterminer(role, clearance) {
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
  } else if (role === department.TECHNICIANS) {
    if (clearance === clearanceLevel.DEPARTMENT_LEADER) {
      pageData.navItems = leadTechnicianNavItems;
      pageData.pageItems = leadTechnicianPageItems;
    } else {
      pageData.navItems = technicianNavtems;
      pageData.pageItems = technicianPageItems;
    }
  } else if (role === department.SALES) {
    pageData.navItems = salesNavItems;
    pageData.pageItems = salesPageItems;
  } else if (role === department.ACCOUNTING_AND_FINANCE) {
    pageData.navItems = financeNavItems;
    pageData.pageItems = financePageItems;
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
  } else if (role === department.TECHNICIANS) {
    if (clearance === clearanceLevel.DEPARTMENT_LEADER) {
      pageItems = leadTechnicianPageItems;
    } else {
      pageItems = technicianPageItems;
    }
  } else if (role === department.SALES) {
    pageItems = salesPageItems;
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
  } else if (role === department.TECHNICIANS) {
    if (clearance === clearanceLevel.DEPARTMENT_LEADER) {
      navItems = leadTechnicianNavItems;
    } else {
      navItems = technicianNavtems;
    }
  } else if (role === department.SALES) {
    navItems = salesNavItems;
  } else if (role === department.ACCOUNTING_AND_FINANCE) {
    navItems = financeNavItems;
  }

  return navItems;
}

export { pageItemsDeterminer, navItemsDeterminer };
export default pageAndNavItemsDeterminer;
