import {Share} from "react-native";

const onShare = async (tasks) => {
    try {
      const result = await Share.share( 
        { message: 
          `오늘의 할일 : ${Object.values(tasks).map((item) => item.text)}` 
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