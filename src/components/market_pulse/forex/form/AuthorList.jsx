import { useEffect, useState } from 'react';
import { http_instanse_level_2 } from '../../../../axios/auth_full_http_instanse';
import CustomSelectBox from '../../../../pages/profile/new_course_components/custom_select_box';

function AuthorList({ onAuthorChange }) {
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const res = await http_instanse_level_2.post(
          '/api/users/getuserinstructorslist',
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

      
        const { messageData } = res.data;
        const authorsOptions = messageData.map((data) => {
          return {
            title: data.username,
            value: data.username,
          };
        });

        setAuthors(authorsOptions);
      } catch (e) {
        throw e;
      }
    };

    fetchAuthors();
  }, []);

  return (
    <div className='rounded-sm bg-white p-[30px]'>
      <h2 className='font-bold'>Author</h2>

      {!authors.length ? (
        <p>Loading...</p>
      ) : (
        <CustomSelectBox options={authors} onChange={onAuthorChange} />
      )}
    </div>
  );
}

export default AuthorList;
