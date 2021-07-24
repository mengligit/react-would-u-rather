
const logger = (store) => (next) => (action) => {
    console.group(action.type)
      console.log("The action: ", action);
      //dispatch action and updates state
      const returnValue = next(action);
      console.log('The new state: ', store.getState());
      console.log('The return Value: ', returnValue)
    console.groupEnd();
    return returnValue;
}

export default logger;