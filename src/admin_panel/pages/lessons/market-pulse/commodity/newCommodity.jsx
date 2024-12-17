import { useEffect, useState } from 'react';
import CustomTextField from '../../../../../common/custom_text_field';
import Expandable from '../../../../../components/Expandable';
import AuthorList from '../../../../../components/market_pulse/forex/form/AuthorList';
import CategoryList from '../../../../../components/market_pulse/CategoryList';
import Currency from '../../../../../components/market_pulse/forex/form/Currency';
import CourseLevelType from '../../../../../components/market_pulse/CourseLevelType';
import CourseVisibility from '../../../../../components/market_pulse/CourseVisibility';
import Fundamental from '../../../../../components/market_pulse/Fundamental';
import { selectCommodityData } from '../../../../../redux/features/marketPulse/marketPulseSlice';
import { useDispatch, useSelector } from 'react-redux';
import { http_instanse_level_2 } from '../../../../../axios/auth_full_http_instanse';
import {
  show_message,
  toggle_loading,
} from '../../../../../redux/features/generalSlice';

function AddCommodity() {
  const dispatch = useDispatch();
  const data = useSelector(selectCommodityData);
  const [title, setTitle] = useState(data?.coursetitle || '');
  const [excerpt, setExcerpt] = useState(data?.excerpt || '');
  const [privateNote, setPrivateNote] = useState(data?.privatenotes || '');
  const [currencyData, setCurrencyData] = useState({});
  const [fundamentalData, setFundamentalData] = useState({});
  const [categoryid, setCategoryId] = useState(0);
  const [author, setAuthor] = useState('');
  const [courseleveltypeId, setCourseLevelType] = useState(0);
  const [isVisible, setVisibility] = useState(true);

  dispatch(toggle_loading(true));

  useEffect(() => {
    console.log(data);
  }, []);

  const publish = async () => {
    if (!title) return;

    const body = {
      coursetitle: title,
      categoryid,
      author,
      courseleveltypeId,
      isVisible,
      comodities: [
        {
          ...currencyData,
        },
      ],
      fundamentalandtechnicaltabsection: {
        ...fundamentalData,
      },
    };

    try {
      dispatch(toggle_loading(true));
      await http_instanse_level_2.post(
        '/api/marketpuls/addcomodityitem',
        JSON.stringify(body)
      );

      dispatch(
        show_message({
          mode: true,
          color: 'success',
          message: 'Post Created Successfully',
        })
      );
    } catch (e) {
      throw e;
    } finally {
      dispatch(toggle_loading(false));
    }
  };

  return (
    <div className="flex flex-col px-8 py-8">
      <h1 className="font-semibold text-2xl text-white mb-4">
        Create New Course
      </h1>
      <div className="space-y-[10px]">
        <Expandable title="Title">
          <div className="rounded-sm bg-white p-[30px]">
            <CustomTextField
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              helper_text="Title"
              helper_text_up_position
              placeHolder="Course Title"
            />
          </div>
        </Expandable>

        <Currency onCurrencyChange={setCurrencyData} />
        <Fundamental onFundamentalChange={setFundamentalData} />

        <AuthorList onAuthorChange={setAuthor} />
        <CategoryList
          categoryId={data?.categoryid}
          onCategoryChange={setCategoryId}
        />
        <CourseLevelType
          index={data?.courseleveltypeId}
          onLevelChange={setCourseLevelType}
        />
        <CourseVisibility
          isVisible={data?.isvisible}
          onVisibilityChange={setVisibility}
        />

        <div className="rounded-sm bg-white p-[30px]">
          <button
            className="px-[12px] py-[8px] rounded-sm text-white bg-primary"
            onClick={publish}
          >
            Publish
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddCommodity;
