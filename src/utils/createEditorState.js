import { EditorState, convertFromRaw } from 'draft-js';
export const createEditorState = (rawContent) => {
  if (rawContent) {
    try {
      const parsedContent = JSON.parse(rawContent);
      if (parsedContent.blocks) {
        return EditorState.createWithContent(convertFromRaw(parsedContent));
      } else {
        console.error('Invalid raw content structure: Missing blocks');
      }
    } catch (error) {
      console.error('Error parsing raw content:', error);
    }
  }
  return EditorState.createEmpty();
};
