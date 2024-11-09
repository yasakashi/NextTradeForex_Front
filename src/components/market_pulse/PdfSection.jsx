import { useEffect, useState } from 'react';
import CustomTextField from '../../common/custom_text_field';

function PdfSection({ pdfData, onDataChange }) {
  const [data, setData] = useState(pdfData || []);

  const [pdfTitle, setPdfTitle] = useState('');
  const [pdfShortCodeId, setPdfShortCodeId] = useState('');
  const [author, setAuthor] = useState('');
  const [shortDescription, setShortDescription] = useState('');

  const addRow = () => {
    if (pdfTitle && pdfShortCodeId && author && shortDescription) {
      setData([
        ...data,
        { pdfTitle, pdfShortCodeId, author, shortDescription },
      ]);
      // Reset input fields after adding a row
      setPdfTitle('');
      setPdfShortCodeId('');
      setAuthor('');
      setShortDescription('');
    }
  };

  const removeRow = (index) => {
    const newData = data.filter((_, i) => i !== index);
    setData(newData);
  };

  useEffect(() => {
    onDataChange(data);
  }, [onDataChange, data]);

  return (
    <div>
      <div className="grid grid-cols-4 gap-4">
        <CustomTextField
          value={pdfTitle}
          onChange={(e) => setPdfTitle(e.target.value)}
          helper_text="PDF Title"
          helper_text_up_position
          placeHolder="Enter PDF Title"
        />
        <CustomTextField
          value={pdfShortCodeId}
          onChange={(e) => setPdfShortCodeId(e.target.value)}
          helper_text="PDF Short Code ID"
          helper_text_up_position
          placeHolder="Enter Short Code ID"
        />
        <CustomTextField
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          helper_text="Author"
          helper_text_up_position
          placeHolder="Enter Author Name"
        />
        <CustomTextField
          value={shortDescription}
          onChange={(e) => setShortDescription(e.target.value)}
          helper_text="Short Description"
          helper_text_up_position
          placeHolder="Enter Short Description"
        />
      </div>

      <button
        className="mt-[5px] text-sm bg-blue-700 rounded-sm text-white px-[12px] py-[7px]"
        onClick={addRow}
      >
        Add PDF
      </button>

      <div className="mt-4">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between border-b py-2"
          >
            <span>
              {item.pdfTitle} - {item.pdfShortCodeId} - {item.author} -{' '}
              {item.shortDescription}
            </span>
            <button
              className="text-red-500 ml-4"
              onClick={() => removeRow(index)}
            >
              X
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PdfSection;
