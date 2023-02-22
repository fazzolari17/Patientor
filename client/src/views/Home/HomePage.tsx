import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

// Utils
import { capitalized } from '../../utils/helperFunctions';
import { parseString } from '../../utils/utils';

const style = {
  flex: {
    display: 'flex',
    flexDirection: 'column' as 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
};
interface IProps {
  isLoggedIn: boolean;
}

const Home = ({ isLoggedIn }: IProps) => {
  const {
    user: { firstName = '', lastName = '' },
  } = useSelector((state: RootState) => state);

  const renderWelcomeMessage =
    isLoggedIn && firstName !== null ? (
      <>
        <h2>{`Welcome ${capitalized(parseString(firstName))} ${capitalized(
          parseString(lastName)
        )} the the Patient Portal`}</h2>
        <h3>
          Click on the icon in the top left corner to open the menu and use the
          menu to navigate the app
        </h3>
      </>
    ) : (
      <>
        <h2>Welcome the the Patient Portal</h2>
        <h3>Log in to explore the app</h3>
      </>
    );

  return <section style={style.flex}>{renderWelcomeMessage}</section>;
};

export default Home;
