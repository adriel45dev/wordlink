type UserType = {
  username: string;
  name: string;
  email: string;
  password: string;
  displaylanguage: string;
  languages: {
    [key: string]: {
      name: string;
      country: string;
      code: string;
    };
  };
  currentlanguage: {
    name: string;
    country_code: string;
    target_code: string;
    display_code: string;
  };
  language_key: string;
};

export default UserType;
