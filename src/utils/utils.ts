/**
 * used to compare value for Higher function function array.sort
 * @param {string} key - array object key to sort by 
 * @param {number} sortOrder - set ascending or desending sort
 */

function compareKeyVaues (key: string, sortOrder: number = 1 ):any {

  return function(a?:any, b?:any):any{
    var result = (a[`${key}`] < b[`${key}`]) ? -1 : (a[`${key}`] > b[`${key}`]) ? 1 : 0;
    return result * sortOrder;
  }
}

/**
 * sorts array of objects by key passed in
 * 
 * @param {array} list - array of objects to be sorted
 * @param {string} key - array object key to sort by 
 * @param {number} sortOrder - set ascending or desending sort
 * 
 * @return {array} list - list of objects sorted passed in key [{ title, type }, { title, type }]
 */
export function sortByObjectValue(list: any[], key: string, sort: string = 'ascending'){

  const sortOrder:number = sort === 'ascending' ? 1 : -1;

  return list.sort(compareKeyVaues(key, sortOrder));

}


/**
 * Setup object of grouped content by number of items to display in table
 * 
 * @param {array} list - array of objects to be sorted
 * @param {number: default=10} itemNumber - number of items to group for pagination
 * 
 * @return {object} paginationObject - setup to get grouped items by a sting formatted number to be easliy accessiable
 * exp: { 1:{groupedRows:any[[]], start:number, end:number  }, 2:{groupedRows:any[[]], start:number, end:number  } }
 */
// nice-to-have: setup paginationObject as own class
export function setupPagination(list:any[], itemNumber:number = 10):any{
    let paginationObject = {};
    let itemList: any[] = [];
    let count: number = 0;
    let objectNumber: number = 1;
    
    for (let index = 0; index < list.length; index++) {
      
      // reset list to setup pagination list number
      if(count === itemNumber){
        // init groupRows set to a number
        paginationObject[`${objectNumber}`] = {
          groupedRows: null,
          start: null,
          end: null,
        };
        // setup list on pagination object
        paginationObject[objectNumber].groupedRows = itemList;
        // setup beginning range number
        paginationObject[objectNumber].start = objectNumber > 1 ? ( (objectNumber -1) * itemList.length) + 1 : objectNumber;
        // setup end range number 
        paginationObject[objectNumber].end = objectNumber > 1 ? ( objectNumber * itemList.length) : itemList.length ;

        // reset array and count
        count = 0;
        itemList = [];
        objectNumber++
      }
      itemList.push(list[index]);
      count++;
    }

    return paginationObject;
  }