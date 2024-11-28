import { useEffect, useState } from 'react';
import MAterialTable from '../../../../components/table/material_table';
import DeleteMenuModal from '../../../categories/view/components/delete_menu_modal';
import BorderedButtonPrimary from '../../../../../common/bordered_button_primary';
import CustomRadioButton from '../../../categories/view/components/customRadioButton';
import { Link, useNavigate } from 'react-router-dom';
import { http_instanse_level_2 } from '../../../../../axios/auth_full_http_instanse';
import { useDispatch } from 'react-redux';
import { toggle_loading } from '../../../../../redux/features/generalSlice';
import {
  clearIndiceData,
  setIndiceData,
} from '../../../../../redux/features/marketPulse/marketPulseSlice';
import { getIndiceItems } from '../../../../../pages/market_pulse/api';

function IndicesList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [open_delete_dialog, set_open_delete_dialog] = useState({
    open: false,
  });
  const [indiceData, setIndicesData] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      dispatch(toggle_loading(true));
      try {
        const res = await getIndiceItems({
          categoryId: null,
          id: null,
        });

        const { messageData } = res.data;
        setIndicesData(messageData);
      } catch (e) {
        console.error(e);
      } finally {
        dispatch(toggle_loading(false));
      }
    };

    fetchCourses();
  }, [dispatch]);

  const deleteData = async (categoryid) => {
    try {
      dispatch(toggle_loading(true));
      await http_instanse_level_2.post('/api/marketpuls/deleteindiceitem', {
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: null,
          categoryid,
        }),
      });

      // After deletion, remove the item from forexData state
      setIndicesData((prevData) =>
        prevData.filter((item) => item.categoryid !== categoryid)
      );
    } catch (e) {
      throw e;
    } finally {
      dispatch(toggle_loading(false));
    }
  };

  return (
    <div className="flex flex-col px-8 py-8">
      <div className="flex items-center justify-between">
        <h1 className="font-semibold text-2xl text-white mb-4">Lessons</h1>
        <button
          className="bg-white rounded-md px-[12px] py-[7px]"
          onClick={() => dispatch(clearIndiceData())}
        >
          <Link to="/admin-panel/lessons/market-pulse/create">New</Link>
        </button>
      </div>
      <MAterialTable
        rows={indiceData} // Set rows to fetched data
        columns={[
          {
            header: 'Title',
            accessorKey: 'coursetitle',
            Cell: ({ row }) => (
              <div className="flex flex-col w-48">
                <p style={{ color: '#2271b1', fontWeight: 'bold' }}>
                  {row.original?.coursetitle}
                </p>
                <div className="flex items-center">
                  {row.id === open_delete_dialog?.row?.id && (
                    <DeleteMenuModal
                      disabled={false}
                      onYesClick={() => {
                        set_open_delete_dialog({
                          open: false,
                          row: undefined,
                        });

                        deleteData(row.original.categoryid);
                      }}
                      props={{
                        open: open_delete_dialog.open,
                        onClose() {
                          set_open_delete_dialog({
                            open: false,
                            row: undefined,
                          });
                        },
                      }}
                    />
                  )}
                  <BorderedButtonPrimary
                    title="Edit"
                    onClick={() => {
                      // navigate to edit page
                      dispatch(setIndiceData(row.original));
                      navigate(
                        `/admin-panel/lessons/market-pulse/${row.original.id}`
                      );
                    }}
                    style={{ padding: 4, border: 'none' }}
                  />
                  <BorderedButtonPrimary
                    title="Delete"
                    onClick={() => {
                      set_open_delete_dialog({ open: true, row });
                    }}
                    style={{ color: 'red', padding: 4, border: 'none' }}
                  />
                </div>
              </div>
            ),
          },
          {
            header: 'Author',
            accessorKey: 'author',
            Cell: ({ row }) => (
              <p style={{ color: '#2271b1' }}>{row.original.author}</p>
            ),
          },
          {
            header: 'Date',
            accessorKey: 'createdatetime',
            Cell: ({ row }) => (
              <div className="flex flex-col">
                <p>Published</p>
                <p>{new Date(row.original.createdatetime).toLocaleString()}</p>
              </div>
            ),
          },
          {
            header: 'Is Visible',
            accessorKey: 'isvisible',
            Cell: ({ row }) => (
              <div className="flex">
                <CustomRadioButton
                  label="Yes"
                  checked={row.original?.isvisible === true}
                />
                <span className="w-2"></span>
                <CustomRadioButton
                  label="No"
                  checked={row.original?.isvisible === false}
                />
              </div>
            ),
          },
        ]}
      />
    </div>
  );
}

export default IndicesList;
