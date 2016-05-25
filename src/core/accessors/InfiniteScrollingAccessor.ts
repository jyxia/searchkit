import {ValueState} from "../state"
import {StatefulAccessor} from "./StatefulAccessor"


export class InfiniteScrollingAccessor extends StatefulAccessor<ValueState> {
  state = new ValueState(1)

  onStateChange(oldState={}){
    // Reset page scrolling on any state change
    
    // if(oldState[this.urlKey] == this.state.getValue()){
      this.state = this.state.clear()
    // }
  }
  
  fromQueryObject(ob){
    
  }
  
  getQueryObject(){
    return {}
  }

  buildOwnQuery(query){
    let from = (query.getSize() || 20) * (Number(this.state.getValue()) -1 )
    if(from > 0){
      return query.setFrom(from)
    }
    return query
  }
  
  postQuery(query){
    if (Number(this.state.getValue()) > 1){
      return query.setIsMore(true).removeAggs()
    }
    return query
  }
}
