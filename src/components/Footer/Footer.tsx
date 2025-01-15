import SocialMedia from '../SocialMedia/SocialMedia';

const Footer = () => {
  return (
    <footer className="w-[80%] sm:w-[90%] flex flex-col items-center sm:items-start mx-auto dark:text-gray-50">
      <SocialMedia />
      <p className="font-sans text-[14px]">guidogauna9@gmail.com</p>
      <p>
        <strong className="font-sans text-[14px]">
          Design by Celeste Quintana
        </strong>
      </p>
    </footer>
  );
};

export default Footer;
