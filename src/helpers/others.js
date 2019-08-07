export const utilities = {
  isActive,
  statusLabel,
  isVerified,
  verificationLabel,
  pageRequestData,
  pageMode,
  getCategoryCount,
  getPageTitle,
  dataURLtoBlob,
  pageable,
  getTagPageTitle,
  pagination,
  searchApiCallTimeOut
};

function isActive(status) {
  return status === null
    ? "badge border-danger danger badge-border"
    : status === true
    ? "badge border-success success badge-border"
    : status === false
    ? "badge border-danger danger badge-border"
    : "";
}
function statusLabel(status) {
  return status === true
    ? "Active"
    : status === false
    ? "In Active"
    : status === null
    ? "In Active"
    : "";
}
function isVerified(boolean) {
  return !boolean
    ? "badge border-danger danger badge-border"
    : boolean
    ? "badge border-success success badge-border"
    : "";
}
function verificationLabel(boolean) {
  return boolean ? "Verified" : !boolean ? "Not Verified" : "";
}
function pageRequestData() {
  return {
    page: {
      sort: {},
      search: { predicateObject: {} },
      pagination: {
        start: 0,
        totalItemCount: 0,
        number: 10,
        numberOfPages: 0
      }
    }
  };
}
function pageMode(mode, data) {
  switch (mode) {
    case "pending":
      data.pending = true;
      break;
    case "approved":
      data.approved = true;
      break;
    case "verified":
      data.approved = true;
      break;
    case "new":
      data.newEntry = true;
      break;
    case "deleted":
      data.markForDelete = true;
      break;
    case "markDelete":
      data.markForDelete = false;
      break;
    default:
      return data;
  }
}

function getCategoryCount(category) {
  switch (category.categoryType) {
    case "Movie":
      return category.movieCount;
    case "Star":
      return category.starCount;

    default:
      return 0;
  }
}
function getPageTitle(type, pageName) {
  const title = `${capitalizeFirstLetter(type)}${" "}${pageName}`;
  switch (type) {
    case "verified":
      return title;
    case "approved":
      return title;
    case "pending":
      return title;
    case "new":
      return title;
    case "deleted":
      return title;
    case "star":
      return title;
    case "stars":
      return title;
    case "movie":
      return title;
    case "add":
      return title;
    case "search":
      return title;
    case "newslead":
      return title;
    case "poll":
      return title;
    case "news":
      return title;
    case "gallery":
      return title;
    case "post":
      return title;
    case "videos":
      return title;
    case "my":
      return title;
    default:
      return null;
  }
}

function getTagPageTitle(type, pageName) {
  const title = `${capitalizeFirstLetter(type)}${" "}${pageName}`;
  switch (type) {
    case "gallery":
      return title;
    case "news":
      return title;

    default:
      return null;
  }
}
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
//**dataURL to blob**
function dataURLtoBlob(dataurl) {
  var arr = dataurl.split(","),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
}
//**pageable object init**
function pageable() {
  return {
    pageNo: 0,
    searchText: null
  };
}
function pagination() {
  return {
    first: true,
    last: true,
    number: 0,
    numberOfElements: 0,
    size: 0,
    totalElements: 0,
    totalPages: 1
  };
}
function searchApiCallTimeOut() {
  return 750;
}
