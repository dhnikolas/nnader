import {Events} from "./events";

export default  {
  loading_event: 'loader-is-loading',
  msg_event: 'loader-message',
  execute(eventType, params){
    Events.$emit(eventType, params)
  },
  loadStart(){
    this.execute(this.loading_event, true);
  },
  loadStop(){
    this.execute(this.loading_event, false);
  },
  loadStopWithMsg(msg, duration){
    this.loadStop();
    this.message(msg, duration);
  },
  message(text, duration){
    let msgData = {
      text: text,
      duration: duration
    };
    this.execute(this.msg_event, msgData);
  }
}