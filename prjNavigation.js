import { StackActions } from 'react-navigation';
import { cmnAlertPopup } from './cmnAnnunciationFunctions';

export function goBackToScreen (navigation, targetRouteName) {

  const { routes, index } = navigation.dangerouslyGetParent().state;

  // Find index of the target screen
  const targetIndex = routes.findIndex(r => r.routeName === targetRouteName);
  if (targetIndex === -1) {
         cmnAlertPopup({ text: `Route ${targetRouteName} not found in navigation stack.` })//OK
    return;
  }

  const popCount = index - targetIndex;

  if (popCount > 0) {
    const popAction = StackActions.pop({ n: popCount });
    navigation.dispatch(popAction);
  } else {
         cmnAlertPopup({ text: `Route ${targetRouteName} error in navigation stack.` })
  }
};
