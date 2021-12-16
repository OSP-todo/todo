import {Share} from "react-native";

const onShare = async (tasks) => {
    //상단 날짜
    var today = new Date();
    var year = today.getFullYear();
    var month = (today.getMonth()+1);
    var date = today.getDate();
    if(month < 10) month = '0' + month;
    if(date < 10) date = '0' + date;
    var compareToday = year + "/" + month  + "/" + date;
    const todayTasks = Object.values(tasks).filter(item => item.dueDate==compareToday);
    try {
      const result = await Share.share( 
        { message: 
          `오늘의 할일 : ${Object.values(todayTasks).map((item) => item.text)}` 
        } ); 
      if (result.action === Share.sharedAction) {
        if (result.activityType) { 
          console.log('activityType!'); } 
        else { console.log('Share Active!'); }
      }
      else if (result.action === Share.dismissedAction) 
        { console.log('dismissed'); }
      }
    catch (error) {
      alert(error.message);
    }
};

export default onShare;