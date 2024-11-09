import { EditorState, convertFromRaw } from 'draft-js';
export const createEditorState = (rawContent) => {
  if (rawContent) {
    try {
      return EditorState.createWithContent(convertFromRaw(JSON.parse(rawContent)));
    } catch (error) {
      console.error('Error parsing raw content:', error);
      return EditorState.createEmpty();
    }
  }
  return EditorState.createEmpty();
};

