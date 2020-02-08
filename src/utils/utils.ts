




function compareKeyVaues (key: string, sortOrder: number = 1 ):any {

  return function(a?:any, b?:any):any{
    var result = (a[`${key}`] < b[`${key}`]) ? -1 : (a[`${key}`] > b[`${key}`]) ? 1 : 0;
    return result * sortOrder;
  }
}

export function sortByObjectValue(list: any[], key: string, sort: string = 'ascending'){

  const sortOrder = sort === 'ascending' ? 1 : -1;

  return list.sort(compareKeyVaues(key, sortOrder));

}




// nice-to-have: setup paginationObject as own class
export function setupPagination(list:any[], itemNumber:number = 10):any{
    //default pagination is 10
    // nice-to-have: setup paginationObject as own class
    let paginationObject = {};
    let itemList: any[] = [];
    let count: number = 0;
    let objectNumber: number = 1;
    
    for (let index = 0; index < list.length; index++) {
      
      // reset list to setup pagination list number
      if(count === itemNumber){
        paginationObject[`${objectNumber}`] = {
          groupedRows: null,
          start: null,
          end: null,
        };
        // setup object item to 
        // setup list on pagination object
        paginationObject[objectNumber].groupedRows = itemList;
        // setup beginning range number
        paginationObject[objectNumber].start = parseInt(`${objectNumber > 1 ? ( (objectNumber -1) * itemList.length) + 1 : objectNumber}`);
        // setup end range number
        paginationObject[objectNumber].end = parseInt(`${objectNumber > 1 ? ( objectNumber * itemList.length) : itemList.length }`);

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