import { useRouter } from 'next/router';
import { confirmAlert } from 'react-confirm-alert';
import CustomAlert from './../customAlert';
import { useRecoilValue } from 'recoil';
import { loginState } from '../../store/atom/userStates';

const withAuth = (WrappedComponent: any) => {
  return (props: any) => {
    // checks whether we are on client / browser or server.
    if (typeof window !== 'undefined') {
      const router = useRouter();
      const isLogin = useRecoilValue(loginState);

      // If there is no access token we redirect to "/" page.
      if (!isLogin) {
        confirmAlert({
          customUI: ({ onClose }) => (
            <CustomAlert
              title='로그인'
              desc='로그인이 필요한 서비스입니다. 로그인 하시겠습니까?'
              btnTitle='로그인'
              // id={}
              onAction={() => {
                router.push('/login');
              }}
              onClose={onClose}
            />
          ),
        });

        return null;
      }

      // If this is an accessToken we just render the component that was passed with all its props

      return <WrappedComponent {...props} />;
    }

    // If we are on server, return null
    return null;
  };
};

export default withAuth;
