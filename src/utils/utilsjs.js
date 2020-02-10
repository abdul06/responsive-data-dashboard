
export function  getDataPoints(list, item_1, item_2){
  let tracker = {};
  let trackList = [];
  // conbine data for charts into object for mapping to chart
  // Better to setup from database and run query to combine by unique vaules and type
  let dataPoints = list.map(function(listItem) {
    if( listItem[item_1]) { 
      if (listItem[item_1].substring(0,4) in tracker){

        if([listItem[item_2]] in tracker[listItem[item_1].substring(0,4)]){
          tracker[listItem[item_1].substring(0,4)][listItem[item_2]] = tracker[listItem[item_1].substring(0,4)][listItem[item_2]] + 1
        }else {
          tracker[listItem[item_1].substring(0,4)][listItem[item_2]] = 1;
        }
        
      } else {
        tracker[listItem[item_1].substring(0,4)] = {label: listItem[item_1].substring(0,4) };

        tracker[listItem[item_1].substring(0,4)][listItem[item_2]] = 1;
      }
    }
  });


  for (let key in tracker) {
    trackList.push(tracker[key]);
  }
  
  return trackList;
};