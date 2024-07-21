import { useEffect, useState } from 'react';
import { getOrganizationDetails } from '../api/organization-info';

const Example1 = () => {
  const [ userInfo, setUserInfo ] = useState();

  useEffect(() => {
    (async () => {
      try {
        const response = await getOrganizationDetails();        
        setUserInfo(response);
      } catch (error) {
        // Log the error.
      }
    })();
    
  }, []);
  return (
    <>
      <h1>Example 1</h1>
      <p>{JSON.stringify(userInfo)}</p>
    </>
  );
};

export default Example1;
