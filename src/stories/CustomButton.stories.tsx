import CustomButton from '../components/CustomButton';

const CustomButtonStory = {
  title: 'Test/CustomButton',
  component: CustomButton,
};

export const test = {
  args: {
    children: '로그인 하기',
    variant: 'black',
    fontSize: 'lg',
    style: {
      width: '350px',
      height: '48px',
    },
  },
};

export default CustomButtonStory;
