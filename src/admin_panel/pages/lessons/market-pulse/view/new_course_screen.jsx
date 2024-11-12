import { useEffect, useState } from 'react';
import CustomTextField from '../../../../../common/custom_text_field';
import Expandable from '../../../../../components/Expandable';
import AuthorList from '../../../../../components/market_pulse/forex/form/AuthorList';
import CategoryList from '../../../../../components/market_pulse/CategoryList';
import Currency from '../../../../../components/market_pulse/forex/form/Currency';
import CourseLevelType from '../../../../../components/market_pulse/CourseLevelType';
import CourseVisibility from '../../../../../components/market_pulse/CourseVisibility';
import Fundamental from '../../../../../components/market_pulse/Fundamental';
import { selectForexData } from '../../../../../redux/features/marketPulse/marketPulseSlice';
import { useDispatch, useSelector } from 'react-redux';
import { http_instanse_level_2 } from '../../../../../axios/auth_full_http_instanse';
import {
  show_message,
  toggle_loading,
} from '../../../../../redux/features/generalSlice';

function MarketPulseNewCourseScreen() {
  const dispatch = useDispatch();
  const data = useSelector(selectForexData);
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
      excerpt,
      privateNote,
      categoryid,
      author,
      courseleveltypeId,
      isVisible,
      ...currencyData,
      ...fundamentalData,
      NewsMainContentlist: [{ maintitle: 'w2', script: 'w2' }],
   };

    try {
      dispatch(toggle_loading(true));
      await http_instanse_level_2.post(
        '/api/marketpuls/addforexitem',
        JSON.stringify(body)
      );

      dispatch(
        show_message({
          mode: true,
          color: 'success',
          message: 'Post Created Successfully',
        })
      );

      // if (err?.config?.responseType !== "blob") {
      //   store.dispatch(
      //     show_message({
      //       mode: true,
      //       color: "error",
      //       message: err?.response?.data?.title || "",
      //     })
      //   );
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

        <Expandable title="Private Notes">
          <div className="rounded-sm bg-white p-[30px]">
            <CustomTextField
              value={privateNote}
              onChange={(e) => setPrivateNote(e.target.value)}
              helper_text="Private Notes"
              helper_text_up_position
            />
          </div>
        </Expandable>

        <Expandable title="Excerpt">
          <div className="rounded-sm bg-white p-[30px]">
            <CustomTextField
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              helper_text="Excerpt"
              helper_text_up_position
              placeHolder="Course Title"
            />
            <p className="text-sm">
              Excerpts are optional hand-crafted summaries of your content that
              can be used in your theme.{' '}
            </p>
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

export default MarketPulseNewCourseScreen;
